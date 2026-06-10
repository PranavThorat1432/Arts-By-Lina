import Booking from "./bookings.model.js";
import { sendBookingNotification } from "../../utils/sendEmail.js";

const mapEventType = (type) => {
  const allowed = ["Bridal", "Engagement", "Festival", "Party", "Corporate", "Other"];
  if (allowed.includes(type)) return type;
  
  const lower = (type || "").toLowerCase();
  if (lower.includes("bridal")) return "Bridal";
  if (lower.includes("engagement")) return "Engagement";
  if (lower.includes("festival")) return "Festival";
  if (lower.includes("party")) return "Party";
  if (lower.includes("corporate")) return "Corporate";
  
  return "Other";
};

// @desc    Create booking (public)
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res, next) => {
  try {
    const {
      fullName,
      mobileNumber,
      email,
      eventType,
      eventDate,
      location,
      additionalMessage,
    } = req.body;

    const finalEventType = mapEventType(eventType);
    let finalMessage = additionalMessage;

    // If the raw eventType is not a standard enum value (e.g. it is a custom service name),
    // prefix it to the message so the admin can see exactly what they selected
    const allowed = ["Bridal", "Engagement", "Festival", "Party", "Corporate", "Other"];
    if (eventType && !allowed.includes(eventType)) {
      const servicePrefix = `[Service: ${eventType}]`;
      if (!additionalMessage?.startsWith(servicePrefix)) {
        finalMessage = `${servicePrefix} ${additionalMessage || ""}`.trim();
      }
    }

    const booking = await Booking.create({
      fullName,
      mobileNumber,
      email,
      eventType: finalEventType,
      eventDate,
      location,
      additionalMessage: finalMessage,
    });

    // Send email notification to admin (non-blocking)
    sendBookingNotification(booking).catch((err) =>
      console.error("Booking email error:", err)
    );

    res.status(201).json({
      message: "Booking request submitted successfully! We will contact you soon.",
      booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings (admin)
// @route   GET /api/bookings
// @access  Private
export const getAllBookings = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking (admin)
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status (admin)
// @route   PUT /api/bookings/:id
// @access  Private
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    const updated = await booking.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete booking (admin)
// @route   DELETE /api/bookings/:id
// @access  Private
export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking stats (admin dashboard)
// @route   GET /api/bookings/stats
// @access  Private
export const getBookingStats = async (req, res, next) => {
  try {
    const total = await Booking.countDocuments();
    const pending = await Booking.countDocuments({ status: "Pending" });
    const accepted = await Booking.countDocuments({ status: "Accepted" });
    const completed = await Booking.countDocuments({ status: "Completed" });
    const rejected = await Booking.countDocuments({ status: "Rejected" });

    res.json({ total, pending, accepted, completed, rejected });
  } catch (error) {
    next(error);
  }
};
