import InterestBox from "../components/InterestBox";
import { useTheme } from "../contexts/ThemeContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

export function IntroMessage({ socket }) {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: isDarkMode
          ? "rgba(45, 55, 72, 0.95)"
          : "rgba(248, 250, 252, 0.95)",
        borderRadius: "8px",
        padding: "24px",
        margin: "10px 0",
      }}
    >
      <div className="d-flex mb-4">
        <img
          style={{
            margin: "auto",
          }}
          src={
            isDarkMode
              ? `${process.env.PUBLIC_URL}/ohmyra_logo_wht.png`
              : `${process.env.PUBLIC_URL}/ohmyra_logo.png`
          }
          alt="logo"
          width={120}
        />
      </div>

      <div className="text-center">
        <h2
          className="fw-bold mb-3"
          style={{
            fontSize: "1.8rem",
            color: isDarkMode ? "#e8e6e3" : "#1e293b",
            margin: "0 0 16px 0",
          }}
        >
          Welcome to Ohmyra!
        </h2>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: "1.5",
            color: isDarkMode ? "#e8e6e3" : "#1e293b",
            marginBottom: "24px",
            maxWidth: "450px",
            margin: "0 auto 24px auto",
          }}
        >
          Connect with new people and start meaningful conversations.
        </p>
        <InterestBox socket={socket} />
        <button
          className="mt-2"
          onClick={() => navigate("/saved-conversations")}
          style={{
            background: isDarkMode ? "#e8e6e3" : "#1e293b",
            color: isDarkMode ? "#1e293b" : "#e8e6e3",
            border: "none",
            borderRadius: "8px",
            padding: "12px 20px",
            fontSize: "0.9rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: isDarkMode
              ? "0 2px 8px rgba(30, 64, 175, 0.3)"
              : "0 2px 8px rgba(59, 130, 246, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            minWidth: "140px",
            width: "100%",
            justifyContent: "center",
          }}
        >
          View Saved Messages
        </button>
      </div>
    </div>
  );
}

