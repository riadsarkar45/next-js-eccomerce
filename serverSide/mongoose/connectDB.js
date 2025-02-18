const mongoose = require("mongoose");

const uri = "mongodb+srv://next-JS:VFJXypJ5J6Oc5kVp@cluster0.lu7tyzl.mongodb.net/social?retryWrites=true&w=majority&appName=Cluster0";

let isConnected = false; // Prevent multiple connections

const connectMongoose = async () => {
  if (isConnected) return console.log("⚡ Already connected to MongoDB");

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Ensure stable connection
    });

    isConnected = true;
    console.log("✅ Mongoose Connected");
  } catch (error) {
    console.error("❌ Mongoose Connection Failed:", error.message);
    process.exit(1); // Exit process if connection fails
  }
};

// Handle MongoDB connection errors after initial connection
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Error:", err.message);
});

// Handle disconnection events
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB Disconnected. Reconnecting...");
  isConnected = false;
});

module.exports = { mongoose, connectMongoose };
