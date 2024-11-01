import React from "react";

function ConversationList({ messageList = [], socketIds = [] }) {
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
    </div>
  );
}

export default ConversationList;
