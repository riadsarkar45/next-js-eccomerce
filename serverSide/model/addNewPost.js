const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number, // Changed to Number instead of ObjectId
      required: true,
    },
    discount: {
      type: Number, // Changed to Number for percentage or value
    },
    stock: {
      type: Number, // Changed to Number for quantity
    },
    description: {
      type: String,
    },
    images: {
      type: Array, // Store image URLs or image metadata here
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Post = mongoose.model("products", postSchema);

module.exports = Post;
