
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
      <Card.Body>
        <h5 className="mb-4 border-bottom pb-3">来店情報</h5>
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
        <div className="d-flex flex-row-reverse">
          <Button onClick={update} variant="gray-800" className="me-2 d-flex ">
            保存する
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};