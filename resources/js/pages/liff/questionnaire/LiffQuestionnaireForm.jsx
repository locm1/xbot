import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Badge, InputGroup, Form, FormGroup } from 'react-bootstrap';
import { ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import CheckboxButton from "@/components/CheckboxButton";
import { isMobile } from "react-device-detect";

export default (props) => {
  const { questionnaires, answerSurvey, questionnaireErrors } = props;

  const QuestionnaireIsRequired = (questionnaire) => {
    if (questionnaire.is_required == 1) {
      return <Badge bg="danger" className="me-2">必須</Badge>
    } else {
      return <Badge bg="gray-600" className="me-2">任意</Badge>
    }
  }

  const questionnaireCheck = (answers, id) => {
    if (answers.length > 0) {
      return answers.some(v => v.questionnaire_item_id == id);
    }
    return false;
  }

  const getQuestionnaireItems = (questionnaire, type, questionnaire_items, index) => {
    switch (type) {
      case 1:
        console.log(questionnaireErrors[`questionnaires.${index}.answer`]);
        return (
          <>
          <Form.Control
            value={questionnaire.answer}
            name={`questionnaire_${questionnaire.id}`}
            onChange={(e) => answerSurvey(e, questionnaire.id, questionnaire.type, null, index)}
            type="text"
            placeholder="こちらに自由にご回答をお願いいたします。"
            isInvalid={!!questionnaireErrors[`questionnaires.${index}.answer`]}
          />
          {
            questionnaireErrors[`questionnaires.${index}.answer`]  && 
            <Form.Control.Feedback type="invalid">回答を入力してください。</Form.Control.Feedback>
          }
          </>
        )

      case 2:
        return (
          <>
          <Form.Control
            as="textarea"
            rows="4"
            name={`questionnaire_${questionnaire.id}`}
            value={questionnaire.answer}
            onChange={(e) => answerSurvey(e, questionnaire.id, questionnaire.type, null, index)}
            placeholder="こちらに自由にご回答をお願いいたします。"
            isInvalid={!!questionnaireErrors[`questionnaires.${index}.answer`]}
          />
          {
            questionnaireErrors[`questionnaires.${index}.answer`]  && 
            <Form.Control.Feedback type="invalid">回答を入力してください。</Form.Control.Feedback>
          }
          </>
        )

      case 3:
        return (
          <>
            {
              questionnaire_items.map((questionnaire_item, index) => (
                <Form.Check
                  key={questionnaire_item.id}
                  type="radio"
                  label={questionnaire_item.name}
                  value={questionnaire_item.name}
                  onChange={(e) => answerSurvey(e, questionnaire.id, questionnaire.type, questionnaire_item.id)}
                  name={`questionnaire_${questionnaire.id}`}
                  id={`questionnaire_item-${questionnaire_item.id}`}
                  htmlFor={`questionnaire_item-${questionnaire_item.id}`}
                />
              ))
            }
            {
              questionnaireErrors[`questionnaires.${index}.answer`]  && 
              <Form.Control.Feedback type="invalid" className="radiocheck-invalid">回答を選択してください。</Form.Control.Feedback>
            }
          </>
        )

      case 4:
        return (
          <>
          {isMobile ? 'mobile' : 'pc'}
            {
              questionnaire_items.map((questionnaire_item, index) => (
                <CheckboxButton
                  checked={questionnaireCheck(questionnaire.answer, questionnaire_item.id)}
                  key={questionnaire_item.id}
                  name={`questionnaire_${questionnaire.id}`}
                  value={questionnaire_item.name}
                  change={(e) => answerSurvey(e, questionnaire.id, questionnaire.type, questionnaire_item.id)}
                  title={questionnaire_item.name}
                  id={`questionnaire-item-checkbook-${questionnaire_item.id}-${questionnaire_item.name}`}
                  htmlFor={`questionnaire-item-checkbook-${questionnaire_item.id}-${questionnaire_item.name}`}
                />
              ))
            }
            {
              questionnaireErrors[`questionnaires.${index}.answer`]  && 
              <Form.Control.Feedback type="invalid" className="radiocheck-invalid">回答を選択してください。</Form.Control.Feedback>
            }
          </>
        )
      
      case 5:
        return (
          <>
          <Form.Select 
            defaultValue="default"
            value={questionnaire.answer}
            onChange={(e) => answerSurvey(e, questionnaire.id, questionnaire.type, questionnaire_items[0].id)}
            className="mb-0 w-50"
            isInvalid={questionnaire.answer !== '' ? false : questionnaireErrors[`questionnaires.${index}.answer`] !== '' && questionnaireErrors[`questionnaires.${index}.answer`] ? true : false}
          >
            <option value="default">選択してください</option>
            {
              questionnaire_items.map((questionnaire_item, index) => <option key={index} value={questionnaire_item.name}>{questionnaire_item.name}</option>)
            }
          </Form.Select>
          {
            questionnaireErrors[`questionnaires.${index}.answer`]  && 
            <Form.Control.Feedback type="invalid">回答を選択してください。</Form.Control.Feedback>
          }
          </>
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
                <Col xs={12} className="mb-4" key={questionnaire.id}>
                  <Form.Group id={`questionnaires.${index}.answer`}>
                    <Form.Label>
                      {QuestionnaireIsRequired(questionnaire)}
                      Q{index + 1}. {questionnaire.title}
                      </Form.Label>
                    <div>
                    {
                      questionnaire.questionnaire_items && getQuestionnaireItems(questionnaire, questionnaire.type, questionnaire.questionnaire_items, index)
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