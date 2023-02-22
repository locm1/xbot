import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Card, Button, Image, Col, Row, Form } from "react-bootstrap";

import QuestionnaireRadioButton from "@/pages/questionnaire/QuestionnaireRadioButton";
import QuestionnaireCheckBoxButton from "@/pages/questionnaire/QuestionnaireCheckBoxButton";
import QuestionnairePullDown from "@/pages/questionnaire/QuestionnairePullDown";

import { storeQuestionnaireItem, updateQuestionnaireItem ,deleteQuestionnaireItem } from "@/pages/questionnaire/api/QuestionnaireItemApiMethods";

export default forwardRef((props, ref) => {
  const { questionnaire, setAlert, setMessage } = props;
  const [items, setItems] = useState(questionnaire.questionnaire_items);
  const [timer, setTimer] = useState(null);

  useImperativeHandle(ref, () => ({
    addItem() {
      addItem()
    }
  }))

  const addItem = () => {
    const newItem = {
      "name": '',
    }
    storeQuestionnaireItem(questionnaire.id, newItem, items, setItems)
  }

  const editItem = (e, id) => {
    const changeItem = {
      name: e.target.value
    }
    const currentItem = items.filter(item => (item.id === id))[0]
    currentItem.name = e.target.value
    setItems(
      items.map((item) => (item.id === id ? currentItem : item))
    );
    clearTimeout(timer);

    // 一定期間操作がなかったらAPI叩く
    const newTimer = setTimeout(() => {
      setMessage('更新しました')
      updateQuestionnaireItem(questionnaire.id, changeItem, id, setAlert)
    }, 1000)

    setTimer(newTimer)
  }

  const deleteItem = (id) => {
    deleteQuestionnaireItem(questionnaire.id, id, items, setItems)
  }


  const changeInputType = (inputType) => {

    switch (parseInt(inputType, 10)) {
      case 1:
        return <Form.Control required type="text" value="" className="text-dark mb-1 w-75" disabled placeholder="記述式テキスト（短文）" />
      case 2:
        return <Form.Control required as="textarea" value="" disabled rows="3" className="text-dark mb-1 w-75" placeholder="記述式テキスト（長文）" />
      case 3:
        return <QuestionnaireRadioButton items={items} addItem={addItem} editItem={editItem} deleteItem={deleteItem} />
      case 4:
        return <QuestionnaireCheckBoxButton items={items} addItem={addItem} editItem={editItem} deleteItem={deleteItem} />
      case 5:
        return <QuestionnairePullDown items={items} addItem={addItem} editItem={editItem} deleteItem={deleteItem} />
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
});