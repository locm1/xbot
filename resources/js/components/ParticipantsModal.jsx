import React, { useState, useEffect } from "react";
import { ArchiveIcon, CalendarIcon, CameraIcon, CheckIcon, ClipboardCheckIcon, ClockIcon, EyeIcon, PaperClipIcon, PlusIcon, SelectorIcon, ShareIcon, TagIcon, UserGroupIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Modal, Button, InputGroup, Image, Badge, FloatingLabel } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";

export default (props) => {
  const { show = false, title, getUsers, id } = props;
  const [users, setUsers] = useState([]);

  const onHide = () => {
    props.onHide && props.onHide();
  };

  useEffect(() => {
    getUsers(id, setUsers)
  }, []);

  return (
    <Modal as={Modal.Dialog} centered scrollable show={show} onHide={onHide}>
      <Form className="modal-content p-3">
        <Modal.Header className="border-0 px-3 pb-0">
          <Modal.Title className="fw-normal">{title}</Modal.Title>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>

        <Modal.Body className="px-3 pb-0">
          <div className="px-3">
            {users.map(user => (
                <Row
                  key={`board-member-${user.id}`}
                  className="kanban-card-member border-bottom py-2"
                  as={Link}
                  to={Paths.EditUser.path.replace(':id', user.id)}
                >
                  <Col xs={2}>
                    <Image src={user.img_path} className="avatar-md rounded-circle" />
                  </Col>
                  <Col xs={8} className="d-flex align-items-center justify-content-start">
                    <h4 className="fs-6 text-dark mb-0">
                      {user.last_name} {user.first_name}
                    </h4>
                  </Col>
                </Row>
              ))}
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};