import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

function Home() {
  const { isDarkMode } = useTheme();
  const [steps] = useState([
    {
      step: "Step 1",
      title: "Start a Conversation",
      message: "Click the Start a Conversation button to go to the chat page",
      icon: "🚀",
      color: "primary",
    },
    {
      step: "Step 2",
      title: "Find a Stranger",
      message: "Once there, click Chat to connect with an online stranger.",
      icon: "🔍",
      color: "success",
    },
    {
      step: "Step 3",
      title: "Keep It Safe",
      message:
        "We prioritize privacy and safe conversations. Please respect each other, and have fun connecting!",
      icon: "🛡️",
      color: "warning",
    },
  ]);

  return (
    <Container fluid="md">
      <Title title={"Home | Omhyra"} />

      {/* Hero Section */}
      <Row
        style={{
          alignItems: "center",
          minHeight: "80vh",
        }}
        className="d-md-flex d-block mb-5 pt-5"
      >
        <Col xs={12} md={7} className="pt-5 pt-md-0 d-md-block">
          <div
            style={{
              padding: "20px",
            }}
          >
            <div className="mb-3 d-flex d-md-block justify-content-center">
              <Badge
                className="px-3 py-2 fs-6 mb-3 "
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  border: "none",
                  borderRadius: "20px",
                }}
              >
                ✨ Anonymous Chat Platform
              </Badge>
            </div>
            <h1
              className="display-4 fw-bold text-center text-md-start mb-4"
              style={{
                color: isDarkMode
                  ? "linear-gradient(135deg, #a0a3bd 0%, #e8e6e3 50%, #c7d2fe 100%)"
                  : "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #312e81 100%)",
              }}
            >
              Your Gateway to Anonymous Connections!
            </h1>
            <p
              className="lead text-center text-md-start mb-4"
              style={{
                color: isDarkMode ? "#a0a3bd" : "#64748b",
              }}
            >
              Connect with strangers worldwide in a safe, anonymous environment.
              Share thoughts, make friends, and explore new perspectives.
            </p>
            <div className="text-center text-md-start">
              <Link to="/Chat" style={{ textDecoration: "none" }}>
                <Button
                  className="mt-4 px-5 py-3 fw-bold shadow-lg"
                  size="lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    border: "none",
                    borderRadius: "50px",
                    transition: "all 0.3s ease",
                    color: "#ffffff",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 10px 25px rgba(99, 102, 241, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
                  }}
                >
                  🚀 Start a Conversation Now!
                </Button>
              </Link>
            </div>
          </div>
        </Col>
        <Col xs={12} md={5} className="d-none d-md-block">
          <div
            style={{
              padding: "20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/SVG/landingPage.svg`}
                alt="Landing Page"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                }}
              />
            </div>
          </div>
        </Col>
      </Row>

      {/* How It Works Section */}
      <div style={{ marginTop: "100px" }}>
        <div className="text-center mb-5">
          <h2
            className="display-5 fw-bold mb-3"
            style={{
              color: isDarkMode
                ? "linear-gradient(135deg, #a0a3bd 0%, #e8e6e3 50%, #c7d2fe 100%)"
                : "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #312e81 100%)",
            }}
          >
            How It Works
          </h2>
          <p
            className="lead"
            style={{
              color: isDarkMode ? "#a0a3bd" : "#64748b",
            }}
          >
            Get started in just three simple steps
          </p>
        </div>
        <Row
          style={{
            alignItems: "stretch",
          }}
          className="d-lg-flex d-block mb-5"
        >
          {steps.map((step, index) => {
            return (
              <Col
                md={12}
                lg={4}
                className="pt-4 d-flex justify-content-center"
                key={index}
              >
                <Card
                  className="w-100 shadow-lg border-0"
                  style={{
                    borderRadius: "20px",
                    transition: "all 0.3s ease",
                    background: isDarkMode
                      ? "rgba(45, 55, 72, 0.8)"
                      : "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    border: isDarkMode
                      ? "1px solid rgba(160, 163, 189, 0.2)"
                      : "1px solid rgba(203, 213, 225, 0.3)",
                    minHeight: "280px",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(0,0,0,0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px rgba(0,0,0,0.3)";
                  }}
                >
                  <Card.Body className="text-center p-4 d-flex flex-column h-100">
                    <div className="mb-4">
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${
                            step.color === "primary"
                              ? "#6366f1, #8b5cf6"
                              : step.color === "success"
                              ? "#10b981, #34d399"
                              : "#ec4899, #f472b6"
                          })`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 20px",
                          fontSize: "2rem",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                        }}
                      >
                        {step.icon}
                      </div>
                      <Badge
                        className="px-3 py-2 mb-3"
                        style={{
                          borderRadius: "20px",
                          background: `linear-gradient(135deg, ${
                            step.color === "primary"
                              ? "#6366f1, #8b5cf6"
                              : step.color === "success"
                              ? "#10b981, #34d399"
                              : "#ec4899, #f472b6"
                          })`,
                          border: "none",
                          color: "#ffffff",
                        }}
                      >
                        {step.step}
                      </Badge>
                    </div>
                    <div className="flex-grow-1 d-flex flex-column justify-content-between">
                      <div>
                        <Card.Title
                          className="fw-bold mb-3"
                          style={{
                            fontSize: "1.3rem",
                            color: isDarkMode ? "#e8e6e3" : "#1e293b",
                          }}
                        >
                          {step.title}
                        </Card.Title>
                        <Card.Text
                          style={{
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            color: isDarkMode ? "#a0a3bd" : "#64748b",
                          }}
                        >
                          {step.message}
                        </Card.Text>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Call to Action Section */}
        <div
          className="text-center py-5 my-5"
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #2d3748 0%, #4a5568 100%)"
              : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
            borderRadius: "20px",
            color: isDarkMode ? "#e8e6e3" : "#1e293b",
            border: isDarkMode
              ? "1px solid rgba(160, 163, 189, 0.2)"
              : "1px solid rgba(203, 213, 225, 0.3)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
        >
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
            Join thousands of users already making meaningful connections
          </p>
          <Link to="/Chat" style={{ textDecoration: "none" }}>
            <Button
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
                e.target.style.boxShadow =
                  "0 10px 25px rgba(99, 102, 241, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
              }}
            >
              💬 Start Chatting Now
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Home;
