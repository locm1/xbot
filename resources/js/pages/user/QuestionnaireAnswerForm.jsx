
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, ListGroup } from 'react-bootstrap';

export const QuestionnaireAnswerForm = (props) => {
  const { title, questionnaireAnswers, createdAt } = props;

  return (
    <>
        <h2 className="fs-5 fw-bold mb-0">
          {title}
        </h2>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
            <Row className="align-items-center">
              <Col xs="auto">
                <h4 className="fs-6 text-dark mb-0">ユーザー登録日</h4>
              </Col>
              <Col className="text-end">
                <span className="fs-6 fw-bolder text-dark">
                  {
                    moment(createdAt).format("YYYY-MM-DD")
                  }
                </span>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
            <Row className="align-items-center">
              <Col xs="auto">
                <h4 className="fs-6 text-dark mb-0">利用者登録日</h4>
              </Col>
              <Col className="text-end">
                <span className="fs-6 fw-bolder text-dark">
                  {
                    questionnaireAnswers[0] && moment(questionnaireAnswers[0].created_at).format("YYYY-MM-DD")
                  }
                </span>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
    </>
  );
};