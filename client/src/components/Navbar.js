import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom"; // Import Link from react-router-dom
export default function NavBar() {
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary"
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={`${process.env.PUBLIC_URL}/ohmyra_logo_wht.png`}
            alt="logo"
            height={40}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Home">Home</Nav.Link>
            <Nav.Link href="/Chat">Chat</Nav.Link>
            <Nav.Link href="/About">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
