import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, Breadcrumb, Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import users from "@/data/users";
import { Paths } from "@/paths";

import QuestionnaireCard from "@/pages/questionnaire/QuestionnaireCard";

export default () => {
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [title, setTitle] = useState('');
  const [questionnaires, setQuestionnaires] = useState([
    {id: 1, title: title, type: 1, order: 1}
  ]);
  const types = [
    {title: 'テキストボックス', value: 1},
    {title: 'テキストエリア', value: 2},
    {title: 'ラジオボタン', value: 3},
    {title: 'チェックボックス', value: 4},
    {title: 'プルダウン', value: 5},
  ];

  const toggleIsTitleEditable = () => {
    setIsTitleEditable(!isTitleEditable);
  };

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
    const id = (questionnaires.length === 0) ? 1 : questionnaires.slice(-1)[0].id + 1;
    const newQuestionnaires = {
      "id": id,
      "title": '',
      "type": '',
      "order": id
    }
    setQuestionnaires([...questionnaires, newQuestionnaires]);
  }

  const deleteQuestionnaireCard = (id) => {
    setQuestionnaires(questionnaires.filter((questionnaire) => (questionnaire.id !== id)));
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">アンケート管理</h1>
        </div>
      </div>
      {questionnaires.map((questionnaire, index) => (
      <Card border="0" className="shadow mb-4" key={index}>
        <Card.Body>
        <div className="d-flex align-items-center justify-content-between flex-row-reverse">
          <Button className="mb-3" variant="close" onClick={() => deleteQuestionnaireCard(questionnaire.id)} />
        </div>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Control as="textarea" value={questionnaire.title} onChange={e => handleTitleChange(e, questionnaire.id)} placeholder="無題の質問" />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Select defaultValue="0" className="mb-0" onChange={(e) => handleInputTypeChange(e, questionnaire.id)}>
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
      ))}
      <div className="privilege-button">
        <Button
          variant="outline-gray-500"
          className="d-inline-flex align-items-center justify-content-center dashed-outline new-card w-100"
          onClick={addQuestionnaire}
        >
          <PlusIcon className="icon icon-xs me-2" /> 質問を追加
        </Button>
      </div>
      <div className="d-flex flex-row-reverse mt-3">
        <Button as={Link} to={_} variant="gray-800" className="me-2">
          更新する
        </Button>
      </div>
    </>
  );
};
