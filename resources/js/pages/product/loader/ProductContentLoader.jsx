
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Badge, Tab, InputGroup, ListGroup } from 'react-bootstrap';
import ContentLoader, { BulletList, Facebook } from "react-content-loader";

export default () => {
  const loadingTables = [_, _, _, _, _, _,];

  return (
    <Row>
      <Col xs={12} xl={8}>
        <Card border="0" className="shadow mb-4">
          <Card.Header className="bg-primary text-white px-3 py-2">
            <h5 className="mb-0 fw-bolder">商品情報</h5>
          </Card.Header> 
          <Card.Body>
            <Row>
              <Col md={12} className="mb-4">
                <Form.Group id="name">
                  <Form.Label><Badge bg="danger" className="me-2">必須</Badge>商品名</Form.Label>
                  <div>
                    <ContentLoader
                      height={39.375}
                      width={714}
                      speed={1}
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                    </ContentLoader>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-4">
                <Form.Group id="category">
                  <Form.Label><Badge bg="danger" className="me-2">必須</Badge>カテゴリー</Form.Label>
                  <div>
                    <ContentLoader
                      height={39.375}
                      width={345}
                      speed={1}
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                    </ContentLoader>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-4">
                <Form.Group id="stock-quantity">
                  <Form.Label><Badge bg="danger" className="me-2">必須</Badge>在庫数</Form.Label>
                  <InputGroup className="me-2 me-lg-3">
                  <div>
                    <ContentLoader
                      height={39.375}
                      width={345}
                      speed={1}
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                    </ContentLoader>
                  </div>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4} className="mb-4">
                <Form.Group id="price">
                  <Form.Label><Badge bg="danger" className="me-2">必須</Badge>販売価格（税込）</Form.Label>
                  <div>
                    <ContentLoader
                      height={39.375}
                      width={345}
                      speed={1}
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="60%" height="100%" />
                    </ContentLoader>
                  </div>
                </Form.Group>
              </Col>
              <Col md={12} className="mb-4">
                <Form.Group id="overview">
                  <Form.Label><Badge bg="danger" className="me-2">必須</Badge>商品概要</Form.Label>
                  <div>
                    <ContentLoader
                      height={81}
                      width={714}
                      speed={1}
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                    </ContentLoader>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card border="0" className="shadow mb-4">
          <Card.Header className="bg-primary text-white px-3 py-2">
            <h5 className="mb-0 fw-bolder">セール設定</h5>
          </Card.Header> 
          <Card.Body>
            <Row>
              <Col md={6} className="mb-4">
                <Form.Group id="discountRate">
                  <Form.Label><Badge bg="gray-600" className="me-2">任意</Badge>セール割引率（%）</Form.Label>
                  <div>
                    <ContentLoader
                      height={39.375}
                      width={345}
                      speed={1}
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                    </ContentLoader>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-4">
                <div className="mt-3">
                  <ContentLoader
                    height={55.375}
                    width={345}
                    speed={1}
                  >
                    <rect x="0" y="16" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                </div>
              </Col>
              <Col md={6} className="mb-4">
                <Form.Group id="startDate">
                  <Form.Label><Badge bg="gray-600" className="me-2">任意</Badge>開始日時</Form.Label>
                  <div>
                    <ContentLoader
                      height={39.375}
                      width={345}
                      speed={1}
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                    </ContentLoader>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-4">
                <Form.Group id="endDate">
                  <Form.Label><Badge bg="gray-600" className="me-2">任意</Badge>終了日時</Form.Label>
                  <div>
                    <ContentLoader
                      height={39.375}
                      width={345}
                      speed={1}
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                    </ContentLoader>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} lg={4}>
        <Card border="0" className="shadow mb-4">
          <Card.Header className="bg-primary text-white px-3 py-2">
            <h5 className="mb-0 fw-bolder">商品設定</h5>
          </Card.Header> 
          <Card.Body>
            <div className="mb-4">
              <Form.Group id="status">
                <Form.Label><Badge bg="danger" className="me-2">必須</Badge>ステータス</Form.Label>
                <div>
                  <ContentLoader
                    height={39.375}
                    width={321}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                </div>
              </Form.Group>
            </div>
            <div className="mb-4">
              <Form.Group id="pickup">
                <Form.Label>ピックアップ</Form.Label>
                <div>
                  <ContentLoader
                    height={39.375}
                    width={321}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                </div>
              </Form.Group>
            </div>
          </Card.Body>
        </Card>
        <Card border="0" className="shadow mb-4">
          <Card.Header className="bg-primary text-white px-3 py-2">
            <h5 className="mb-0 fw-bolder">商品画像</h5>
          </Card.Header> 
          <Card.Body>
            <div className="mb-4">
              <Row>
                {loadingTables.map((image, k) => (
                  <Col xl={6} key={`product-image-${k}`}>
                    <ContentLoader
                      height={128}
                      width={148}
                      speed={1}
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="100%" height="75%" />
                    </ContentLoader>
                  </Col>
                ))}
              </Row>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};