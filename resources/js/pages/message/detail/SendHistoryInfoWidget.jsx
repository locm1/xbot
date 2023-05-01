
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, ListGroup, Badge } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";

export const SendHistoryInfoWidget = (props) => {
  const { title, id, message, message_id, send_message_users, status, updated_at } = props;
  const histories = [
    {"id": 1, "name": "ステータス", "value": status},
    {"id": 2, "name": "テンプレート名", "value": message.title, "templateId": message_id},
    {"id": 3, "name": "配信日時", "value": moment(updated_at).format("YYYY-MM-DD H:mm:ss")},
    {"id": 4, "name": "該当人数", "value": send_message_users.length},
    {"id": 5, "name": "配信数", "value": send_message_users.length},
  ]

  const getStatus = (status) => {
    if (status == 0) {
      return <Badge bg="success" className="me-1 is-delivered">配信済</Badge>;
    } else if (status == 1) {
      return <Badge bg="info" className="me-1 is-delivered">予約済</Badge>;
    }
  }

  const SendHistoryItem = (props) => {
    const { name, value, templateId } = props;

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
                } else if (name == 'テンプレート名') {
                  return (
                    <Link to={Paths.EditMessage.path.replace(':id', templateId)} className="fw-bolder">
                      {value}
                    </Link>
                  )
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
      <Card.Header className="bg-primary text-white px-3 py-2">
        <h5 className="mb-0 fw-bolder">{title}</h5>
      </Card.Header> 
      <Card.Body className="py-0">
        <ListGroup className="list-group-flush">
          {histories.map(history => <SendHistoryItem key={`send-history-${history.id}`} {...history} />)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};