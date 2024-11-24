import React from "react";
import InterestBox from "../components/InterestBox";

export function IntroMessage({ socket }) {
  return (
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
          We’re thrilled to have you here. Why not take a moment to dive into a
          fun conversation with a stranger? Connecting with new people can lead
          to exciting discoveries and unexpected friendships. So go ahead, say
          hello, and let the conversation begin!
        </p>
        <InterestBox socket={socket} />
      </div>
    </div>
  );
}
export function FindingUserMessage({ loadMessage = "" }) {
  return <div style={{ color: "#585d63" }}>{loadMessage}</div>;
}

export function ConnectedUserMessage({ interest }) {
  return (
    <p style={{ color: "#585d63", margin: 0 }} className="text-center">
      <span style={{ color: "#198754" }} className="fw-bold">
        Success!
      </span>{" "}
      {interest !== "" ? (
        <span>
          {" "}
          You are now connected to a user with the same interest:{" "}
          <strong>{interest.join(" ").toUpperCase()}</strong>.
        </span>
      ) : (
        <span>
          {" "}
          You are now connected to a random user. Dive into the conversation and
          have fun!
        </span>
      )}
    </p>
  );
}

export function DicsonnectedUserMessage({ socket }) {
  return (
    <div>
      <p
        style={{ color: "#585d63", margin: 0, marginBottom: "15px" }}
        className="text-center"
      >
        The connection has been lost as one of the users has{" "}
        <span style={{ color: "#dc3545" }} className="fw-bold">
          disconnected
        </span>
        . You can start a new conversation anytime!
      </p>
      <InterestBox socket={socket} />
    </div>
  );
}
export function TypingUserMessage({ isTyping }) {
  return (
    <p
      style={{ color: "#585d63", fontWeight: "bolder" }}
      className="text-center"
    >
      {isTyping}
    </p>
  );
}
