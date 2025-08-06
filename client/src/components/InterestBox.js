import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function InterestBox({ socket }) {
  const { isDarkMode } = useTheme();
  const [interestsCheck, setInterestsCheck] = useState(() => {
    const storedValue = localStorage.getItem("isInterestChecked");
    return storedValue === "true";
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

  const [interestsInString, setInterestsInString] = useState("");
  const [interestsInArray, setInterestsInArray] = useState(() => {
    const storedValue = localStorage.getItem("interestsInArray");
    return storedValue && storedValue !== "null" ? JSON.parse(storedValue) : [];
  });

  socket.on("get_interests", (data) => {
    setInterestsCheck(data.isInterestChecked);
    setInterestsInString(data.interestsList);
    console.log("Interest List: ", data.interestsList);
  });

  function handleChangeCheckBox(e) {
    let isChecked = e.target.checked;
    console.log(isChecked);
    setInterestsCheck(isChecked);

    localStorage.setItem("isInterestChecked", isChecked);

    socket.emit("check_interests", {
      isChecked: isChecked,
    });
  }
  function saveInterests() {
    if (interestsInString.trim() === "") {
      return;
    }

    if (
      interestsInArray.some(
        (interest) =>
          interest.trim().toLowerCase() ===
          interestsInString.trim().toLowerCase()
      )
    ) {
      setInterestsInString("");
      return;
    }

    setInterestsInArray([...interestsInArray, interestsInString]);

    // const interestsToArray = interestsInString.toLowerCase().split(" ");

    socket.emit("interests_list", {
      interestsList: interestsInArray,
    });

    setInterestsInString("");
  }

  function removeInterest(indexToRemove) {
    const updatedInterests = interestsInArray.filter(
      (_, index) => index !== indexToRemove
    );
    setInterestsInArray(updatedInterests);

    socket.emit("interests_list", {
      interestsList: updatedInterests,
    });
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (interestsInArray !== null && interestsInArray !== undefined) {
      localStorage.setItem(
        "interestsInArray",
        JSON.stringify(interestsInArray)
      );
    }
  }, [interestsInArray]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "stretch",
          flexDirection: isMobile ? "column" : "row", // Stack vertically on mobile
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: "12px",
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
            flexShrink: 0,
            boxSizing: "border-box",
            justifyContent: isMobile ? "center" : "flex-start", // Center on mobile
            gap: isMobile ? "8px" : "0", // Add gap for text on mobile
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
          {isMobile && (
            <span
              style={{
                fontSize: "14px",
                color: isDarkMode ? "#e8e6e3" : "#1e293b",
                fontWeight: "500",
              }}
            >
              Enable Interests
            </span>
          )}
        </label>

        {isMobile ? (
          // Mobile layout: input and button in a row
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "stretch",
            }}
          >
            <input
              disabled={!interestsCheck}
              onChange={(e) => setInterestsInString(e.target.value)}
              value={interestsInString || ""}
              placeholder="Add interests (e.g. gaming music sports)"
              style={{
                flex: 1,
                minWidth: 0,
                padding: "12px 16px",
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
                fontSize: "14px",
                outline: "none",
                transition: "all 0.2s ease",
                boxSizing: "border-box",
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
              disabled={!interestsCheck || interestsInString.trim() === ""}
              style={{
                padding: "12px 20px",
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
                fontSize: "14px",
                fontWeight: "500",
                cursor: interestsCheck ? "pointer" : "not-allowed",
                transition: "all 0.2s ease",
                minWidth: "70px",
                boxSizing: "border-box",
                flexShrink: 0,
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
              Add
            </button>
          </div>
        ) : (
          // Desktop layout: original horizontal layout
          <>
            <input
              disabled={!interestsCheck}
              onChange={(e) => setInterestsInString(e.target.value)}
              value={interestsInString || ""}
              placeholder="Add interests separated by spaces (e.g. gaming music sports)"
              style={{
                flex: 1,
                minWidth: 0,
                width: "100%",
                padding: "12px 16px",
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
                fontSize: "14px",
                outline: "none",
                transition: "all 0.2s ease",
                boxSizing: "border-box",
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
                padding: "12px 20px",
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
                fontSize: "14px",
                fontWeight: "500",
                cursor: interestsCheck ? "pointer" : "not-allowed",
                transition: "all 0.2s ease",
                minWidth: "60px",
                boxSizing: "border-box",
                flexShrink: 0,
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
              Add Interest
            </button>
          </>
        )}
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
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  position: "relative",
                }}
              >
                {interest}
                <button
                  onClick={() => removeInterest(index)}
                  style={{
                    background: "none",
                    border: "none",
                    color: isDarkMode ? "#e8e6e3" : "#1e293b",
                    cursor: "pointer",
                    padding: "0",
                    margin: "0",
                    fontSize: "14px",
                    fontWeight: "bold",
                    lineHeight: "1",
                    opacity: "0.6",
                    transition: "opacity 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "14px",
                    height: "14px",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.opacity = "1";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.opacity = "0.6";
                  }}
                  title="Remove interest"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
