import React, { useState, useEffect, useRef } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, InputGroup, Card, Alert } from 'react-bootstrap';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import LiffPreview from "@/components/liff/LiffPreview";
import { showQuestionnaire, storeQuestionnaire, updateQuestionnaire } from "@/pages/questionnaire/api/QuestionnaireApiMethods";
import QuestionnaireCard from "@/pages/questionnaire/QuestionnaireCard.jsx";
import CreateQuestionnaireContentLoader from "@/pages/questionnaire/CreateQuestionnaireContentLoader";
import { Paths } from "@/paths";

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const pathname = useLocation().pathname;
  const types = [
    {name: 'テキストボックス', type: 1},
    {name: 'テキストエリア', type: 2},
    {name: 'ラジオボタン', type: 3},
    {name: 'チェックボックス', type: 4},
    {name: 'プルダウン', type: 5},
  ];
  const defaultItems = [
    {display_id: 1, name: ''},
    {display_id: 2, name: ''},
    {display_id: 3, name: ''},
  ];
  const [previewModal, setPreviewModal] = useState(false);
  const [questionnaire, setQuestionnaire] = useState({
    title: '', type: 1, is_undisclosed: 0, is_required: 0
  });
  const [questionnaireItems, setQuestionnaireItems] = useState(defaultItems);
  const [deleteQuestionnaireItemIds, setDeleteQuestionnaireItemIds] = useState([]);
  const [error, setError] = useState({
    title: ''
  });
  const [isRendered, setIsRendered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == 'is_undisclosed') {
      setQuestionnaire({...questionnaire, [name]: !questionnaire.is_undisclosed})
    } else if (name == 'is_required') {
      setQuestionnaire({...questionnaire, [name]: !questionnaire.is_required})
    } else {
      setQuestionnaire({...questionnaire, [name]: value})
    }

    setError({...error, [name]: ''})
  };

  const onSaveQuestionnaire = () => {
    questionnaire.is_required = questionnaire.is_required ? 1 : 0;
    questionnaire.is_undisclosed = questionnaire.is_undisclosed ? 1 : 0;
    const newQuestionnaireItems = questionnaireItems.filter(item => item.name !== '')
    Object.assign(questionnaire, {questionnaire_items: newQuestionnaireItems})
    
    if (pathname.includes('/edit')) {
      Object.assign(questionnaire, {delete_questionnaire_item_ids: deleteQuestionnaireItemIds})
      updateQuestionnaire(id, questionnaire, setError);
      console.log(deleteQuestionnaireItemIds);
    } else {
      storeQuestionnaire(questionnaire, storeComplete, setError)
    }
  };


  const storeComplete = (id) => {
    history.push(Paths.EditQuestionnaire.path.replace(':id', id))
  };

  useEffect(() => {
    if (pathname.includes('/edit')) {
      showQuestionnaire(id, setQuestionnaire, setQuestionnaireItems).then(
        setIsRendered(true)
      );
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
				<div className="d-block mb-4 mb-md-0">
					<h1 className="page-title">{pathname.includes('/edit') ? 'アンケート編集' : 'アンケート作成'}</h1>
				</div>
				<Button onClick={onSaveQuestionnaire} variant="success" className="btn-default-success" >
					保存する
				</Button>
			</div>

      {
        isRendered ? (
          <Row>
            <Col xs={8}>
              <Card className="mb-3">
                <Card.Header className="bg-primary text-white px-3 py-2">
                  <h5 className="mb-0 fw-bolder">質問内容</h5>
                </Card.Header>
                <Card.Body disabled>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="title"
                    value={questionnaire.title}
                    onChange={handleChange}
                    placeholder="例：朝ごはんは何を食べましたか？"
                    isInvalid={!!error.title}
                  />
                  {
                    error.title && 
                      <Form.Control.Feedback type="invalid">{error.title[0]}</Form.Control.Feedback>
                  }
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Header className="bg-primary text-white px-3 py-2">
                  <h5 className="mb-0 fw-bolder">回答形式</h5>
                </Card.Header>
                <Card.Body>
                  {types.map((v, k) =>
                    <Form.Check
                      key={`type-${k}`}
                      type='radio'
                      label={v.name}
                      name="type"
                      id={`type-${k}`}
                      value={v.type}
                      checked={questionnaire.type == k + 1}
                      onChange={handleChange}
							    		//isInvalid={!!errors.type}
                    />
                  )}
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Header className="bg-primary text-white px-3 py-2">
                  <h5 className="mb-0 fw-bolder">回答項目</h5>
                </Card.Header>
                <Card.Body>
                  <QuestionnaireCard
                    questionnaireItems={questionnaireItems}
                    setQuestionnaireItems={setQuestionnaireItems}
                    deleteQuestionnaireItemIds={deleteQuestionnaireItemIds}
                    setDeleteQuestionnaireItemIds={setDeleteQuestionnaireItemIds}
                    questionnaire={questionnaire}
                    error={error}
                    setError={setError}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="mb-3">
                <Card.Header className="bg-primary text-white px-3 py-2">
                  <h5 className="mb-0 fw-bolder">詳細設定</h5>
                </Card.Header>
                <Card.Body>
                  <Form.Check
                    checked={questionnaire.is_undisclosed == 1 ? true : false}
                    name="is_undisclosed"
                    type="switch"
                    label="非公開にする"
                    id={`switch-is_undisclosed`}
                    htmlFor={`switch-is_undisclosed`}
                    className="mt-1"
                    onChange={handleChange}
                  />
                  <Form.Check
                    checked={questionnaire.is_required == 1 ? true : false}
                    name="is_required"
                    type="switch"
                    label="必須にする"
                    id={`switch-reqired`}
                    htmlFor={`switch-reqired`}
                    className="mt-2"
                    onChange={handleChange}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <CreateQuestionnaireContentLoader />
        )
      }
			<div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
        <Button as={Link} to={Paths.Questionnaires.path} variant='tertiary' className="mt-2 animate-up-2">
          アンケート管理に戻る
        </Button>
      </div>
      <div className={`line-preview-sticky-nav ${previewModal ? 'open-questionnaire-content' : 'close-questionnaire-content'}`} >
        <div className='line-preview-button' onClick={() => setPreviewModal(!previewModal)}>
          {
            previewModal ? <ChevronDownIcon className="icon icon-xs me-2 line-preview-icon" /> : <ChevronUpIcon className="icon icon-xs me-2 line-preview-icon" />
          }
          プレビュー
        </div>
        <div className='line-preview-content'>
          <LiffPreview
            page="questionnaire"
            questionnaire={questionnaire}
            questionnaireItems={questionnaireItems}
          />
        </div>
      </div>
    </>
  );
};