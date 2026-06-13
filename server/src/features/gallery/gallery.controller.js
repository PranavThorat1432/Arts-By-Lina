import Gallery from "./gallery.model.js";
import cloudinary from "../../config/cloudinary.js";

// @desc    Get all gallery items (public)
// @route   GET /api/gallery
// @access  Public
export const getAllGallery = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category && category !== "All" ? { category } : {};
    const gallery = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json(gallery);
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured gallery items (public)
// @route   GET /api/gallery/featured
// @access  Public
export const getFeaturedGallery = async (req, res, next) => {
  try {
    const gallery = await Gallery.find({ isFeatured: true }).limit(8).sort({ createdAt: -1 });
    res.json(gallery);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single gallery item (public)
// @route   GET /api/gallery/:id
// @access  Public
export const getGalleryById = async (req, res, next) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery item not found" });
    }
    res.json(gallery);
  } catch (error) {
    next(error);
  }
};

// @desc    Create gallery item (admin)
// @route   POST /api/gallery
// @access  Private
export const createGallery = async (req, res, next) => {
  try {
    const { title, category, description, isFeatured } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const images = req.files.map((file) => ({
      url: file.path,
      publicId: file.filename,
    }));

    const coverImage = images[0];

    const gallery = await Gallery.create({
      title,
      category,
      description,
      images,
      coverImage,
      isFeatured: isFeatured === "true",
    });

    res.status(201).json(gallery);
  } catch (error) {
    next(error);
  }
};

// @desc    Update gallery item (admin)
// @route   PUT /api/gallery/:id
// @access  Private
export const updateGallery = async (req, res, next) => {
  try {
    const { title, category, description, isFeatured } = req.body;

    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    gallery.title = title || gallery.title;
    gallery.category = category || gallery.category;
    gallery.description = description || gallery.description;
    gallery.isFeatured = isFeatured !== undefined ? isFeatured === "true" : gallery.isFeatured;

    // If new images uploaded, add them
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => ({
        url: file.path,
        publicId: file.filename,
      }));
      gallery.images = [...gallery.images, ...newImages];
      gallery.coverImage = gallery.images[0];
    }

    const updated = await gallery.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete single image from gallery item (admin)
// @route   DELETE /api/gallery/:id/image/:publicId
// @access  Private
export const deleteGalleryImage = async (req, res, next) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    const publicId = decodeURIComponent(req.params.publicId);

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Remove from images array
    gallery.images = gallery.images.filter((img) => img.publicId !== publicId);

    if (gallery.images.length === 0) {
      await Gallery.findByIdAndDelete(req.params.id);
      return res.json({ message: "Gallery item deleted (no images remaining)" });
    }

    gallery.coverImage = gallery.images[0];
    await gallery.save();

    res.json(gallery);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete entire gallery item (admin)
// @route   DELETE /api/gallery/:id
// @access  Private
export const deleteGallery = async (req, res, next) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    // Delete all images from Cloudinary
    for (const image of gallery.images) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    next(error);
  }
};
