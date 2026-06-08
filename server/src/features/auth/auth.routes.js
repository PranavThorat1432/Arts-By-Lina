import express from "express";
import {
  login,
  getMe,
  changePassword,
  forgotPassword,
  resetPassword,
} from "./auth.controller.js";
import protect from "../../middleware/auth.middleware.js";
import { authLimiter } from "../../middleware/rateLimit.middleware.js";
import {
  loginValidation,
  changePasswordValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "../../middleware/validation.middleware.js";

const router = express.Router();

router.post("/login", authLimiter, loginValidation, login);
router.get("/me", protect, getMe);
router.put("/change-password", protect, changePasswordValidation, changePassword);
router.post("/forgot-password", authLimiter, forgotPasswordValidation, forgotPassword);
router.put("/reset-password/:token", resetPasswordValidation, resetPassword);

export default router;
