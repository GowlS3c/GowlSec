const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export async function register({
  username,
  email,
  password,
  turnstileToken,
}) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      email,
      password,
      turnstileToken,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Échec de l'inscription.");
  }

  return data;
}

export async function login({ email, password }) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Échec de la connexion.");
  }

  return data;
}

async function authRequest(path, options = {}) {
  const token = localStorage.getItem("gowlsec_token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Action impossible.");
  }

  return data;
}

export function verifyTwoFactorLogin({ twoFactorToken, code }) {
  return authRequest("/api/auth/2fa/login", {
    method: "POST",
    body: JSON.stringify({ twoFactorToken, code }),
  });
}

export function getTwoFactorStatus() {
  return authRequest("/api/auth/2fa/status");
}

export function startTwoFactorSetup(password) {
  return authRequest("/api/auth/2fa/setup", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

export function enableTwoFactor(code) {
  return authRequest("/api/auth/2fa/enable", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}

export function disableTwoFactor({ password, code }) {
  return authRequest("/api/auth/2fa/disable", {
    method: "POST",
    body: JSON.stringify({ password, code }),
  });
}

export function completeDiscordLogin(code) {
  return authRequest("/api/auth/discord/session", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}

export function saveSession(data) {
  if (data?.accessToken) {
    localStorage.setItem("gowlsec_token", data.accessToken);
  } else {
    localStorage.removeItem("gowlsec_token");
  }

  if (data?.user) {
    localStorage.setItem("gowlsec_user", JSON.stringify(data.user));
  } else {
    localStorage.removeItem("gowlsec_user");
  }
}

export function getSession() {
  const token = localStorage.getItem("gowlsec_token");
  const user = localStorage.getItem("gowlsec_user");

  return {
    token,
    user: safeParseJSON(user),
  };
}

export function logout() {
  localStorage.removeItem("gowlsec_token");
  localStorage.removeItem("gowlsec_user");
}

export async function forgotPassword(email) {
  const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Erreur lors de la demande.");
  }

  return data;
}

export async function resetPassword({ token, password }) {
  const response = await fetch(`${API_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || "Impossible de changer le mot de passe.",
    );
  }

  return data;
}

export async function resendVerification(email) {
  const response = await fetch(`${API_URL}/api/auth/resend-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Erreur.");
  }

  return data;
}

export async function verifyEmail(token) {
  const response = await fetch(
    `${API_URL}/api/auth/verify-email?token=${encodeURIComponent(token)}`,
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Impossible de vérifier l’email.");
  }

  return data;
}

function safeParseJSON(value) {
  if (
    value === undefined ||
    value === null ||
    value === "" ||
    value === "undefined" ||
    value === "null"
  ) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    console.error("JSON invalide reçu :", value);
    return null;
  }
}
