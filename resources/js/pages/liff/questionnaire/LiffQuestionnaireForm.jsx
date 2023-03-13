import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import CheckboxButton from "@/components/CheckboxButton";

export default (props) => {
  const { questionnaires } = props;

  const getQuestionnaireItems = (type, questionnaire_items) => {
    switch (type) {
      case 1:
        return (
          <Form.Control type="text" placeholder="name@example.com" />
        )

      case 2:
        return (
          <Form.Control as="textarea" rows="4" placeholder="Enter your message..." />
        )

      case 3:
        return (
          questionnaire_items.map((questionnaire_item, index) => (
            <Form.Check
              key={questionnaire_item.id}
              defaultChecked={index == 0 ? true : false}
              type="radio"
              defaultValue="option1"
              label={questionnaire_item.name}
              name="exampleRadios"
              id={`questionnaire_item-${questionnaire_item.id}`}
              htmlFor={`questionnaire_item-${questionnaire_item.id}`}
            />
          ))
        )

      case 4:
        return (
          questionnaire_items.map((questionnaire_item, index) => (
            <CheckboxButton
              key={questionnaire_item.id}
              name="checxkbox"
              value="check1"
              title={questionnaire_item.name}
              id={`questionnaire_item-${questionnaire_item.id}`}
              htmlFor={`questionnaire_item-${questionnaire_item.id}`}
            />
          ))
        )
      
      case 5:
        return (
          <Form.Select defaultValue="0" className="mb-0 w-50">
            {
              questionnaire_items.map((questionnaire_item, index) => <option key={index} value={index + 1}>{questionnaire_item.name}</option>)
            }
          </Form.Select>
        )
    }
  };

  return (
    <>
      <Card border="0" className="shadow mt-4">
        <Card.Header className="border-bottom">
          <h2 className="fs-6 fw-bold mb-0">アンケート</h2>
        </Card.Header>
        <Card.Body className="py-0">
          <Row className="mt-3">
            {
              questionnaires && questionnaires.map((questionnaire, index) => 
                <Col xs={12} className="mb-3" key={questionnaire.id}>
                  <Form.Group id="firstName">
                    <Form.Label>Q{index + 1}. {questionnaire.title}</Form.Label>
                    <div>
                    {
                      getQuestionnaireItems(questionnaire.type, questionnaire.questionnaire_items)
                    }
                    </div>
                  </Form.Group>
                </Col>
              )
            }
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};