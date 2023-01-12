import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';

import { Link } from 'react-router-dom';
import LiffProductCard from "@/pages/liff/LiffProductCard";
import productData from "@/data/products";

export default () => {
  const [products, setProducts] = useState(productData);

  return (
    <main className="content liff-product-detail">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
      <div className="liff-product-list">
        <div className="d-flex align-items-center">
          <h2 className="fs-6 fw-bold mb-3">カテゴリー1</h2>
        </div>
        <Row>
          {products.map((product, index) => 
            <Col xs={6} lg={4} className="liff-product-card-list-wrap">
              <LiffProductCard {...product} key={index} />
            </Col>
          )}
        </Row>
      </div>
    </main>
  );
};
