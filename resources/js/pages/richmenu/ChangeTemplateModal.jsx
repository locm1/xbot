import React, { useState } from "react";
import { Col, Row, Form, Button, Breadcrumb, Card, Modal } from 'react-bootstrap';


export default (props) => {
  const { setTemplateModal, templateModal, show } = props;

  const handleModalClose = () => {
    setTemplateModal(!templateModal)
  };

	return (
		<>
      <Modal as={Modal.Dialog} centered show={show} onHide={handleModalClose} size="lg">
        <Modal.Header>
          <Modal.Title className="h6">テンプレートを選択</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleModalClose} />
        </Modal.Header>
        <Modal.Body>
          <div className="mt-1">
            <h5 className="mb-4 border-bottom pb-3">コンテンツ1</h5>
            <small>リッチメニューのコンテンツを多く表示する場合におすすめです。</small>
          </div>
          <div className="mt-5">
            <h5 className="mb-4 border-bottom pb-3">コンテンツ2</h5>
            <small>トークルームにバランスよくリッチメニューを表示する場合におすすめです。</small>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            選択
          </Button>
            <Button variant="link" className="text-gray ms-auto" onClick={handleModalClose}>
              キャンセル
          </Button>
        </Modal.Footer>
      </Modal>
		</>
	)
}