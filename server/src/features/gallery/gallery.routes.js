import express from "express";
import {
  getAllGallery,
  getFeaturedGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGalleryImage,
  deleteGallery,
} from "./gallery.controller.js";
import protect from "../../middleware/auth.middleware.js";
import { uploadGalleryImages } from "../../middleware/upload.middleware.js";
import { createGalleryValidation } from "../../middleware/validation.middleware.js";

const router = express.Router();

// Public
router.get("/", getAllGallery);
router.get("/featured", getFeaturedGallery);
router.get("/:id", getGalleryById);

// Private (admin)
router.post("/", protect, uploadGalleryImages, createGalleryValidation, createGallery);
router.put("/:id", protect, uploadGalleryImages, createGalleryValidation, updateGallery);
router.delete("/:id/image/:publicId(*)", protect, deleteGalleryImage);
router.delete("/:id", protect, deleteGallery);

export default router;
