const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const connectMongoose = require("./moongoose/connectMongoose");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins for development. Restrict in production!
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Single Route Definition
app.get("/", (req, res) => {
  res.send("Welcome to the Next.js project!");
});

// WebSocket 
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust this for production security
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`New WebSocket connection: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`WebSocket disconnected: ${socket.id}`);
  });
});

// Start Server
const startServer = async () => {
  try {
    await connectMongoose(); // Connect Mongoose
    console.log("Mongoose connected");

    const PORT = process.env.PORT || 3001;
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
