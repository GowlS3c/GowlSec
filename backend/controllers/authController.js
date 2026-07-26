import prisma from "../utils/prisma.js";
import { DUMMY_PASSWORD_HASH } from "../utils/security.js";
import bcrypt from "bcrypt";
import { z } from "zod";
import {
    generateAccessToken,
    generateRefreshToken,
    hashRefreshToken,
    generateTwoFactorToken,
    verifyTwoFactorToken
} from "../utils/jwt.js";
import {
  createRecoveryCodes,
  createQrCode,
  createTotpSecret,
  decryptSecret,
  encryptSecret,
  hashRecoveryCode,
  verifyTotp,
} from "../services/twoFactorService.js";

import crypto from "crypto";
import { sendVerificationEmail } from "../services/emailService.js";

const registerSchema = z.object({
    username: z.string().min(3).max(30),

    email: z.string()
        .email()
        .refine((email) => {
            const domain = email.split("@")[1].toLowerCase();

            const allowedDomains = [
                "gmail.com",
                "outlook.com",
                "hotmail.com",
                "live.com",
                "proton.me",
                "protonmail.com",
                "icloud.com",
                "yahoo.com",
                "tutamail.com"
            ];

            return allowedDomains.includes(domain);
        }, {
            message: "Email Invalide !"
        }),

    password: z.string().min(8)
});

async function createSession(user, res) {
  const accessToken = generateAccessToken(user);
  const refreshTokenValue = generateRefreshToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

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
    message: "Connexion réussie.",
    accessToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      twoFactorEnabled: user.twoFactorEnabled,
    },
  });
}

export async function register(req, res) {
    try {
        const data = registerSchema.parse(req.body);

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: data.email },
                    { username: data.username }
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Utilisateur déjà existant"
            });
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);

        // Création du token de vérification email
        const verificationToken = crypto
            .randomBytes(32)
            .toString("hex");

        const verificationTokenExpires = new Date();

verificationTokenExpires.setHours(
    verificationTokenExpires.getHours() + 24
);


        const user = await prisma.user.create({
    data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,

        verificationToken,
        verificationTokenExpires,
        emailVerified: false
    }
});

        // Envoi de l'email Resend
        await sendVerificationEmail(
            user.email,
            verificationToken
        );


        return res.status(201).json({
            success: true,
            message: "Compte créé. Vérifie ton email.",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });


    } catch (error) {

    if (error instanceof z.ZodError) {
        return res.status(400).json({
            success: false,
            message: "Email invalide."
        });
    }

    return res.status(500).json({
        success: false,
        message: "Erreur serveur."
    });
}
}
 export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email et mot de passe requis."
      });
    }
    

    const user = await prisma.user.findUnique({
    where: {
        email
    }
});

if (!user) {

    await bcrypt.compare(
        password,
        DUMMY_PASSWORD_HASH
    );

    return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect."
    });
}


const passwordValid = await bcrypt.compare(
    password,
    user.password
);

if (!passwordValid) {
    return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect."
    });
}

if (!user.emailVerified) {
    return res.status(403).json({
        success: false,
        message: "Veuillez vérifier votre email avant de vous connecter."
    });
}

if (user.twoFactorEnabled) {
  return res.json({
    success: true,
    requiresTwoFactor: true,
    twoFactorToken: generateTwoFactorToken(user),
    message: "Code A2F requis.",
  });
}

return createSession(user, res);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export async function completeTwoFactorLogin(req, res) {
  try {
    const { twoFactorToken, code } = req.body;
    if (!twoFactorToken || !code) {
      return res.status(400).json({ success: false, message: "Code A2F requis." });
    }

    const payload = verifyTwoFactorToken(twoFactorToken);
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user?.twoFactorEnabled || !user.twoFactorSecret) {
      return res.status(401).json({ success: false, message: "Session A2F invalide." });
    }

    const normalizedCode = String(code).trim();
    const validTotp = verifyTotp(normalizedCode, decryptSecret(user.twoFactorSecret));
    const recoveryHash = hashRecoveryCode(normalizedCode);
    const recoveryIndex = user.twoFactorRecoveryCodes.indexOf(recoveryHash);

    if (!validTotp && recoveryIndex === -1) {
      return res.status(401).json({ success: false, message: "Code A2F incorrect." });
    }

    if (!validTotp) {
      const consumed = await prisma.user.updateMany({
        where: {
          id: user.id,
          twoFactorRecoveryCodes: { has: recoveryHash },
        },
        data: {
          twoFactorRecoveryCodes: user.twoFactorRecoveryCodes.filter(
            (_, index) => index !== recoveryIndex
          ),
        },
      });
      if (consumed.count !== 1) {
        return res.status(401).json({ success: false, message: "Code de secours déjà utilisé." });
      }
    }

    return createSession(user, res);
  } catch {
    return res.status(401).json({
      success: false,
      message: "La vérification A2F a expiré. Reconnecte-toi.",
    });
  }
}

