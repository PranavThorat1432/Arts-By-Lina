import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Bridal", "Arabic", "Engagement", "Festival", "Minimal"],
    },
    description: {
      type: String,
      trim: true,
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    coverImage: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;
