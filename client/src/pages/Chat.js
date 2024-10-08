import { useState } from "react";
import io from "socket.io-client";
import { Container, Row, Col, Button } from "react-bootstrap";
import ChatBox from "../components/Chatbox";

const LOCAL_PORT = process.env.REACT_APP_LOCAL_PORT;
const PROD_PORT = process.env.REACT_APP_PROD_HOST;
console.log(PROD_PORT);
const socket = io.connect("https://ohmyra.onrender.com/");

function Chat() {
  return (
    <Container>
      <ChatBox socket={socket} />
    </Container>
  );
}

export default Chat;
