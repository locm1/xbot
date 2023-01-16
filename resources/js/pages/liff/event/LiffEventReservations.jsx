import React, { useState, useRef, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import { MapPinIcon } from "@/components/icons/Icons";

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary me-3',
    cancelButton: 'btn btn-gray'
  },
  buttonsStyling: false
}));

export default () => {
  const events = [
    {
      id: 1, name: '明治安田生命JIリーグ第1節', time: '13:00 〜 16:00',
      place: '札幌ドーム', borderNumber: 6,
    },
    {
      id: 2, name: '劇場版名探偵コナン 黒金の魚影', time: '18:00 〜 20:00',
      place: '札幌シネマフロンティア札幌シネマフロンティア', borderNumber: 6,
    },
    {
      id: 3, name: '会社説明会', time: '15:00 〜 16:00',
      place: 'Reno株式会社オフィス', borderNumber: 6,
    },
  ]

  const completeReservations = async () => {
    const message = `<p>イベントへの参加申し込みが完了しました。</p>
      <p>担当よりご連絡させていただきますので、今しばらくお待ちください。</p>
      `;
    await SwalWithBootstrapButtons.fire('申し込み完了！', message, 'success');
  };

  const LiffVisitorPrivilegeCard = (props) => {
    const EventItem = (props) => {
      const { name, time, place, borderNumber } = props;
  
      return (
        <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
          <Row className="align-items-center">
            <Col xs="12" className="px-0">
              <h4 className="fs-6 mb-1 liff-event-venue-title">{name}</h4>
            </Col>
            <Col xs="7" className="px-0">
              <small>開催時間：{time}</small>
            </Col>
            <Col xs="5" className="text-end">
              <small>残枠数：</small>
              <span className="fs-5 fw-bolder text-dark">{borderNumber}</span>
              <small>名</small>
            </Col>
            <Col xs="12" className="px-0">
              <div className="d-frex mt-1">
                <MapPinIcon className="icon icon-xs liff-event-icon" />
                <small className="liff-event-place">{place}</small>
              </div>
            </Col>
            <Col xs="12" className="text-end">
              <div className="align-items-center mt-3">
                <Button onClick={completeReservations} variant="tertiary" className="w-100">
                  参加を申し込む
                </Button>
              </div>
            </Col>
          </Row>
        </ListGroup.Item>
      );
    }

    return (
      <Card border="0" className="shadow">
        <Card.Header className="border-bottom">
          <div className="d-flex">
            <div className="calendar d-flex">
              <span className="calendar-month">{Number(1)}</span>
              <span className="calendar-day">{16}</span>
            </div>
            <h2 className="fs-5 fw-bold mb-0 ms-3 mt-3">
              1月16日（月）
            </h2>
          </div>
      </Card.Header>
        <Card.Body className="py-0">
          <ListGroup className="list-group-flush">
            {events.map(event => <EventItem key={`event-${event.id}`} {...event} />)}
          </ListGroup>
        </Card.Body>
    </Card>
    );
  }

  return (
    <>
      <main className="content liff-product-detail">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        <div className="liff-product-list">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <Button variant="primary" size="sm">
              <ChevronLeftIcon className="icon icon-xs" />
              <span className="me-2 ms-1">12月</span>
            </Button>
            <h2 className="fs-5 fw-bold mb-0">
              2023年1月
            </h2>
            <Button variant="primary" size="sm">
              <span className="me-2 ms-1">2月</span>
              <ChevronRightIcon className="icon icon-xs" /> 
            </Button>
          </div>
          <LiffVisitorPrivilegeCard />
        </div>
        <div className="liff-product-list">
          <LiffVisitorPrivilegeCard />
        </div>
      </main>
    </>
  );
};