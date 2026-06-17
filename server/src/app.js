import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import "dotenv/config";

import { generalLimiter } from "./middleware/rateLimit.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

import authRoutes from "./features/auth/auth.routes.js";
import galleryRoutes from "./features/gallery/gallery.routes.js";
import servicesRoutes from "./features/services/services.routes.js";
import bookingsRoutes from "./features/bookings/bookings.routes.js";
import contactsRoutes from "./features/contacts/contacts.routes.js";
import testimonialsRoutes from "./features/testimonials/testimonials.routes.js";
import settingsRoutes from "./features/settings/settings.routes.js";

const app = express();

// Security Headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Prevent NoSQL Query Injection
app.use(mongoSanitize());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// General rate limiter
app.use(generalLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/settings", settingsRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Arts by Lina API is running");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use(errorHandler);

export default app;
