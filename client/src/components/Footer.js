import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className="mt-sm py-4"
      style={{
        background: isDarkMode
          ? "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)"
          : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        borderTop: isDarkMode
          ? "1px solid rgba(160, 163, 189, 0.1)"
          : "1px solid rgba(203, 213, 225, 0.2)",
        marginTop: "60px",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <img
                src={`${process.env.PUBLIC_URL}/ohmyra_logo${
                  isDarkMode ? "_wht" : ""
                }.png`}
                alt="Ohmyra Logo"
                style={{
                  height: "32px",
                  marginRight: "12px",
                }}
              />
              <span
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: isDarkMode ? "#e8e6e3" : "#1e293b",
                }}
              >
                Ohmyra
              </span>
            </div>
            <p
              className="mb-0 mt-2 small"
              style={{
                color: isDarkMode ? "#a0a3bd" : "#64748b",
                fontSize: "0.9rem",
              }}
            >
              Connect anonymously, chat safely.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end align-items-center">
              <span
                className="small"
                style={{
                  color: isDarkMode ? "#a0a3bd" : "#64748b",
                  fontSize: "0.9rem",
                }}
              >
                © {new Date().getFullYear()} Ohmyra. All rights reserved.
              </span>
            </div>
            <div className="mt-2">
              <Link
                to="/privacy"
                className="text-decoration-none me-3"
                style={{
                  color: isDarkMode ? "#a0a3bd" : "#64748b",
                  fontSize: "0.85rem",
                  transition: "color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.color = isDarkMode ? "#e8e6e3" : "#1e293b";
                }}
                onMouseOut={(e) => {
                  e.target.style.color = isDarkMode ? "#a0a3bd" : "#64748b";
                }}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-decoration-none me-3"
                style={{
                  color: isDarkMode ? "#a0a3bd" : "#64748b",
                  fontSize: "0.85rem",
                  transition: "color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.color = isDarkMode ? "#e8e6e3" : "#1e293b";
                }}
                onMouseOut={(e) => {
                  e.target.style.color = isDarkMode ? "#a0a3bd" : "#64748b";
                }}
              >
                Terms of Service
              </Link>
              <button
                type="button"
                className="btn btn-link text-decoration-none p-0"
                style={{
                  color: isDarkMode ? "#a0a3bd" : "#64748b",
                  fontSize: "0.85rem",
                  transition: "color 0.3s ease",
                  border: "none",
                  background: "none",
                }}
                onMouseOver={(e) => {
                  e.target.style.color = isDarkMode ? "#e8e6e3" : "#1e293b";
                }}
                onMouseOut={(e) => {
                  e.target.style.color = isDarkMode ? "#a0a3bd" : "#64748b";
                }}
              >
                Contact
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
