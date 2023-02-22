import React, { useState } from "react";
import { Button, Modal, Card, Badge, Row, Col } from 'react-bootstrap';

export const ChangeStatusModal = (props) => {
  const { show, setModalOpen, updateReserveHistory, reserveHistories, setReserveHistories, reserveId } = props;
  const statuses = [
    {id: 1, name: '取置予約中', class: 'info'},
    {id: 2, name: '受渡済み', class: 'success'},
    {id: 3, name: '取置停止', class: 'danger'},
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
            <Badge key={index} onClick={() => updateReserveHistory(reserveId, status.id, setReserveHistories, reserveHistories, setModalOpen)} bg={status.class} className="me-1 order-status-badge fw-normal">
              {status.name}
            </Badge>
          </Card.Link>
        )}
      </Modal.Body>
  </Modal>
  );
};