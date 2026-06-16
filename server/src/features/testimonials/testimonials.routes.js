import express from "express";
import {
  createTestimonial,
  getApprovedTestimonials,
  getAllTestimonials,
  updateTestimonialStatus,
  deleteTestimonial,
  getTestimonialStats,
} from "./testimonials.controller.js";
import protect from "../../middleware/auth.middleware.js";
import { formLimiter } from "../../middleware/rateLimit.middleware.js";
import {
  createTestimonialValidation,
  updateTestimonialStatusValidation,
} from "../../middleware/validation.middleware.js";

const router = express.Router();

// Public
router.post("/", formLimiter, createTestimonialValidation, createTestimonial);
router.get("/", getApprovedTestimonials);

// Private (admin)
router.get("/stats", protect, getTestimonialStats);
router.get("/all", protect, getAllTestimonials);
router.put("/:id", protect, updateTestimonialStatusValidation, updateTestimonialStatus);
router.delete("/:id", protect, deleteTestimonial);

export default router;
