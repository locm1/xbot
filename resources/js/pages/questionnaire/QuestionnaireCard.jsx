import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Col, Row, Form, Button, InputGroup, Card, Alert } from 'react-bootstrap';
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";

export default (props) => {
  const { 
    questionnaireItems, setQuestionnaireItems, deleteQuestionnaireItemIds, 
    setDeleteQuestionnaireItemIds, questionnaire , error, setError
  } = props;

  const handleItemsChange = (e, display_id, input, index) => {
    setQuestionnaireItems(
      questionnaireItems.map(item => item.display_id == display_id ? {...item, [input]: e.target.value} : item)
    )
    setError({...error, [`questionnaire_items.${index}.name`]: ''})
  };

  const addQuestionnaireItems = () => {
    const currentQuestionnaireItem = questionnaireItems.slice(-1)[0];
    const newQuestionnaireItem = {
      display_id: typeof currentQuestionnaireItem !== 'undefined' ? currentQuestionnaireItem.display_id + 1 : 1,
      name: '',
    }
    setQuestionnaireItems([...questionnaireItems, newQuestionnaireItem])
  };

  const deleteQuestionnaireItems = (display_id) => {
    setQuestionnaireItems(
      questionnaireItems.filter((item) => (item.display_id !== display_id))
    )
    const currentQuestionnaireItem = questionnaireItems.find(item => item.display_id == display_id);
    //検索結果のオブジェクトにIDがあるかどうか
    if (currentQuestionnaireItem.id) {
      setDeleteQuestionnaireItemIds([...deleteQuestionnaireItemIds, currentQuestionnaireItem.id])
    }
  };

  return (
    <>
      <div className="">
        {(() => {
          if (questionnaire.type == 1) {
            return (
              <Form.Control required type="text" value="" className="text-dark mb-1 w-75" disabled placeholder="記述式テキスト（短文）" />
            )
          } else if (questionnaire.type == 2) {
            return (
              <Form.Control required as="textarea" value="" disabled rows="3" className="text-dark mb-1 w-75" placeholder="記述式テキスト（長文）" />
            )
          } else {
            return (
              <>
              {questionnaireItems.map((item, index) => 
                <InputGroup className="me-2 me-lg-3" key={`questionaire-items-${index}`} >
                  <Form.Control 
                    name={`questionaire-items-${index}`}
                    className={`${index > 0 ? 'mt-3' : ''}`} 
                    placeholder="例：パン"
                    value={item.name}
                    onChange={(e) => handleItemsChange(e, item.display_id, 'name', index)}
                    isInvalid={!!error[`questionnaire_items.${index}.name`]}
                  />
                  <Button onClick={() => deleteQuestionnaireItems(item.display_id)} variant="danger" className={`${index > 0 ? 'mt-3' : ''}`} >
                    削除
                  </Button>
                  {
                    error[`questionnaire_items.${index}.name`] && 
                    <Form.Control.Feedback type="invalid">{error[`questionnaire_items.${index}.name`][0]}</Form.Control.Feedback>
                  }
                </InputGroup>
              )}
              <div className="privilege-button">
                <Button
                  variant="outline-gray-500"
                  className="d-inline-flex align-items-center justify-content-center dashed-outline new-card w-100"
                  onClick={addQuestionnaireItems}
                >
                  <PlusIcon className="icon icon-xs me-2" /> 回答項目を追加
                </Button>
              </div>
              </>
            );
          }
        })()}
      </div>
    </>
  );
};