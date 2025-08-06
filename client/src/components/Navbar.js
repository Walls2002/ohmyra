import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function NavBar({ socket }) {
  const [totalUser, SetTotalUser] = useState([]);
  const { isDarkMode, toggleTheme } = useTheme();

  // socket.on("total_online _user", (data) => {
  //   SetTotalUser(data.total_user);
  // });

  useEffect(() => {
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
      expand="lg"
      className="shadow-lg"
      sticky="top"
      style={{
        background: isDarkMode
          ? "rgba(45, 55, 72, 0.95)"
          : "rgba(248, 250, 252, 0.95)",
        backdropFilter: "blur(20px)",
        border: "none",
        borderBottom: isDarkMode
          ? "1px solid rgba(160, 163, 189, 0.2)"
          : "1px solid rgba(203, 213, 225, 0.3)",
        padding: "12px 0",
      }}
    >
      <Container>
        <Link
          to="/home"
          style={{
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <Navbar.Brand style={{ margin: 0 }}>
            <img
              src={
                isDarkMode
                  ? `${process.env.PUBLIC_URL}/ohmyra_logo_wht.png`
                  : `${process.env.PUBLIC_URL}/ohmyra_logo.png`
              }
              alt="logo"
              height={40}
              style={{
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
                transition: "all 0.3s ease",
              }}
              onClick={() => {
                socket.emit("disconnect_chat");
              }}
            />
          </Navbar.Brand>
        </Link>

        <div className="d-flex align-items-center">
          <div
            className="d-lg-none d-flex align-items-center"
            style={{
              marginRight: "15px",
            }}
          >
            {/* Theme Toggle Button - Mobile */}
            <Button
              variant="outline-light"
              size="sm"
              onClick={toggleTheme}
              className="me-2"
              style={{
                border: isDarkMode
                  ? "1px solid rgba(160, 163, 189, 0.3)"
                  : "1px solid rgba(100, 116, 139, 0.3)",
                borderRadius: "20px",
                padding: "6px 10px",
                background: isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(100, 116, 139, 0.1)",
                color: isDarkMode ? "#e8e6e3" : "#1e293b",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
                fontWeight: "500",
              }}
              onMouseOver={(e) => {
                e.target.style.background = isDarkMode
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(100, 116, 139, 0.2)";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(100, 116, 139, 0.1)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </Button>

            <Badge
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
                border: "none",
                borderRadius: "20px",
                padding: "8px 12px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  animation: "pulse 2s infinite",
                }}
              ></span>
              {totalUser.length} Online
            </Badge>
          </div>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{
              border: isDarkMode
                ? "1px solid rgba(160, 163, 189, 0.3)"
                : "1px solid rgba(100, 116, 139, 0.3)",
              borderRadius: "8px",
              padding: "6px 8px",
            }}
          />
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{ marginLeft: "20px" }}>
            <Link
              to="/home"
              style={{
                color: isDarkMode ? "#e8e6e3" : "#1e293b",
                fontWeight: "500",
                padding: "8px 16px",
                borderRadius: "10px",
                margin: "0 4px",
                transition: "all 0.3s ease",
                textDecoration: "none",
              }}
              onMouseOver={(e) => {
                e.target.style.background = isDarkMode
                  ? "rgba(99, 102, 241, 0.2)"
                  : "rgba(99, 102, 241, 0.1)";
                e.target.style.color = isDarkMode ? "#c7d2fe" : "#4338ca";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = isDarkMode ? "#e8e6e3" : "#1e293b";
                e.target.style.transform = "translateY(0)";
              }}
              onClick={() => {
                socket.emit("disconnect_chat");
              }}
            >
              🏠 Home
            </Link>
            <Link
              to="/chat"
              style={{
                color: isDarkMode ? "#e8e6e3" : "#1e293b",
                fontWeight: "500",
                padding: "8px 16px",
                borderRadius: "10px",
                margin: "0 4px",
                transition: "all 0.3s ease",
                textDecoration: "none",
              }}
              onMouseOver={(e) => {
                e.target.style.background = isDarkMode
                  ? "rgba(99, 102, 241, 0.2)"
                  : "rgba(99, 102, 241, 0.1)";
                e.target.style.color = isDarkMode ? "#c7d2fe" : "#4338ca";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = isDarkMode ? "#e8e6e3" : "#1e293b";
                e.target.style.transform = "translateY(0)";
              }}
            >
              💬 Chat
            </Link>
            <Link
              to="/about"
              style={{
                color: isDarkMode ? "#e8e6e3" : "#1e293b",
                fontWeight: "500",
                padding: "8px 16px",
                borderRadius: "10px",
                margin: "0 4px",
                transition: "all 0.3s ease",
                textDecoration: "none",
              }}
              onMouseOver={(e) => {
                e.target.style.background = isDarkMode
                  ? "rgba(99, 102, 241, 0.2)"
                  : "rgba(99, 102, 241, 0.1)";
                e.target.style.color = isDarkMode ? "#c7d2fe" : "#4338ca";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = isDarkMode ? "#e8e6e3" : "#1e293b";
                e.target.style.transform = "translateY(0)";
              }}
              onClick={() => {
                socket.emit("disconnect_chat");
              }}
            >
              ℹ️ About
            </Link>
            {/* <Nav.Link href="/About">About</Nav.Link> */}
          </Nav>

          <div className="d-none d-lg-flex align-items-center">
            {/* Theme Toggle Button - Always visible */}
            <Button
              variant="outline-light"
              size="sm"
              onClick={toggleTheme}
              className="me-3"
              style={{
                border: isDarkMode
                  ? "1px solid rgba(160, 163, 189, 0.3)"
                  : "1px solid rgba(100, 116, 139, 0.3)",
                borderRadius: "25px",
                padding: "8px 12px",
                background: isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(100, 116, 139, 0.1)",
                color: isDarkMode ? "#e8e6e3" : "#1e293b",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                fontWeight: "500",
              }}
              onMouseOver={(e) => {
                e.target.style.background = isDarkMode
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(100, 116, 139, 0.2)";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(100, 116, 139, 0.1)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </Button>

            <Badge
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
                border: "none",
                borderRadius: "25px",
                padding: "10px 16px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  animation: "pulse 2s infinite",
                }}
              ></span>
              {totalUser.length} Users Online
            </Badge>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
