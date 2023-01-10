import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Col, Row, Form } from "react-bootstrap";

import QuestionnaireRadioButton from "@/pages/questionnaire/QuestionnaireRadioButton";
import QuestionnaireCheckBoxButton from "@/pages/questionnaire/QuestionnaireCheckBoxButton";
import QuestionnairePullDown from "@/pages/questionnaire/QuestionnairePullDown";

export default (props) => {
  const { questionnaireTitle, inputType } = props;

  const changeInputType = (inputType) => {
    switch (inputType) {
      case '1':
        return <Form.Control required type="text" className="text-dark mb-1 w-100" disabled placeholder="記述式テキスト（短文）" />
      case '2':
        return <Form.Control required as="textarea" disabled className="text-dark mb-1 w-100" value="記述式テキスト（長文）" />
      case '3':
        return <QuestionnaireRadioButton />
      case '4':
        return <QuestionnaireCheckBoxButton />
      case '5':
        return <QuestionnairePullDown />
      default:
        return <Form.Control required type="text" className="text-dark mb-1 w-100" disabled placeholder="記述式テキスト（短文）" />
    }
  };

  return (
    <>
      <Col xs={12} key={`questionnaireTitle-${questionnaireTitle.id}`} className="mb-4">
        <div className="border border-gray-100 shadow rounded p-3">
          <div className="d-flex align-items-center mb-2">
            <div className="d-flex">
              {changeInputType(inputType)}
              {/* <h3 className="fs-6 mb-0 me-3 ms-3">
                {questionnaireTitle.name}
              </h3> */}
            </div>
            <div className="privilege-delete-button">
              <MinusIcon className="icon icon-xs" />
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};