export function FindingUserMessage({
  loadMessage = "Looking for someone to chat with...",
}) {
  const { isDarkMode } = useTheme();

  return (
    <div
      style={{
        padding: "24px 20px",
        background: isDarkMode
          ? "rgba(45, 55, 72, 0.95)"
          : "rgba(248, 250, 252, 0.95)",
        borderRadius: "16px",
        border: isDarkMode
          ? "1px solid rgba(160, 163, 189, 0.2)"
          : "1px solid rgba(203, 213, 225, 0.3)",
        textAlign: "center",
        margin: "20px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Main content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Message */}
        <h3
          style={{
            color: isDarkMode ? "#e8e6e3" : "#1e293b",
            fontSize: "1.1rem",
            fontWeight: "600",
            margin: "0 0 8px 0",
            letterSpacing: "0.025em",
          }}
        >
          Finding Your Match
        </h3>

        <p
          style={{
            color: isDarkMode ? "#a0a3bd" : "#64748b",
            fontSize: "0.9rem",
            margin: "0 0 16px 0",
            lineHeight: "1.4",
          }}
        >
          {loadMessage}
        </p>

        {/* Animated dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "4px",
            marginTop: "12px",
          }}
        >
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: isDarkMode ? "#e8e6e3" : "#1e293b",
                animation: `pulse 1.5s ease-in-out ${index * 0.2}s infinite`,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 80%, 100% { 
              transform: scale(0.8);
              opacity: 0.4;
            }
            40% { 
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes breathe {
            0%, 100% { 
              transform: scale(1);
              opacity: 0.7;
            }
            50% { 
              transform: scale(1.2);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export function ConnectedUserMessage({ interest }) {
  const { isDarkMode } = useTheme();

  return (
    <div
      style={{
        padding: "16px",
        background: isDarkMode ? "#134e4a" : "#f0fdf4",
        borderRadius: "6px",
        border: isDarkMode ? "1px solid #16a34a" : "1px solid #22c55e",
        margin: "15px 0",
      }}
    >
      <p
        style={{
          color: isDarkMode ? "#e8e6e3" : "#374151",
          margin: 0,
        }}
        className="text-center"
      >
        <span
          style={{
            color: "#16a34a",
            fontSize: "1rem",
            fontWeight: "600",
          }}
        >
          Connected!
        </span>{" "}
        {interest !== "" ? (
          <span style={{ fontSize: "0.9rem" }}>
            Matched with someone who shares your interest in{" "}
            <strong style={{ color: "#16a34a" }}>{interest}</strong>.
          </span>
        ) : (
          <span style={{ fontSize: "0.9rem" }}>
            Connected to a random user. Start chatting!
          </span>
        )}
      </p>
    </div>
  );
}

export function DisconnectedUserMessage({ socket, messages }) {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [savedMessages, setSavedMessages] = useState(() => {
    const storedMessages = localStorage.getItem("savedMessages");
    return storedMessages && storedMessages !== "null"
      ? JSON.parse(storedMessages)
      : [];
  });

  const [isSaved, setIsSaved] = useState(false);

  const onSaveConversation = () => {
    if (isSaved) {
      toast.error("Conversation already saved!", {
        duration: 3000,
      });
      return;
    }

    if (messages.length === 0) {
      alert("No messages to save.");
      return;
    }
    setIsSaved(true);

    const conversationData = {
      messages: messages,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...savedMessages, conversationData];
    setSavedMessages(updatedMessages);
    localStorage.setItem("savedMessages", JSON.stringify(updatedMessages));
    toast.success("Conversation saved successfully!", {
      duration: 3000,
    });
  };

  return (
    <div
      style={{
        padding: "24px",
        background: isDarkMode ? "#3a2e1a" : "#fef2f2",
        borderRadius: "12px",
        border: isDarkMode ? "1px solid #ca8a04" : "1px solid #ef4444",
        margin: "20px 0",
        boxShadow: isDarkMode
          ? "0 4px 12px rgba(202, 138, 4, 0.15)"
          : "0 4px 12px rgba(239, 68, 68, 0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Main content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Disconnection icon and message */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h3
            style={{
              color: isDarkMode ? "#fbbf24" : "#dc2626",
              fontSize: "1.1rem",
              fontWeight: "700",
              margin: "0 0 8px 0",
              letterSpacing: "0.025em",
            }}
          >
            Connection Lost
          </h3>

          <p
            style={{
              color: isDarkMode ? "#d1d5db" : "#4b5563",
              margin: 0,
              fontSize: "0.9rem",
              lineHeight: "1.4",
              opacity: 0.9,
            }}
          >
            The conversation has ended. You or the other user has left the chat.
          </p>
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={onSaveConversation}
            style={{
              background: isDarkMode ? "#065f46" : "#10b981",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "12px 20px",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: isDarkMode
                ? "0 2px 8px rgba(6, 95, 70, 0.3)"
                : "0 2px 8px rgba(16, 185, 129, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              minWidth: "140px",
              justifyContent: "center",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = isDarkMode
                ? "0 4px 12px rgba(6, 95, 70, 0.4)"
                : "0 4px 12px rgba(16, 185, 129, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = isDarkMode
                ? "0 2px 8px rgba(6, 95, 70, 0.3)"
                : "0 2px 8px rgba(16, 185, 129, 0.3)";
            }}
          >
            Save Chat
          </button>

          <button
            onClick={() => navigate("/saved-conversations")}
            style={{
              background: isDarkMode ? "#1e40af" : "#3b82f6",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "12px 20px",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: isDarkMode
                ? "0 2px 8px rgba(30, 64, 175, 0.3)"
                : "0 2px 8px rgba(59, 130, 246, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              minWidth: "140px",
              justifyContent: "center",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = isDarkMode
                ? "0 4px 12px rgba(30, 64, 175, 0.4)"
                : "0 4px 12px rgba(59, 130, 246, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = isDarkMode
                ? "0 2px 8px rgba(30, 64, 175, 0.3)"
                : "0 2px 8px rgba(59, 130, 246, 0.3)";
            }}
          >
            View Saved Messages
          </button>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: isDarkMode ? "#4b5563" : "#d1d5db",
            margin: "20px 0",
            opacity: 0.5,
          }}
        />

        {/* Find new match section */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              color: isDarkMode ? "#9ca3af" : "#6b7280",
              fontSize: "0.85rem",
              margin: "0 0 16px 0",
              fontWeight: "500",
            }}
          >
            Ready for another conversation?
          </p>
          <InterestBox socket={socket} />
        </div>
      </div>
    </div>
  );
}

export function TypingUserMessage({ isTyping }) {
  const { isDarkMode } = useTheme();

  return (
    <div
      style={{
        padding: "8px 12px",
        background: isDarkMode ? "#374151" : "#f9fafb",
        borderRadius: "12px",
        border: isDarkMode ? "1px solid #4b5563" : "1px solid #e5e7eb",
        margin: "10px 0",
        display: "inline-block",
      }}
    >
      <p
        style={{
          color: isDarkMode ? "#a0a3bd" : "#6b7280",
          margin: 0,
          fontSize: "0.85rem",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <div style={{ display: "flex", gap: "2px" }}>
          <div
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "#9ca3af",
              animation: "typing 1.4s infinite",
            }}
          ></div>
          <div
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "#9ca3af",
              animation: "typing 1.4s infinite",
              animationDelay: "0.2s",
            }}
          ></div>
          <div
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "#9ca3af",
              animation: "typing 1.4s infinite",
              animationDelay: "0.4s",
            }}
          ></div>
        </div>
        {isTyping}
      </p>
    </div>
  );
}
