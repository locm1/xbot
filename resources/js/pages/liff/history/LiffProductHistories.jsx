import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Tab, Button, Card, Nav } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { ShoppingCartIcon, InboxIcon } from '@heroicons/react/solid';

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
        <Tab.Content>
          <Tab.Pane eventKey="purchase_history" className="py-4">
            <LiffPurchaseHistories />
          </Tab.Pane>
          <Tab.Pane eventKey="reserve_history" className="py-4">
            <p>b</p>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </main>
    </>
  );
};
