import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";
import { getPrefectures } from "@/pages/liff/api/PrefectureApiMethods";

import addresses from "@/data/deliveryAddresses";

export default () => {
  const [prefectures, setPrefectures] = useState([]);

  useEffect(() => {
    getPrefectures(setPrefectures)
  }, []);

  return (
    <>
      <main className="liff-product-detail">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        <div className="">
          <Link to={Paths.LiffCheckoutDestinations.path} className="d-flex align-items-center p-2">
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
            <h2 className="fs-6 fw-bold mb-0">お届け先の追加</h2>
          </Card.Header>
          <Card.Body className="py-0">
            <Row className="mt-3">
              <Col xs={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>氏名（姓）</Form.Label>
                  <Form.Control required type="text" name="last_name_kana" placeholder="山田" />
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>氏名（名）</Form.Label>
                  <Form.Control required type="text" name="first_name_kana" placeholder="太郎" />
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>フリガナ（姓）</Form.Label>
                  <Form.Control required type="text" name="last_name_kana" placeholder="ヤマダ" />
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>フリガナ（名）</Form.Label>
                  <Form.Control required type="text" name="first_name_kana" placeholder="タロウ" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="">
              <Col xs={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>郵便番号</Form.Label>
                  <Form.Control required type="number" name="zipcode" placeholder="0001111" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="">
              <Col xs={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>都道府県</Form.Label>
                  <Form.Select defaultValue="0" className="mb-0 w-100">
                    {
                      prefectures.map((prefecture, index) => <option key={index} value={prefecture}>{prefecture}</option>)
                    }
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>市区町村</Form.Label>
                  <Form.Control required type="text" name="city" placeholder="例）札幌市中央区南一条西" />
                </Form.Group>
              </Col>
              <Col xs={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>丁目・番地・号</Form.Label>
                  <Form.Control required type="text" name="address" placeholder="例）5-16" />
                </Form.Group>
              </Col>
              <Col xs={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>建物名/会社名</Form.Label>
                  <Form.Control required type="text" name="building_name" placeholder="例）プレジデント松井ビル100" />
                </Form.Group>
              </Col>
              <Col xs={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>部屋番号</Form.Label>
                  <Form.Control required type="number" name="room_number" placeholder="例）3" />
                </Form.Group>
              </Col>
              <Col xs={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>電話番号</Form.Label>
                  <Form.Control required type="tel" name="tel" placeholder="例）0120828450" />
                </Form.Group>
              </Col>
            </Row>
            <div className="align-items-center mt-4 mb-4">
              <Button variant="tertiary" as={Link} to={Paths.LiffCheckoutDestinations.path} className="w-100 p-3">
                追加する
              </Button>
            </div>
          </Card.Body>
        </Card>
      </main>
    </>
  );
};