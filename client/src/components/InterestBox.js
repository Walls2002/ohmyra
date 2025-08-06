import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function InterestBox({ socket }) {
  const { isDarkMode } = useTheme();
  const [interestsCheck, setInterestsCheck] = useState(false);

  const [interestsInString, setInterestsInString] = useState(() => {
    const storedValue = localStorage.getItem("interestsInString");
    return storedValue && storedValue !== "null" ? storedValue : ""; // Treat "null" or undefined as empty
  });
  const [interestsInArray, setInterestsInArray] = useState([]);

  socket.on("get_interests", (data) => {
    setInterestsCheck(data.isInterestChecked);
    setInterestsInString(data.interestsList);
    console.log("Interest List: ", data.interestsList);
  });

  function handleChangeCheckBox(e) {
    let isChecked = e.target.checked;
    console.log(isChecked);
    setInterestsCheck(isChecked);

    socket.emit("check_interests", {
      isChecked: isChecked,
    });
  }
  function saveInterests() {
    setInterestsInArray(interestsInString.split(" "));

    const interestsToArray = interestsInString.toLowerCase().split(" ");

    socket.emit("interests_list", {
      interestsList: interestsToArray,
    });
  }

  useEffect(() => {
    if (interestsInString !== null && interestsInString !== undefined) {
      localStorage.setItem("interestsInString", interestsInString);
    }
  }, [interestsInString]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: window.innerWidth < 480 ? "6px" : "8px",
          alignItems: "stretch",
          flexWrap: window.innerWidth < 320 ? "wrap" : "nowrap", // Allow wrapping on very small screens
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: window.innerWidth < 480 ? "10px" : "12px", // Reduced padding on mobile
            background: interestsCheck
              ? isDarkMode
                ? "rgba(160, 163, 189, 0.2)"
                : "rgba(203, 213, 225, 0.3)"
              : isDarkMode
              ? "rgba(160, 163, 189, 0.1)"
              : "rgba(203, 213, 225, 0.15)",
            borderRadius: "8px",
            border: isDarkMode
              ? "1px solid rgba(160, 163, 189, 0.3)"
              : "1px solid rgba(203, 213, 225, 0.4)",
            transition: "all 0.2s ease",
            minWidth: "auto",
            flexShrink: 0, // Prevent label from shrinking
            boxSizing: "border-box",
          }}
        >
          <input
            type="checkbox"
            onChange={handleChangeCheckBox}
            checked={interestsCheck}
            style={{
              width: "16px",
              height: "16px",
              margin: 0,
              accentColor: "#e8e6e3",
            }}
          />
        </label>

        <input
          disabled={!interestsCheck}
          onChange={(e) => setInterestsInString(e.target.value)}
          value={interestsInString || ""}
          placeholder="Add interests separated by spaces (e.g. gaming music sports)"
          style={{
            flex: 1,
            minWidth: 0, // Allows flex item to shrink below content size
            width: "100%", // Ensures full width within flex container
            padding: window.innerWidth < 480 ? "10px 12px" : "12px 16px", // Reduced padding on mobile
            background: interestsCheck
              ? isDarkMode
                ? "rgba(55, 65, 81, 0.8)"
                : "rgba(255, 255, 255, 0.9)"
              : isDarkMode
              ? "rgba(55, 65, 81, 0.4)"
              : "rgba(248, 250, 252, 0.5)",
            border: isDarkMode
              ? "1px solid rgba(160, 163, 189, 0.3)"
              : "1px solid rgba(203, 213, 225, 0.4)",
            borderRadius: "8px",
            color: interestsCheck
              ? isDarkMode
                ? "#e8e6e3"
                : "#1e293b"
              : isDarkMode
              ? "rgba(232, 230, 227, 0.5)"
              : "rgba(30, 41, 59, 0.5)",
            fontSize: window.innerWidth < 480 ? "13px" : "14px", // Smaller font on mobile
            outline: "none",
            transition: "all 0.2s ease",
            boxSizing: "border-box", // Include padding and border in width calculation
          }}
          onFocus={(e) => {
            if (interestsCheck) {
              e.target.style.border = isDarkMode
                ? "1px solid rgba(160, 163, 189, 0.5)"
                : "1px solid rgba(203, 213, 225, 0.6)";
              e.target.style.background = isDarkMode
                ? "rgba(55, 65, 81, 0.9)"
                : "rgba(255, 255, 255, 1)";
            }
          }}
          onBlur={(e) => {
            e.target.style.border = isDarkMode
              ? "1px solid rgba(160, 163, 189, 0.3)"
              : "1px solid rgba(203, 213, 225, 0.4)";
            e.target.style.background = interestsCheck
              ? isDarkMode
                ? "rgba(55, 65, 81, 0.8)"
                : "rgba(255, 255, 255, 0.9)"
              : isDarkMode
              ? "rgba(55, 65, 81, 0.4)"
              : "rgba(248, 250, 252, 0.5)";
          }}
        />

        <button
          onClick={saveInterests}
          disabled={!interestsCheck}
          style={{
            padding: window.innerWidth < 480 ? "10px 16px" : "12px 20px", // Reduced padding on mobile
            background: interestsCheck
              ? isDarkMode
                ? "rgba(160, 163, 189, 0.8)"
                : "rgba(203, 213, 225, 0.8)"
              : isDarkMode
              ? "rgba(160, 163, 189, 0.3)"
              : "rgba(203, 213, 225, 0.3)",
            border: isDarkMode
              ? "1px solid rgba(160, 163, 189, 0.4)"
              : "1px solid rgba(203, 213, 225, 0.5)",
            borderRadius: "8px",
            color: interestsCheck
              ? isDarkMode
                ? "#1e293b"
                : "#1e293b"
              : isDarkMode
              ? "rgba(30, 41, 59, 0.5)"
              : "rgba(30, 41, 59, 0.5)",
            fontSize: window.innerWidth < 480 ? "13px" : "14px", // Smaller font on mobile
            fontWeight: "500",
            cursor: interestsCheck ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
            minWidth: window.innerWidth < 480 ? "50px" : "60px", // Smaller min-width on mobile
            boxSizing: "border-box",
            flexShrink: 0, // Prevent button from shrinking
          }}
          onMouseOver={(e) => {
            if (interestsCheck) {
              e.target.style.background = isDarkMode
                ? "rgba(160, 163, 189, 0.9)"
                : "rgba(203, 213, 225, 0.9)";
            }
          }}
          onMouseOut={(e) => {
            e.target.style.background = interestsCheck
              ? isDarkMode
                ? "rgba(160, 163, 189, 0.8)"
                : "rgba(203, 213, 225, 0.8)"
              : isDarkMode
              ? "rgba(160, 163, 189, 0.3)"
              : "rgba(203, 213, 225, 0.3)";
          }}
        >
          Save
        </button>
      </div>

      {interestsCheck && interestsInArray.length > 0 && (
        <div
          style={{
            marginTop: "16px",
            padding: "12px",
            background: isDarkMode
              ? "rgba(55, 65, 81, 0.6)"
              : "rgba(248, 250, 252, 0.8)",
            borderRadius: "8px",
            border: isDarkMode
              ? "1px solid rgba(160, 163, 189, 0.2)"
              : "1px solid rgba(203, 213, 225, 0.3)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: isDarkMode
                ? "rgba(232, 230, 227, 0.7)"
                : "rgba(30, 41, 59, 0.7)",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              fontWeight: "500",
            }}
          >
            Interests
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              justifyContent: "center",
            }}
          >
            {interestsInArray.map((interest, index) => (
              <span
                key={index}
                style={{
                  padding: "4px 8px",
                  background: isDarkMode
                    ? "rgba(160, 163, 189, 0.2)"
                    : "rgba(203, 213, 225, 0.3)",
                  border: isDarkMode
                    ? "1px solid rgba(160, 163, 189, 0.3)"
                    : "1px solid rgba(203, 213, 225, 0.4)",
                  borderRadius: "12px",
                  color: isDarkMode ? "#e8e6e3" : "#1e293b",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
