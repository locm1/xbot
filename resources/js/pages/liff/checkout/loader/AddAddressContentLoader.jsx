import React, { useState, useEffect } from "react";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, ListGroup, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  
  return (
    <>
      <Card.Body className="py-0">
        <Row className="mt-3">
          <Col xs={12} className="mb-5">
            <Form.Label><span className="questionnaire-required me-2">必須</span>氏名</Form.Label>
            <div className="d-flex">
              <Form.Group id="last_name" className="pe-3">
                <ContentLoader
                  height="39"
                  width="139"
                  speed={1}
                >
                  <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                </ContentLoader>
              </Form.Group>
              <Form.Group id="first_name" className="ps-3">
                <ContentLoader
                  height="39"
                  width="139"
                  speed={1}
                >
                  <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                </ContentLoader>
              </Form.Group>
            </div>
          </Col>
          <Col xs={12} className="mb-5">
            <Form.Label><span className="questionnaire-required me-2">必須</span>フリガナ</Form.Label>
            <div className="d-flex">
              <Form.Group id="last_name_kana" className="pe-3">
                <ContentLoader
                  height="39"
                  width="139"
                  speed={1}
                >
                  <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                </ContentLoader>
              </Form.Group>
              <Form.Group id="first_name_kana" className="ps-3">
                <ContentLoader
                  height="39"
                  width="139"
                  speed={1}
                >
                  <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                </ContentLoader>
              </Form.Group>
            </div>
          </Col>
        </Row>
        <Row className="">
          <Col xs={6} className="mb-5">
            <Form.Group id="zipcode">
              <Form.Label><span className="questionnaire-required me-2">必須</span>郵便番号</Form.Label>
              <ContentLoader
                height="39"
                width="139"
                speed={1}
              >
                <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
              </ContentLoader>
            </Form.Group>
          </Col>
        </Row>
        <Row className="">
          <Col xs={12} className="mb-5">
            <Form.Group id="prefecture">
              <Form.Label><span className="questionnaire-required me-2">必須</span>都道府県</Form.Label>
              <ContentLoader
                height="39"
                width="310"
                speed={1}
              >
                <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
              </ContentLoader>
            </Form.Group>
          </Col>
          <Col xs={12} className="mb-5">
            <Form.Group id="city">
              <Form.Label><span className="questionnaire-required me-2">必須</span>市区町村</Form.Label>
              <ContentLoader
                height="39"
                width="310"
                speed={1}
              >
                <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
              </ContentLoader>
            </Form.Group>
          </Col>
          <Col xs={12} className="mb-5">
            <Form.Group id="address">
              <Form.Label><span className="questionnaire-required me-2">必須</span>丁目・番地・号</Form.Label>
              <ContentLoader
                height="39"
                width="310"
                speed={1}
              >
                <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
              </ContentLoader>
            </Form.Group>
          </Col>
          <Col xs={12} className="mb-5">
            <Form.Group id="building_name">
              <Form.Label><span className="questionnaire-any me-2">任意</span>建物名/会社名</Form.Label>
              <ContentLoader
                height="39"
                width="310"
                speed={1}
              >
                <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
              </ContentLoader>
            </Form.Group>
          </Col>
          <Col xs={12} className="mb-5">
            <Form.Group id="room_number">
              <Form.Label><span className="questionnaire-any me-2">任意</span>部屋番号</Form.Label>
              <ContentLoader
                height="39"
                width="310"
                speed={1}
              >
                <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
              </ContentLoader>
            </Form.Group>
          </Col>
          <Col xs={12} className="mb-5">
            <Form.Group id="tel">
              <Form.Label><span className="questionnaire-required me-2">必須</span>電話番号</Form.Label>
              <ContentLoader
                height="39"
                width="310"
                speed={1}
              >
                <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
              </ContentLoader>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
};