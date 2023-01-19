import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import Logo from "@img/img/logo_admin.png";
import QrCode from "@img/img/add_friend_qr.png";

export default () => {
  const privileges = [
    {id: 1, name: 'トリートメントサンプル'},
    {id: 2, name: 'ドレッシング'},
  ]
  const LiffVisitorCard = (props) => {
    return (
      <Card border="0" className="shadow liff-visitor-card">
        <Card.Body className="py-0">
          <Row className="">
            <Col xs="12" className="mt-3 mb-3 liff-visitor-card-item">
              <div className="text-center text-md-center mb-4 mt-md-0 border-bottom">
                <Image src={Logo} className="navbar-logo-wrap" />
              </div>
              <div className="text-center text-md-center mb-4 mt-md-0 border-bottom">
                <h2 className="mb-3 ms-3 liff-visitor-name">フクシテスト<span>様</span></h2>
              </div>
              <div className="text-center text-md-center mb-4 mt-md-0">
                <h4 className="fs-5 text-white">来店回数</h4>
                <h5 className="mb-3 text-white"><span className="liff-visitor-count">0</span>回</h5>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }

  const LiffVisitorQrCard = (props) => {

    return (
      <Card border="0" className="shadow">
        <Card.Body className="py-0">
          <Row className="">
            <Col xs="12" className="mt-3 mb-3">
              <p>来店されましたら、QRコードをスタッフにお見せください。</p>
              <div className="text-center text-md-center mt-md-0">
                <Image src={QrCode} className="liff-visitor-qrcode" />
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }

  const LiffVisitorPrivilegeCard = () => {
    const LiffVisitorPrivilegeItem = (props) => {
      const { name, id } = props;
  
      return (
        <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
          <Row className="align-items-center">
            <Col xs="auto">
              <h4 className="fs-6 text-dark mb-0">{id}</h4>
            </Col>
            <Col xs="auto" className="px-0">
              <h4 className="fs-6 text-dark mb-0">{name}プレゼント</h4>
            </Col>
          </Row>
        </ListGroup.Item>
      );
    }

    return (
      <Card border="0" className="shadow my-4">
        <Card.Header className="border-bottom">
          <h5 className="liff-product-detail-name mb-0">特典1</h5>
        </Card.Header>
        <Card.Body className="py-0">
          <ListGroup className="list-group-flush">
            {privileges.map(privilege => <LiffVisitorPrivilegeItem key={`privilege-${privilege.id}`} {...privilege} />)}
          </ListGroup>
        </Card.Body>
    </Card>
    );
  }

  return (
    <>
      <main className="liff-product-detail">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center list-wrap"></div>
        <div className="liff-product-list">
          <LiffVisitorPrivilegeCard />
          <LiffVisitorPrivilegeCard />
          <LiffVisitorPrivilegeCard />
          <LiffVisitorPrivilegeCard />
        </div>
      </main>
    </>
  );
};