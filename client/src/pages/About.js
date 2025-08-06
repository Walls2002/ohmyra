import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import Title from "../components/Title";
import { useTheme } from "../contexts/ThemeContext";

function About() {
  const { isDarkMode } = useTheme();

  return (
    <Container fluid="md">
      <Title title={"About | Ohmyra"} />

      {/* Hero Section */}
      <Row className="justify-content-center py-5">
        <Col xs={12} lg={10}>
          <div className="text-center mb-5">
            <div className="mb-4">
              <img
                src={`${process.env.PUBLIC_URL}/ohmyra_logo${
                  isDarkMode ? "_wht" : ""
                }.png`}
                alt="Ohmyra Logo"
                style={{
                  height: "80px",
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))",
                }}
              />
            </div>
            <h1
              className="display-4 fw-bold mb-4"
              style={{
                color: isDarkMode
                  ? "linear-gradient(135deg, #a0a3bd 0%, #e8e6e3 50%, #c7d2fe 100%)"
                  : "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #312e81 100%)",
              }}
            >
              About Ohmyra
            </h1>
            <p
              className="lead"
              style={{
                color: isDarkMode ? "#a0a3bd" : "#64748b",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              A modern, anonymous chat platform designed to bring people
              together from around the world in a safe and welcoming
              environment.
            </p>
          </div>
        </Col>
      </Row>

      {/* Platform Story Section */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} lg={10}>
          <Card
            className="shadow-lg border-0 mb-5"
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
                className="h3 fw-bold mb-4"
                style={{
                  color: isDarkMode ? "#e8e6e3" : "#1e293b",
                }}
              >
                🌍 Our Mission
              </h2>
              <p
                style={{
                  color: isDarkMode ? "#a0a3bd" : "#64748b",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                }}
              >
                Ohmyra was created with the vision of connecting people across
                the globe while maintaining complete anonymity and privacy. In
                today's digital world, meaningful conversations can be hard to
                come by. We wanted to create a space where people can share
                thoughts, seek advice, make friends, and explore different
                perspectives without the barriers of identity, judgment, or
                social constraints.
              </p>
              <p
                style={{
                  color: isDarkMode ? "#a0a3bd" : "#64748b",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                }}
              >
                Our platform prioritizes safety, respect, and genuine human
                connection. Whether you're looking for someone to talk to,
                seeking different viewpoints, or simply want to make new
                friends, Ohmyra provides a secure environment for authentic
                conversations.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} lg={10}>
          <h2
            className="h3 fw-bold text-center mb-5"
            style={{
              color: isDarkMode ? "#e8e6e3" : "#1e293b",
            }}
          >
            ✨ What Makes Ohmyra Special
          </h2>
          <Row>
            <Col md={6} lg={4} className="mb-4">
              <Card
                className="h-100 border-0 text-center"
                style={{
                  borderRadius: "15px",
                  background: isDarkMode
                    ? "rgba(45, 55, 72, 0.6)"
                    : "rgba(255, 255, 255, 0.7)",
                  border: isDarkMode
                    ? "1px solid rgba(160, 163, 189, 0.1)"
                    : "1px solid rgba(203, 213, 225, 0.2)",
                }}
              >
                <Card.Body className="p-4">
                  <div
                    className="mb-3"
                    style={{
                      fontSize: "2.5rem",
                    }}
                  >
                    🔒
                  </div>
                  <h5
                    style={{
                      color: isDarkMode ? "#e8e6e3" : "#1e293b",
                    }}
                  >
                    Complete Anonymity
                  </h5>
                  <p
                    style={{
                      color: isDarkMode ? "#a0a3bd" : "#64748b",
                    }}
                  >
                    No registration required. Chat without revealing your
                    identity.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <Card
                className="h-100 border-0 text-center"
                style={{
                  borderRadius: "15px",
                  background: isDarkMode
                    ? "rgba(45, 55, 72, 0.6)"
                    : "rgba(255, 255, 255, 0.7)",
                  border: isDarkMode
                    ? "1px solid rgba(160, 163, 189, 0.1)"
                    : "1px solid rgba(203, 213, 225, 0.2)",
                }}
              >
                <Card.Body className="p-4">
                  <div
                    className="mb-3"
                    style={{
                      fontSize: "2.5rem",
                    }}
                  >
                    🌐
                  </div>
                  <h5
                    style={{
                      color: isDarkMode ? "#e8e6e3" : "#1e293b",
                    }}
                  >
                    Global Connections
                  </h5>
                  <p
                    style={{
                      color: isDarkMode ? "#a0a3bd" : "#64748b",
                    }}
                  >
                    Connect with people from different cultures and backgrounds.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} lg={4} className="mb-4">
              <Card
                className="h-100 border-0 text-center"
                style={{
                  borderRadius: "15px",
                  background: isDarkMode
                    ? "rgba(45, 55, 72, 0.6)"
                    : "rgba(255, 255, 255, 0.7)",
                  border: isDarkMode
                    ? "1px solid rgba(160, 163, 189, 0.1)"
                    : "1px solid rgba(203, 213, 225, 0.2)",
                }}
              >
                <Card.Body className="p-4">
                  <div
                    className="mb-3"
                    style={{
                      fontSize: "2.5rem",
                    }}
                  >
                    🛡️
                  </div>
                  <h5
                    style={{
                      color: isDarkMode ? "#e8e6e3" : "#1e293b",
                    }}
                  >
                    Safe Environment
                  </h5>
                  <p
                    style={{
                      color: isDarkMode ? "#a0a3bd" : "#64748b",
                    }}
                  >
                    Moderated platform ensuring respectful and safe
                    conversations.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Creator Section */}
      <Row className="justify-content-center">
        <Col xs={12} lg={10}>
          <Card
            className="shadow-lg border-0"
            style={{
              borderRadius: "20px",
              background: isDarkMode
                ? "linear-gradient(135deg, #2d3748 0%, #4a5568 100%)"
                : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
              border: isDarkMode
                ? "1px solid rgba(160, 163, 189, 0.2)"
                : "1px solid rgba(203, 213, 225, 0.3)",
            }}
          >
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <Badge
                  className="px-3 py-2 fs-6 mb-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    border: "none",
                    borderRadius: "20px",
                  }}
                >
                  👨‍💻 Meet the Creator
                </Badge>
              </div>
              <Row className="align-items-center">
                <Col md={8}>
                  <h3
                    className="fw-bold mb-3"
                    style={{
                      color: isDarkMode ? "#e8e6e3" : "#1e293b",
                    }}
                  >
                    Wally Gaynor
                  </h3>
                  <p
                    style={{
                      color: isDarkMode ? "#a0a3bd" : "#64748b",
                      fontSize: "1.1rem",
                      lineHeight: "1.7",
                      marginBottom: "1.5rem",
                    }}
                  >
                    I'm a passionate full-stack developer who believes in the
                    power of technology to bring people together. Ohmyra was
                    born from my desire to create a platform where genuine human
                    connections can flourish without the barriers that often
                    exist in traditional social media.
                  </p>
                  <p
                    style={{
                      color: isDarkMode ? "#a0a3bd" : "#64748b",
                      fontSize: "1.1rem",
                      lineHeight: "1.7",
                    }}
                  >
                    With a focus on privacy, safety, and user experience, I've
                    crafted Ohmyra to be more than just another chat platform
                    it's a space for meaningful conversations and authentic
                    connections.
                  </p>
                </Col>
                <Col md={4} className="text-center">
                  <div className="mb-4">
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                        fontSize: "3rem",
                        boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
                      }}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/img/developer.jpg`}
                        alt="Wally Gaynor"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-grid gap-2">
                    <Button
                      href="https://wally-gaynor.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background:
                          "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                        border: "none",
                        borderRadius: "25px",
                        color: "#ffffff",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow =
                          "0 10px 25px rgba(99, 102, 241, 0.4)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
                      }}
                    >
                      🔗 View Portfolio
                    </Button>
                    <Button
                      href="https://github.com/Walls2002"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline-primary"
                      style={{
                        borderRadius: "25px",
                        fontWeight: "600",
                        borderColor: "#6366f1",
                        color: "#6366f1",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#6366f1";
                        e.target.style.color = "#ffffff";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#6366f1";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      <img
                        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                        alt="GitHub"
                        style={{ width: "20px", height: "20px" }}
                      />{" "}
                      GitHub Profile
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Call to Action */}
      <Row className="justify-content-center mt-5 mb-5">
        <Col xs={12} lg={8} className="text-center">
          <h3
            className="fw-bold mb-3"
            style={{
              color: isDarkMode ? "#e8e6e3" : "#1e293b",
            }}
          >
            Ready to Connect?
          </h3>
          <p
            className="lead mb-4"
            style={{
              color: isDarkMode ? "#a0a3bd" : "#64748b",
            }}
          >
            Join the Ohmyra community and start meaningful conversations today!
          </p>
          <Button
            href="/Chat"
            size="lg"
            className="px-5 py-3 fw-bold"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              border: "none",
              borderRadius: "50px",
              transition: "all 0.3s ease",
              color: "#ffffff",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 10px 25px rgba(99, 102, 241, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
            }}
          >
            💬 Start Chatting Now
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
