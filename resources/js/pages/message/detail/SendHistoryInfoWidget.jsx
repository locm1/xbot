
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, ListGroup, Badge } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

export const SendHistoryInfoWidget = (props) => {
  const { title } = props;
  const histories = [
    {"id": 1, "name": "ステータス", "value": 1},
    {"id": 2, "name": "配信日時", "value": '2022-08-10 10:31:38'},
    {"id": 3, "name": "該当人数", "value": 5},
    {"id": 4, "name": "配信数", "value": 5},
  ]

  const getStatus = (status) => {
    if (status == 1) {
      return <Badge bg="success" className="me-1 is-delivered">配信済</Badge>;
    }
  }

  const SendHistoryItem = (props) => {
    const { name, value } = props;

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row className="align-items-center">
          <Col xs="auto">
            <h4 className="fs-6 text-dark mb-0">{name}</h4>
          </Col>
          <Col className="text-end">
            {
              (()=> {
                if(name == 'ステータス') {
                  return getStatus(value)
                } else {
                  return <span className="fs-6 fw-bolder text-dark">{value}</span>
                }
              })()
            }
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
          {histories.map(history => <SendHistoryItem key={`send-history-${history.id}`} {...history} />)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};