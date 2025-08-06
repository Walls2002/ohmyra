import React from "react";
import InterestBox from "../components/InterestBox";
import { useTheme } from "../contexts/ThemeContext";

export function IntroMessage({ socket }) {
  const { isDarkMode } = useTheme();

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
      </div>
    </div>
  );
}

export function FindingUserMessage({ loadMessage = "" }) {
  const { isDarkMode } = useTheme();

  return (
    <div
      style={{
        color: isDarkMode ? "#a0a3bd" : "#6b7280",
        padding: "12px 16px",
        background: isDarkMode ? "#374151" : "#f9fafb",
        borderRadius: "6px",
        border: isDarkMode ? "1px solid #4b5563" : "1px solid #e5e7eb",
        fontSize: "0.9rem",
        textAlign: "center",
        margin: "10px 0",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#9ca3af",
            animation: "pulse 2s infinite",
          }}
        ></div>
        {loadMessage}
      </div>
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

export function DicsonnectedUserMessage({ socket }) {
  const { isDarkMode } = useTheme();

  return (
    <div
      style={{
        padding: "16px",
        background: isDarkMode ? "#450a0a" : "#fef2f2",
        borderRadius: "6px",
        border: isDarkMode ? "1px solid #dc2626" : "1px solid #ef4444",
        margin: "15px 0",
      }}
    >
      <p
        style={{
          color: isDarkMode ? "#e8e6e3" : "#374151",
          margin: 0,
          marginBottom: "16px",
          fontSize: "0.9rem",
        }}
        className="text-center"
      >
        <span style={{ color: "#dc2626", fontWeight: "600" }}>
          Disconnected
        </span>{" "}
        - The other user has left the conversation.
      </p>
      <InterestBox socket={socket} />
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
