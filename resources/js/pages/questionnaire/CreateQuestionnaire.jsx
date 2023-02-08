import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, Breadcrumb, Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  DropResult,
  DroppableProvided,
  DraggableProvided
} from "react-beautiful-dnd";

import users from "@/data/users";
import { Paths } from "@/paths";

import { getQuestionnaires, storeQuestionnaire } from "@/pages/questionnaire/api/QuestionnaireApiMethods";
import QuestionnaireCard from "@/pages/questionnaire/QuestionnaireCard";

export default () => {
  const [isUndisclosed, setIsUndisclosed] = useState(false);
  const [title, setTitle] = useState('');
  const [questionnaires, setQuestionnaires] = useState([]);
  const types = [
    {title: 'テキストボックス', value: 1},
    {title: 'テキストエリア', value: 2},
    {title: 'ラジオボタン', value: 3},
    {title: 'チェックボックス', value: 4},
    {title: 'プルダウン', value: 5},
  ];

  const handleInputTypeChange = (e, id) => {
    const newQuestionnaire = {
      id: id,
      title: title,
      type: e.target.value,
      order: id,
    }
    setQuestionnaires(questionnaires.map((questionnaire) => (questionnaire.id === id ? newQuestionnaire : questionnaire)));
  };

  const handleTitleChange = (e, id) => {
    const newQuestionnaire = questionnaires.find((questionnaire) => (questionnaire.id === id));
    newQuestionnaire.title = e.target.value;
    setQuestionnaires(questionnaires.map((questionnaire) => (questionnaire.id === id ? newQuestionnaire : questionnaire)));
  };

  const addQuestionnaire = () => {
    const lastQuestionnaire = questionnaires.slice(-1)[0];
    const displayOrder = (typeof lastQuestionnaire === "undefined") ? 1.0 : lastQuestionnaire.display_order + 1.0

    const newQuestionnaire = {
      title: '',
      type: 1,
      display_order: displayOrder,
      is_undisclosed: 0,
    }
    storeQuestionnaire(newQuestionnaire, questionnaires, setQuestionnaires)
  }


  const deleteQuestionnaireCard = (id) => {
    setQuestionnaires(questionnaires.filter((questionnaire) => (questionnaire.id !== id)));
  }

  const handleOnDragEnd = (result) => {
    // ドロップ先がない
    if (!result.destination) {
      return;
    }
    const [reorderedItem] = questionnaires.splice(result.source.index, 1);
    questionnaires.splice(result.destination.index, 0, reorderedItem);
  }

  useEffect(() => {
    getQuestionnaires(setQuestionnaires)
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">アンケート管理</h1>
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="questionnaireCards">
          {(provided) => (
            <div className="questionnaireCards" {...provided.droppableProps} ref={provided.innerRef}>
              {questionnaires.map((questionnaire, index) => (
                <Draggable key={questionnaire.id} draggableId={"q-" + questionnaire.id} index={index}>
                  {(provided) => (
                  <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} border="0" className="mb-4" key={index}>
                    <Card.Body>
                      <div className="d-flex align-items-center justify-content-between flex-row-reverse">
                      <Button className="mb-3" variant="close" onClick={() => deleteQuestionnaireCard(questionnaire.id)} />
                      <Form>
                        <Form.Check
                        type="switch"
                        label="非公開にする"
                        id={`switch-${index}`}
                        htmlFor={`switch-${index}`}
                        />
                      </Form>
                      </div>
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Control as="textarea" value={questionnaire.title} onChange={e => handleTitleChange(e, questionnaire.id)} placeholder="無題の質問" />
                          </Col>
                          <Col md={6} className="mb-3">
                            <Form.Group id="firstName">
                              <Form.Select defaultValue={questionnaire.type} className="mb-0" onChange={(e) => handleInputTypeChange(e, questionnaire.id)}>
                                {
                                  types.map((type, index) => <option key={index} value={type.value}>{type.title}</option>)
                                }
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="mb-4 mb-lg-0 mt-4">
                          <QuestionnaireCard key={index} questionnaire={questionnaire}/>
                      </Row>
                    </Card.Body>
                  </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="privilege-button">
        <Button
          variant="outline-gray-500"
          className="d-inline-flex align-items-center justify-content-center dashed-outline new-card w-100"
          onClick={addQuestionnaire}
        >
          <PlusIcon className="icon icon-xs me-2" /> 質問を追加
        </Button>
      </div>
    </>
  );
};