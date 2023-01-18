import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import cartData from "@/data/carts";
import { OrderDetailItem } from "@/pages/liff/history/LiffCardItem";

export default () => {
  const [carts, setCarts] = useState(cartData);
  const orderTotal = carts.reduce((cart, i) => cart + i.price, 0);
  const total = orderTotal + 500;

  const CartItem = (props) => {
    const { img, name, price, id, quantity } = props;

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Link to={`/liff/product/detail/${id}`}>
          <Row className="">
            <Col xs="5">
              <div className="liff-cart-img">
                <Image rounded src={img} className="m-0" />
              </div>
            </Col>
            <Col xs="7" className="px-0 m-0">
              <h4 className="fs-6 text-dark mb-0">{name}</h4>
              <h4 className="liff-product-detail-price mt-2">￥{price.toLocaleString()}<span>税込</span></h4>
              <p className="mt-3">数量：1</p>
            </Col>
          </Row>
        </Link>
      </ListGroup.Item>
    );
  }

  const TimeSpecificationItem = (props) => {
    const { img, name, price, id, quantity } = props;

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row className="">
          <Col xs="8" className="px-0">
            <div className="m-1">
              <h4 className="fs-6 text-dark mb-0">日時指定なし</h4>
              <h4 className="liff-checkout-payment-title text-dark mt-2">
                ※送料については、<Card.Link href={Paths.LiffSpecificTrades.path} target="_blank" className="liff-specific-trades-link">特定商法取引法に基づく表記</Card.Link>をご覧ください。
              </h4>
            </div>
          </Col>
          <Col xs="4" className="">
            <div className="align-items-center mt-2 ms-4">
              <Button as={Link} to={Paths.LiffCheckoutDelivery.path} variant="info" className="w-80">
                変更
              </Button>
            </div>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <>
      <Card border="0" className="shadow my-3">
        <Card.Header className="border-bottom">
          <h5 className="liff-product-detail-name mb-0">購入商品</h5>
        </Card.Header>
        <Card.Body className="py-0">
          <ListGroup className="list-group-flush">
            <TimeSpecificationItem />
          </ListGroup>
          <ListGroup className="list-group-flush">
            {carts.map(cart => <CartItem key={`cart-${cart.id}`} {...cart} />)}
          </ListGroup>
          <ListGroup className="list-group-flush">
            <OrderDetailItem total={total} orderTotal={orderTotal} />
          </ListGroup>
        </Card.Body>
        <div className="align-items-center m-2 mt-4 mb-4">
          <Button as={Link} to={Paths.LiffCheckout.path} variant="tertiary" className="w-100 p-3">
            注文を確定する
          </Button>
        </div>
      </Card>
    </>
  );
};