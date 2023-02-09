
import React, { useState } from "react";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';

export default (props) => {
  console.log(props.questionnaire.title);

  return (
    <Col md={6} className="mb-3">
      <h5 className="pb-2">{props.questionnaire.title}</h5>
      <p>{props.answer}</p>
    </Col>
  );
};