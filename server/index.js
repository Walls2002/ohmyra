const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

const LOCAL_PORT = process.env.REACT_APP_LOCAL_PORT;
const PROD_PORT = process.env.REACT_APP_PROD_HOST;
console.log(PROD_PORT);

const { Server } = require("socket.io");
app.use(
  cors({
    origin: PROD_PORT,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is running");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: PROD_PORT,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

let waitingUsers = [];
let allSocketIds = [];

io.on("connection", (socket) => {
  console.log(`New User : ${socket.id}`);
  allSocketIds.push(socket.id);
  socket.on("request_total_online_user", () => {
    io.emit("total_online_user", { total_user: allSocketIds });
  });

  socket.on("find_chat", () => {
    io.to(socket.id).emit("disconnect_message", {
      disconMessage: false,
    });
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
      io.emit("finding_user", false);

      // Handle message sending
      const handleMessage = (data) => {
        // console.log(`User ${socket.id} sent:`, data);
        io.to(room).emit("receive_message", { author: socket.id, ...data });
      };

      user1.on("send_message", handleMessage);
      user2.on("send_message", handleMessage);

      // Handle typing event
      user1.on("typing", (data) => {
        user2.emit("typing", { author: user1.id });
      });

      user2.on("typing", (data) => {
        user1.emit("typing", { author: user2.id });
      });

      // Handle disconnection
      const handleDisconnect = () => {
        console.log(`User ${socket.id} disconnected`);
        io.to(room).emit("user_disconnected", {
          author: socket.id,
          conn: false,
          disc: true,
        });
        user1.disconnect();
        user2.disconnect();
        waitingUsers = waitingUsers.filter((user) => user.id !== user1.id);
        waitingUsers = waitingUsers.filter((user) => user.id !== user2.id);
        allSocketIds = allSocketIds.filter((user) => user !== user1.id);
        allSocketIds = allSocketIds.filter((user) => user !== user2.id);

        socket.on("request_total_online_user", () => {
          io.emit("total_online_user", { total_user: allSocketIds });
        });
      };

      user1.on("disconnect", handleDisconnect);
      user2.on("disconnect", handleDisconnect);
    } else {
      io.to(socket.id).emit("finding_user", true);
      console.log("waiting for user");
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);

    waitingUsers = waitingUsers.filter((user) => user.id !== socket.id);
    allSocketIds = allSocketIds.filter((user) => user !== socket.id);

    socket.on("request_total_online_user", () => {
      io.emit("total_online_user", { total_user: allSocketIds });
    });

    console.log("WAITING USER:", waitingUsers);
  });
});

server.listen(3001, () => console.log("Server running"));
