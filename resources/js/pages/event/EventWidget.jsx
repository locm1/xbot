
import React, { useState, useEffect } from "react";
import { PencilAltIcon, DotsHorizontalIcon, UserGroupIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Badge, Image, Button, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import KanbanAvatar from "@/components/KanbanAvatar";
import ParticipantsModal from "@/components/ParticipantsModal";

import { GetEventUsers } from "@/pages/event/EventApiMethods"

export default (props) => {
  const events = props.events;
  const [id, setId] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const onCardClick = (id) => {
    setId(id)
    console.log(id);
    setOpenModal(!openModal);
  }

  const onHide = () => {
    setOpenModal(!openModal);
  }

  const handleClose = () => {
    setShowEditModal(false);
  };

  const Event = (props) => {
    const { id, title, start_date, end_date, location, rowClassName, users, onCardClick } = props;
    const dateSplit = start_date.split(' ')[0];
    const eventMonth = dateSplit.split('-')[1];
    const eventDay = dateSplit.split('-')[2];

    return (
      <>
        <Row className={`align-items-center d-block d-sm-flex ${rowClassName}`}>
          <Col xs="auto" className="mb-3 mb-sm-0">
            <div className="calendar d-flex">
              <span className="calendar-month">{Number(eventMonth)}月</span>
              <span className="calendar-day py-2">{eventDay}</span>
            </div>
          </Col>
          <Col>
            <h5 className="mb-1">{title}</h5>
            <div className="small fw-bold">{start_date} - {end_date}</div>
            <span className="small fw-bold">場所: {location}</span>
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
                  {users.map((user, index) => <KanbanAvatar key={`event-user-${index}`} name={user.last_name + ' ' + user.first_name} image={user.img_path} />)}
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
      {openModal && (
        <ParticipantsModal
          show={true}
          onHide={onHide}
          title="参加者一覧"
          getUsers={GetEventUsers}
          id={id}
        />
      )}
    <Card border="0" className="shadow">
      <Card.Body>
        {
          events && events.map((event, index) => 
            <Event 
              key={index}
              {...event}
              onCardClick={() => onCardClick(event.id)}
              rowClassName={(events.length - 1 === index) ? "" : "border-bottom pb-4 mb-4"}
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