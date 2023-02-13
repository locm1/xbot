
import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, ListGroup } from 'react-bootstrap';

export const PurchaseTimeForm = (props) => {
  const { title, visitCount } = props;
  
  const purchases = [
    {"name": "来店回数", "value": visitCount},
    {"name": "購入回数", "value": 0},
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
    <>
      <h2 className="fs-5 fw-bold mb-0">
        {title}
      </h2>
      <ListGroup className="list-group-flush">
        {purchases.map((purchase, k) => <PurchaseItem key={`purchaser-${k}`} {...purchase} />)}
      </ListGroup>
    </>
  );
};