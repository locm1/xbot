import React, { useState } from "react";
import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/solid";
import { Card, Button, Form, Col, Row, Badge } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';

export default (props) => {
  const { id, name, updateName, setName, isEdit, setIsEdit, updateTag, showTags, showConfirmDeleteModal } = props;

  const editName = (e) => {
    setName(e.target.value);
  };

  const handleIsEdit = (id) => {
    setIsEdit({
      id: id, isEdit: !isEdit
    })
    showTags(id)
  };

  return (
    <>
      <Card border="bottom" className="hover-state rounded-0 rounded-top py-3">
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
              <div className="mb-2 d-flex flex-wrap flex-md-nowrap">
                <Form>
                  <Form.Control className="tag-edit-form" required type="text" name="name" value={updateName} onChange={(e) => editName(e)} placeholder="タグ名を入力してください" />
                </Form>
                <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center">
                  <div onClick={(e) => updateTag(e, id)} className="tag-edit-button ms-2"><CheckIcon className="icon icon-xs" /></div>
                  <div onClick={() => setIsEdit(!isEdit)} className="tag-edit-button ms-2"><Button variant="close" /></div>
                </div>
              </div>
            ) : (
              <div className="mb-2">
                <h6 className="">
                  {name}
                  <PencilIcon className="icon icon-xs ps-2 pb-1 management-tag-name" onClick={() => handleIsEdit(id)} />
                </h6>
              </div>
            )
          }
        </Col>
        <Col xs={10} sm={2} lg={2} xl={2} className="d-none d-lg-block d-xl-inline-flex align-items-center ms-lg-auto text-right justify-content-center px-md-0">
          <div className="d-block d-sm-flex">
            <div className="ms-sm-3">
              <TrashIcon onClick={() => showConfirmDeleteModal(id)} role="button" className="icon icon-xs text-danger me-2 "></TrashIcon>
            </div>
          </div>
        </Col>
      </Card.Body>
    </Card>
    </>
  );
};