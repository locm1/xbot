import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Col, Row, Form } from "react-bootstrap";

import QuestionnaireRadioButton from "@/pages/questionnaire/QuestionnaireRadioButton";
import QuestionnaireCheckBoxButton from "@/pages/questionnaire/QuestionnaireCheckBoxButton";
import QuestionnairePullDown from "@/pages/questionnaire/QuestionnairePullDown";

export default (props) => {
  const { questionnaire } = props;

  const changeInputType = (inputType) => {
    switch (inputType) {
      case '1':
        return <Form.Control required type="text" className="text-dark mb-1 w-75" disabled placeholder="記述式テキスト（短文）" />
      case '2':
        return <Form.Control required as="textarea" disabled rows="3" className="text-dark mb-1 w-75" value="記述式テキスト（長文）" />
      case '3':
        return <QuestionnaireRadioButton />
      case '4':
        return <QuestionnaireCheckBoxButton />
      case '5':
        return <QuestionnairePullDown />
      default:
        return <Form.Control required type="text" className="text-dark mb-1 w-75" disabled placeholder="記述式テキスト（短文）" />
    }
  };

  return (
    <>
      <Col xs={12} key={`questionnaire-${questionnaire.id}`} className="mb-4">
        <div className="">
            {changeInputType(questionnaire.type)}
        </div>
      </Col>
    </>
  );
};