import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';

export default (props) => {
  const { message, handleChange , isUndisclosed, setIsUndisclosed} = props;
  return (
    <Card border="0" className="shadow mb-4">
      <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">タイトル</h5>
        </Card.Header> 
      <Card.Body>
        <div className="d-flex justify-content-between flex-row-reverse">
          <Form.Group id="isUndisclosed">
            <Form.Check
            type="switch"
            label="非公開にする"
            id="switch1"
            htmlFor="switch1"
            checked={isUndisclosed}
            onClick={() => setIsUndisclosed(!isUndisclosed)}
            />
          </Form.Group>
        </div>
        <Row>
          <Col md={12} className="mb-3">
            <Form.Group id="firstName">
              <Form.Label>タイトル</Form.Label>
              <Form.Control required type="text" name="last_name" value={message.title} onChange={(e) => handleChange(e, 'title')} placeholder="" />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};