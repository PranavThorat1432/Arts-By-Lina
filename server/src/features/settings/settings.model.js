import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      default: "Arts by Lina",
    },
    tagline: {
      type: String,
      default: "Crafting Beautiful Mehndi Memories",
    },
    aboutContent: {
      type: String,
      default: "",
    },
    contactEmail: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    whatsappNumber: {
      type: String,
      default: "",
    },
    instagramURL: {
      type: String,
      default: "",
    },
    serviceAreaText: {
      type: String,
      default: "Jalgaon City and Nearby Areas",
    },
  },
  { timestamps: true }
);

const Settings = mongoose.model("Settings", settingsSchema);
export default Settings;
