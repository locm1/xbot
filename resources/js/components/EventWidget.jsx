
import React, { useState, useRef } from "react";
import { PencilAltIcon, DotsHorizontalIcon, UserGroupIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Badge, Image, Button, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import KanbanAvatar from "@/components/KanbanAvatar";
import { EventModal } from "@/components/Modals";
import ParticipantsModal from "@/components/ParticipantsModal";

export default (props) => {
  const events = props.events;
  const [openModal, setOpenModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [eventUsers, setEventUsers] = useState();

  const onCardClick = (users) => {
    setOpenModal(!openModal);
    setEventUsers(users);
  }

  const Event = (props) => {
    const { eventName, eventSchedule, start, end, place, rowClassName, users, onCardClick, setEventUsers } = props;
    const eventMonth = eventSchedule.split('-')[1];
    const eventDay = eventSchedule.split('-')[2];

    const onHide = () => {
      setOpenModal(!openModal);
      setEventUsers(null);
    }

    return (
      <>
        {openModal && (
          <ParticipantsModal
            show={true}
            users={eventUsers}
            onHide={onHide}
          />
        )}
        <Row className={`align-items-center d-block d-sm-flex ${rowClassName}`}>
          <Col xs="auto" className="mb-3 mb-sm-0">
            <div className="calendar d-flex">
              <span className="calendar-month">{Number(eventMonth)}月</span>
              <span className="calendar-day py-2">{eventDay}</span>
            </div>
          </Col>
          <Col>
            <Card.Link as={Link} to={Paths.Calendar.path} className="mb-1">
              <h5 className="mb-1">{eventName}</h5>
            </Card.Link>
            <div className="small fw-bold">{start} - {end}</div>
            <span className="small fw-bold">場所: {place}</span>
          </Col>
          <Col className="d-flex flex-row-reverse">
            <Card border={1} className="p-3 bg-gray-50 border border-gray-100 rounded event-widget-card" onClick={onCardClick}>
              <Card.Header className="d-flex align-items-center justify-content-between border-0 p-0 mb-3">
                <h6 className="mb-0 fs-6 fw-normal">参加者一覧</h6>
                <div>
                <UserGroupIcon className="icon icon-xs text-gray-500" />
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="avatar-group">
                  {users.map(user => <KanbanAvatar key={`card-member-${user.id}`} {...user} />)}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
    <Card border="0" className="shadow">
      <Card.Body>
        {
          events.map((event, index) => 
            <Event 
              key={index}
              {...event}
              onCardClick={() => onCardClick(event.users)}
              rowClassName={(events.length - 1 === index) ? "" : "border-bottom pb-4 mb-4"}
              setEventUsers={setEventUsers}
              setOpenModal={setOpenModal}
              openModal={openModal}
            />
          )
        }
      </Card.Body>
    </Card>
    </>
  );
};