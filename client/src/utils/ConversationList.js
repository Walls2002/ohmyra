import React from "react";
import { useTheme } from "../contexts/ThemeContext";

function ConversationList({ messageList = [], socketIds = [] }) {
  const { isDarkMode } = useTheme();
  return (
    <div style={{ marginTop: "30px", marginBottom: "30px" }}>
      {" "}
      {messageList.map((msg, index) =>
        socketIds.includes(msg.author) ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingLeft: "30px",
              alignItems: "center",
              marginBottom: "15px",
            }}
            key={index}
          >
            <span
              className="d-none d-md-flex"
              style={{
                fontSize: "10px",
                color: isDarkMode ? "#a0a3bd" : "#64748b",
                marginRight: "10px",
              }}
            >
              {" "}
              {msg.date}
            </span>
            <div
              style={{
                background: isDarkMode ? "#e8e6e3" : "#1e293b",
                borderRadius: "20px 20px 5px 20px",
                padding: "12px 20px",
                maxWidth: "350px",
                margin: 0,
                color: isDarkMode ? "#1e293b" : "#e8e6e3",
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
                  fontSize: "12px",
                  color: isDarkMode ? "#1e293b" : "#e8e6e3",
                  marginTop: "5px",
                  justifyContent: "flex-end",
                }}
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
              marginBottom: "15px",
              alignItems: "center",
            }}
            key={index}
          >
            <div
              style={{
                background: isDarkMode
                  ? "rgba(45, 55, 72, 0.8)"
                  : "rgba(241, 245, 249, 0.9)",
                borderRadius: "20px 20px 20px 5px",
                padding: "12px 20px",
                maxWidth: "350px",
                margin: 0,
                color: isDarkMode ? "#e8e6e3" : "#1e293b",
                border: isDarkMode
                  ? "1px solid rgba(160, 163, 189, 0.2)"
                  : "1px solid rgba(203, 213, 225, 0.3)",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <span style={{ wordBreak: "break-word", fontSize: "15px" }}>
                {msg.message}
              </span>
              <span
                className="d-block  d-md-none"
                style={{
                  fontSize: "12px",
                  color: isDarkMode ? "#a0a3bd" : "#64748b",
                  marginTop: "5px",
                  justifyContent: "flex-start",
                }}
              >
                {" "}
                {msg.date}
              </span>
            </div>
            <span
              className="d-none d-md-flex"
              style={{
                fontSize: "10px",
                color: isDarkMode ? "#a0a3bd" : "#64748b",
                marginLeft: "10px",
              }}
            >
              {" "}
              {msg.date}
            </span>
          </div>
        )
      )}
    </div>
  );
}

export default ConversationList;
