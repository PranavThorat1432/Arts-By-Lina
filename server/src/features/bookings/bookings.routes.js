import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  getBookingStats,
} from "./bookings.controller.js";
import protect from "../../middleware/auth.middleware.js";
import { formLimiter } from "../../middleware/rateLimit.middleware.js";
import {
  createBookingValidation,
  updateBookingStatusValidation,
} from "../../middleware/validation.middleware.js";

const router = express.Router();

// Public
router.post("/", formLimiter, createBookingValidation, createBooking);

// Private (admin)
router.get("/stats", protect, getBookingStats);
router.get("/", protect, getAllBookings);
router.get("/:id", protect, getBookingById);
router.put("/:id", protect, updateBookingStatusValidation, updateBookingStatus);
router.delete("/:id", protect, deleteBooking);

export default router;
