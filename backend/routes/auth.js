import express from "express";

import {
  register,
  login,
  logout,
  refreshToken,
  completeTwoFactorLogin,
  getTwoFactorStatus,
  setupTwoFactor,
  enableTwoFactor,
  disableTwoFactor,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

import { verifyEmail } from "../controllers/emailVerificationController.js";
import { resendVerification } from "../controllers/resendVerificationController.js";
import { forgotPassword } from "../controllers/forgotPasswordController.js";
import { resetPassword } from "../controllers/resetPasswordController.js";

import {
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter,
  twoFactorLimiter,
} from "../middleware/rateLimiter.js";

import { verifyTurnstile } from "../middleware/turnstile.js";

import {
  discordLogin,
  discordCallback,
  discordSession,
} from "../controllers/discordAuthController.js";

const router = express.Router();

router.post(
  "/register",
  registerLimiter,
  verifyTurnstile,
  register
);

router.post(
  "/login",
  loginLimiter,
  login
);

router.post("/2fa/login", twoFactorLimiter, completeTwoFactorLogin);
router.get("/2fa/status", authMiddleware, getTwoFactorStatus);
router.post("/2fa/setup", authMiddleware, twoFactorLimiter, setupTwoFactor);
router.post("/2fa/enable", authMiddleware, twoFactorLimiter, enableTwoFactor);
router.post("/2fa/disable", authMiddleware, twoFactorLimiter, disableTwoFactor);

router.post(
  "/logout",
  logout
);

router.post(
  "/refresh",
  refreshToken
);

router.get(
  "/verify-email",
  verifyEmail
);

router.post(
  "/resend-verification",
  forgotPasswordLimiter,
  resendVerification
);

router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  forgotPassword
);

router.post(
  "/reset-password",
  resetPassword
);

router.get("/discord", discordLogin);

router.get(
  "/discord/callback",
  discordCallback
);

router.post(
  "/discord/session",
  discordSession
);

export default router;
