import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, ListGroup, Card, InputGroup, Image, Button } from 'react-bootstrap';
import { SearchIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import Purchases from "@/data/purchases";
import { PurchaseItem } from "@/pages/liff/history/LiffCardItem";

export default () => {
  const date = new Date();
  const endYear = date.getFullYear();
  const startYear = endYear - 5;
  const [purchases, setPurchases] = useState(Purchases);

  const getPurchaseTimes = () => {
    const purchaseTimes = [];
    for (let index = startYear; index < endYear + 1; index++) {
      purchaseTimes.push(<option key={index} value={index}>{index}年</option>)
      
    }
    return purchaseTimes.reverse();
  }

  const PurchaseCard = (props) => {
    const { id, products } = props;

    return (
      <Card border="0" className="shadow p-0 mb-4">
        <Card.Header className="">
            <h2 className="fs-5 fw-bold mb-0">注文内容確認中</h2>
        </Card.Header>
        <Card.Body className="pb-3 rounded-bottompt-3">
          <div className="d-flex align-items-center border-bottom pb-3">
            <small className="">購入日時：2023-01-17</small>
            <div className="me-1 ms-1">｜</div>
            <small className="">注文番号：47777</small>
          </div>
          <ListGroup className="list-group-flush">
            {products.map(product => <PurchaseItem key={`product-${product.id}`} {...product} />)}
          </ListGroup>
          <div className="d-flex justify-content-between flex-wrap align-items-center mt-2 mb-2">
            <Button as={Link} to={`/history/product/purchase/${id}`} variant="info" className="mt-2 liff-product-detail-button">
              詳細を見る
            </Button>
            <Button as={Link} to={Paths.LiffCarts.path} variant="tertiary" className="mt-2 liff-product-detail-button">
              再購入する
            </Button>
          </div>
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
                placeholder="すべての購入履歴を検索"
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
      <p className="mb-3 mt-3">件数：2件</p>
    </div>
    {purchases.map(purchase => <PurchaseCard key={`purchase-${purchase.id}`} {...purchase} />)}
    </>
  );
};
