
import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { Col, Row, Image, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ErrorImage from "@img/img/illustrations/500.svg";


export default () => {
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} lg={5} className="order-2 order-lg-1 text-center text-lg-start">
              <h1 className="mt-5">
                500 Internal Server <span className="fw-bolder">Error</span>
              </h1>
            </Col>
            <Col xs={12} lg={7} className="order-1 order-lg-2 text-center d-flex align-items-center justify-content-center">
              <Image src={ErrorImage} className="img-fluid w-75" />
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
