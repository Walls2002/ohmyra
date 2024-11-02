import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar({ socket }) {
  const [totalUser, SetTotalUser] = useState([]);

  // socket.on("total_online _user", (data) => {
  //   SetTotalUser(data.total_user);
  // });

  useEffect(() => {
    console.log("TOTAL USER", totalUser);

    const getTotalUser = (data) => {
      SetTotalUser(data.total_user);
    };

    socket.on("total_online_user", getTotalUser);

    // Emit a request every second
    const interval = setInterval(() => {
      socket.emit("request_total_online_user"); // Emit a request to the server for the latest data
    }, 5000);
    // Emit a request to the server for the latest data

    return () => {
      clearInterval(interval);
      socket.off("total_online_user", getTotalUser);
    };
  }, [socket]);

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary"
      sticky="top"
    >
      <Container>
        <Nav.Link href="/Home">
          <Navbar.Brand>
            <img
              src={`${process.env.PUBLIC_URL}/ohmyra_logo_wht.png`}
              alt="logo"
              height={40}
            />
          </Navbar.Brand>
        </Nav.Link>
        <div className="d-flex align-items-center">
          <span
            className="d-lg-none d-block "
            style={{
              color: "white",
              marginRight: "10px",
              fontWeight: "bold",
              fontSize: "13px",
            }}
          >
            Online Users : {totalUser.length}
          </span>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Home">Home</Nav.Link>
            <Nav.Link href="/Chat">Chat</Nav.Link>
            {/* <Nav.Link href="/About">About</Nav.Link> */}
          </Nav>
          <span
            className="d-none d-lg-block"
            style={{ color: "white", fontWeight: "bold" }}
          >
            Online Users : {totalUser.length}
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
