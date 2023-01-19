import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, ListGroup, Card, InputGroup, Image, Button } from 'react-bootstrap';
import { SearchIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";
import AccordionComponent from "@/components/AccordionComponent";

import Carts from "@/data/carts";
import { CartItem } from "@/pages/liff/LiffCardItem";
import QrCode from "@img/img/add_friend_qr.png"

export default () => {
  const date = new Date();
  const endYear = date.getFullYear();
  const startYear = endYear - 5;
  const [reserves, setReserves] = useState(Carts);

  const getPurchaseTimes = () => {
    const purchaseTimes = [];
    for (let index = startYear; index < endYear + 1; index++) {
      purchaseTimes.push(<option key={index} value={index}>{index}年</option>)
      
    }
    return purchaseTimes.reverse();
  }

  const ReserveCard = (props) => {
    const { id, reserve } = props;

    return (
      <Card border="0" className="shadow p-0 mb-4">
        <Card.Body className="pb-3 rounded-bottompt-3">
          <ListGroup className="list-group-flush">
            <CartItem {...reserve} history="reserve" />
          </ListGroup>
          <AccordionComponent
            data={[
              {
                id: 1,
                eventKey: "panel-1",
                title: "QRコードを表示",
              },
            ]}
          >
            <Image src={QrCode} className="m-0" />
          </AccordionComponent>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
    <Card border="0" className="shadow p-0">
      <Card.Body className="pb-3 rounded-bottompt-3">
        <Row>
          <Col xs={12}>
            <InputGroup className="me-3 me-lg-3">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="すべての取り置き履歴を検索"
                value=""
              />
            </InputGroup>
          </Col>
          <Col xs={12} className="mt-2">
            <Form.Select defaultValue="1" className="mb-0 w-100">
              <option value={1}>過去1ヶ月</option>
              <option value={2}>過去半年</option>
              {getPurchaseTimes()}
            </Form.Select>
          </Col>
        </Row>
      </Card.Body>
    </Card>
    <div className="d-flex align-items-center content">
      <p className="mb-3 mt-3">件数：{reserves.length}件</p>
    </div>
    {reserves.map(reserve => <ReserveCard key={`reserve-${reserve.id}`} reserve={reserve} />)}
    </>
  );
};
