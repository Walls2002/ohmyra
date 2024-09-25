import React, { useEffect, useState } from "react";
import { Container, InputGroup, Form, Button } from "react-bootstrap";
import Title from "../components/Title";

function ChatBox({ socket }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [connect, setConnect] = useState(false);

  const dateToday = new Date();
  const inputDiv = {
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)", // Example transformation
    borderRadius: "10px",
    textAlign: "center",
    padding: "10px",
    bottom: "40px",
    backgroundColor: "#585d63",
    display: "flex",
    justifyContent: "space-between",
  };
  const findChat = () => {
    socket.connect();
    socket.emit("find_chat");
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const messageData = {
        author: socket.id,
        message,
        date: dateToday.toUTCString(),
      };
      socket.emit("send_message", messageData); // Emit message
      setMessage(""); // Clear input
    }
  };
  const disconnectChat = () => {
    socket.disconnect();
    setConnect(false);
  };

  useEffect(() => {
    socket.on("match", (data) => {
      console.log(data.message, " ", data.room);
      setConnect(data.conn);
    });

    const handleMessageReceive = (data) => {
      setMessageList((list) => [...list, data]);
    };
    const handleDisconnect = (data) => {
      setConnect(data.conn);
      console.log("DISCONNECTED", connect);
    };

    socket.on("receive_message", handleMessageReceive); // Listen for incoming messages
    socket.on("user_disconnected", handleDisconnect);

    return () => {
      socket.off("receive_message", handleMessageReceive); // Cleanup listener
      socket.off("user_disconnected", handleDisconnect);
    };
  }, [connect, socket]);

  return (
    <Container>
      <Title title={"Chat | Ohmyra"} />

      <div className="py-5">
        <div
          className="p-5 mb-4"
          style={{
            backgroundColor: "lightgray",
            overflowY: "auto",
            borderRadius: "20px",
          }}
        >
          {messageList.map((msg, index) => {
            let currentAuthor = msg.author;
            return (
              <div style={{ display: "flex" }} key={index}>
                <p
                  style={{
                    backgroundColor: "#585d63",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  {" "}
                  <strong>{msg.author}:</strong> <span>{msg.message}</span>
                  <span style={{ fontSize: "small", color: "gray" }}>
                    {" "}
                    - {msg.date}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
        <Container style={inputDiv}>
          <input
            style={{
              width: "auto",
              outline: "none",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "transparent",
              paddingLeft: "20px",
              color: "#f5f5f5",
              minWidth: "50%",
            }}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            type="text"
            disabled={!connect}
            placeholder="Say Something.."
          />
          {connect ? (
            <span>
              <Button onClick={disconnectChat} variant="outline-danger">
                End Chat
              </Button>{" "}
              <Button onClick={sendMessage} variant="light">
                Send
              </Button>{" "}
            </span>
          ) : (
            <Button onClick={findChat} variant="dark">
              Chat Someone
            </Button>
          )}
        </Container>
      </div>
    </Container>
  );
}

export default ChatBox;
