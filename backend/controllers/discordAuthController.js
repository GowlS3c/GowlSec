import crypto from "crypto";
import bcrypt from "bcrypt";
import prisma from "../utils/prisma.js";

import {
  generateAccessToken,
  generateRefreshToken,
  hashRefreshToken,
} from "../utils/jwt.js";

const DISCORD_API = "https://discord.com/api/v10";

function frontendUrl() {
  return process.env.FRONTEND_URL || "http://localhost:5173";
}

function discordCallbackUrl() {
  return process.env.DISCORD_REDIRECT_URI;
}

function oauthCodeHash(code) {
  return crypto
    .createHash("sha256")
    .update(code)
    .digest("hex");
}

async function generateAvailableUsername(discordUsername) {
  const base =
    discordUsername
      .replace(/[^a-zA-Z0-9_-]/g, "")
      .slice(0, 24) || "discord-user";

  let username = base;
  let attempt = 0;

  while (
    await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    })
  ) {
    attempt += 1;
    username = `${base.slice(0, 20)}-${attempt}`;
  }

  return username;
}

async function createSession(user, res) {
  const accessToken = generateAccessToken(user);
  const refreshTokenValue = generateRefreshToken();
  const expiresAt = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  );

  await prisma.refreshToken.create({
    data: {
      tokenHash: hashRefreshToken(refreshTokenValue),
      expiresAt,
      userId: user.id,
    },
  });

  res.cookie("refreshToken", refreshTokenValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json({
    success: true,
    accessToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      discordId: user.discordId,
      discordUsername: user.discordUsername,
      discordAvatar: user.discordAvatar,
      twoFactorEnabled: user.twoFactorEnabled,
    },
  });
}

export async function discordLogin(req, res) {
  const state = crypto.randomBytes(32).toString("hex");

  res.cookie("discordOAuthState", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60 * 1000,
  });

  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: discordCallbackUrl(),
    response_type: "code",
    scope: "identify email",
    state,
    prompt: "consent",
  });

  return res.redirect(
    `https://discord.com/oauth2/authorize?${params.toString()}`
  );
}

export async function discordCallback(req, res) {
  try {
    const { code, state } = req.query;
    const savedState = req.cookies.discordOAuthState;

    res.clearCookie("discordOAuthState");

    if (!code || !state || !savedState || state !== savedState) {
      return res.redirect(
        `${frontendUrl()}/?discord_error=invalid_state`
      );
    }

    const tokenResponse = await fetch(
      `${DISCORD_API}/oauth2/token`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret:
            process.env.DISCORD_CLIENT_SECRET,
          grant_type: "authorization_code",
          code,
          redirect_uri: discordCallbackUrl(),
        }),
      }
    );

    if (!tokenResponse.ok) {
      console.error(
        "Échange OAuth Discord impossible :",
        await tokenResponse.text()
      );

      return res.redirect(
        `${frontendUrl()}/?discord_error=token_exchange`
      );
    }

    const discordToken = await tokenResponse.json();

    const profileResponse = await fetch(
      `${DISCORD_API}/users/@me`,
      {
        headers: {
          Authorization:
            `Bearer ${discordToken.access_token}`,
        },
      }
    );

    if (!profileResponse.ok) {
      return res.redirect(
        `${frontendUrl()}/?discord_error=profile`
      );
    }

    const discordProfile = await profileResponse.json();

    if (
      !discordProfile.email ||
      discordProfile.verified !== true
    ) {
      return res.redirect(
        `${frontendUrl()}/?discord_error=email_not_verified`
      );
    }

    let user = await prisma.user.findUnique({
      where: {
        discordId: discordProfile.id,
      },
    });

    if (!user) {
      const existingEmail =
        await prisma.user.findUnique({
          where: {
            email: discordProfile.email.toLowerCase(),
          },
        });

      if (existingEmail) {
        return res.redirect(
          `${frontendUrl()}/?discord_error=account_link_required`
        );
      }

      const username =
        await generateAvailableUsername(
          discordProfile.username
        );

      const unusablePassword = await bcrypt.hash(
        crypto.randomBytes(64).toString("hex"),
        12
      );

      user = await prisma.user.create({
        data: {
          username,
          email: discordProfile.email.toLowerCase(),
          password: unusablePassword,
          emailVerified: true,
          authProvider: "discord",
          discordId: discordProfile.id,
          discordUsername:
            discordProfile.global_name ||
            discordProfile.username,
          discordAvatar: discordProfile.avatar
            ? `https://cdn.discordapp.com/avatars/${discordProfile.id}/${discordProfile.avatar}.png`
            : null,
        },
      });
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          discordUsername:
            discordProfile.global_name ||
            discordProfile.username,
          discordAvatar: discordProfile.avatar
            ? `https://cdn.discordapp.com/avatars/${discordProfile.id}/${discordProfile.avatar}.png`
            : null,
        },
      });
    }

    const temporaryCode =
      crypto.randomBytes(48).toString("hex");

    await prisma.oAuthLoginCode.create({
      data: {
        codeHash: oauthCodeHash(temporaryCode),
        expiresAt: new Date(Date.now() + 2 * 60 * 1000),
        userId: user.id,
      },
    });

    return res.redirect(
      `${frontendUrl()}/?discord_code=${encodeURIComponent(temporaryCode)}`
    );
  } catch (error) {
    console.error("Erreur OAuth Discord :", error);

    return res.redirect(
      `${frontendUrl()}/?discord_error=server`
    );
  }
}

export async function discordSession(req, res) {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code Discord manquant.",
      });
    }

    const codeHash = oauthCodeHash(code);

    const storedCode =
      await prisma.oAuthLoginCode.findUnique({
        where: { codeHash },
        include: { user: true },
      });

    if (
      !storedCode ||
      storedCode.expiresAt < new Date()
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Connexion Discord expirée. Réessaie.",
      });
    }

    await prisma.oAuthLoginCode.delete({
      where: { id: storedCode.id },
    });

    return createSession(storedCode.user, res);
  } catch (error) {
    console.error(
      "Création session Discord impossible :",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Connexion Discord impossible.",
    });
  }
}