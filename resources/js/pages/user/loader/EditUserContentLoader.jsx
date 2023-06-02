
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Tab, InputGroup, Button } from 'react-bootstrap';
import ContentLoader, { BulletList, Facebook } from "react-content-loader";

export default () => {
  return (
    <Card border="0" className="shadow mb-4">
      <Card.Header className="bg-primary text-white px-3 py-2">
        <h5 className="mb-0 fw-bolder">お客様情報</h5>
      </Card.Header>  
      <Card.Body>
        <Form>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birth_date">
                <Form.Label>生年月日</Form.Label>
                <div>
                  <ContentLoader
                    height={39.375}
                    width={401}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="70%" />
                  </ContentLoader>
                </div>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>性別</Form.Label>
                <div>
                  <ContentLoader
                    height={39.375}
                    width={401}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="70%" />
                  </ContentLoader>
                </div>
              </Form.Group>
            </Col>
          <Col md={4} className="mb-3">
              <Form.Group id="zipcode">
                <Form.Label>郵便番号</Form.Label>
                <ContentLoader
                  height={39.375}
                  width={259}
                  speed={1}
                >
                  <rect x="0" y="10" rx="3" ry="3" width="100%" height="100%" />
                </ContentLoader>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="email">
                <Form.Label>都道府県</Form.Label>
                <ContentLoader
                  height={39.375}
                  width={259}
                  speed={1}
                >
                  <rect x="0" y="10" rx="3" ry="3" width="100%" height="100%" />
                </ContentLoader>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>市区町村</Form.Label>
                <ContentLoader
                  height={39.375}
                  width={259}
                  speed={1}
                >
                  <rect x="0" y="10" rx="3" ry="3" width="100%" height="100%" />
                </ContentLoader>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="address">
                <Form.Label>丁目・番地・号</Form.Label>
                <ContentLoader
                  height={39.375}
                  width={259}
                  speed={1}
                >
                  <rect x="0" y="10" rx="3" ry="3" width="100%" height="100%" />
                </ContentLoader>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="building_name">
                <Form.Label>建物名/会社名</Form.Label>
                <ContentLoader
                  height={39.375}
                  width={259}
                  speed={1}
                >
                  <rect x="0" y="10" rx="3" ry="3" width="100%" height="100%" />
                </ContentLoader>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>電話番号</Form.Label>
                <ContentLoader
                  height={39.375}
                  width={259}
                  speed={1}
                >
                  <rect x="0" y="10" rx="3" ry="3" width="100%" height="100%" />
                </ContentLoader>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>職業</Form.Label>
                <div>
                  <ContentLoader
                    height={39.375}
                    width={259}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="70%" />
                  </ContentLoader>
                </div>
              </Form.Group>
            </Col>
            <Row className="align-items-end">
              <Col xs={8}>
                <Form.Group id="">
                  <Form.Label>タグ設定</Form.Label>
                  <div>
                    <ContentLoader
                      height={39.375}
                      width={542.6}
                      speed={1}
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="100%" height="70%" />
                    </ContentLoader>
                  </div>
                </Form.Group>
              </Col>
              <Col xs={4}>
                <ContentLoader
                  height={39.375}
                  width={259.3}
                  speed={1}
                >
                  <rect x="0" y="0" rx="3" ry="3" width="100%" height="70%" />
                </ContentLoader>
              </Col>
            </Row>
          </Row>
        </Form>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-content-end">
          <Button variant="success" className="btn-default-success">
            保存する
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};