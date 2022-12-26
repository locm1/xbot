
import React, { useState } from "react";
import { Col, Row, Card, Form, Badge, Image, Button, ListGroup, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import authorEarnings from "@/data/authorEarnings";

export const OrderInformation = (props) => {
  const { ordererInformations } = props;

  const OrderInformationItem = (props) => {
    const { title, value } = props;

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row className="align-items-center">
          {/* <Col xs="auto">
            <Card.Link href="#" className="avatar-md">
              <Image rounded src={image} className="m-0" />
            </Card.Link>
          </Col> */}
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
      <Card.Header className="border-bottom">
        <h2 className="fs-5 fw-bold mb-0">注文者情報</h2>
      </Card.Header>
      <Card.Body className="py-0">
        <ListGroup className="list-group-flush">
          {ordererInformations.map(ordererInformation => <OrderInformationItem key={`ordererInformation-${ordererInformation.id}`} {...ordererInformation} />)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};