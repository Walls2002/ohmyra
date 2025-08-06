/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Container, Button, Modal } from "react-bootstrap";
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
import { useTheme } from "../contexts/ThemeContext";

function ChatBox({ socket }) {
  const { isDarkMode } = useTheme();
  const chatBoxRef = useRef(null);
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
  const [bothInterests, setBothInterests] = useState();

  const [isTyping, setIsTyping] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dateToday = new Date();
  let socketIdArray = [];

  // Function to scroll to bottom of chat
  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const inputDiv = {
    position: "sticky",
    left: "0",
    right: "0",
    borderRadius: "12px",
    textAlign: "center",
    padding: "12px",
    bottom: "10px",
    background: isDarkMode
      ? "rgba(45, 55, 72, 0.95)"
      : "rgba(248, 250, 252, 0.95)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    border: isDarkMode
      ? "1px solid rgba(160, 163, 189, 0.1)"
      : "1px solid rgba(203, 213, 225, 0.2)",
    backdropFilter: "blur(8px)",
    margin: "0 10px",
    gap: "8px",
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

      // Scroll to bottom after a short delay
      setTimeout(scrollToBottom, 100);
    }
  };
  const disconnectChat = () => {
    socket.emit("disconnect_chat");
    setConnect(false);
    handleClose();
    setMessage("");
    setDisconnectedUser(true);
    setFindingUser(false);
  };
  const disconnectWhileWaiting = () => {
    socket.disconnect();
    setConnect(false);
    handleClose();
    setMessage("");
    setDisconnectedUser(true);
    setFindingUser(false);
  };

  const cancelFinding = () => {
    setFindingUser(false);
    setMessageList([]);
    socket.disconnect();
    setFirstMessage(true);
    socket.connect();
    setDisconnectedUser(false);
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit("typing"); // Emit typing event when user types
  };

  useEffect(() => {
    const handleMessageReceive = (data) => {
      setMessageList((list) => [...list, data]);
      setTimeout(scrollToBottom, 100);
      setIsTyping("");
    };
    const handleDisconnect = (data) => {
      setConnect(data.conn);
      setDisconnectedUser(data.disc);
      setMessage("");
      setTimeout(scrollToBottom, 100);
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

      <style>
        {`
          /* Custom Scrollbar Styles */
          .chat-box::-webkit-scrollbar {
            width: 8px;
          }
          
          .chat-box::-webkit-scrollbar-track {
            background: ${
              isDarkMode ? "rgba(45, 55, 72, 0.3)" : "rgba(248, 250, 252, 0.3)"
            };
            border-radius: 10px;
            margin: 4px;
          }
          
          .chat-box::-webkit-scrollbar-thumb {
            background: ${
              isDarkMode
                ? "rgba(160, 163, 189, 0.4)"
                : "rgba(100, 116, 139, 0.4)"
            };
            border-radius: 10px;
            border: 2px solid transparent;
            background-clip: content-box;
            transition: all 0.3s ease;
          }
          
          .chat-box::-webkit-scrollbar-thumb:hover {
            background: ${
              isDarkMode
                ? "rgba(160, 163, 189, 0.6)"
                : "rgba(100, 116, 139, 0.6)"
            };
            background-clip: content-box;
          }
          
          .chat-box::-webkit-scrollbar-thumb:active {
            background: ${
              isDarkMode
                ? "rgba(160, 163, 189, 0.8)"
                : "rgba(100, 116, 139, 0.8)"
            };
            background-clip: content-box;
          }

          /* Firefox scrollbar */
          .chat-box {
            scrollbar-width: thin;
            scrollbar-color: ${
              isDarkMode
                ? "rgba(160, 163, 189, 0.4) rgba(45, 55, 72, 0.3)"
                : "rgba(100, 116, 139, 0.4) rgba(248, 250, 252, 0.3)"
            };
          }

          @media (max-width: 768px) {
            .chat-container {
              padding: 0 5px !important;
            }
            .chat-box {
              margin-bottom: 70px !important;
              padding: 16px !important;
            }
            .input-container {
              bottom: 5px !important;
              margin: 0 5px !important;
              padding: 8px !important;
              gap: 6px !important;
            }
            .chat-textarea {
              font-size: 16px !important;
              padding: 10px 12px !important;
            }
            .action-button {
              padding: 8px 10px !important;
              font-size: 12px !important;
              min-width: 60px !important;
            }
            
            /* Mobile scrollbar adjustments */
            .chat-box::-webkit-scrollbar {
              width: 6px;
            }
          }
          @media (max-width: 480px) {
            .chat-container {
              padding: 0 !important;
            }
            .chat-box {
              border-radius: 8px !important;
              margin-bottom: 65px !important;
            }
            .input-container {
              border-radius: 8px !important;
              margin: 0 !important;
            }
            
            /* Smaller scrollbar for very small screens */
            .chat-box::-webkit-scrollbar {
              width: 4px;
            }
          }
        `}
      </style>

      <div>
        <Toaster />
      </div>
      <div
        className="chat-container pt-3"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "90vh",
          justifyContent: "space-between",
          padding: "0 10px",
        }}
      >
        <div
          ref={chatBoxRef}
          className="chat-box p-3 p-md-4"
          style={{
            background: isDarkMode
              ? "rgba(45, 55, 72, 0.95)"
              : "rgba(248, 250, 252, 0.95)",
            borderRadius: "12px",
            color: isDarkMode ? "#e8e6e3" : "#1e293b",
            marginBottom: "80px",
            marginTop: "20px",
            border: isDarkMode
              ? "1px solid rgba(160, 163, 189, 0.1)"
              : "1px solid rgba(203, 213, 225, 0.2)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            backdropFilter: "blur(8px)",
            minHeight: "60vh",
            maxHeight: "60vh",
            overflowY: "auto",
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
        <div className="input-container" style={inputDiv}>
          <textarea
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            rows={1}
            className="chat-textarea"
            style={{
              flex: "1",
              minWidth: "0",
              outline: "none",
              borderRadius: "8px",
              border: isDarkMode
                ? "1px solid rgba(160, 163, 189, 0.15)"
                : "1px solid rgba(203, 213, 225, 0.3)",
              background: isDarkMode
                ? "rgba(45, 55, 72, 0.7)"
                : "rgba(255, 255, 255, 0.9)",
              paddingLeft: "16px",
              color: isDarkMode ? "#e8e6e3" : "#1e293b",
              padding: "12px 16px",
              resize: "none",
              overflow: "hidden",
              fontSize: "14px",
              fontWeight: "400",
              transition: "all 0.2s ease",
              marginRight: "8px",
            }}
            value={message}
            onChange={handleTyping}
            type="text"
            disabled={!connect}
            placeholder="Type your message here..."
            onFocus={(e) => {
              e.target.style.border = isDarkMode
                ? "1px solid rgba(160, 163, 189, 0.3)"
                : "1px solid rgba(203, 213, 225, 0.5)";
              e.target.style.background = isDarkMode
                ? "rgba(45, 55, 72, 0.9)"
                : "rgba(255, 255, 255, 1)";
            }}
            onBlur={(e) => {
              e.target.style.border = isDarkMode
                ? "1px solid rgba(160, 163, 189, 0.15)"
                : "1px solid rgba(203, 213, 225, 0.3)";
              e.target.style.background = isDarkMode
                ? "rgba(45, 55, 72, 0.7)"
                : "rgba(255, 255, 255, 0.9)";
            }}
          />
          {connect ? (
            <span
              style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
            >
              <Modal
                centered
                show={show}
                onHide={handleClose}
                contentClassName="border-0"
                style={{
                  backdropFilter: "blur(10px)",
                }}
              >
                <Modal.Header
                  closeButton
                  style={{
                    background: isDarkMode
                      ? "rgba(45, 55, 72, 0.95)"
                      : "rgba(248, 250, 252, 0.95)",
                    border: "none",
                    borderRadius: "8px 8px 0 0",
                    color: isDarkMode ? "#e8e6e3" : "#1e293b",
                  }}
                >
                  <Modal.Title
                    style={{
                      color: isDarkMode ? "#e8e6e3" : "#1e293b",
                      fontWeight: "500",
                      fontSize: "18px",
                    }}
                  >
                    End Chat
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body
                  style={{
                    background: isDarkMode
                      ? "rgba(45, 55, 72, 0.95)"
                      : "rgba(248, 250, 252, 0.95)",
                    color: isDarkMode ? "#a0a3bd" : "#64748b",
                    fontSize: "14px",
                    padding: "20px",
                  }}
                >
                  Are you sure you want to end the chat? This action will
                  disconnect you from the conversation.
                </Modal.Body>
                <Modal.Footer
                  style={{
                    background: isDarkMode
                      ? "rgba(45, 55, 72, 0.95)"
                      : "rgba(248, 250, 252, 0.95)",
                    border: "none",
                    borderRadius: "0 0 8px 8px",
                    padding: "16px 20px",
                  }}
                >
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    style={{
                      background: isDarkMode
                        ? "rgba(160, 163, 189, 0.1)"
                        : "rgba(100, 116, 139, 0.1)",
                      border: isDarkMode
                        ? "1px solid rgba(160, 163, 189, 0.2)"
                        : "1px solid rgba(100, 116, 139, 0.2)",
                      color: isDarkMode ? "#e8e6e3" : "#1e293b",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontWeight: "400",
                      fontSize: "14px",
                    }}
                  >
                    Close
                  </Button>

                  <Button
                    variant="danger"
                    onClick={disconnectChat}
                    style={{
                      background: "#dc3545",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    End Chat
                  </Button>
                </Modal.Footer>
              </Modal>
              <div style={{ display: "flex", gap: "4px" }}>
                <Button
                  onClick={handleShow}
                  variant="outline-danger"
                  className="action-button"
                  style={{
                    borderRadius: "6px",
                    background: "#dc3545",
                    border: "none",
                    color: "#ffffff",
                    padding: "10px 12px",
                    fontWeight: "500",
                    fontSize: "13px",
                    transition: "all 0.2s ease",
                    minWidth: "auto",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.opacity = "0.9";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.opacity = "1";
                  }}
                >
                  End
                </Button>
                <Button
                  onClick={sendMessage}
                  variant="light"
                  className="action-button"
                  style={{
                    borderRadius: "6px",
                    background: "#4a5568",
                    border: "none",
                    color: "#ffffff",
                    padding: "10px 12px",
                    fontWeight: "500",
                    fontSize: "13px",
                    transition: "all 0.2s ease",
                    minWidth: "auto",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#2d3748";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#4a5568";
                  }}
                >
                  Send
                </Button>
              </div>
            </span>
          ) : (
            <>
              {findingUser ? (
                <Button
                  onClick={cancelFinding}
                  variant="danger"
                  className="action-button"
                  style={{
                    borderRadius: "6px",
                    background: "#dc3545",
                    border: "none",
                    color: "#ffffff",
                    padding: "10px 16px",
                    fontWeight: "500",
                    fontSize: "13px",
                    opacity: findingUser ? 0.7 : 1,
                    flexShrink: 0,
                  }}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  disabled={findingUser}
                  onClick={findChat}
                  variant="dark"
                  className="action-button"
                  style={{
                    borderRadius: "6px",
                    background: "#4a5568",
                    border: "none",
                    color: "#ffffff",
                    padding: "10px 16px",
                    fontWeight: "500",
                    fontSize: "13px",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#2d3748";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#4a5568";
                  }}
                >
                  Chat
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

export default ChatBox;
