import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, Card, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import Swal from "sweetalert2";
import { getTermsOfService, storeTermsOfService, updateTermsOfService } from "@/pages/setting/api/TermsOfServiceApiMethods";

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
    updateTermsOfService(id, formValue, updateCompleteModal)
  }

  const updateCompleteModal = () => {
    Swal.fire(
      '更新完了',
      '利用規約の更新に成功しました',
      'success'
    )
  }

  useEffect(() => {
    getTermsOfService(setContent, setId)
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">利用規約</h1>
        </div>
      </div>
      <Card border="0" className="shadow mb-4">
        <Card.Body>
          <Row>
            <Col xs={12} sm={6} xl={12}>
              <Form.Group className="mb-3">
                <Form.Label>利用規約</Form.Label>
                <Form.Control as="textarea" rows="30" maxLength="5000" name="content" value={content} onChange={(e) => changeContent(e)} />
              </Form.Group>
              <div className="mt-3">
                <Button variant="gray-800" type="submit" className="mt-2 animate-up-2" onClick={handleClick}>
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
