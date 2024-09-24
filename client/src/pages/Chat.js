import { useState } from "react";
import io from "socket.io-client";
import { Container, Row, Col, Button } from "react-bootstrap";
import ChatBox from "../components/Chatbox";
const socket = io.connect("http://localhost:3001");

function Chat() {
  const [name, setname] = useState("");
  const [room, setroom] = useState("");

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <Container>
      <div>
        <input
          placeholder="Name"
          onChange={(event) => {
            setname(event.target.value);
          }}
        />
        <input
          placeholder="Room"
          onChange={(event) => {
            setroom(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join</button>
      </div>

      <ChatBox socket={socket} room={room} username={name} />
    </Container>
  );
}

export default Chat;
