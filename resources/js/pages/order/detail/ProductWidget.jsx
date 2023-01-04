
import React, { useState } from "react";
import { Col, Row, Card, Form, Badge, Image, Button, ListGroup, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';

export const ProductWidget = (props) => {
  const { details, title } = props;

  const ProductWidgetItem = (props) => {
    const { title, value, image } = props;

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row className="align-items-center">
          {image && (
            <Col xs="auto">
              <Card.Link href="#" className="avatar-md">
                <Image rounded src={image} className="m-0" />
              </Card.Link>
            </Col>
          )}
          <Col xs="auto" className="px-0">
            <h4 className="fs-6 text-dark mb-0">{title}</h4>
          </Col>
          <Col className="text-end">
            <span className="fs-6 fw-bolder text-dark">{value}</span>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <Card border="0" className="shadow">
      <Card.Header className="">
        <h2 className="fs-5 fw-bold mb-0">{title}</h2>
      </Card.Header>
      <Card.Body className="py-0">
        <ListGroup className="list-group-flush">
          {details.map(detail => <ProductWidgetItem key={`detail-${detail.id}`} {...detail} />)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};