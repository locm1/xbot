import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Badge, Button, InputGroup } from 'react-bootstrap';

export default (props) => {
  const { message, handleChange , isUndisclosed, setIsUndisclosed, error } = props;
  return (
    <Card border="0" className="shadow mb-4">
      <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">タイトル</h5>
        </Card.Header> 
      <Card.Body>
        <Row>
          <Col md={12} className="mb-3">
            <Form.Group id="title">
              <Form.Label><Badge bg="danger" className="me-2">必須</Badge>タイトル</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={message.title}
                onChange={(e) => handleChange(e, 'title')}
                placeholder=""
                isInvalid={!!error.title} 
              />
              <Form.Control.Feedback type="invalid">
                {error.title}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};