
import React, { useState } from "react";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';

export default (props) => {

  return (
    <Col xl={12} xxl={6} className="mb-3">
      <Card className="p-3 h-100">
        <div className="d-flex">
          <h5 className="me-1">Q{props.number}.</h5>
        <h5 className="pb-2">{props.questionnaire.title}</h5>
        </div>
        {props.questionnaire_answer_items.map((v, k) => (
          <p key={`answer-item-${k}`} className="ms-3">A{k + 1}. {v.answer}</p>
        ))}
      </Card>
    </Col>
  );
};