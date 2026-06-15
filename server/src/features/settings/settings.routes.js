import express from "express";
import { getSettings, updateSettings } from "./settings.controller.js";
import protect from "../../middleware/auth.middleware.js";
import { updateSettingsValidation } from "../../middleware/validation.middleware.js";

const router = express.Router();

// Public
router.get("/", getSettings);

// Private (admin)
router.put("/", protect, updateSettingsValidation, updateSettings);

export default router;
