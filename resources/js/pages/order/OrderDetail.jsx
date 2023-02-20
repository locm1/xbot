import React, { useState, useEffect } from "react";
import { Row, Col, Nav, Breadcrumb, Card } from 'react-bootstrap';

import OrdererInformation from "@/pages/order/detail/OrdererInformation";
import { ProductWidget } from "@/pages/order/detail/ProductWidget";
import { DetailWidget } from "@/pages/order/detail/DetailWidget";

import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { showOrder } from "@/pages/order/api/OrderApiMethods";
import { getOrderProducts, getOrderUser, getOrderDelivery } from "@/pages/order/api/OrderDetailApiMethods";

export default () => {
  const getStatus = (status) => {
    switch (status) {
      case 1:
        return '注文内容確認中'
      case 2:
        return '配送準備中'
      case 3:
        return '当店より発送済み'
      case 4:
        return 'キャンセル'
    }
  }

  const getDeliveryTime = (delivery_time) => {
    switch (delivery_time) {
      case 1:
        return '指定なし'
      case 2:
        return '午前中'
      case 3:
        return '12:00 〜 14:00'
      case 4:
        return '14:00 〜 16:00'
      case 5:
        return '16:00 〜 18:00'
      case 6:
        return '18:00 〜 20:00'
      case 7:
        return '19:00 〜 21:00'
      case 8:
        return '20:00 〜 21:00'
    }
  }

  const getPaymentMethod = (payment_method) => {
    switch (payment_method) {
      case 1:
        return '代引き引き換え'
      case 2:
        return 'Apple Pay'
      case 3:
        return 'クレジットカード'
      default:
        return 'クレジットカード'
    }
  }

  const [orderProducts, setOrderProducts] = useState([
    {id: 1, name: '', quantity: '', product_id: 1, product_image: [
      {image_path: ''}
    ]}
  ]);
  const [orderUser, setOrderUser] = useState({
    id: 1, first_name: '', last_name: '', first_name_kana: '', last_name_kana: '', img_path: '',
    zipcode: '', prefecture: '', city: '', address: '', building_name: '', tel: ''
  });
  const [order, setOrder] = useState({
    id: 1, purchase_amount: '', status: 1, payment_method: 1, shipping_fee: '', coupon: {name: ''}, 
    created_at: '', status: 1, payment_method: 1, delivery_time: 1,
  });
  const [orderDelivery, setOrderDelivery] = useState({
    id: 1, first_name: '', last_name: '', first_name_kana: '', last_name_kana: '',
    zipcode: '', prefecture: '', city: '', address: '', building_name: '', tel: ''
  });
  const { id } = useParams();

  const ordererInformations = {
    name: `${orderUser.last_name} ${orderUser.first_name}`,
    nameKana: `${orderUser.last_name_kana} ${orderUser.first_name_kana}`,
  };
  const details = [
    {id: 1, title: '郵便番号', value: orderUser.zipcode},
    {id: 2, title: '住所', value: `${orderUser.prefecture}${orderUser.city}${orderUser.address} ${orderUser.building_name}`},
    {id: 3, title: '電話番号', value: orderUser.tel},
    {id: 4, title: '購入回数', value: '3回'},
  ];

  const orders = [
    {id: 1, title: '注文番号', value: order.id},
    {id: 2, title: '注文日時', value: order.created_at},
    {id: 3, title: '購入金額', value: `${order.purchase_amount.toLocaleString()}円`},
    {id: 4, title: '送料', value: `${order.shipping_fee.toLocaleString()}円`},
    {id: 5, title: '利用クーポン', value: order.coupon.name},
  ];

  const deliveries = [
    {id: 1, title: '配送先氏名', value: `${orderDelivery.last_name} ${orderDelivery.first_name}`},
    {id: 2, title: '配送先氏名（フリガナ）', value: `${orderDelivery.last_name_kana} ${orderDelivery.first_name_kana}`},
    {id: 3, title: '配送先郵便番号', value: orderDelivery.zipcode},
    {id: 4, title: '配送先住所', value: `${orderDelivery.prefecture}${orderDelivery.city}${orderDelivery.address} ${orderDelivery.building_name}`},
    {id: 5, title: '配送時間帯', value: getDeliveryTime(order.delivery_time)},
    {id: 6, title: 'お支払い方法', value: getPaymentMethod(order.payment_method)},
    {id: 6, title: 'ステータス', value: getStatus(order.status)},
  ];

  useEffect(() => {
    showOrder(id, setOrder)
    getOrderProducts(id, setOrderProducts);
    getOrderUser(id, setOrderUser);
    getOrderDelivery(id, setOrderDelivery);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">注文情報</h1>
        </div>
      </div>
      <Row className="mt-5">
        <Col xs={12} xl={8}>
          <DetailWidget details={orders} title='注文情報' />
          <Col className="mt-5">
            <ProductWidget details={orderProducts} title='商品情報' />
          </Col>
          <Col className="mt-5">
            <DetailWidget details={deliveries} title='配送情報' />
          </Col>
        </Col>
        <Col xs={12} xl={4}>
          <OrdererInformation {...ordererInformations} details={details} img_path={orderUser.img_path} />
        </Col>
      </Row>
    </>
  );
};
