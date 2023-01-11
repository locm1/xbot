import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { MinusIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, Breadcrumb, Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import users from "@/data/users";
import { Paths } from "@/paths";

import QuestionnaireCard from "@/pages/questionnaire/QuestionnaireCard";

export default () => {
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [title, setTitle] = useState('');
  const [inputType, setInputType] = useState(1);
  const [questionnaireTitles, setQuestionnaireTitles] = useState([
    {id: 1, name: '1列目', order: 1}
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

  const handleInputTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">アンケート追加</h1>
        </div>
      </div>
      <Card border="0" className="shadow mb-4">
        <Card.Body>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Control as="textarea" value={title} onChange={e => setTitle(e.target.value)} placeholder="無題の質問" />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Select defaultValue="0" className="mb-0" onChange={(e) => handleInputTypeChange(e)}>
                  {
                    types.map((type, index) => <option key={index} value={type.value}>{type.title}</option>)
                  }
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4 mb-lg-0 mt-4">
          {questionnaireTitles.map((questionnaireTitle, index) => (
            <QuestionnaireCard key={index} questionnaireTitle={questionnaireTitle} inputType={inputType} />
          ))}
        </Row>
        </Card.Body>
      </Card>
    </>
  );
};
