
import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Modal, Button, InputGroup, Image, Badge, FloatingLabel } from 'react-bootstrap';


export default (props) => {
  const { 
    show = false, 
    setIsOpen, 
    formValue, 
    handleChange, 
    createSpecificTrades, 
    updateSpecificTrades, 
    page,
  } = props;

  const onHide = () => setIsOpen(false);

  const executionCreateOrUpdate = () => {
    if (page == 'create') {
      createSpecificTrades();
    } else {
      updateSpecificTrades()
    }
  }

  return (
    <Modal as={Modal.Dialog} centered size="lg" show={show} onHide={onHide}>
      <Form className="modal-content p-3">
        <Modal.Header className="pb-0 border-0">
          <h5 className="fw-normal">{page == 'create' ? '項目を追加' : '項目を編集'}</h5>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Form.Group id="title" className="mb-3">
            <Form.Label>タイトル</Form.Label>
            <Form.Control
              required
              autoFocus
              type="text"
              value={formValue.title}
              onChange={(e) => handleChange(e, 'title')}
            />
          </Form.Group>
          <Form.Group id="description" className="mb-3">
            <Form.Label>内容</Form.Label>
            <Form.Control
              required
              autoFocus
              multiple
              as="textarea"
              rows="10"
              value={formValue.content}
              onChange={(e) => handleChange(e, 'content')}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end pb-0">
          <Button variant="success" className="btn-default-success" onClick={executionCreateOrUpdate}>
            {page == 'create' ? '追加する' : '変更する'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};