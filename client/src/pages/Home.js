import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Title from "../components/Title";
import { Link } from "react-router-dom";
function Home() {
  return (
    <Container fluid="md">
      <Title title={"Home | Omhyra"} />
      <Row
        style={{
          height: "70vh",
          alignItems: "center",
        }}
        className="d-md-flex d-block"
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
    </Container>
  );
}

export default Home;
