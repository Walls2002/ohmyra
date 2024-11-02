import { useState } from "react";
import io from "socket.io-client";
import { Container, Row, Col, Button } from "react-bootstrap";
import ChatBox from "../components/Chatbox";

function Chat({ socket }) {
  return (
    <Container>
      <ChatBox socket={socket} />
    </Container>
  );
}

export default Chat;
