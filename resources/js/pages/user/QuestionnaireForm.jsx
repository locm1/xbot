
import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';

import QuestionnaireFormItem from "./QuestionnaireFormItem";

export const QuestionnaireForm = (props) => {
  const { questionnaireAnswers } = props;

  return (
    <Card border="0" className="shadow mb-4">
      <Card.Header className="bg-primary text-white px-3 py-2">
        <h5 className="mb-0 fw-bolder">アンケート</h5>
      </Card.Header>  
      <Card.Body>
        <Form>
          <Row>
            {questionnaireAnswers && questionnaireAnswers.map((v, k) => (
              <QuestionnaireFormItem key={`questionnaireFormItem-${k}`} number={k + 1} {...v} />
            ))}
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};