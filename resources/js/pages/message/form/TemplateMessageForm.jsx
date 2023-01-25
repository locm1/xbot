import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';

export default (props) => {
  return (
    <Card border="0" className="shadow mb-4">
      <Card.Body>
        <div className="d-flex mb-4 border-bottom pb-3 justify-content-between">
          <h5 className="">メッセージ情報</h5>
          <Form.Group id="category">
            <Form.Check
            type="switch"
            label="非公開にする"
            id="switch1"
            htmlFor="switch1"
            onClick={() => setPrivate(!privateProduct)}
            />
          </Form.Group>
        </div>
        <Form>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>タイトル</Form.Label>
                <Form.Control required type="text" name="last_name" value={props.formValue.title} onChange={(e) => props.handleChange(e, 'title')} placeholder="" />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};