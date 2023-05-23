import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Card, Button, Image, Col, Row, Form } from "react-bootstrap";

import QuestionnaireRadioButton from "@/pages/questionnaire/QuestionnaireRadioButton";
import QuestionnaireCheckBoxButton from "@/pages/questionnaire/QuestionnaireCheckBoxButton";
import QuestionnairePullDown from "@/pages/questionnaire/QuestionnairePullDown";

import { storeQuestionnaireItem, updateQuestionnaireItem ,deleteQuestionnaireItem } from "@/pages/questionnaire/api/QuestionnaireItemApiMethods";

export default forwardRef((props, ref) => {
  const { questionnaire, questionnaires, setQuestionnaires, editItem, addItem } = props;
  const [items, setItems] = useState(questionnaire.questionnaire_items);
  const [timer, setTimer] = useState(null);

  // useImperativeHandle(ref, () => ({
  //   addItem() {
  //     addItem()
  //   }
  // }))

  // const addItem = () => {

    // const newItem = {
    //   "name": '',
    // }
    // setItems(prev => ([...prev, {
    //   "id": null,
    //   "questionnaire_id": null,
    //   "name": '',
    // }]))
    // storeQuestionnaireItem(questionnaire.id, newItem, items, setItems)
    // itemsの最後のIDを取得、なければ1
    // const lastItem = questionnaire.questionnaire_items.slice(-1)[0]
    // const id = (typeof lastItem !== "undefined") ? lastItem.id + 1 : 1
    // const newItem = {
    //   id: id,
    //   name: '',
    //   questionnaire_id: questionnaire.id
    // }
    // const currentQuestionnaire = questionnaires.find(question => question.id == questionnaire.id)
    // currentQuestionnaire.questionnaire_items = [...items, newItem]
    // setQuestionnaires(questionnaires.map(question => question.id == questionnaire.id ? currentQuestionnaire : question))
    // setItems([...items, newItem])
  // }

  // const editItem = (e, id) => {
  //   const currentItem = items.filter(item => (item.id === id))[0]
  //   currentItem.name = e.target.value
  //   setItems(
  //     items.map((item) => (item.id === id ? currentItem : item))
  //   );
  //   // updateQuestionnaireItem(questionnaire.id, {name: e.target.value}, id)
  // }

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
        return <QuestionnaireRadioButton items={items} addItem={addItem} editItem={editItem} setQuestionnaires={setQuestionnaires} deleteItem={deleteItem} id={questionnaire.id} />
      case 4:
        return <QuestionnaireCheckBoxButton items={items} addItem={addItem} editItem={editItem} setQuestionnaires={setQuestionnaires} deleteItem={deleteItem} id={questionnaire.id} />
      case 5:
        return <QuestionnairePullDown items={items} addItem={addItem} editItem={editItem} setQuestionnaires={setQuestionnaires} deleteItem={deleteItem} id={questionnaire.id} />
      default:
        return <Form.Control required value="" type="text" className="text-dark mb-1 w-75" disabled placeholder="記述式テキスト（短文）" />
    }
  };

  return (
    <>
     {/* <Button onClick={() => console.log(items)} /> */}
      <Col xs={12} key={`questionnaire-${questionnaire.id}`} className="mb-4">
        <div className="">
            {changeInputType(questionnaire.type)}
        </div>
      </Col>
    </>
  );
});