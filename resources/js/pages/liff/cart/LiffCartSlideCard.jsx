import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';

import { Link } from 'react-router-dom';
import { Paths } from "@/paths";
import LiffProductCard from "@/pages/liff/LiffProductCard";
import noImage from "@img/img/noimage.jpg"

export default (props) => {
  const { relatedProducts, addCart } = props;

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
    padding: 12,
  }

  return (
    <div className="mt-4">
      <div className="d-flex align-items-center">
        <h2 className="fs-6 fw-bold mb-0">合わせてお得にご購入いただけます</h2>
      </div>
      <Splide
        aria-labelledby="card-slider"
        options={mainOptions}
        className="mt-3 liff-product-card-splide"
      >
        {relatedProducts && relatedProducts.map((product, index) => 
          <SplideSlide key={index} className="liff-product-card-wrap">
            <LiffProductCard {...product} key={index} relatedProduct={product} page="cart" addCart={addCart} />
          </SplideSlide>
        )}
      </Splide>
    </div>
  );
};
