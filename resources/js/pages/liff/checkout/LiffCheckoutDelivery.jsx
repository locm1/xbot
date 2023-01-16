import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import addresses from "@/data/deliveryAddresses";

export default () => {
  const deliveryTimes = [
    {id: 1, title: '希望しない', value: 1},
    {id: 2, title: '午前中', value: 2},
    {id: 3, title: '12:00 〜 14:00', value: 3},
    {id: 4, title: '14:00 〜 16:00', value: 4},
    {id: 5, title: '16:00 〜 18:00', value: 5},
    {id: 6, title: '18:00 〜 20:00', value: 6},
    {id: 7, title: '19:00 〜 21:00', value: 7},
    {id: 8, title: '20:00 〜 21:00', value: 8},
  ];

  return (
    <>
      <main className="content liff-product-detail">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        <div className="">
          <Link to={Paths.LiffCheckout.path} className="d-flex align-items-center p-2">
            <div className="">
              <span className="link-arrow">
                <ChevronLeftIcon className="icon icon-sm" />
              </span>
            </div>
            <h2 className="fs-6 fw-bold mb-0 ms-2">戻る</h2>
          </Link>
        </div>
        <Card border="0" className="shadow mt-2">
          <Card.Header className="border-bottom">
            <h2 className="fs-6 fw-bold mb-0">配送時間帯指定</h2>
          </Card.Header>
          <Card.Body className="py-0">
            <Row className="mt-3">
              <Col xs={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>配送時間帯</Form.Label>
                  <Form.Select defaultValue="0" className="mb-0 w-100">
                    {
                      deliveryTimes.map((deliveryTime, index) => <option key={index} value={deliveryTime.value}>{deliveryTime.title}</option>)
                    }
                  </Form.Select>
                </Form.Group>
                <h4 className="liff-checkout-payment-title text-dark mt-3">
                  ※送料については、<Card.Link href={Paths.LiffSpecificTrades.path} target="_blank" className="liff-specific-trades-link">特定商法取引法に基づく表記</Card.Link>をご覧ください。
                </h4>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <div className="align-items-center mt-4 liff-checkout-delivery-button">
          <Button variant="tertiary" as={Link} to={Paths.LiffCheckout.path} className="w-100 p-3">
            追加する
          </Button>
        </div>
      </main>
    </>
  );
};