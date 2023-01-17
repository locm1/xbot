import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import CheckboxButton from "@/components/CheckboxButton";

export default () => {
  const questionnaireSelects = ['項目1', '項目2'];
  const questionnaires = ['項目1', '項目2', '項目3', '項目4'];

  return (
    <>
      <Card border="0" className="shadow mt-4">
        <Card.Header className="border-bottom">
          <h2 className="fs-6 fw-bold mb-0">アンケート</h2>
        </Card.Header>
        <Card.Body className="py-0">
          <Row className="mt-3">
            <Col xs={12} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Q.選択回答式でのアンケート</Form.Label>
                <div>
                  {
                    questionnaireSelects.map((questionnaireSelect, index) => 
                      <CheckboxButton key={index} id={index + 1} name='questionnaire_select' title={questionnaireSelect} value={index + 1} />
                    )
                  }
                </div>
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Q.複数回答式でのアンケート</Form.Label>
                <div>
                  {
                    questionnaires.map((questionnaire, index) => 
                      <CheckboxButton key={index} id={index + 1} name='questionnaire' title={questionnaire} value={index + 1} />
                    )
                  }
                </div>
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>フリー回答式のアンケート</Form.Label>
                <Form.Control as="textarea" rows="3" placeholder="こちらに自由に回答をお願いします" />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};