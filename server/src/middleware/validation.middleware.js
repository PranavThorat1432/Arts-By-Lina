import { body, param, query, validationResult } from "express-validator";

// Middleware to handle validation results and return errors if they exist
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return a clean error message representing the first validation failure
    return res.status(400).json({
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};

// --- AUTHENTICATION RULES ---

export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  handleValidationErrors,
];

export const changePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .trim()
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters"),
  handleValidationErrors,
];

export const forgotPasswordValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  handleValidationErrors,
];

export const resetPasswordValidation = [
  param("token")
    .trim()
    .notEmpty()
    .withMessage("Reset token is missing or invalid"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  handleValidationErrors,
];

// --- BOOKINGS RULES ---

export const createBookingValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ max: 100 })
    .withMessage("Name is too long"),
  body("mobileNumber")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required")
    .matches(/^\+?[0-9\s\-()]{7,20}$/)
    .withMessage("Please enter a valid mobile number"),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("eventType")
    .trim()
    .notEmpty()
    .withMessage("Event type is required"),
  body("eventDate")
    .notEmpty()
    .withMessage("Event date is required")
    .isISO8601()
    .withMessage("Please select a valid event date")
    .toDate(),
  body("location")
    .trim()
    .notEmpty()
    .withMessage("Event location is required"),
  body("additionalMessage")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Message is too long"),
  handleValidationErrors,
];

export const updateBookingStatusValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid booking ID format"),
  body("status")
    .isIn(["Pending", "Accepted", "Completed", "Rejected"])
    .withMessage("Invalid booking status value"),
  handleValidationErrors,
];

// --- CONTACTS RULES ---

export const createContactValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name is too long"),
  body("phone")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .matches(/^\+?[0-9\s\-()]{7,20}$/)
    .withMessage("Please enter a valid phone number"),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 2000 })
    .withMessage("Message is too long"),
  handleValidationErrors,
];

// --- GALLERY RULES ---

export const createGalleryValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),
  body("category")
    .isIn(["Bridal", "Arabic", "Engagement", "Festival", "Minimal"])
    .withMessage("Invalid category selected"),
  body("description")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 500 }),
  body("isFeatured")
    .optional({ nullable: true, checkFalsy: true })
    .trim(),
  handleValidationErrors,
];

// --- SERVICES RULES ---

export const createServiceValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Service name is required"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Service description is required"),
  body("startingPrice")
    .notEmpty()
    .withMessage("Starting price is required")
    .isFloat({ min: 0 })
    .withMessage("Starting price must be a non-negative number")
    .toFloat(),
  body("order")
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 0 })
    .withMessage("Order must be a positive integer")
    .toInt(),
  handleValidationErrors,
];

// --- TESTIMONIALS RULES ---

export const createTestimonialValidation = [
  body("customerName")
    .trim()
    .notEmpty()
    .withMessage("Your name is required"),
  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5")
    .toInt(),
  body("reviewText")
    .trim()
    .notEmpty()
    .withMessage("Review comment is required")
    .isLength({ max: 500 })
    .withMessage("Review text must not exceed 500 characters"),
  handleValidationErrors,
];

export const updateTestimonialStatusValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid testimonial ID format"),
  body("status")
    .isIn(["Pending", "Approved", "Rejected"])
    .withMessage("Invalid testimonial status value"),
  handleValidationErrors,
];

// --- SETTINGS RULES ---

export const updateSettingsValidation = [
  body("businessName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Business name cannot be empty"),
  body("tagline")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Tagline cannot be empty"),
  body("aboutContent")
    .optional()
    .trim(),
  body("contactEmail")
    .optional({ nullable: true, checkFalsy: true })
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("phoneNumber")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .matches(/^\+?[0-9\s\-()]{7,20}$/)
    .withMessage("Please enter a valid phone number"),
  body("whatsappNumber")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .matches(/^[0-9]{7,15}$/)
    .withMessage("WhatsApp number must be digits only (with country code, no +)"),
  body("instagramURL")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Please enter a valid Instagram URL"),
  body("serviceAreaText")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Service area text cannot be empty"),
  handleValidationErrors,
];
