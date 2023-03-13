import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';

import { Link } from 'react-router-dom';
import LiffProductCard from "@/pages/liff/LiffProductCard";

export default (props) => {
  const { products } = props;

  return (
    <div className="liff-product-list">
      <div className="d-flex align-items-center">
        <h2 className="fs-6 fw-bold mb-3 ms-3">全ての商品</h2>
      </div>
      <div className="d-flex flex-wrap justify-content-evenly">
        {products && products.map((product, index) => 
          <div key={index} className="flex-grow-2 liff-product-card-list-wrap">
            <LiffProductCard {...product} key={index} />
          </div>
        )}
      </div>
    </div>
  );
};
