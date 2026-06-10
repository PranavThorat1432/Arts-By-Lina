import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    eventType: {
      type: String,
      required: [true, "Event type is required"],
      enum: [
        "Bridal",
        "Engagement",
        "Festival",
        "Party",
        "Corporate",
        "Other",
      ],
    },
    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    additionalMessage: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Completed", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
