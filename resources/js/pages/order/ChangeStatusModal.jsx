import React, { useState } from "react";
import { Button, Modal, Card, Badge, Row, Col } from 'react-bootstrap';

export const ChangeStatusModal = (props) => {
  const { show, setModalOpen } = props;
  const statuses = [
    {id: 1, name: '注文内容確認中', class: 'warning'},
    {id: 2, name: '配送準備中', class: 'success'},
    {id: 3, name: '当店より発送済み', class: 'info'},
    {id: 4, name: 'キャンセル', class: 'danger'},
  ];

  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={() => setModalOpen(false)}>
      <Modal.Header>
        <Modal.Title className="h6">ステータス変更</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={() => setModalOpen(false)} />
      </Modal.Header>
      <Modal.Body>
        {statuses.map((status, index) => 
          <Card.Link className="me-2">
            <Badge key={index} bg={status.class} className="me-1 order-status-badge fw-normal">
              {status.name}
            </Badge>
          </Card.Link>
        )}
      </Modal.Body>
  </Modal>
  );
};