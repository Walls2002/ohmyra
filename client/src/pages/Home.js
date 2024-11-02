import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Title from "../components/Title";
import { Link } from "react-router-dom";

function Home() {
  const [steps] = useState([
    {
      step: "Step 1",
      title: "Start a Conversation",
      message: "Click the Start a Conversation button to go to the chat page",
    },
    {
      step: "Step 2",
      title: "Find a Stranger",
      message: "Once there, click Chat to connect with an online stranger.",
    },
    {
      step: "Step 3",
      title: "Keep It Safe",
      message:
        "We prioritize privacy and safe conversations. Please respect each other, and have fun connecting!",
    },
  ]);

  return (
    <Container fluid="md">
      <Title title={"Home | Omhyra"} />
      <Row
        style={{
          alignItems: "center",
        }}
        className="d-md-flex d-block mb-5 pt-5"
      >
        <Col xs={12} md={7} className="pt-5 pt-md-0">
          <div
            style={{
              padding: "20px",
            }}
          >
            <h2 className="fs-1 text-center text-md-start">
              Your Gateway to Anonymous Connections!
            </h2>
            <div className="text-center text-md-start">
              <Link to="/Chat" style={{ textDecoration: "none" }}>
                <Button className="mt-4" variant="dark">
                  Start a Conversation Now!
                </Button>
              </Link>
            </div>
          </div>
        </Col>
        <Col xs={12} md={5} className="d-none d-md-block">
          <div
            style={{
              padding: "20px",
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/SVG/landingPage.svg`}
              alt="Landing Page"
            />
          </div>
        </Col>
      </Row>
      <div>
        <h2 className="text-center">How It Works</h2>
        <Row
          style={{
            alignItems: "center",
          }}
          className="d-lg-flex d-block align-items-stretch mb-5"
        >
          {steps.map((step, index) => {
            return (
              <Col
                md={12}
                lg={4}
                className="pt-5 d-flex justify-content-center "
                key={index}
              >
                <Card className="w-75 w-md-100  p-3 shadow rounded-lg hover-card">
                  <Card.Body>
                    <Card.Subtitle
                      style={{ fontWeight: "bold", fontSize: "18px" }}
                      className="mb-2 text-muted hover-title"
                    >
                      {step.step} - {step.title}
                    </Card.Subtitle>
                    <Card.Text className="hover-title">
                      {step.message}
                    </Card.Text>
                  </Card.Body>
                </Card>{" "}
              </Col>
            );
          })}
        </Row>
      </div>
    </Container>
  );
}

export default Home;
