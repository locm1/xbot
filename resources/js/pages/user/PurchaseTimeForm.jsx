
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, ListGroup } from 'react-bootstrap';

export const PurchaseTimeForm = (props) => {
  const { title } = props;
  const purchases = [
    {"id": 1, "name": "来店回数", "value": 0},
    {"id": 2, "name": "ポイント", "value": 0},
    {"id": 3, "name": "購入回数", "value": 0},
  ]

  const PurchaseItem = (props) => {
    const { name, value } = props;

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row className="align-items-center">
          <Col xs="auto">
            <h4 className="fs-6 text-dark mb-0">{name}</h4>
          </Col>
          <Col className="text-end">
            <span className="fs-6 fw-bolder text-dark">
              {value}
            </span>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <Card border="0" className="shadow">
      <Card.Header className="border-bottom">
        <h2 className="fs-5 fw-bold mb-0">
          {title}
        </h2>
      </Card.Header>
      <Card.Body className="py-0">
        <ListGroup className="list-group-flush">
          {purchases.map(purchase => <PurchaseItem key={`purchaser-${purchase.id}`} {...purchase} />)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};