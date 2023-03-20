import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

export default (props) => {
  const { formValue, handleChange } = props;
  const months = [...Array(12).keys()].map(i => ++i);
  const days = [...Array(31).keys()].map(i => ++i);
  const date = new Date();
  const nowYear = date.getFullYear();

  const getYear = () => {
    const years = [];
    for (let index = 1920; index < nowYear + 1; index++) {
      years.push(<option key={index} value={index}>{index}</option>)
    }
    return years;
  }

  return (
    <>
      <Row className="">
        <Col xs={12} className="mb-3">
          <Form.Label><span class="questionnaire-required me-2">必須</span>生年月日</Form.Label>
          <div className="d-flex">
            <Form.Select defaultValue="1990" value={formValue.year} onChange={(e) => handleChange(e, 'year')} className="mb-0">
              {getYear()}
            </Form.Select>
            <div className="liff-questionnaire-select-div">年</div>
            <Form.Select defaultValue="0" value={formValue.month} onChange={(e) => handleChange(e, 'month')} className="mb-0 liff-questionnaire-select-month">
              {
                months && months.map((month, index) => <option key={index} value={month}>{month}</option>)
              }
            </Form.Select>
            <div className="liff-questionnaire-select-div">月</div>
            <Form.Select defaultValue="0" value={formValue.day} onChange={(e) => handleChange(e, 'day')} className="mb-0 liff-questionnaire-select-month">
              {
                days.map((day, index) => <option key={index} value={day}>{day}</option>)
              }
            </Form.Select>
            <div className="liff-questionnaire-select-div">日</div>
          </div>
        </Col>
      </Row>
    </>
  );
};