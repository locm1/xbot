import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { SearchIcon } from '@heroicons/react/solid';

export default () => {
  const date = new Date();
  const endYear = date.getFullYear();
  const startYear = endYear - 5;

  const getPurchaseTimes = () => {
    const purchaseTimes = ['過去1ヶ月', '過去半年'];
    for (let index = startYear; index < endYear + 1; index++) {
      purchaseTimes.push(`${index}年`)
    }
    return purchaseTimes;
  }

  return (
    <>
    <Card border="0" className="shadow p-0">
      <Card.Body className="pb-3 rounded-bottompt-3">
        <Row>
          <Col xs={12}>
            <InputGroup className="me-3 me-lg-3 fmxw-300">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="氏名"
                value=""
              />
            </InputGroup>
          </Col>
          <Col xs={12} className="mt-1">
            <Form.Select defaultValue="0" className="mb-0 liff-questionnaire-select-month">
              {
                days.map((day, index) => <option key={index} value={day}>{day}</option>)
              }
            </Form.Select>
          </Col>
        </Row>
      </Card.Body>
    </Card>
    </>
  );
};
