import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Title from "../components/Title";
import { useTheme } from "../contexts/ThemeContext";

function TermsOfService() {
  const { isDarkMode } = useTheme();

  return (
    <Container fluid="md">
      <Title title={"Terms of Service | Ohmyra"} />

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
              Terms of Service
            </h1>
            <p
              className="lead"
              style={{
                color: isDarkMode ? "#a0a3bd" : "#64748b",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Please read these terms carefully before using Ohmyra. By
              accessing our service, you agree to be bound by these terms.
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

      {/* Terms Content */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} lg={10}>
          {/* Acceptance of Terms */}
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
                📋 Acceptance of Terms
              </h2>
              <div style={{ color: isDarkMode ? "#a0a3bd" : "#64748b" }}>
                <p>
                  By accessing and using Ohmyra ("the Service"), you accept and
                  agree to be bound by the terms and provision of this
                  agreement. If you do not agree to abide by the above, please
                  do not use this service.
                </p>
                <p className="mb-0">
                  These Terms of Service apply to all users of the Service,
                  including without limitation users who are visitors, browsers,
                  and contributors of content.
                </p>
              </div>
            </Card.Body>
          </Card>

          {/* Service Description */}
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
                🌐 Service Description
              </h2>
              <div style={{ color: isDarkMode ? "#a0a3bd" : "#64748b" }}>
                <p>
                  Ohmyra is an anonymous chat platform that connects users from
                  around the world for real-time conversations. The Service
                  allows users to:
                </p>
                <ul className="mb-3">
                  <li>Participate in anonymous text-based conversations</li>
                  <li>Connect with random users globally</li>
                  <li>
                    Engage in discussions without revealing personal identity
                  </li>
                </ul>
                <p className="mb-0">
                  The Service is provided "as is" and we reserve the right to
                  modify, suspend, or discontinue any aspect of the Service at
                  any time without notice.
                </p>
              </div>
            </Card.Body>
          </Card>

          {/* User Conduct */}
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
                👤 User Conduct & Prohibited Activities
              </h2>
              <div style={{ color: isDarkMode ? "#a0a3bd" : "#64748b" }}>
                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  You agree to use the Service responsibly and NOT to:
                </h5>
                <ul className="mb-4">
                  <li>Share harmful, offensive, or illegal content</li>
                  <li>Harass, threaten, or abuse other users</li>
                  <li>Share personal information (yours or others')</li>
                  <li>
                    Engage in spam, advertising, or commercial solicitation
                  </li>
                  <li>Use the Service for any unlawful purpose</li>
                  <li>Attempt to hack, disrupt, or overload the Service</li>
                  <li>
                    Share content that violates intellectual property rights
                  </li>
                  <li>Impersonate others or provide false information</li>
                  <li>
                    Share explicit adult content or engage in sexual conduct
                  </li>
                  <li>Promote hate speech, discrimination, or violence</li>
                </ul>

                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  Consequences
                </h5>
                <p className="mb-0">
                  Violation of these rules may result in immediate disconnection
                  from the Service and potential blocking of access. We reserve
                  the right to take appropriate action against users who violate
                  these terms.
                </p>
              </div>
            </Card.Body>
          </Card>

          {/* Content & Privacy */}
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
                💬 Content & Privacy
              </h2>
              <div style={{ color: isDarkMode ? "#a0a3bd" : "#64748b" }}>
                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  Your Content
                </h5>
                <p className="mb-3">
                  You retain ownership of any content you share through the
                  Service. However, by using the Service, you grant us a limited
                  license to transmit and display your messages to facilitate
                  the chat functionality.
                </p>

                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  Content Moderation
                </h5>
                <p className="mb-3">
                  While we strive to maintain a safe environment, we do not
                  pre-screen all content. Users are encouraged to report
                  inappropriate behavior. We reserve the right to remove content
                  or disconnect users who violate our terms.
                </p>

                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  No Permanent Storage
                </h5>
                <p className="mb-0">
                  Chat messages are not permanently stored. Conversations exist
                  only during active sessions and are deleted when the chat
                  ends.
                </p>
              </div>
            </Card.Body>
          </Card>

          {/* Disclaimers */}
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
                ⚠️ Disclaimers & Limitations
              </h2>
              <div style={{ color: isDarkMode ? "#a0a3bd" : "#64748b" }}>
                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  Service Availability
                </h5>
                <p className="mb-3">
                  We do not guarantee that the Service will be available at all
                  times. The Service may be temporarily unavailable due to
                  maintenance, updates, or technical issues.
                </p>

                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  User Interactions
                </h5>
                <p className="mb-3">
                  We are not responsible for the content, behavior, or actions
                  of other users. Use caution when interacting with strangers
                  and never share personal information.
                </p>

                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  Limitation of Liability
                </h5>
                <p className="mb-0">
                  To the fullest extent permitted by law, Ohmyra and its
                  creators shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages resulting from
                  your use of the Service.
                </p>
              </div>
            </Card.Body>
          </Card>

          {/* Age Requirements */}
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
                🔞 Age Requirements
              </h2>
              <div style={{ color: isDarkMode ? "#a0a3bd" : "#64748b" }}>
                <p>
                  The Service is intended for users who are at least 13 years
                  old. If you are under 13, you may not use the Service. If you
                  are between 13 and 18, you may only use the Service with
                  parental or guardian supervision and consent.
                </p>
                <p className="mb-0">
                  By using the Service, you represent that you meet these age
                  requirements.
                </p>
              </div>
            </Card.Body>
          </Card>

          {/* Changes & Contact */}
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
                📞 Changes & Contact
              </h2>
              <div style={{ color: isDarkMode ? "#a0a3bd" : "#64748b" }}>
                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  Changes to Terms
                </h5>
                <p className="mb-4">
                  We reserve the right to modify these Terms of Service at any
                  time. Changes will be effective immediately upon posting. Your
                  continued use of the Service after changes are posted
                  constitutes acceptance of the modified terms.
                </p>

                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  Governing Law
                </h5>
                <p className="mb-4">
                  These Terms of Service are governed by and construed in
                  accordance with applicable laws. Any disputes arising from
                  these terms or your use of the Service will be subject to the
                  jurisdiction of appropriate courts.
                </p>

                <h5
                  className="fw-semibold mb-3"
                  style={{ color: isDarkMode ? "#e8e6e3" : "#1e293b" }}
                >
                  Contact Information
                </h5>
                <p className="mb-0">
                  If you have questions about these Terms of Service, please
                  contact us at:
                  <br />
                  <strong>Email:</strong> terms@ohmyra.com
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

export default TermsOfService;
