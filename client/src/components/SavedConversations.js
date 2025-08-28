import React, { useState, useEffect } from "react";
import { Container, Card, Button, Modal, Badge } from "react-bootstrap";
import Title from "../components/Title";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

function SavedConversations() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState(null);

  useEffect(() => {
    // Load saved conversations from localStorage or your data source
    const savedConversations = JSON.parse(
      localStorage.getItem("savedMessages") || "[]"
    );
    setConversations(savedConversations);
  }, []);

  const handleViewConversation = (conversation) => {
    setSelectedConversation(conversation);
    setShowModal(true);
  };

  const handleDeleteConversation = (index) => {
    setConversationToDelete(index);
    setShowDeleteModal(true);
  };

  const handleSavePDF = async (conversation) => {
    // Create a temporary container that mirrors the modal content
    const container = document.createElement("div");
    container.style.width = "800px";
    container.style.padding = "20px";
    container.style.background = isDarkMode ? "#2d3748" : "#ffffff";
    container.style.color = isDarkMode ? "#e8e6e3" : "#1e293b";
    container.style.fontFamily = "Arial, sans-serif";

    const header = document.createElement("div");
    header.style.textAlign = "center";
    header.style.marginBottom = "16px";

    // Add Ohmyra logo to header (use white logo for dark mode)
    const logo = document.createElement("img");
    logo.src = isDarkMode ? "/ohmyra_logo_wht.png" : "/ohmyra_logo.png";
    logo.alt = "Ohmyra";
    logo.style.width = "140px";
    logo.style.height = "auto";
    logo.style.display = "block";
    logo.style.margin = "0 auto 8px auto";
    header.appendChild(logo);

    const title = document.createElement("div");
    title.textContent = `Conversation - ${new Date(
      conversation.timestamp
    ).toLocaleString()}`;
    title.style.fontWeight = "600";
    title.style.marginBottom = "6px";
    header.appendChild(title);

    const meta = document.createElement("div");
    meta.textContent = `${conversation.messages.length} messages`;
    meta.style.fontSize = "12px";
    meta.style.color = isDarkMode ? "#a0a3bd" : "#64748b";
    header.appendChild(meta);
    container.appendChild(header);

    const messagesWrapper = document.createElement("div");
    messagesWrapper.style.display = "flex";
    messagesWrapper.style.flexDirection = "column";
    messagesWrapper.style.gap = "12px";

    conversation.messages.forEach((msg) => {
      const isUserMessage = msg.user === "owner";
      const msgDiv = document.createElement("div");
      msgDiv.style.alignSelf = isUserMessage ? "flex-end" : "flex-start";
      msgDiv.style.maxWidth = "520px";
      msgDiv.style.padding = "12px 16px";
      msgDiv.style.borderRadius = "10px";
      msgDiv.style.background = isUserMessage
        ? isDarkMode
          ? "#e8e6e3"
          : "#1e293b"
        : isDarkMode
        ? "rgba(160,163,189,0.1)"
        : "rgba(100,116,139,0.1)";
      msgDiv.style.color = isUserMessage
        ? isDarkMode
          ? "#1e293b"
          : "#e8e6e3"
        : isDarkMode
        ? "#e8e6e3"
        : "#1e293b";
      msgDiv.style.wordBreak = "break-word";

      const text = document.createElement("div");
      text.textContent = msg.message;
      text.style.fontSize = "14px";
      text.style.marginBottom = "6px";
      msgDiv.appendChild(text);

      const date = document.createElement("div");
      date.textContent = msg.date;
      date.style.fontSize = "11px";
      date.style.color = isDarkMode ? "#a0a3bd" : "#64748b";
      msgDiv.appendChild(date);

      messagesWrapper.appendChild(msgDiv);
    });

    container.appendChild(messagesWrapper);
    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate the image dimensions to fit the PDF while preserving aspect ratio
      const imgWidth = pageWidth - 40; // margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 20;
      if (imgHeight < pageHeight) {
        pdf.addImage(imgData, "PNG", 20, position, imgWidth, imgHeight);
      } else {
        // If content taller than a page, split into multiple pages
        let remainingHeight = canvas.height;
        let pageCanvasHeight = Math.floor(
          (canvas.width * pageHeight) / imgWidth
        );
        let y = 0;
        while (remainingHeight > 0) {
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = canvas.width;
          pageCanvas.height = Math.min(pageCanvasHeight, remainingHeight);
          const ctx = pageCanvas.getContext("2d");
          ctx.drawImage(
            canvas,
            0,
            y,
            canvas.width,
            pageCanvas.height,
            0,
            0,
            canvas.width,
            pageCanvas.height
          );
          const pageImg = pageCanvas.toDataURL("image/png");
          if (y > 0) pdf.addPage();
          pdf.addImage(
            pageImg,
            "PNG",
            20,
            20,
            imgWidth,
            (pageCanvas.height * imgWidth) / canvas.width
          );
          y += pageCanvas.height;
          remainingHeight -= pageCanvas.height;
        }
      }

      pdf.save(`conversation-${conversation.timestamp}.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
    } finally {
      document.body.removeChild(container);
    }
  };

  const confirmDelete = () => {
    const updatedConversations = conversations.filter(
      (_, index) => index !== conversationToDelete
    );
    setConversations(updatedConversations);
    localStorage.setItem("savedMessages", JSON.stringify(updatedConversations));
    setShowDeleteModal(false);
    setConversationToDelete(null);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  };

  const getConversationPreview = (messages) => {
    if (messages.length === 0) return "No messages";
    const lastMessage = messages[messages.length - 1];
    return lastMessage.message.length > 50
      ? lastMessage.message.substring(0, 50) + "..."
      : lastMessage.message;
  };

  const renderMessage = (msg, index, currentUserId) => {
    const isUserMessage = msg.user === "owner";

    return (
      <div
        key={index}
        style={{
          display: "flex",
          justifyContent: isUserMessage ? "flex-end" : "flex-start",
          paddingLeft: isUserMessage ? "30px" : "0",
          paddingRight: isUserMessage ? "0" : "30px",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        {!isUserMessage && (
          <span
            className="d-none d-md-flex"
            style={{
              fontSize: "10px",
              color: isDarkMode ? "#a0a3bd" : "#64748b",
              marginRight: "10px",
            }}
          >
            {msg.date}
          </span>
        )}

        <div
          style={{
            background: isUserMessage
              ? isDarkMode
                ? "#e8e6e3"
                : "#1e293b"
              : isDarkMode
              ? "rgba(160, 163, 189, 0.2)"
              : "rgba(100, 116, 139, 0.2)",
            borderRadius: isUserMessage
              ? "20px 20px 5px 20px"
              : "20px 20px 20px 5px",
            padding: "12px 20px",
            maxWidth: "350px",
            margin: 0,
            color: isUserMessage
              ? isDarkMode
                ? "#1e293b"
                : "#e8e6e3"
              : isDarkMode
              ? "#e8e6e3"
              : "#1e293b",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <span style={{ wordBreak: "break-word", fontSize: "15px" }}>
            {msg.message}
          </span>
          <span
            className="d-block d-md-none"
            style={{
              fontSize: "9px",
              color: isUserMessage
                ? isDarkMode
                  ? "#4a5568"
                  : "#a0a3bd"
                : isDarkMode
                ? "#a0a3bd"
                : "#64748b",
              marginTop: "5px",
            }}
          >
            {msg.date}
          </span>
        </div>

        {isUserMessage && (
          <span
            className="d-none d-md-flex"
            style={{
              fontSize: "10px",
              color: isDarkMode ? "#a0a3bd" : "#64748b",
              marginLeft: "10px",
            }}
          >
            {msg.date}
          </span>
        )}
      </div>
    );
  };

  return (
    <Container>
      <Title title={"Saved Conversations | Ohmyra"} />

      <style>
        {`
          .conversation-card {
            transition: all 0.3s ease;
            border: ${
              isDarkMode
                ? "1px solid rgba(160, 163, 189, 0.1)"
                : "1px solid rgba(203, 213, 225, 0.2)"
            } !important;
          }
          
          .conversation-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
            border: ${
              isDarkMode
                ? "1px solid rgba(160, 163, 189, 0.2)"
                : "1px solid rgba(203, 213, 225, 0.3)"
            } !important;
          }

          .saved-conversations-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          
          .saved-conversations-scrollbar::-webkit-scrollbar-track {
            background: ${
              isDarkMode ? "rgba(45, 55, 72, 0.3)" : "rgba(248, 250, 252, 0.3)"
            };
            border-radius: 10px;
            margin: 4px;
          }
          
          .saved-conversations-scrollbar::-webkit-scrollbar-thumb {
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
          
          .saved-conversations-scrollbar::-webkit-scrollbar-thumb:hover {
            background: ${
              isDarkMode
                ? "rgba(160, 163, 189, 0.6)"
                : "rgba(100, 116, 139, 0.6)"
            };
            background-clip: content-box;
          }

          @media (max-width: 768px) {
            .conversation-card {
              margin-bottom: 15px !important;
            }
          }
        `}
      </style>

      <div
        className="pt-3"
        style={{
          minHeight: "90vh",
          padding: "0 10px",
        }}
      >
        <div
          style={{
            background: isDarkMode
              ? "rgba(45, 55, 72, 0.95)"
              : "rgba(248, 250, 252, 0.95)",
            borderRadius: "12px",
            color: isDarkMode ? "#e8e6e3" : "#1e293b",
            marginTop: "20px",
            border: isDarkMode
              ? "1px solid rgba(160, 163, 189, 0.1)"
              : "1px solid rgba(203, 213, 225, 0.2)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            backdropFilter: "blur(8px)",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h4
              style={{
                color: isDarkMode ? "#e8e6e3" : "#1e293b",
                fontWeight: "600",
                margin: "0",
                textAlign: "center",
              }}
            >
              Saved Conversations
            </h4>
          </div>

          {conversations.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                color: isDarkMode ? "#a0a3bd" : "#64748b",
              }}
            >
              <h5>No saved conversations yet</h5>
              <p>Your saved chat conversations will appear here.</p>
            </div>
          ) : (
            <div
              className="saved-conversations-scrollbar"
              style={{
                maxHeight: "70vh",
                overflowY: "auto",
                paddingRight: "10px",
              }}
            >
              {conversations.map((conversation, index) => (
                <Card
                  key={index}
                  className="conversation-card"
                  style={{
                    background: isDarkMode
                      ? "rgba(45, 55, 72, 0.7)"
                      : "rgba(255, 255, 255, 0.9)",
                    marginBottom: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Card.Body style={{ padding: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "8px",
                          }}
                        >
                          <Badge
                            bg="secondary"
                            style={{
                              background: isDarkMode
                                ? "rgba(160, 163, 189, 0.2)"
                                : "rgba(100, 116, 139, 0.2)",
                              color: isDarkMode ? "#e8e6e3" : "#1e293b",
                              fontSize: "10px",
                              marginRight: "10px",
                            }}
                          >
                            {conversation.messages.length} messages
                          </Badge>
                          <small
                            style={{
                              color: isDarkMode ? "#a0a3bd" : "#64748b",
                              fontSize: "12px",
                            }}
                          >
                            {formatDate(conversation.timestamp)}
                          </small>
                        </div>
                        <p
                          style={{
                            color: isDarkMode ? "#e8e6e3" : "#1e293b",
                            fontSize: "14px",
                            marginBottom: "0",
                            lineHeight: "1.4",
                          }}
                        >
                          {getConversationPreview(conversation.messages)}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          marginLeft: "15px",
                        }}
                      >
                        <Button
                          size="sm"
                          onClick={() => handleViewConversation(conversation)}
                          style={{
                            background: "#4a5568",
                            border: "none",
                            borderRadius: "6px",
                            padding: "6px 12px",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                          onMouseOver={(e) => {
                            e.target.style.background = "#2d3748";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.background = "#4a5568";
                          }}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSavePDF(conversation)}
                          style={{
                            background: "transparent",
                            border: "1px solid #2b6cb0",
                            borderRadius: "6px",
                            padding: "6px 12px",
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#2b6cb0",
                          }}
                          onMouseOver={(e) => {
                            e.target.style.background = "#2b6cb0";
                            e.target.style.color = "#ffffff";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.background = "transparent";
                            e.target.style.color = "#2b6cb0";
                          }}
                        >
                          Save PDF
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDeleteConversation(index)}
                          style={{
                            background: "transparent",
                            border: "1px solid #dc3545",
                            borderRadius: "6px",
                            padding: "6px 12px",
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#dc3545",
                          }}
                          onMouseOver={(e) => {
                            e.target.style.background = "#dc3545";
                            e.target.style.color = "#ffffff";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.background = "transparent";
                            e.target.style.color = "#dc3545";
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}

          {/* Back to Chat Button */}
          <div
            style={{
              textAlign: "center",
              marginTop: "30px",
              paddingTop: "20px",
              borderTop: isDarkMode
                ? "1px solid rgba(160, 163, 189, 0.1)"
                : "1px solid rgba(203, 213, 225, 0.2)",
            }}
          >
            <Button
              onClick={() => navigate("/chat")}
              style={{
                background: "#4a5568",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#ffffff",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                margin: "0 auto",
                minWidth: "150px",
                justifyContent: "center",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#2d3748";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "#4a5568";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              ← Back to Chat
            </Button>
          </div>
        </div>
      </div>

      {/* View Conversation Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
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
            Conversation Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            background: isDarkMode
              ? "rgba(45, 55, 72, 0.95)"
              : "rgba(248, 250, 252, 0.95)",
            color: isDarkMode ? "#a0a3bd" : "#64748b",
            padding: "20px",
            maxHeight: "60vh",
            overflowY: "auto",
          }}
          className="saved-conversations-scrollbar"
        >
          {selectedConversation && (
            <>
              <div style={{ marginBottom: "20px", textAlign: "center" }}>
                <Badge
                  bg="secondary"
                  style={{
                    background: isDarkMode
                      ? "rgba(160, 163, 189, 0.2)"
                      : "rgba(100, 116, 139, 0.2)",
                    color: isDarkMode ? "#e8e6e3" : "#1e293b",
                    fontSize: "12px",
                    marginRight: "10px",
                  }}
                >
                  {selectedConversation.messages.length} messages
                </Badge>
                <small
                  style={{
                    color: isDarkMode ? "#a0a3bd" : "#64748b",
                    fontSize: "12px",
                  }}
                >
                  {formatDate(selectedConversation.timestamp)}
                </small>
              </div>
              <div style={{ marginTop: "20px" }}>
                {selectedConversation.messages.map((msg, index) =>
                  renderMessage(
                    msg,
                    index,
                    selectedConversation.messages[0]?.author
                  )
                )}
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
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
            Delete Conversation
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
          Are you sure you want to delete this conversation? This action cannot
          be undone.
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
            onClick={() => setShowDeleteModal(false)}
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
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={confirmDelete}
            style={{
              background: "#dc3545",
              border: "none",
              borderRadius: "6px",
              padding: "8px 16px",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SavedConversations;
