import React, { useState } from "react";
import { Row, Col, Nav, Breadcrumb, Card } from 'react-bootstrap';
import { HomeIcon, UserCircleIcon, CogIcon, MailIcon, ShoppingCartIcon } from '@heroicons/react/solid';

import OrderTop from "@/pages/order/detail/OrderTop";
import { OrderInformation } from "@/pages/order/detail/OrderInformation";
import { DetailWidget } from "@/pages/order/detail/DetailWidget";
import orders from "@/data/orders";
import Cosmetics from '@img/img/products/cosmetics.jpeg';
import Treatment from '@img/img/products/treatment.jpeg';

export default () => {
  const ordererInformations = [
    {id: 1, title: '氏名', value: '宮島拡夢'},
    {id: 2, title: '氏名（フリガナ）', value: 'ミヤジマヒロム'},
    {id: 3, title: '郵便番号', value: '0030809'},
    {id: 4, title: '住所', value: '北海道札幌市白石区菊水九条4-1-708'},
    {id: 5, title: '電話番号', value: '08060666789'},
    {id: 6, title: '購入回数', value: '3回'},
  ];

  const orders = [
    {id: 1, title: '注文番号', value: 22},
    {id: 2, title: '注文日時', value: '2022年12月11日　15時57分'},
    {id: 3, title: '利用クーポン', value: ''},
    {id: 4, title: '購入金額', value: '5,000円'},
    {id: 5, title: '送料', value: '500円'},
  ];

  const products = [
    {id: 1, title: 'トリートメント', value: 1, image: Treatment},
    {id: 2, title: 'コスメセット', value: 1, image: Cosmetics},
  ];

  const deliveries = [
    {id: 1, title: '配送先氏名', value: '宮島拡夢'},
    {id: 2, title: '配送先氏名（フリガナ）', value: 'ミヤジマヒロム'},
    {id: 3, title: '配送先郵便番号', value: '0030809'},
    {id: 4, title: '配送先住所', value: '北海道札幌市白石区菊水九条4-1-708'},
    {id: 5, title: '配送時間帯', value: '16:00〜18:00'},
    {id: 6, title: 'お支払い方法', value: 'クレジットカード'},
    {id: 6, title: 'ステータス', value: '注文内容確認中'},
  ];

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><HomeIcon className="icon icon-xs" /></Breadcrumb.Item>
            <Breadcrumb.Item>注文リスト</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-title">注文情報</h1>
        </div>
      </div>
      <OrderTop />
      <Row className="mt-5">
        <Col xs={12} xl={6}>
          <DetailWidget details={ordererInformations} title='注文者情報' />
          <Col className="mt-5">
            <DetailWidget details={deliveries} title='配送先情報' />
          </Col>
        </Col>
        <Col xs={12} xl={6}>
          <DetailWidget details={orders} title='注文情報' />
          <Col className="mt-5">
            <DetailWidget details={products} title='商品情報' />
          </Col>
        </Col>
      </Row>
    </>
  );
};
