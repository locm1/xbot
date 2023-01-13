import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { ShoppingCartIcon, InboxIcon } from '@heroicons/react/solid';

import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import OrdererInformation from "@/pages/order/detail/OrdererInformation";
import { ProductWidget } from "@/pages/order/detail/ProductWidget";
import { DetailWidget } from "@/pages/order/detail/DetailWidget";
import Cosmetics from '@img/img/products/cosmetics.jpeg';
import Treatment from '@img/img/products/treatment.jpeg';

import ProductDetailSlider from "@/pages/liff/detail/ProductDetailSlider";

export default () => {
  const quantities = [...Array(10).keys()].map(i => ++i)
  return (
    <main className="content liff-product-detail">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
      <ProductDetailSlider />
      <div className="py-5">
        <h3 className="fs-5 mb-0 liff-product-detail-name">シャンプーリスト</h3>
        <h4 className="liff-product-detail-price mt-2">￥5,940<span>税込</span></h4>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center list-wrap border-bottom border-top py-3 px-0 mt-4">
          <div className="px-3 pb-3">
            <h4 className="fs-6 text-dark mb-0">数量</h4>
          </div>
          <div className="px-3 pb-3">
            <Form.Select defaultValue="1" size="sm">
              {
                quantities.map((quantity, index) => <option key={index} value={quantity}>{quantity}</option>)
              }
            </Form.Select>
          </div>
        </div>
        <div className="d-flex justify-content-between flex-wrap align-items-center py-4">
          <Button variant="gray-800" className="mt-2 liff-product-detail-button">
            <InboxIcon className="icon icon-xs me-2" />
            取り置きする
          </Button>
          <Button variant="tertiary" className="mt-2 liff-product-detail-button">
            <ShoppingCartIcon as={Link} to={Paths.LiffProducts.path} className="icon icon-xs me-2" />
            カートに入れる
          </Button>
        </div>
        <Card border="0" className="shadow mb-4 mt-5">
          <Card.Body>
            <h5 className="mb-4 border-bottom pb-3">説明</h5>
            <p>ここに商品の魅力や性能・効能についての具体的な説明を入れてください。</p>
          </Card.Body>
        </Card>
      </div>
    </main>
  );
};
