const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true, // Removes leading and trailing spaces
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensures no duplicate emails
            lowercase: true, // Converts email to lowercase
        },
        role: {
            type: String,
            required: true,
        },
        uid: {
            type: String,
            required: true,
            unique: true, // Ensures UID is unique
        }
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

// ✅ Corrected model name (use singular and capitalized name convention)
const UserRegistration = mongoose.model("User", userSchema);

module.exports = UserRegistration;
