import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
  getContactStats,
} from "./contacts.controller.js";
import protect from "../../middleware/auth.middleware.js";
import { formLimiter } from "../../middleware/rateLimit.middleware.js";
import { createContactValidation } from "../../middleware/validation.middleware.js";

const router = express.Router();

// Public
router.post("/", formLimiter, createContactValidation, createContact);

// Private (admin)
router.get("/stats", protect, getContactStats);
router.get("/", protect, getAllContacts);
router.get("/:id", protect, getContactById);
router.delete("/:id", protect, deleteContact);

export default router;
