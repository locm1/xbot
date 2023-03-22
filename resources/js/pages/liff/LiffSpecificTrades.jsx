import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';

import { getSpecificTrades } from "@/pages/liff/api/SettingApiMethods";

export default () => {
  const [specificTrades, setSpecificTrades] = useState([
    {title: '', content: ''}
  ]);

  useEffect(() => {
    getSpecificTrades(setSpecificTrades)
  }, []);

  const SpecificTradesItem = (props) => {
    const { title, content } = props;

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row>
          <Col xs="4" xl={4} className="pb-2 mt-2">
            <h4 className="fs-6 fw-bolder text-dark mb-0">{title}</h4>
          </Col>
          <Col xs="8" xl={8} className="pb-2 mt-2">
          <span className="fs-6 text-dark liff-specific-trade-content">{content}</span>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <>
      <main className="liff-product-detail">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        <div className="liff-product-list">
          <Card border="0" className="shadow">
            <Card.Header className="border-bottom">
              <h5 className="liff-product-detail-name mb-0">特定商取引法に基づく表記</h5>
            </Card.Header>
            <Card.Body className="py-0">
              <ListGroup className="list-group-flush">
                {
                  specificTrades.map((specificTrade, index) =>
                  <SpecificTradesItem key={index} title={specificTrade.title} content={specificTrade.content} />
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </main>
    </>
  );
};