import React, { useEffect, useState } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";
import Title from "../components/Title";

function ChatBox({ socket, room, username }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const dateToday = new Date();
  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: username,
        message: message,
        date: dateToday.toUTCString(),
      };
      await socket.emit("send_message", messageData);
      // Add the message to the messageList for local display
      setMessageList((list) => [...list, messageData]);

      // Clear the input after sending
      setMessage("");
    }
  };

  useEffect(() => {
    const handleMessageReceive = (data) => {
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive_message", handleMessageReceive);
    // Cleanup function to remove the event listener
    return () => {
      socket.off("receive_message", handleMessageReceive);
    };
  }, [socket]);
  return (
    <Container>
      <Title title={"Chat | Ohmyra"} />
      <div>
        <p>Live Chat</p>
      </div>
      <div>
        <div style={{ height: "100px", backgroundColor: "lightgray" }}>
          {messageList.map((msg, index) => (
            <div key={index}>
              <strong>{msg.author}:</strong> {/* Display the author's name */}
              <span> {msg.message}</span> {/* Display the message */}
              <span style={{ fontSize: "small", color: "gray" }}>
                {" "}
                - {msg.date}
              </span>{" "}
              {/* Display the date */}
            </div>
          ))}
        </div>
        <input
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          type="text"
          placeholder="Say Something.."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </Container>
  );
}

export default ChatBox;
