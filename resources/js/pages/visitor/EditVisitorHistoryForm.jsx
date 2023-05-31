
import React, { useState } from "react";
import moment from "moment-timezone";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/l10n/ja.js';

export const EditVisitorHistoryForm = (props) => {
  const { memo, setMemo, createdAt, setCreatedAt, update } = props;

  const options = {
    locale: 'ja',
    onChange: (selectedDates, dateStr, instance) => setCreatedAt(dateStr)
  }

  return (
    <Card border="0" className="shadow mb-4">
      <Card.Header className="bg-primary text-white px-3 py-2">
        <h5 className="mb-0 fw-bolder">来店情報</h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={12} className="mb-3">
            <Form.Group id="created_at">
              <Form.Label>来店日時</Form.Label>
              <Flatpickr
                options={ options }
                value={createdAt}
                render={(props, ref) => {
                  return (
                    <InputGroup>
                      <InputGroup.Text>
                        <CalendarIcon className="icon icon-xs" />
                      </InputGroup.Text>
                      <Form.Control
                        data-time_24hr
                        required
                        type="text"
                        placeholder="YYYY-MM-DD"
                        ref={ref}
                      />
                    </InputGroup>
                  );
                }}
              />
            </Form.Group>
          </Col>
          <Col md={12} className="mb-3">
            <Form.Group id="firstName">
              <Form.Label>メモ</Form.Label>
              <Form.Control as="textarea" value={memo} onChange={(e) => setMemo(e.target.value)} rows="3" />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-content-end">
          <Button variant="success" className="btn-default-success" onClick={update}>
            保存する
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};