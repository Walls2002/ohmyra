const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let waitingUsers = [];

io.on("connection", (socket) => {
  console.log(`New User : ${socket.id}`);

  socket.on("find_chat", () => {
    console.log("conn");

    if (!waitingUsers.includes(socket)) {
      waitingUsers.push(socket);
    }

    if (waitingUsers.length >= 2) {
      const user1 = waitingUsers.shift();
      const user2 = waitingUsers.shift();

      const room = `room-${user1.id}-${user2.id}`;
      user1.join(room);
      user2.join(room);
      console.log(`Matched ${user1.id} with ${user2.id} in ${room}`);

      io.to(room).emit("match", {
        message: "You are matched!",
        room,
        conn: true,
      });

      // Handle message sending
      const handleMessage = (data) => {
        console.log(`User ${socket.id} sent:`, data);
        io.to(room).emit("receive_message", { author: socket.id, ...data });
      };

      user1.on("send_message", handleMessage);
      user2.on("send_message", handleMessage);

      // Handle disconnection
      const handleDisconnect = () => {
        console.log(`User ${socket.id} disconnected`);
        io.to(room).emit("user_disconnected", {
          author: socket.id,
          conn: false,
        });
        user1.disconnect();
        user2.disconnect();
      };

      user1.on("disconnect", handleDisconnect);
      user2.on("disconnect", handleDisconnect);
    } else {
      // io.emit("finding_user", true);
      console.log("waiting for user");
    }
  });

  // socket.on("disconnect", () => {
  //   io.emit("user_disconnected", false);
  //   console.log("User Disconnected", socket.id);
  //   waitingUsers = waitingUsers.filter((user) => user.id !== socket.id);
  // });
});

server.listen(3001, () => console.log("Server running"));
