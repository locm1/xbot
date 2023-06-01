import React, { useState } from "react";
import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/solid";
import { Card, Button, Form, Col, Row, Badge } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';

export default (props) => {
  const { id, name, updateName, setName, isEdit, setIsEdit, updateTag, showTags, showConfirmDeleteModal, setIsCreate } = props;

  const editName = (e) => {
    setName(e.target.value);
  };

  const handleIsEdit = (id) => {
    setName(name);
    setIsEdit({
      id: id, isEdit: !isEdit
    })
    setIsCreate(false)
    // showTags(id)
  };

  const handleCansel = () => {
    setIsEdit(!isEdit)
    setName('')
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    updateTag(e, id);
  };

  return (
    <>
      <Card border="bottom" className="hover-state rounded-0 rounded-top py-3" style={{height:'88px'}}>
        <Card.Body className="d-sm-flex align-items-center flex-wrap flex-lg-nowrap py-0">
          <Col xs={1} className="text-left text-sm-center mb-2 mb-sm-0 mt-2">
            <div className="d-block d-sm-flex">
              <div className="ms-sm-3">
                <Badge bg="tertiary" className="super-badge">タグ{id}</Badge>
              </div>
            </div>
          </Col>
          <Col xs={11} lg={9} className="px-0 mb-md-0 mt-2">
            {
              isEdit.id == id ? (
                <>
                  <div className="mb-2 d-flex flex-wrap flex-md-nowrap align-items-center">
                    <Form>
                      <Form.Control
                        className="tag-edit-form"
                        required
                        type="text"
                        name="name"
                        value={updateName}
                        onChange={(e) => editName(e)}
                        onKeyDown={(e) => handleKeyDown(e)}
                        placeholder="タグ名を入力してください"
                        autoFocus
                      />
                    </Form>
                    <Button
                      variant="success"
                      size="sm"
                      className="ms-4"
                      onClick={(e) => updateTag(e, id)}
                    >
                      保存する
                    </Button>
                    <Button
                      variant="gray-800"
                      size="sm"
                      className="ms-2"
                      onClick={handleCansel}
                    >
                      キャンセル
                    </Button>
                  </div>
                </>
              ) : (
                <div className="mb-2">
                  <h6 className="">
                    {name}
                  </h6>
                </div>
              )
            }
          </Col>
          <Col xs={10} sm={2} lg={2} xl={2} className="d-none d-lg-block d-xl-inline-flex align-items-center ms-lg-auto text-right justify-content-center px-md-0">
            <div className="d-block d-sm-flex">
              <div className="ms-sm-3">
                <Button onClick={() => handleIsEdit(id)} variant="info" size="sm" className="d-inline-flex align-items-center me-3">
                  編集
                </Button>
                <Button onClick={() => showConfirmDeleteModal(id)} variant="danger" size="sm" className="d-inline-flex align-items-center">
                  削除
                </Button>
              </div>
            </div>
          </Col>
        </Card.Body>
      </Card>
    </>
  );
};