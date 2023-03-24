import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Image, Button, Card, ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Paths } from "@/paths";
import noImage from "@img/img/noimage.jpg"
import moment from "moment-timezone";

export const CartItem = (props) => {
  const { id, product_id, quantity, product, history, deadline } = props;
  const link = Paths.LiffProductDetail.path.replace(':id', product_id);

  const getImages = (image) => {
    if (image) {
      return image.image_path
    } else {
      return noImage;
    }
  }

  return (
    <ListGroup.Item className="bg-transparent py-3 px-0">
      <Link to={link}>
        <Row className="">
          <Col xs="5">
            <div className="liff-cart-img">
              <Image rounded src={getImages(product.product_images[0])}  className="m-0" />
            </div>
          </Col>
          <Col xs="7" className="px-0 m-0">
            <h4 className="fs-6 text-dark mb-0">{product.name}</h4>
            <h4 className="liff-product-detail-price mt-2">￥{product.price.toLocaleString()}<span>税込</span></h4>
            <div className="">数量：{quantity}個</div>
            {
              history == 'reserve' &&
              <div className="">期間：{moment(deadline).format("YYYY年MM月DD日")}まで</div>
            }
          </Col>
        </Row>
      </Link>
    </ListGroup.Item>
  );
}

export const OrderDetailItem = (props) => {
  const { total, orderTotal, postage, paymentMethod, ecommerceConfiguration } = props;

  return (
    <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
      <Row className="">
        <Col xs="7" className="px-0">
          <div className="m-1">
            <h4 className="fs-6 text-dark mb-0">商品合計</h4>
            <h4 className="fs-6 text-dark mb-0 mt-1">送料</h4>
            { 
              paymentMethod.payment_method == 2 && (
                <h4 className="fs-6 text-dark mb-0 mt-1">代金引換手数料</h4>
              )
            }
            <h3 className="text-dark mb-0 mt-2 liff-pay-total-title">お支払い金額（税込）</h3>
          </div>
        </Col>
        <Col xs="5" className="">
          <div className="m-1 text-end">
            <h4 className="fs-6 text-dark mb-0">￥ {orderTotal.toLocaleString()}</h4>
            <h4 className="fs-6 text-dark mb-0 mt-1">￥ {postage.toLocaleString()}</h4>
            { 
              paymentMethod.payment_method == 2 && (
                <h4 className="fs-6 text-dark mb-0 mt-1">￥ {ecommerceConfiguration.cash_on_delivery_fee.toLocaleString()}</h4>
              )
            }
            <h3 className="text-dark mb-0 mt-2 liff-pay-total">￥ {total.toLocaleString()}</h3>
          </div>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export const PaymentDetailItem = (props) => {
  const { paymentMethod, customer, ecommerceConfiguration, page, card } = props;
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

  const getPaymentMethod = (payment_method) => {
    if (payment_method == 1) {
      const newCard = (page == 'purchase-history') ? card.card_number : customer.default_card.card_number
      return `カード番号：${newCard}`
    } else if (payment_method == 2) {
      return `手数料：${ecommerceConfiguration.cash_on_delivery_fee}円（税込）`
    } else {
      return ''
    }
  }

  return (
    <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
      <Row className="">
        <Col xs={getColButton(location).colSize} className="px-0">
          {
            paymentMethod ? (
              <div className="m-1">
                <h4 className="fs-6 text-dark">
                  {paymentMethod.payment_method === 1 ? "クレジットカード" : paymentMethod.payment_method === 2 ? "代金引換え" : ""}
                </h4>
                <div className="liff-checkout-payment-title">
                  {getPaymentMethod(paymentMethod.payment_method)}
                </div>
              </div>
            ) : (
              <div className="m-1 mt-3">
                <h4 className="fs-6 text-dark">支払い方法を選択してください</h4>
              </div>
            )
          }
        </Col>
        {
          getColButton(location).isButton &&
          <Col xs="4" className="">
          <div className="align-items-center mt-2 ms-4">
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
  const { id, last_name, first_name, zipcode, prefecture, city, address, building_name, tel } = props;
  const location = useLocation().pathname;
  const target_split = zipcode && zipcode.substr(0, 3);


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
            <h4 className="fs-6 text-dark mb-0">{last_name} {first_name} 様</h4>
            <h4 className="fs-6 text-dark mt-2">
              〒{target_split}-{zipcode && zipcode.split(target_split)[1]}<br />
              {prefecture} {city} {address} {building_name}
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