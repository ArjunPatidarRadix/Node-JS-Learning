const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

let count = 0;

// server (emit) -> client (receive) - countUpdated
// client (emit) -> server (receive) - increment

io.on("connection", (socket) => {
  console.log("New  websocket connection");

  socket.emit("message", "Welcome");
  socket.broadcast.emit("message", "A new user has joined");

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });

  //   socket.emit("countUpdated", count);
  //   socket.on("increment", () => {
  //     console.log("server incremented");
  //     count++;
  //     // socket.emit("countUpdated", count); // It will update to the only one client
  //     io.emit("countUpdated", count); // It will update to every single client
  //   });
});

server.listen(port, () => {
  console.log("Server is up on port " + port);
});
