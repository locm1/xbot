import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';

import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import LiffProductCard from "@/pages/liff/LiffProductCard";
import noImage from "@img/img/noimage.jpg"

export default (props) => {
  const { products } = props;
  const history = useHistory();

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
    <div className="mb-3">
      <div className="d-flex align-items-center">
        <h2 className="fs-6 fw-bold mb-0">ピックアップ商品一覧</h2>
        <div className="ms-auto">
          <Card.Link onClick={() => {history.push(Paths.LiffPickupProducs.path)}} className="d-inline-flex align-items-center fw-normal liff-product-view-all">
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
