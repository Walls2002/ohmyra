import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Title from "../components/Title";
import { useTheme } from "../contexts/ThemeContext";

function PrivacyPolicy() {
  const { isDarkMode } = useTheme();

  return (
    <Container fluid="md">
      <Title title={"Privacy Policy | Ohmyra"} />

      {/* Header */}
      <Row className="justify-content-center py-5">
        <Col xs={12} lg={10}>
          <div className="text-center mb-5">
            <h1
              className="display-4 fw-bold mb-4"
              style={{
                color: isDarkMode
                  ? "linear-gradient(135deg, #a0a3bd 0%, #e8e6e3 50%, #c7d2fe 100%)"
                  : "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #312e81 100%)",
              }}
            >
              Privacy Policy
            </h1>
            <p
              className="lead"
              style={{
                color: isDarkMode ? "#a0a3bd" : "#64748b",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your information on Ohmyra.
            </p>
            <p
              className="small mt-3"
              style={{
                color: isDarkMode ? "#a0a3bd" : "#64748b",
              }}
            >
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </Col>
      </Row>

      {/* Privacy Policy Content */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} lg={10}>
          {/* Information We Collect */}
          <Card
            className="shadow-lg border-0 mb-4"
            style={{
              borderRadius: "20px",
              background: isDarkMode
                ? "rgba(45, 55, 72, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: isDarkMode
                ? "1px solid rgba(160, 163, 189, 0.2)"
                : "1px solid rgba(203, 213, 225, 0.3)",
            }}
          >
            <Card.Body className="p-5">
              <h2
                className="h4 fw-bold mb-4"
                style={{
                  color: isDarkMode ? "#e8e6e3" : "#1e293b",
                }}
              >
                🔍 Information We Collect
              </h2>
              <div style={{ color: isDarkMode ? "#a0a3bd" : "#64748b" }}>
                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  Anonymous Chat Data
                </h5>
                <ul className="mb-4">
                  <li>
                    Chat messages (stored temporarily for active conversations)
                  </li>
                  <li>Connection timestamps for session management</li>
                  <li>
                    Basic technical information for platform functionality
                  </li>
                </ul>

                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  What We DON'T Collect
                </h5>
                <ul>
                  <li>
                    <strong>No personal information</strong> - We don't require
                    names, emails, or phone numbers
                  </li>
                  <li>
                    <strong>No account creation</strong> - No usernames,
                    passwords, or profiles
                  </li>
                  <li>
                    <strong>No tracking cookies</strong> - We don't track your
                    browsing habits
                  </li>
                  <li>
                    <strong>No IP address logging</strong> - Your location
                    remains private
                  </li>
                </ul>
              </div>
            </Card.Body>
          </Card>

          {/* How We Use Information */}
          <Card
            className="shadow-lg border-0 mb-4"
            style={{
              borderRadius: "20px",
              background: isDarkMode
                ? "rgba(45, 55, 72, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: isDarkMode
                ? "1px solid rgba(160, 163, 189, 0.2)"
                : "1px solid rgba(203, 213, 225, 0.3)",
            }}
          >
            <Card.Body className="p-5">
              <h2
                className="h4 fw-bold mb-4"
                style={{
                  color: isDarkMode ? "#e8e6e3" : "#1e293b",
                }}
              >
                🛠️ How We Use Information
              </h2>
              <div style={{ color: isDarkMode ? "#a0a3bd" : "#64748b" }}>
                <p className="mb-3">
                  The minimal information we collect is used solely to:
                </p>
                <ul>
                  <li>Facilitate real-time chat connections between users</li>
                  <li>Maintain basic platform security and prevent abuse</li>
                  <li>Ensure proper functioning of the chat service</li>
                  <li>Comply with legal requirements when necessary</li>
                </ul>
                <p className="mt-3">
                  <strong>
                    We never sell, rent, or share your data with third parties
                    for marketing purposes.
                  </strong>
                </p>
              </div>
            </Card.Body>
          </Card>

          {/* Data Security */}
          <Card
            className="shadow-lg border-0 mb-4"
            style={{
              borderRadius: "20px",
              background: isDarkMode
                ? "rgba(45, 55, 72, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: isDarkMode
                ? "1px solid rgba(160, 163, 189, 0.2)"
                : "1px solid rgba(203, 213, 225, 0.3)",
            }}
          >
            <Card.Body className="p-5">
              <h2
                className="h4 fw-bold mb-4"
                style={{
                  color: isDarkMode ? "#e8e6e3" : "#1e293b",
                }}
              >
                🔒 Data Security & Retention
              </h2>
              <div style={{ color: isDarkMode ? "#a0a3bd" : "#64748b" }}>
                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  Security Measures
                </h5>
                <ul className="mb-4">
                  <li>
                    Encrypted connections (HTTPS/WSS) for all communications
                  </li>
                  <li>Regular security audits and updates</li>
                  <li>Limited data collection to minimize risk exposure</li>
                  <li>Secure server infrastructure with access controls</li>
                </ul>

                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  Data Retention
                </h5>
                <ul>
                  <li>
                    <strong>Chat messages:</strong> Stored only during active
                    conversations, deleted when chat ends
                  </li>
                  <li>
                    <strong>Session data:</strong> Automatically cleared when
                    you disconnect
                  </li>
                  <li>
                    <strong>No permanent records:</strong> We don't maintain
                    long-term chat histories
                  </li>
                </ul>
              </div>
            </Card.Body>
          </Card>

          {/* Your Rights */}
          <Card
            className="shadow-lg border-0 mb-4"
            style={{
              borderRadius: "20px",
              background: isDarkMode
                ? "rgba(45, 55, 72, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: isDarkMode
                ? "1px solid rgba(160, 163, 189, 0.2)"
                : "1px solid rgba(203, 213, 225, 0.3)",
            }}
          >
            <Card.Body className="p-5">
              <h2
                className="h4 fw-bold mb-4"
                style={{
                  color: isDarkMode ? "#e8e6e3" : "#1e293b",
                }}
              >
                ⚖️ Your Privacy Rights
              </h2>
              <div style={{ color: isDarkMode ? "#a0a3bd" : "#64748b" }}>
                <p className="mb-3">
                  Since we operate on an anonymous basis, traditional data
                  rights like access, portability, and deletion are largely
                  irrelevant. However, you have the right to:
                </p>
                <ul>
                  <li>Use our service completely anonymously</li>
                  <li>
                    Disconnect at any time, automatically clearing your session
                    data
                  </li>
                  <li>Contact us with privacy concerns or questions</li>
                  <li>Request information about our privacy practices</li>
                </ul>
              </div>
            </Card.Body>
          </Card>

          {/* Third-Party Services */}
          <Card
            className="shadow-lg border-0 mb-4"
            style={{
              borderRadius: "20px",
              background: isDarkMode
                ? "rgba(45, 55, 72, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: isDarkMode
                ? "1px solid rgba(160, 163, 189, 0.2)"
                : "1px solid rgba(203, 213, 225, 0.3)",
            }}
          >
            <Card.Body className="p-5">
              <h2
                className="h4 fw-bold mb-4"
                style={{
                  color: isDarkMode ? "#e8e6e3" : "#1e293b",
                }}
              >
                🔗 Third-Party Services
              </h2>
              <div style={{ color: isDarkMode ? "#a0a3bd" : "#64748b" }}>
                <p>Our service may use essential third-party services for:</p>
                <ul className="mb-3">
                  <li>
                    <strong>Hosting & Infrastructure:</strong> Secure server
                    hosting providers
                  </li>
                  <li>
                    <strong>Security:</strong> DDoS protection and basic
                    security services
                  </li>
                  <li>
                    <strong>Analytics:</strong> Basic, anonymized usage
                    statistics (no personal data)
                  </li>
                </ul>
                <p>
                  These services are carefully selected and bound by strict data
                  protection agreements.
                </p>
              </div>
            </Card.Body>
          </Card>

          {/* Updates & Contact */}
          <Card
            className="shadow-lg border-0 mb-4"
            style={{
              borderRadius: "20px",
              background: isDarkMode
                ? "rgba(45, 55, 72, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: isDarkMode
                ? "1px solid rgba(160, 163, 189, 0.2)"
                : "1px solid rgba(203, 213, 225, 0.3)",
            }}
          >
            <Card.Body className="p-5">
              <h2
                className="h4 fw-bold mb-4"
                style={{
                  color: isDarkMode ? "#e8e6e3" : "#1e293b",
                }}
              >
                📞 Updates & Contact
              </h2>
              <div style={{ color: isDarkMode ? "#a0a3bd" : "#64748b" }}>
                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  Policy Updates
                </h5>
                <p className="mb-4">
                  We may update this privacy policy occasionally. When we do,
                  we'll update the "last updated" date at the top of this page.
                  Significant changes will be communicated through platform
                  notifications.
                </p>

                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  Contact Us
                </h5>
                <p>
                  If you have questions about this privacy policy or our
                  practices, please contact us at:
                </p>
                <p className="mb-0">
                  <strong>Email:</strong> privacy@ohmyra.com
                  <br />
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://wally-gaynor.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#6366f1",
                      textDecoration: "none",
                    }}
                  >
                    Developer Portfolio
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PrivacyPolicy;
