const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

const Categories = mongoose.model("categories", postSchema);

module.exports = Categories;
