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
    type: 'loop',
    perPage: 1.5,
    drag: 'free',
    pagination: false,
    arrows: false,
    fixedWidth: 200,
    fixedHeight: 200,
    cover: false,
    focus: 'center',
  }

  return (
    <div className="liff-product-list">
      <div className="d-flex align-items-center">
        <h2 className="fs-5 fw-bold mb-0">カテゴリー1</h2>
        <div className="ms-auto">
          <Link href="#" className="d-inline-flex align-items-center fw-normal">
            すべて見る
          </Link>
        </div>
      </div>
      <Splide
        aria-labelledby="card-slider"
        options={mainOptions}
        className="mt-4"
      >
        {products.map((product, index) => 
          <SplideSlide>
            <LiffProductCard {...product} key={index} />
          </SplideSlide>
        )}
      </Splide>
    </div>
  );
};
