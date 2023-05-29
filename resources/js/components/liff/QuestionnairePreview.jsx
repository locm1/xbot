import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Badge, Image, Button, Modal, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import CheckboxButton from "@/components/CheckboxButton";

export default (props) => {
  const { questionnaire, questionnaireItems } = props;

  const QuestionnaireIsRequired = (is_required) => {
    if (is_required) {
      return <Badge bg="danger" className="me-2">必須</Badge>
    } else {
      return <Badge bg="gray-600" className="me-2">任意</Badge>
    }
  }

  const changeInputType = () => {

    switch (parseInt(questionnaire.type, 10)) {
      case 1:
        return <Form.Control required type="text" value="" className="text-dark mb-1" disabled placeholder="こちらに自由にご回答をお願いいたします。" />
      case 2:
        return <Form.Control required as="textarea" value="" disabled rows="3" className="text-dark mb-1" placeholder="こちらに自由にご回答をお願いいたします。" />
      case 3:
        return <QuestionnaireRadioButton />
      case 4:
        return <QuestionnaireCheckBoxButton />
      case 5:
        return <QuestionnairePullDown />
      default:
        return <Form.Control required value="" type="text" className="text-dark mb-1" disabled placeholder="記述式テキスト（短文）" />
    }
  };


  const QuestionnaireRadioButton = () => {
    return (
      <>
        {
          questionnaireItems.map((questionnaire_item, index) => (
            <Form.Check
              key={questionnaire_item.id}
              type="radio"
              label={questionnaire_item.name}
              name={`questionnaire_${questionnaire.id}`}
              id={`questionnaire_item-${questionnaire_item.id}`}
              htmlFor={`questionnaire_item-${questionnaire_item.id}`}
            />
          ))
        }
      </>
    )
  };


  const QuestionnaireCheckBoxButton = () => {
    return (
      <>
        {
          questionnaireItems.map((questionnaire_item, index) => (
            <CheckboxButton
              key={`questionnaire-item-checkbook-${questionnaire_item.id}-${questionnaire_item.name}`}
              name={`questionnaire_${questionnaire.id}`}
              value={questionnaire_item.name}
              title={questionnaire_item.name}
              id={`questionnaire-item-checkbook-${questionnaire_item.id}-${questionnaire_item.name}`}
              htmlFor={`questionnaire-item-checkbook-${questionnaire_item.id}-${questionnaire_item.name}`}
            />
          ))
        }
      </>
    )
  };


  const QuestionnairePullDown = () => {
    return (
      <>
        {
          <Form.Select 
          defaultValue="default"
          className="mb-0 w-50"
          >
            <option value="default">選択してください</option>
            {
              questionnaireItems.map((questionnaire_item, index) => <option key={index} value={questionnaire_item.name}>{questionnaire_item.name}</option>)
            }
          </Form.Select>
        }
      </>
    )
  };

  return (
    <>
      <div className="p-4">
        <Card border="0" className="shadow">
          <Card.Header className="bg-primary text-white px-3 py-2">
            <h5 className="mb-0 fw-bolder">アンケート</h5>
          </Card.Header> 
          <Card.Body className="py-0">
            <Row className="mt-3">
              <Col xs={12} className="mb-4">
                <Form.Group>
                  <Form.Label>
                    {QuestionnaireIsRequired(questionnaire.is_required)}
                    Q1. {questionnaire.title}
                    </Form.Label>
                  <div>
                  {
                    changeInputType()
                  }
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};