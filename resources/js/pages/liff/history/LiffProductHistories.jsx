import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Tab, Button, Card, Nav } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { ShoppingCartIcon, InboxIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import LiffPurchaseHistories from "@/pages/liff/history/LiffPurchaseHistories";

export default () => {

  return (
    <>
    <main className="content liff-product-detail">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
      <Tab.Container defaultActiveKey="purchase_history" className="mb-6">
        <Nav fill variant="pills" className="flex-column">
          <Row>
            <Col xs={6}>
              <Nav.Item>
                <Nav.Link eventKey="purchase_history" className="mb-sm-3 mb-md-0">
                  <ShoppingCartIcon className="icon icon-xs me-2" /> 購入履歴
                </Nav.Link>
              </Nav.Item>
            </Col>
            <Col xs={6}>
              <Nav.Item>
                <Nav.Link eventKey="reserve_history" className="mb-sm-3 mb-md-0">
                  <InboxIcon className="icon icon-xs me-2" /> 取り置き履歴
                </Nav.Link>
              </Nav.Item>
            </Col>
          </Row>
        </Nav>
        <Tab.Content className="liff-product-card-splide">
          <Tab.Pane eventKey="purchase_history" className="mb-4">
            <LiffPurchaseHistories />
          </Tab.Pane>
          <Tab.Pane eventKey="reserve_history" className="">
            <p>b</p>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <Card border="0" className="shadow p-0 liff-product-card-splide mb-4">
        <Card.Header className="border-bottom">
          <h5 className="liff-product-detail-name mb-0">キャンセルについて</h5>
        </Card.Header>
        <Card.Body className="pb-3 rounded-bottompt-3">
          <p>キャンセルする場合は、お手数ですが下記ボタンからご連絡ください。</p>
          <p>注文番号をお伝えいただくとスムーズです。</p>
          <div className="d-flex justify-content-between flex-wrap align-items-center mt-2 mb-2">
            <Button as={Link} to="tel:011-838-8392" variant="gray-800" className="mt-2 w-100">
              電話する
            </Button>
          </div>
        </Card.Body>
      </Card>
    </main>
    </>
  );
};
