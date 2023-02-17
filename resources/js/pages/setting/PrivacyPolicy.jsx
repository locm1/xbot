import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, Card, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import Swal from "sweetalert2";
import { getPrivacyPolicies, updatePrivacyPolicy } from "@/pages/setting/api/PrivacyPolicyApiMethods";

export default () => {
  const [id, setId] = useState('');
  const [content, setContent] = useState('');

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const handleClick = async() => {
    const formValue = {
      id: id,
      content: content
    }
    updatePrivacyPolicy(id, formValue, updateCompleteModal)
  }

  const updateCompleteModal = () => {
    Swal.fire(
      '更新完了',
      'プライバシーポリシーの更新に成功しました',
      'success'
    )
  }

  useEffect(() => {
    getPrivacyPolicies(setContent, setId)
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">プライバシーポリシー</h1>
        </div>
      </div>
      <Card border="0" className="shadow mb-4">
        <Card.Body>
          <Row>
            <Col xs={12} sm={6} xl={12}>
              <Form.Group className="mb-3">
                <Form.Label>プライバシーポリシー</Form.Label>
                <Form.Control as="textarea" rows="30" name="privacy_policy" value={content} onChange={(e) => changeContent(e)} />
              </Form.Group>
              <div className="mt-3">
                <Button variant="gray-800" className="mt-2 animate-up-2" onClick={handleClick}>
                  保存する
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
};
