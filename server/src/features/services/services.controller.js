import Service from "./services.model.js";
import cloudinary from "../../config/cloudinary.js";

// @desc    Get all services (public)
// @route   GET /api/services
// @access  Public
export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    res.json(services);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single service (public)
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    next(error);
  }
};

// @desc    Create service (admin)
// @route   POST /api/services
// @access  Private
export const createService = async (req, res, next) => {
  try {
    const { name, description, startingPrice, order } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Service image is required" });
    }

    const service = await Service.create({
      name,
      description,
      startingPrice,
      order: order || 0,
      image: {
        url: req.file.path,
        publicId: req.file.filename,
      },
    });

    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

// @desc    Update service (admin)
// @route   PUT /api/services/:id
// @access  Private
export const updateService = async (req, res, next) => {
  try {
    const { name, description, startingPrice, order } = req.body;

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    service.name = name || service.name;
    service.description = description || service.description;
    service.startingPrice = startingPrice || service.startingPrice;
    service.order = order !== undefined ? order : service.order;

    // If new image uploaded, delete old and replace
    if (req.file) {
      await cloudinary.uploader.destroy(service.image.publicId);
      service.image = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    const updated = await service.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete service (admin)
// @route   DELETE /api/services/:id
// @access  Private
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await cloudinary.uploader.destroy(service.image.publicId);
    await Service.findByIdAndDelete(req.params.id);

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
};
