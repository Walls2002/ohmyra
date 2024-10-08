/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Container, Button, Modal, ButtonGroup } from "react-bootstrap";
import Title from "../components/Title";
import { waitMessage } from "../utils/waitMessages";

function ChatBox({ socket }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [connect, setConnect] = useState(false);
  const [show, setShow] = useState(false);
  const [firstMessage, setFirstMessage] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [findingUser, setFindingUser] = useState(false);
  const [loadMessage] = useState(waitMessage());
  const [disconnectedUser, setDisconnectedUser] = useState(false);
  const [socketIds, SetSocketIds] = useState([]);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState("");

  const dateToday = new Date();
  let socketIdArray = [];

  const inputDiv = {
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)", // Example transformation
    borderRadius: "10px",
    textAlign: "center",
    padding: "10px",
    bottom: "20px",
    backgroundColor: "#585d63",
    display: "flex",
    justifyContent: "space-between",
  };

  const findChat = () => {
    setFindingUser(true);
    setDisconnectedUser(false);
    setFirstMessage(false);
    socket.connect();
    socket.emit("find_chat");
    setMessageList([]);
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const messageData = {
        author: socket.id,
        message,
        date:
          dateToday.toDateString() +
          " " +
          dateToday.toLocaleTimeString([], {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
      };
      socket.emit("send_message", messageData); // Emit message
      setMessage(""); // Clear input
      window.scrollTo(0, document.body.scrollHeight);
    }
  };
  const disconnectChat = () => {
    socket.disconnect();
    setConnect(false);
    handleClose();
    setMessage("");
    setDisconnectedUser(true);
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit("typing"); // Emit typing event when user types
  };

  useEffect(() => {
    const handleMessageReceive = (data) => {
      setMessageList((list) => [...list, data]);
      window.scrollTo(0, document.body.scrollHeight);
      setIsTyping("");
    };
    const handleDisconnect = (data) => {
      setConnect(data.conn);
      setDisconnectedUser(data.disc);
      setMessage("");
      window.scrollTo(0, document.body.scrollHeight);
    };
    const handleTypingReceive = (data) => {
      setIsTyping("Stranger is typing...");
    };

    socket.on("connect", () => {
      if (socket.id) {
        // Add new socket.id if it's defined
        socketIdArray.push(socket.id);
        sessionStorage.setItem("socketIds", JSON.stringify(socketIdArray));
        SetSocketIds(socketIdArray);
      }
    });

    socket.on("match", (data) => {
      if (socket.id) {
        // Add new socket.id if it's defined
        socketIdArray.push(socket.id);
        sessionStorage.setItem("socketIds", JSON.stringify(socketIdArray));
        SetSocketIds(socketIdArray);
        setIsTyping("");
      }

      console.log(data.message, " ", data.room);
      setConnect(data.conn);
    });

    socket.on("receive_message", handleMessageReceive); // Listen for incoming messages
    socket.on("user_disconnected", handleDisconnect);
    socket.on("typing", handleTypingReceive);
    socket.on("finding_user", (data) => setFindingUser(data));
    socket.on("disconnect_message", (data) => {
      setDisconnectedUser(data.disconMessage);
    });

    return () => {
      socket.off("receive_message", handleMessageReceive); // Cleanup listener
      socket.off("user_disconnected", handleDisconnect);
    };
  }, [connect, socket, findingUser, socketIdArray, socketIds]);
  return (
    <Container>
      <Title title={"Chat | Ohmyra"} />

      <div className="py-5 ">
        <div
          className="p-4"
          style={{
            backgroundColor: "lightgray",

            borderRadius: "20px",
            color: "#f5f5f5",
            marginBottom: "100px",
          }}
        >
          {firstMessage ? (
            <div>
              <div className="d-flex mb-4">
                <img
                  style={{ margin: "auto" }}
                  src={`${process.env.PUBLIC_URL}/ohmyra_logo.png`}
                  alt="logo"
                  width={150}
                />
              </div>

              <div className="text-center" style={{ color: "#2b3035" }}>
                <h2 className="fw-bolder">Welcome to Ohmyra!</h2>
                <p>
                  We’re thrilled to have you here. Why not take a moment to dive
                  into a fun conversation with a stranger? Connecting with new
                  people can lead to exciting discoveries and unexpected
                  friendships. So go ahead, say hello, and let the conversation
                  begin!
                </p>
              </div>
            </div>
          ) : (
            <></>
          )}

          {findingUser ? (
            <div style={{ color: "#585d63" }}>{loadMessage}</div>
          ) : (
            <></>
          )}
          {connect ? (
            <p
              style={{ color: "#585d63", marginBottom: "40px" }}
              className="text-center"
            >
              <span style={{ color: "#198754" }} className="fw-bold">
                Success!
              </span>{" "}
              You are now connected to a random user. Dive into the conversation
              and have fun!
            </p>
          ) : (
            <></>
          )}

          {messageList.map((msg, index) =>
            socketIds.includes(msg.author) ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingLeft: "30px",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
                key={index}
              >
                <span
                  className="d-block d-md-none"
                  style={{
                    fontSize: "9px",
                    color: "gray",
                    marginRight: "10px",
                  }}
                >
                  {" "}
                  {msg.date}
                </span>
                <div
                  style={{
                    backgroundColor: "#585d63",
                    borderRadius: "20px",
                    padding: "10px 25px",
                    maxWidth: "350px",
                    margin: 0,
                  }}
                >
                  <span style={{ wordBreak: "break-word" }}>{msg.message}</span>
                  <span
                    className="d-none d-md-flex"
                    style={{ fontSize: "small", color: "gray" }}
                  >
                    {" "}
                    {msg.date}
                  </span>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  paddingRight: "30px",
                  marginBottom: "10px",
                  alignItems: "center",
                }}
                key={index}
              >
                <div
                  style={{
                    backgroundColor: "whitesmoke",
                    borderRadius: "20px",
                    padding: "10px 25px",
                    maxWidth: "350px",
                    margin: 0,
                    color: "#585d63",
                    border: "1px solid #585d63",
                  }}
                >
                  <span style={{ wordBreak: "break-word" }}>{msg.message}</span>
                  <span
                    className="d-none d-md-flex"
                    style={{ fontSize: "small", color: "gray" }}
                  >
                    {" "}
                    {msg.date}
                  </span>
                </div>
                <span
                  className=" d-block  d-md-none"
                  style={{
                    fontSize: "9px",
                    color: "gray",
                    marginLeft: "10px",
                  }}
                >
                  {" "}
                  {msg.date}
                </span>
              </div>
            )
          )}
          {disconnectedUser ? (
            <p
              style={{ color: "#585d63", marginTop: "40px" }}
              className="text-center"
            >
              The connection has been lost as one of the users has{" "}
              <span style={{ color: "#dc3545" }} className="fw-bold">
                disconnected
              </span>
              . You can start a new conversation anytime!
            </p>
          ) : (
            <></>
          )}

          {isTyping && (
            <p style={{ color: "#585d63" }} className="text-center">
              {isTyping}
            </p>
          )}
        </div>
        <Container style={inputDiv}>
          <textarea
            rows={1}
            style={{
              width: "auto",
              outline: "none",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "transparent",
              paddingLeft: "20px",
              color: "#f5f5f5",
              minWidth: "50%",
              padding: "10px",
              resize: "none",
              overflow: "hidden",
            }}
            value={message}
            onChange={handleTyping}
            type="text"
            disabled={!connect}
            placeholder="Say Something.."
          />
          {connect ? (
            <span style={{ display: "flex", alignItems: "center" }}>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>End Chat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to end the chat? This action will
                  disconnect you from the conversation.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>

                  <Button variant="danger" onClick={disconnectChat}>
                    End Chat
                  </Button>
                </Modal.Footer>
              </Modal>
              <Container>
                <ButtonGroup>
                  <Button onClick={handleShow} variant="outline-danger">
                    End Chat
                  </Button>{" "}
                  <Button onClick={sendMessage} variant="light">
                    <span>Send &#x27A4;</span>
                  </Button>{" "}
                </ButtonGroup>
                <br />
              </Container>
            </span>
          ) : (
            <>
              <Button disabled={findingUser} onClick={findChat} variant="dark">
                {findingUser ? <>Looking for Someone...</> : <>Chat Someone</>}
              </Button>
            </>
          )}
        </Container>
      </div>
    </Container>
  );
}

export default ChatBox;
