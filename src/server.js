// server.js
import { createServer } from "http";
import app from "./app";
import { Server } from "socket.io";

// Create an HTTP server
const PORT = process.env.PORT || 5000;
const server = createServer(app);

// Initialize WebSocket
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Store active users for WebSocket
let activeUsers = [];

// WebSocket logic
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Handle user registration
  socket.on("register", (username) => {
    if (!activeUsers.includes(username)) {
      activeUsers.push(username);
    }
    io.emit("userList", activeUsers);
  });

  // Handle messages
  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    activeUsers = activeUsers.filter((user) => user !== socket.username);
    io.emit("userList", activeUsers);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
