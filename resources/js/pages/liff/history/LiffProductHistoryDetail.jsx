import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Image, Button, Card, ListGroup } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { ShoppingCartIcon, InboxIcon } from '@heroicons/react/solid';
import { Link, useLocation } from 'react-router-dom';
import { Paths } from "@/paths";

import Purchases from "@/data/purchases";
import addresses from "@/data/deliveryAddresses";
import { PurchaseItem, OrderDetailItem, PaymentDetailItem, DeliveryAddressItem } from "@/pages/liff/history/LiffCardItem";

export default () => {
  const [purchases, setPurchases] = useState(Purchases);
  const [deliveryAddresses, setDeliveryAddresses] = useState(addresses);
  const orderTotal = purchases[0].products.reduce((cart, i) => cart + i.price, 0);
  const total = orderTotal + 500;

  const PurchaseDetailCard = (props) => {
    return (
      <Card border="0" className="shadow">
        <Card.Body className="py-0">
          <Row className="mt-3 mb-3 pb-3 border-bottom">
            <Col xs={5}>
              <div className="liff-purchase-detail-card-title">ステータス</div>
              <div className="liff-purchase-detail-card-title">注文日時</div>
              <div className="liff-purchase-detail-card-title">注文番号</div>
            </Col>
            <Col xs={7}>
              <div>注文内容確認中</div>
              <div>2023-01-17</div>
              <div>4444</div>
            </Col>
          </Row>
          <ListGroup className="list-group-flush">
          {purchases[0].products.map(product => <PurchaseItem key={`product-${product.id}`} {...product} />)}
          </ListGroup>
          <ListGroup className="list-group-flush">
            <OrderDetailItem total={total} orderTotal={orderTotal} />
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
    <main className="content liff-product-detail">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
      <div className="liff-product-list">
        <div className="d-flex align-items-center">
        </div>
        <Card border="0" className="shadow mb-4">
          <h5 className="fs-5 liff-product-detail-name mb-3 ms-3">お届け先情報</h5>
          <Card.Body className="py-0">
            <ListGroup className="list-group-flush">
              <DeliveryAddressItem {...deliveryAddresses[0]} />
            </ListGroup>
          </Card.Body>
        </Card>
        <div className="d-flex align-items-center">
          <h2 className="fs-5 liff-product-detail-name mb-3 ms-3">お支払い情報</h2>
        </div>
        <Card border="0" className="shadow mb-4">
          <Card.Body className="py-0">
            <ListGroup className="list-group-flush">
              <PaymentDetailItem />
            </ListGroup>
          </Card.Body>
        </Card>
        <div className="d-flex align-items-center">
          <h2 className="fs-5 liff-product-detail-name mb-3 ms-3">注文詳細</h2>
        </div>
        <PurchaseDetailCard />
        <div className="align-items-center m-2 mt-4">
          <Button as={Link} to={Paths.LiffProductHistories.path} variant="gray-800" className="w-100 p-3">
            購入履歴に戻る
          </Button>
        </div>
      </div>
    </main>
    </>
  );
};
