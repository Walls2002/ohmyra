/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Container, Button, Modal, ButtonGroup } from "react-bootstrap";
import Title from "../components/Title";
import { waitMessage } from "../utils/waitMessages";
import toast, { Toaster } from "react-hot-toast";
import {
  IntroMessage,
  FindingUserMessage,
  ConnectedUserMessage,
  DicsonnectedUserMessage,
  TypingUserMessage,
} from "../utils/MessageNotifs";
import ConversationList from "../utils/ConversationList";
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
  const [bothInterests, setBothInterests] = useState("");

  const [isTyping, setIsTyping] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dateToday = new Date();
  let socketIdArray = [];

  const inputDiv = {
    position: "sticky",
    left: "50%",

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
    socket.emit("disconnect_chat");
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
      setIsTyping("");
    };
    const handleTypingReceive = (data) => {
      setIsTyping("Stranger is typing...");
      setTimeout(() => {
        setIsTyping("");
      }, 4000);
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
        setShowToast(true);
        socketIdArray.push(socket.id);
        sessionStorage.setItem("socketIds", JSON.stringify(socketIdArray));
        SetSocketIds(socketIdArray);
        setIsTyping("");
        setFindingUser(false);
        setBothInterests(data.interest);
      }

      console.log("Interest: ", data.interest);
      setConnect(data.conn);
    });

    socket.on("receive_message", handleMessageReceive); // Listen for incoming messages
    socket.on("user_disconnected", handleDisconnect);
    socket.on("typing", handleTypingReceive);
    socket.on("finding_user", (data) => {
      setFindingUser(data);
    });
    socket.on("disconnect_message", (data) => {
      setDisconnectedUser(data.disconMessage);
    });

    if (showToast) {
      toast.success("Successfully connected to a stranger!", { time: 3500 });
      setShowToast(false);
    }

    return () => {
      socket.off("receive_message", handleMessageReceive); // Cleanup listener
      socket.off("user_disconnected", handleDisconnect);
      socket.on("typing", handleTypingReceive);
    };
  }, [connect, socket, findingUser, socketIdArray, socketIds]);

  return (
    <Container>
      <Title title={"Chat | Ohmyra"} />

      <div>
        <Toaster />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "90vh",
          justifyContent: "space-between",
        }}
        className="pt-5"
      >
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
            <IntroMessage socket={socket} />
          ) : findingUser ? (
            <FindingUserMessage loadMessage={loadMessage} />
          ) : connect ? (
            <ConnectedUserMessage interest={bothInterests} />
          ) : (
            <></>
          )}

          {messageList.length !== 0 && (
            <ConversationList socketIds={socketIds} messageList={messageList} />
          )}

          {isTyping && <TypingUserMessage isTyping={isTyping} />}
          {disconnectedUser ? (
            <DicsonnectedUserMessage socket={socket} />
          ) : (
            <></>
          )}
        </div>
        <Container style={inputDiv}>
          <textarea
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            rows={1}
            style={{
              width: "80vw",
              outline: "none",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "transparent",
              paddingLeft: "20px",
              color: "#f5f5f5",

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
              <Modal centered show={show} onHide={handleClose}>
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
                    End
                  </Button>{" "}
                  <Button onClick={sendMessage} variant="light">
                    <span>Send</span>
                  </Button>{" "}
                </ButtonGroup>
                <br />
              </Container>
            </span>
          ) : (
            <>
              {findingUser ? (
                <Button
                  disabled={findingUser}
                  onClick={findChat}
                  variant="danger"
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  disabled={findingUser}
                  onClick={findChat}
                  variant="dark"
                >
                  Chat Someone
                </Button>
              )}
            </>
          )}
        </Container>
      </div>
    </Container>
  );
}

export default ChatBox;
