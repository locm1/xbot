import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';

import { Link } from 'react-router-dom';
import LiffProductCard from "@/pages/liff/LiffProductCard";
import productData from "@/data/products";

export default () => {
  const [products, setProducts] = useState(productData);
  const mainOptions = {
    perPage: 3,
    gap: '1rem',
    drag: 'free',
    snap: true,
    omitEnd: true,
    pagination: false,
    arrows: false,
    fixedWidth: 160,
    cover: false,
    focus: 'center',
  }

  return (
    <div className="liff-product-list">
      <div className="d-flex align-items-center">
        <h2 className="fs-6 fw-bold mb-0">カテゴリー1</h2>
        <div className="ms-auto">
          <Card.Link href={`/liff/product/category/1`} className="d-inline-flex align-items-center fw-normal liff-product-view-all">
            すべてを見る
          </Card.Link>
        </div>
      </div>
      <Splide
        aria-labelledby="card-slider"
        options={mainOptions}
        className="mt-3 liff-product-card-splide"
      >
        {products.map((product, index) => 
          <SplideSlide key={index} className="liff-product-card-wrap">
            <LiffProductCard {...product} key={index} />
          </SplideSlide>
        )}
      </Splide>
    </div>
  );
};
