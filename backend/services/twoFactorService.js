import crypto from "crypto";
import { authenticator } from "otplib";
import QRCode from "qrcode";

function encryptionKey() {
  const value = process.env.TWO_FACTOR_ENCRYPTION_KEY;
  if (!value || value.length < 32) {
    throw new Error("TWO_FACTOR_ENCRYPTION_KEY doit contenir au moins 32 caractères.");
  }
  return crypto.createHash("sha256").update(value).digest();
}

export function encryptSecret(secret) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(secret, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("base64")}.${tag.toString("base64")}.${encrypted.toString("base64")}`;
}

export function decryptSecret(value) {
  const [iv, tag, encrypted] = String(value || "").split(".");
  if (!iv || !tag || !encrypted) throw new Error("Secret A2F invalide.");
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    encryptionKey(),
    Buffer.from(iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(tag, "base64"));
  return Buffer.concat([
    decipher.update(Buffer.from(encrypted, "base64")),
    decipher.final()
  ]).toString("utf8");
}

export function createTotpSecret() {
  return authenticator.generateSecret();
}

export async function createQrCode(secret, email) {
  const uri = authenticator.keyuri(email, "GowlSec", secret);
  return QRCode.toDataURL(uri, { width: 240, margin: 1 });
}

export function verifyTotp(code, secret) {
  const token = String(code || "").replace(/\s/g, "");
  if (!/^\d{6}$/.test(token)) return false;
  const instance = authenticator.clone();
  instance.options = { window: 1 };
  return instance.check(token, secret);
}

export function hashRecoveryCode(code) {
  return crypto.createHash("sha256")
    .update(String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, ""))
    .digest("hex");
}

export function createRecoveryCodes(count = 8) {
  return Array.from({ length: count }, () => {
    const raw = crypto.randomBytes(6).toString("hex").toUpperCase();
    return `GOWL-${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}`;
  });
}
