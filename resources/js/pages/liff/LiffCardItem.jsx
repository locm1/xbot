import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Image, Button, Card, ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Paths } from "@/paths";
import noImage from "@img/img/noimage.jpg"
import moment from "moment-timezone";
import { isSalePeriod } from "@/components/common/IsSalePeriod";
import ContentLoader from "react-content-loader";

export const CartItem = (props) => {
  const { id, product_id, quantity, product, history, deadline } = props;
  const link = Paths.LiffProductDetail.path.replace(':id', product_id);
  const discount_rate_decimal = product.product_sale.discount_rate / 100.0
  const sale_price = product.price - (product.price * discount_rate_decimal)

  const getImages = (image) => {
    if (image) {
      return image.image_path
    } else {
      return noImage;
    }
  }

  return (
    <ListGroup.Item className="bg-transparent py-3 px-0">
      <Row className="">
        <Col xs="5">
          <Link to={link}>
            <div className="liff-cart-img">
              <Image rounded src={getImages(product.product_images[0])} className="m-0" />
            </div>
          </Link>
        </Col>
        <Col xs="7" className="px-0 m-0">
          <Link to={link}>
            <h4 className="fs-6 text-dark mb-0">{product.name}</h4>
          </Link>
          <h4 className="liff-product-detail-price mt-2">
            {
              isSalePeriod(product.product_sale.start_date, product.product_sale.end_date) ? (
                `￥${Math.floor(sale_price).toLocaleString()}`
              ) : (
                `￥${product.price.toLocaleString()}`
              )
            }
            <span>税込</span>
          </h4>
          <div className="">数量：{quantity}個</div>
          {
            history == 'reserve' &&
            <div className="">期間：{moment(deadline).format("YYYY年MM月DD日")}まで</div>
          }
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export const OrderDetailItem = (props) => {
  const {
    total, orderTotal, postage, paymentMethod,
    ecommerceConfiguration, discountedTotalAmount, coupon
  } = props;

  const getDiscountAmount = () => {
    if (coupon.id) {
      const discount_rate_decimal = coupon.discount_price / 100.0
      const discount_amount = orderTotal * discount_rate_decimal
      return discount_amount
    } else {
      return 0;
    }
  }

  return (
    <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
      <Row className="">
        <Col xs="7" className="px-0">
          <div className="m-1">
            <h5 className="fs-6 text-dark mb-0">商品合計</h5>
            {postage > 0 && (
              <h5 className="fs-6 text-dark mb-0 mt-1">送料</h5>
            )}
            {
              paymentMethod && paymentMethod.payment_method == 2 && ecommerceConfiguration.is_enabled == 1 && (
                <h5 className="fs-6 text-dark mb-0 mt-1">代金引換手数料</h5>
              )
            }
            {coupon.id && <h5 className="fs-6 text-dark mb-0 mt-1">クーポン割引</h5>}
            {
              discountedTotalAmount !== 0 && (
                <h5 className="fs-6 text-dark mb-0 mt-1">セット商品割引</h5>
              )
            }
            <h3 className="text-dark mb-0 mt-2 liff-pay-total-title">お支払い金額（税込）</h3>
          </div>
        </Col>
        <Col xs="5" className="">
          <div className="m-1 text-end">
            {orderTotal && <h5 className="fs-6 text-dark mb-0">￥ {orderTotal.toLocaleString()}</h5>}
            {postage > 0 && <h5 className="fs-6 text-dark mb-0 mt-1">￥ {postage.toLocaleString()}</h5>}
            {
              paymentMethod && paymentMethod.payment_method == 2 && ecommerceConfiguration.is_enabled == 1 &&
              <h5 className="fs-6 text-dark mb-0 mt-1">￥ {ecommerceConfiguration.cash_on_delivery_fee.toLocaleString()}</h5>
            }
            {
              coupon.id &&
              <h5 className="fs-6 text-dark mb-0 mt-1 liff-pay-discount">
                - ￥ {isNaN(getDiscountAmount()) ? 0 : Math.floor(getDiscountAmount()).toLocaleString()}
              </h5>
            }
            {
              discountedTotalAmount !== 0 &&
              <h5 className="fs-6 text-dark mb-0 mt-1 liff-pay-discount">- ￥ {discountedTotalAmount.toLocaleString()}</h5>
            }
            <h3 className="text-dark mb-0 mt-2 liff-pay-total">￥ {Math.floor(total).toLocaleString()}</h3>
          </div>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export const CouponDetailItem = (props) => {
  const { coupon } = props;
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
        <Col xs={12} className="px-0">
          <div className="m-1">
            {
              coupon.id ? (
                <>
                  <h4 className="fs-6 text-dark">{coupon.name}</h4>
                  <div className="liff-checkout-payment-title">
                    {coupon.discount_price}%の割引
                  </div>
                </>
              ) : (
                <h4 className="fs-6 text-dark">クーポンを追加する</h4>
              )
            }
          </div>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export const PaymentDetailItem = (props) => {
  const { paymentMethod, ecommerceConfiguration, page, card } = props;
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
    if (payment_method.payment_method == 1) {
      return `カード番号：${card.card_number}`
    } else if (payment_method.payment_method == 2) {
      return `手数料：${ecommerceConfiguration.cash_on_delivery_fee}円（税込）`
    } else {
      return ''
    }
  }

  return (
    <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
      <Row className="">
        <Col className="px-0">
          {(() => {
            if (paymentMethod.payment_method && paymentMethod.payment_method == 1) {
              return (
                <div className="m-1">
                  <h4 className="fs-6 text-dark">
                    {paymentMethod.payment_method === 1 ? "クレジットカード" : paymentMethod.payment_method === 2 ? "代金引換え" : ""}
                  </h4>
                  <div className="liff-checkout-payment-title">
                    {getPaymentMethod(paymentMethod)}
                  </div>
                </div>
              )
            } else if (paymentMethod.payment_method == 2 && ecommerceConfiguration.is_enabled == 1) {
              return (
                <div className="m-1">
                  <h4 className="fs-6 text-dark">
                    {paymentMethod.payment_method === 1 ? "クレジットカード" : paymentMethod.payment_method === 2 ? "代金引換え" : ""}
                  </h4>
                  <div className="liff-checkout-payment-title">
                    {getPaymentMethod(paymentMethod)}
                  </div>
                </div>
              )
            } else {
              return (
                <div className="m-1">
                  <h4 className="fs-6 text-dark">支払い方法を選択してください</h4>
                </div>
              )
            }
          })()}
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export const DeliveryAddressItem = (props) => {
  const { id, last_name, first_name, zipcode, prefecture, city, address, building_name, tel, isRendered } = props;
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

  return isRendered ? (
    <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
      <Row className="">
        <Col className="px-0">
          <div className="m-1">
            {
              typeof id === 'undefined' ? (
                <h4 className="fs-6 text-dark mb-0">お届け先住所を選択してください</h4>
              ) : (
                <>
                  <h4 className="fs-6 text-dark mb-0">{last_name} {first_name} 様</h4>
                  <h4 className="fs-6 text-dark mt-2">
                    〒{target_split}-{zipcode && zipcode.split(target_split)[1]}<br />
                    {prefecture} {city} {address} {building_name}
                  </h4>
                  <h4 className="fs-6 text-dark mt-1">{tel}</h4>
                </>
              )
            }
          </div>
        </Col>
      </Row>
    </ListGroup.Item>
  ) : (
    <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
      <ContentLoader
        height={120}
        width={"100%"}
        speed={1}
      >
        <rect x="0" y="5" rx="3" ry="3" width="130" height="18" />
        <rect x="0" y="33" rx="3" ry="3" width="130" height="18" />
        <rect x="0" y="61" rx="3" ry="3" width={"100%"} height="18" />
        <rect x="0" y="89" rx="3" ry="3" width="140" height="18" />
      </ContentLoader>
    </ListGroup.Item>
  )
}