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
        <Card.Header className="border-bottom">
            <h5 className="liff-product-detail-name mb-0">注文詳細</h5>
          </Card.Header>
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
          <div className="align-items-center my-4">
            <Button as={Link} to={Paths.LiffProductHistories.path} variant="gray-800" className="w-100 p-3">
              購入履歴に戻る
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
    <main className="liff-product-detail">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
      <div className="liff-product-list">
        <Card border="0" className="shadow mb-4">
          <Card.Header className="border-bottom">
            <h5 className="liff-product-detail-name mb-0">お届け先情報</h5>
          </Card.Header>
          <Card.Body className="py-0">
            <ListGroup className="list-group-flush">
              <DeliveryAddressItem {...deliveryAddresses[0]} />
            </ListGroup>
          </Card.Body>
        </Card>
        <Card border="0" className="shadow mb-4">
          <Card.Header className="border-bottom">
            <h5 className="liff-product-detail-name mb-0">お支払い情報</h5>
          </Card.Header>
          <Card.Body className="py-0">
            <ListGroup className="list-group-flush">
              <PaymentDetailItem />
            </ListGroup>
          </Card.Body>
        </Card>
        <PurchaseDetailCard />
      </div>
    </main>
    </>
  );
};
