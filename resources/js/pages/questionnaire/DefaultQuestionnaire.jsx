import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Col, Row, Form, Button, ListGroup, Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { getUserInfoStatuses, updateUserInfoStatuses } from "@/pages/questionnaire/api/UserInfoStatusesApiMethods";
import { showQuestionnaireEnabling, updateQuestionnaireEnabling } from "@/pages/questionnaire/api/QuestionnaireEnablingApiMethods";

export default () => {
  const [userInfoStatuses, setUserInfoStatuses] = useState([]);
  const [questionnaireEnabling, setQuestionnaireEnabling] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e, id, input) => {
    const newUserInfoStatus = userInfoStatuses.find(status => status.id == id)

    if (input == 'is_required') {
      newUserInfoStatus.is_required = e.target.value
    }

    if (input == 'is_undisclosed' && e.target.value == 1) {
      newUserInfoStatus.is_undisclosed = e.target.value
      newUserInfoStatus.is_required = 0
    } else if (input == 'is_undisclosed' && e.target.value == 0) {
      newUserInfoStatus.is_undisclosed = e.target.value
    }
    setUserInfoStatuses(
      userInfoStatuses.map((userInfoStatus) => (userInfoStatus.id === id ? newUserInfoStatus : userInfoStatus))
    );
  };

  const handleClick = () => {
    const formValue = {
      user_info_statuses: userInfoStatuses
    }
    updateUserInfoStatuses(formValue)
  };

  const changeQuestionnaireEnabling = (isValid) => {
    const updateData = { ...questionnaireEnabling, ['is_default_questionnaire_enabled']: isValid ? 1 : 0 }
    setIsValid(isValid)
    setQuestionnaireEnabling(updateData)
    updateQuestionnaireEnabling(1, updateData)
  }

  const TableRow = (props) => {
    const { id, is_undisclosed, is_required, name } = props;

    return (
      <tr className="border-bottom product-table-tr">
        <td>
          <span className="fw-normal">{name}</span>
        </td>
        <td>
          <Form.Select value={is_undisclosed} className="mb-0" onChange={(e) => { handleChange(e, id, 'is_undisclosed') }}>
            <option value="0">公開</option>
            <option value="1">非公開</option>
          </Form.Select>
        </td>
        <td>
          <Form.Select
            value={is_required}
            className="mb-0"
            onChange={(e) => { handleChange(e, id, 'is_required') }}
            disabled={is_undisclosed == 1 && true}
          >
            <option value="0">任意</option>
            <option value="1">必須</option>
          </Form.Select>
        </td>
      </tr>
    );
  };

  useEffect(() => {
    getUserInfoStatuses(setUserInfoStatuses)
    showQuestionnaireEnabling(1, setQuestionnaireEnabling, setIsValid, 'is_default_questionnaire_enabled')
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">固定アンケート管理</h1>
        </div>
        <div className="d-flex flex-row-reverse mt-3">
          <Form.Group id="default-questionnaire">
            <Form.Check
              type="switch"
              label="固定アンケートをONにする"
              id="is-default-questionnaire-valid"
              htmlFor="is-default-questionnaire-valid"
              checked={isValid}
              onClick={() => changeQuestionnaireEnabling(!isValid)}
            />
          </Form.Group>
        </div>
      </div>
      <Card border="0" className="table-wrapper table-responsive shadow mb-4">
        <Table className="align-items-center">
          <thead className="bg-primary text-white">
            <tr>
              <th className="border-gray-200">アンケート項目</th>
              <th className="border-gray-200">ステータス</th>
              <th className="border-gray-200">必須ステータス</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {userInfoStatuses && userInfoStatuses.map((userInfoStatus, index) => <TableRow key={`user-info-status-${userInfoStatus.id}`} {...userInfoStatus} />)}
          </tbody>
        </Table>
        <Card.Footer>
          <div className="d-flex justify-content-end">
            <Button variant="success" className="btn-default-success" onClick={handleClick}>
              保存する
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </>
  )
}