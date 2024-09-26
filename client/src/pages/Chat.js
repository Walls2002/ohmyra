import { useState } from "react";
import io from "socket.io-client";
import { Container, Row, Col, Button } from "react-bootstrap";
import ChatBox from "../components/Chatbox";

const socket = io.connect("http://localhost:3001");

function Chat() {
  return (
    <Container>
      <ChatBox socket={socket} />
    </Container>
  );
}

export default Chat;
