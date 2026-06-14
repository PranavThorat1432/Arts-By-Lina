import express from "express";
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "./services.controller.js";
import protect from "../../middleware/auth.middleware.js";
import { uploadServiceImage } from "../../middleware/upload.middleware.js";
import { createServiceValidation } from "../../middleware/validation.middleware.js";

const router = express.Router();

// Public
router.get("/", getAllServices);
router.get("/:id", getServiceById);

// Private (admin)
router.post("/", protect, uploadServiceImage, createServiceValidation, createService);
router.put("/:id", protect, uploadServiceImage, createServiceValidation, updateService);
router.delete("/:id", protect, deleteService);

export default router;
