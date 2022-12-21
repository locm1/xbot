import React, { useState } from "react";
import { Col, Row, Form, Modal, Button, InputGroup, Image, Badge, FloatingLabel } from 'react-bootstrap';
import { ArchiveIcon, CalendarIcon, CameraIcon, CheckIcon, ClipboardCheckIcon, ClockIcon, EyeIcon, PaperClipIcon, PlusIcon, SelectorIcon, ShareIcon, TagIcon, UserGroupIcon } from "@heroicons/react/solid";

import { PrivilegeProductTable } from "@/pages/privilege/PrivilegeProductTable";

export const PrivilegeEditModal = (props) => {
  const { id: visitTimes, products = [], show = false } = props;
  const [time, setTime] = useState(visitTimes ?? "");
  const [comment, setComment] = useState("");
  const [isTitleEditable, setIsTitleEditable] = useState(false);

  const toggleIsTitleEditable = () => {
    setIsTitleEditable(!isTitleEditable);
  };

  const onChange = () => {
    const payload = { listId, cardId, title };

    if (title !== props.title) {
      props.onChange && props.onChange(payload);
    }

    toggleIsTitleEditable();
  };

  return (
    <Modal as={Modal.Dialog} centered size="lg" show={show}>
      <Form className="modal-content p-lg-3">
        <Modal.Header className="align-items-start border-bottom">
          <div className="d-block">
            {isTitleEditable ? (
              <Form.Group id="title" className="mb-3">
                <Form.Control
                  required
                  autoFocus
                  value={visitTimes}
                  className="text-gray-900 fs-5 fw-bold border-0 px-1 py-0 m-0"
                  onChange={e => setTime(e.target.value)}
                  onBlur={onChange}
                />
              </Form.Group>
            ) : (
              <h5 className="text-gray-900 fs-5 fw-bold py-1 ps-1 mb-3" onClick={toggleIsTitleEditable}>
                来店回数 {visitTimes} 回
              </h5>
            )}

            {/* <div className="d-flex">
              <div className="d-block me-3 me-sm-4">
                <h5 className="fs-6 fw-bold text-gray-500">Members</h5>
                <div className="d-flex align-items-center">
                  {members.map(m => <KanbanAvatar key={`kanban-avatar-${m.id}`}  {...m} />)}

                  <Button variant="gray-200" size="sm" className="d-inline-flex align-items-center px-3 ms-1" onClick={onEditMembers}>
                    <PlusIcon className="icon icon-xs" />
                  </Button>
                </div>
              </div>
            </div> */}
          </div>
          <Button variant="close" />
        </Modal.Header>

        <Modal.Body className="py-4">
        </Modal.Body>

        <Modal.Footer className="justify-content-start border-top">
          <Button variant="gray-800" className="me-2 text-start">
            <SelectorIcon className="icon icon-xs me-2" />
            変更
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};