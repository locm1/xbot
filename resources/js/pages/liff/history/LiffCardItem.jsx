import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Image, Button, Card, ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Paths } from "@/paths";

export const PurchaseItem = (props) => {
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
            <p className="mt-2">個数：1個</p>
          </Col>
        </Row>
      </Link>
    </ListGroup.Item>
  );
}

export const OrderDetailItem = (props) => {
  const { total, orderTotal } = props;

  return (
    <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
      <Row className="">
        <Col xs="7" className="px-0">
          <div className="m-1">
            <h4 className="fs-6 text-dark mb-0">商品合計</h4>
            <h4 className="fs-6 text-dark mb-0 mt-1">送料</h4>
            <h3 className="text-dark mb-0 mt-2 liff-pay-total-title">お支払い金額（税込）</h3>
          </div>
        </Col>
        <Col xs="5" className="">
          <div className="m-1 text-end">
            <h4 className="fs-6 text-dark mb-0">￥ {orderTotal.toLocaleString()}</h4>
            <h4 className="fs-6 text-dark mb-0 mt-1">￥ 500</h4>
            <h3 className="text-dark mb-0 mt-2 liff-pay-total">￥ {total.toLocaleString()}</h3>
          </div>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export const PaymentDetailItem = () => {
  const location = useLocation().pathname;

  const getColButton = (location) => {
    if (location == '/checkout') {
      return {
        colSize: 8,
        isButton: true
      }
    } else {
      return {
        colSize: 12,
        isButton: false
      }
    }
  }

  return (
    <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
      <Row className="">
        <Col xs={getColButton(location).colSize} className="px-0">
          <div className="m-1">
            <h4 className="fs-6 text-dark">クレジットカード</h4>
            <div className="liff-checkout-payment-title">カード番号：xxxx-xxxx-xxxx-xxxx</div>
            <div className="liff-checkout-payment-title text-dark">支払い回数：3回払い</div>
          </div>
        </Col>
        {
          getColButton(location).isButton &&
          <Col xs="4" className="">
          <div className="align-items-center mt-4 ms-4">
            <Button as={Link} to={Paths.LiffCheckoutPayment.path} variant="info" className="w-80">
              変更
            </Button>
          </div>
        </Col>
        }
      </Row>
    </ListGroup.Item>
  );
}

export const DeliveryAddressItem = (props) => {
  const { id, index, lastName, firstName, lastNameKana, firstNameKana, zipcode, prefectures, city, address, buildingName, roomNumber, tel } = props;
  const location = useLocation().pathname;

  const getColButton = (location) => {
    if (location == '/checkout') {
      return {
        colSize: 8,
        isButton: true
      }
    } else {
      return {
        colSize: 12,
        isButton: false
      }
    }
  }

  return (
    <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
      <Row className="">
        <Col xs={getColButton(location).colSize} className="px-0">
          <div className="m-1">
            <h4 className="fs-6 text-dark mb-0">{lastName} {firstName} 様</h4>
            <h4 className="fs-6 text-dark mt-2">
              〒{zipcode}<br />
              {prefectures} {city} {address} {buildingName} {roomNumber}
            </h4>
            <h4 className="fs-6 text-dark mt-1">{tel}</h4>
          </div>
        </Col>
        {
          getColButton(location).isButton &&
          <Col xs="4" className="">
            <div className="align-items-center mt-4 ms-4">
              <Button as={Link} to={Paths.LiffCheckoutDestinations.path} variant="info" className="w-80">
                変更
              </Button>
            </div>
          </Col>
        }
      </Row>
    </ListGroup.Item>
  );
}