
import React, { useState } from "react";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';

export default (props) => {

  return (
    <Col md={6} className="mb-3">
      <h5 className="pb-2">{props.questionnaire.title}</h5>
      {props.questionnaire_answer_items.map((v, k) => (
        <p key={`answer-item-${k}`}>{v.answer}</p>
      ))}
    </Col>
  );
};