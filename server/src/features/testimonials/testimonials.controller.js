import Testimonial from "./testimonials.model.js";

// @desc    Submit testimonial (public)
// @route   POST /api/testimonials
// @access  Public
export const createTestimonial = async (req, res, next) => {
  try {
    const { customerName, rating, reviewText } = req.body;

    const testimonial = await Testimonial.create({
      customerName,
      rating,
      reviewText,
    });

    res.status(201).json({
      message: "Thank you for your review! It will appear after approval.",
      testimonial,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get approved testimonials (public)
// @route   GET /api/testimonials
// @access  Public
export const getApprovedTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ status: "Approved" }).sort({
      createdAt: -1,
    });
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all testimonials (admin)
// @route   GET /api/testimonials/all
// @access  Private
export const getAllTestimonials = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
};

// @desc    Update testimonial status (admin)
// @route   PUT /api/testimonials/:id
// @access  Private
export const updateTestimonialStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    testimonial.status = status;
    const updated = await testimonial.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete testimonial (admin)
// @route   DELETE /api/testimonials/:id
// @access  Private
export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get testimonial stats (admin dashboard)
// @route   GET /api/testimonials/stats
// @access  Private
export const getTestimonialStats = async (req, res, next) => {
  try {
    const total = await Testimonial.countDocuments();
    const pending = await Testimonial.countDocuments({ status: "Pending" });
    const approved = await Testimonial.countDocuments({ status: "Approved" });
    res.json({ total, pending, approved });
  } catch (error) {
    next(error);
  }
};
