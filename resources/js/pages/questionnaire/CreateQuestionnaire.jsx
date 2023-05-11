import React, { useState, useEffect, useRef } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, Breadcrumb, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { getQuestionnaires, storeQuestionnaire, updateQuestionnaire, deleteQuestionnaire, sortQuestionnaire } from "@/pages/questionnaire/api/QuestionnaireApiMethods";
import { showQuestionnaireEnabling, updateQuestionnaireEnabling } from "@/pages/questionnaire/api/QuestionnaireEnablingApiMethods";
import QuestionnaireCard from "@/pages/questionnaire/QuestionnaireCard";
import { handleOnDragEnd } from "@/components/common/Sort";

export default () => {
  const [questionnaires, setQuestionnaires] = useState([
    { id: '', title: '' }
  ]);
  const ref = useRef();
  const types = [
    { title: 'テキストボックス', value: 1 },
    { title: 'テキストエリア', value: 2 },
    { title: 'ラジオボタン', value: 3 },
    { title: 'チェックボックス', value: 4 },
    { title: 'プルダウン', value: 5 },
  ];

  const [isValid, setIsValid] = useState(false);
  const [questionnaireEnabling, setQuestionnaireEnabling] = useState({});

  const update = (e, id, column) => {
    const newQuestionnaire = questionnaires.find((questionnaire) => (questionnaire.id === id));
    newQuestionnaire[`${column}`] = e.target.value;
    setQuestionnaires(questionnaires.map((questionnaire) => (questionnaire.id === id ? newQuestionnaire : questionnaire)));
    return newQuestionnaire;
  };

  const handleSave = () => {
    promiseBulkUpdate().then(response => {
      Swal.fire('保存成功', 'アンケートを保存しました', 'success');
    }).catch(error => {
      Swal.fire('保存失敗', 'アンケートの保存に失敗しました', 'error');
    })
  }

  const promiseBulkUpdate = () => {
    return new Promise((resolve, reject) => {
      var successCount = 0;
      var failedCount = 0;
      questionnaires.map(questionnaire => {
        updateQuestionnaire(questionnaire.id, questionnaire).then(response => {
          successCount++;
        }).catch(error => {
          failedCount++;
        })
      })
      failedCount === 0 ? resolve(successCount) : reject(failedCount);
    })
  };

  const handleTypeChange = (e, id) => {
    const newQuestionnaire = update(e, id, 'type');
    //配列の中にあるかどうか
    const types = [3, 4, 5];
    const isIncludes = (arr, target) => arr.some(el => target.includes(el));

    //タイプを更新したタイミングで、アイテムが存在しなかった場合
    if (Object.keys(newQuestionnaire.questionnaire_items).length == 0 && isIncludes(types, newQuestionnaire.type)) {
      ref.current.addItem()
    }
  };

  const handleClick = (id, value) => {
    const newQuestionnaire = questionnaires.find((questionnaire) => (questionnaire.id === id));

    if (value == 'is_undisclosed') {
      newQuestionnaire.is_undisclosed = !newQuestionnaire.is_undisclosed;
    } else {
      newQuestionnaire.is_required = !newQuestionnaire.is_required;
    }
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
      is_required: 0,
      questionnaire_titles: []
    }
    storeQuestionnaire(newQuestionnaire, questionnaires, setQuestionnaires)
  }

  const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-gray-400 me-3'
    },
    buttonsStyling: false
  }));

  const showConfirmDeleteModal = async (id) => {
    const textMessage = "本当にこのアンケートを削除しますか？";

    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "削除確認",
      text: textMessage,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル"
    });

    if (result.isConfirmed) {
      deleteQuestionnaire(id, completeDelete, setQuestionnaires, questionnaires)
    }
  };

  const completeDelete = async () => {
    const confirmMessage = "選択したアンケートは削除されました。";
    await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
  };

  const onDragEnd = (result) => {
    handleOnDragEnd(result, questionnaires, sortQuestionnaire)
  }

  const changeQuestionnaireEnabling = (isValid) => {
    const updateData = { ...questionnaireEnabling, ['is_questionnaire_enabled']: isValid ? 1 : 0 }
    setIsValid(isValid)
    setQuestionnaireEnabling(updateData)
    updateQuestionnaireEnabling(1, updateData)
  }

  useEffect(() => {
    getQuestionnaires(setQuestionnaires)
    showQuestionnaireEnabling(1, setQuestionnaireEnabling, setIsValid, 'questionnaire')
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">アンケート管理</h1>
        </div>
        <div className="d-flex flex-row-reverse mt-3">
          <Form.Group id="default-questionnaire">
            <Form.Check
              type="switch"
              label="アンケートをONにする"
              id="is-default-questionnaire-valid"
              htmlFor="is-default-questionnaire-valid"
              checked={isValid}
              onChange={() => changeQuestionnaireEnabling(!isValid)}
            />
          </Form.Group>
        </div>
      </div>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" className="btn-default-success" onClick={() => handleSave()}>
          保存する
        </Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="questionnaireCards">
          {(provided) => (
            <div className="questionnaireCards" {...provided.droppableProps} ref={provided.innerRef}>
              {questionnaires.map((questionnaire, index) => (
                <Draggable key={questionnaire.id} draggableId={"q-" + questionnaire.id} index={index}>
                  {(provided) => (
                    <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} border="0" className="mb-4" key={index}>
                      <Card.Body>
                        <div className="d-flex align-items-center justify-content-between flex-row-reverse">
                          <Button className="mb-3" variant="close" onClick={() => showConfirmDeleteModal(questionnaire.id)} />
                          <Form>
                            <Form.Check
                              checked={questionnaire.is_undisclosed == 1 ? true : false}
                              type="switch"
                              label="非公開にする"
                              id={`switch-${index}`}
                              htmlFor={`switch-${index}`}
                              onChange={() => handleClick(questionnaire.id, 'is_undisclosed')}
                            />
                            <Form.Check
                              checked={questionnaire.is_required == 1 ? true : false}
                              type="switch"
                              label="必須にする"
                              id={`switch-reqired-${index}`}
                              htmlFor={`switch-reqired-${index}`}
                              onChange={() => handleClick(questionnaire.id, 'is_required')}
                            />
                          </Form>
                        </div>
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Control as="textarea" value={questionnaire.title} onChange={e => update(e, questionnaire.id, 'title')} placeholder="無題の質問" />
                          </Col>
                          <Col md={6} className="mb-3">
                            <Form.Group id="firstName">
                              <Form.Select value={questionnaire.type} className="mb-0" onChange={(e) => handleTypeChange(e, questionnaire.id)}>
                                {
                                  types.map((type, index) => <option key={index} value={type.value}>{type.title}</option>)
                                }
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="mb-4 mb-lg-0 mt-4">
                          <QuestionnaireCard
                            key={index}
                            questionnaire={questionnaire}
                            ref={ref}
                          />
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
      <div className="privilege-button my-4">
        <Button
          variant="outline-gray-500"
          className="d-inline-flex align-items-center justify-content-center dashed-outline new-card w-100"
          onClick={addQuestionnaire}
        >
          <PlusIcon className="icon icon-xs me-2" /> 質問を追加
        </Button>
      </div>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" className="btn-default-success" onClick={() => handleSave()}>
          保存する
        </Button>
      </div>
    </>
  );
};