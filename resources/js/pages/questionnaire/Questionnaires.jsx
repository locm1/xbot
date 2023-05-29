import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import QuestionnairesTable from "@/pages/questionnaire/QuestionnairesTable";
import { getQuestionnaires, storeQuestionnaire, updateQuestionnaire, deleteQuestionnaire, sortQuestionnaire } from "@/pages/questionnaire/api/QuestionnaireApiMethods";
import { showQuestionnaireEnabling, updateQuestionnaireEnabling } from "@/pages/questionnaire/api/QuestionnaireEnablingApiMethods";
import { Paths } from "@/paths";

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-danger',
    cancelButton: 'btn btn-gray-400 me-3'
  },
  buttonsStyling: false
}));

export default () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [questionnaireEnabling, setQuestionnaireEnabling] = useState({});

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

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">アンケート管理</h1>
        </div>
        <div className="d-flex flex-row-reverse mt-3">
          <div className="btn-toolbar mb-md-0 ms-4">
            <Button as={Link} to={Paths.CreateQuestionnaire.path} variant="gray-800" size="sm" className="d-inline-flex align-items-center">
              <PlusIcon className="icon icon-xs me-2" /> アンケート追加
            </Button>
          </div>
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

      <QuestionnairesTable
        questionnaires={questionnaires}
        sortQuestionnaire={sortQuestionnaire}
        showConfirmDeleteModal={showConfirmDeleteModal}
      />
    </>
  );
}