export async function getTwoFactorStatus(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { twoFactorEnabled: true, twoFactorRecoveryCodes: true },
  });
  return res.json({
    success: true,
    enabled: Boolean(user?.twoFactorEnabled),
    recoveryCodesRemaining: user?.twoFactorRecoveryCodes.length || 0,
  });
}

export async function setupTwoFactor(req, res) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user || !(await bcrypt.compare(req.body.password || "", user.password))) {
      return res.status(401).json({ success: false, message: "Mot de passe incorrect." });
    }
    if (user.twoFactorEnabled) {
      return res.status(409).json({ success: false, message: "L’A2F est déjà activée." });
    }

    const secret = createTotpSecret();
    await prisma.user.update({
      where: { id: user.id },
      data: { twoFactorSecret: encryptSecret(secret), twoFactorRecoveryCodes: [] },
    });

    return res.json({
      success: true,
      qrCode: await createQrCode(secret, user.email),
      manualKey: secret,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function enableTwoFactor(req, res) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user?.twoFactorSecret) {
      return res.status(400).json({ success: false, message: "Commence d’abord la configuration A2F." });
    }
    if (!verifyTotp(req.body.code, decryptSecret(user.twoFactorSecret))) {
      return res.status(400).json({ success: false, message: "Code à 6 chiffres incorrect." });
    }

    const recoveryCodes = createRecoveryCodes();
    await prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorEnabled: true,
        twoFactorEnabledAt: new Date(),
        twoFactorRecoveryCodes: recoveryCodes.map(hashRecoveryCode),
      },
    });
    return res.json({ success: true, recoveryCodes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function disableTwoFactor(req, res) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const passwordValid = user && await bcrypt.compare(req.body.password || "", user.password);
    const codeValid = user?.twoFactorSecret &&
      verifyTotp(req.body.code, decryptSecret(user.twoFactorSecret));
    if (!passwordValid || !codeValid) {
      return res.status(401).json({ success: false, message: "Mot de passe ou code A2F incorrect." });
    }
    await prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
        twoFactorRecoveryCodes: [],
        twoFactorEnabledAt: null,
      },
    });
    return res.json({ success: true, message: "A2F désactivée." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function refreshToken(req, res) {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Refresh token manquant."
            });
        }

        const tokenHash = hashRefreshToken(token);

        const storedToken = await prisma.refreshToken.findUnique({
    where: {
        tokenHash
    },
    include: {
        user: true
    }
});

if (!storedToken) {
    return res.status(401).json({
        success: false,
        message: "Refresh token invalide."
    });
}

if (storedToken.revoked) {

    await prisma.refreshToken.updateMany({
        where: {
            userId: storedToken.userId
        },
        data: {
            revoked: true
        }
    });

    res.clearCookie("refreshToken");

    return res.status(401).json({
        success: false,
        message: "Réutilisation d'un ancien refresh token détectée."
    });
}

        if (storedToken.expiresAt < new Date()) {

    await prisma.refreshToken.update({
        where: {
            id: storedToken.id
        },
        data: {
            revoked: true
        }
    });

    return res.status(401).json({
        success: false,
        message: "Refresh token expiré."
    });
}

        await prisma.refreshToken.update({
    where: {
        id: storedToken.id
    },
    data: {
        revoked: true
    }
});

        const newRefreshToken = generateRefreshToken();
        const newHash = hashRefreshToken(newRefreshToken);

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        const newTokenRecord = await prisma.refreshToken.create({
    data: {
        tokenHash: newHash,
        expiresAt,
        userId: storedToken.user.id
    }
});
await prisma.refreshToken.update({
    where: {
        id: storedToken.id
    },
    data: {
        replacedBy: newTokenRecord.id.toString()
    }
});

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const accessToken = generateAccessToken(storedToken.user);

        return res.json({
            success: true,
            accessToken
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Erreur serveur."
        });
    }
}

export async function logout(req, res) {
    try {
        const token = req.cookies.refreshToken;

        if (token) {
            const tokenHash = hashRefreshToken(token);

            await prisma.refreshToken.updateMany({
                where: {
                    tokenHash
                },
                data: {
                    revoked: true
                }
            });
        }

        res.clearCookie("refreshToken");

        return res.json({
            success: true,
            message: "Déconnexion réussie."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Erreur serveur."
        });
    }
}
