const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");

const LOCAL_PORT = dotenv.config().parsed.REACT_APP_LOCAL_PORT;
const PROD_PORT = process.env.REACT_APP_PROD_HOST;

const { Server } = require("socket.io");
app.use(
  cors({
    origin: LOCAL_PORT,
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
    origin: LOCAL_PORT,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

let waitingUsers = [];
let allSocketIds = [];

let isInterestChecked = false;
let interestsList = [];

let interestQueues = {};

io.on("connection", (socket) => {
  console.log(`New User : ${socket.id}`);
  allSocketIds.push(socket.id);

  socket.on("request_total_online_user", () => {
    io.emit("total_online_user", { total_user: allSocketIds });
  });

  socket.emit("get_interests", {
    isInterestChecked: socket.isInterestChecked,
    interestsList: socket.interestsList,
  });

  socket.on("check_interests", (data) => {
    socket.isInterestChecked = data.isChecked;

    console.log("Interests checked :", socket.isInterestChecked, socket.id);
  });
  socket.on("interests_list", (data) => {
    socket.interestsList = data.interestsList;
  });

  const matchRandom = (socket) => {
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
        interest: "",
      });
      io.emit("finding_user", false);

      // Handle message sending
      const handleMessage = (data) => {
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
        isInterestChecked = false;
        interestsList = [];

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

      user1.on("disconnect_chat", handleDisconnect);
      user2.on("disconnect_chat", handleDisconnect);
    } else {
      io.to(socket.id).emit("finding_user", true);
      console.log("waiting for random user");
    }
  };
  const matchByInterest = (socket) => {
    let matched = false;

    for (const interest of socket.interestsList) {
      if (interestQueues[interest].length >= 2) {
        const user1 = interestQueues[interest].shift();
        const user2 = interestQueues[interest].shift();

        const room = `interest-room-${interest}-${user1.id}-${user2.id}`;
        user1.join(room);
        user2.join(room);
        console.log(`Matched ${user1.id} with ${user2.id} in ${room}`);

        io.to(room).emit("match", {
          message: "You are matched!",
          room,
          conn: true,
          interest: interest,
        });

        io.emit("finding_user", false);

        const handleMessage = (data) => {
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

        const handleDisconnect = () => {
          console.log(`User ${socket.id} disconnected`);
          io.to(room).emit("user_disconnected", {
            author: socket.id,
            conn: false,
            disc: true,
          });

          // Remove the socket from all interest queues

          for (const interest in interestQueues) {
            interestQueues[interest] = interestQueues[interest].filter(
              (userSocket) => userSocket.id !== socket.id
            );

            // Optionally, clean up empty interest queues
            if (interestQueues[interest].length === 0) {
              delete interestQueues[interest];
            }
          }

          user1.leave(room);
          user2.leave(room);

          socket.on("request_total_online_user", () => {
            io.emit("total_online_user", { total_user: allSocketIds });
          });
        };

        user1.on("disconnect_chat", handleDisconnect);
        user2.on("disconnect_chat", handleDisconnect);

        matched = true;
        break;
      }
    }
    if (!matched) {
      io.to(socket.id).emit("finding_user", true);
      console.log(
        `No matches found for ${socket.id} based on interests. Waiting...`
      );
    }
  };

  socket.on("find_chat", () => {
    io.to(socket.id).emit("disconnect_message", {
      disconMessage: false,
    });

    if (
      socket.isInterestChecked &&
      socket.interestsList &&
      socket.interestsList.some((interest) => interest.trim() !== "")
    ) {
      if (socket.isInterestChecked) {
        socket.interestsList.forEach((interest) => {
          if (!interestQueues[interest]) {
            interestQueues[interest] = [];
          }
          interestQueues[interest].push(socket);
        });
      }

      matchByInterest(socket);
    } else {
      matchRandom(socket);
    }
  });

  socket.on("disconnect", () => {
    isInterestChecked = false;
    interestsList = [];
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
