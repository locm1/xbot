import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';

import { Link } from 'react-router-dom';
import LiffProductCard from "@/pages/liff/LiffProductCard";

export default (props) => {
  const { products, categories } = props;
  const [selected, setSelected] = useState(0);
  const handleClick = (id) => {
    setSelected(id);
  }

  return (
    <div className="px-3">
      <div className="overflow-x-scroll d-flex mb-2 gap-1">
        <div
          className={`fw-bold text-nowrap mb-3 px-2 ${selected === 0 ? 'text-primary border-bottom border-2 border-primary' : 'text-gray-400'}`}
          onClick={() => handleClick(0)}
        >
          全ての商品
        </div>
        {categories.map((v, k) =>
          <div
            className={`fw-bold text-nowrap mb-3 px-2 ${v.id === selected ? 'text-primary border-bottom border-2 border-primary' : 'text-gray-400'}`}
            onClick={() => handleClick(v.id)}
          >
            {v.name}
          </div>
        )}
      </div>
      <div className="d-flex flex-wrap justify-content-between">
        {products && products.map((product, index) => {
          return selected === 0 ?
          <div key={`liff-product-card-${index}`} className="flex-grow-2 liff-product-card-list-wrap">
            <LiffProductCard {...product} key={index} />
          </div> : selected === product.product_category_id && 
          <div key={`liff-product-card-${index}`} className="flex-grow-2 liff-product-card-list-wrap">
            <LiffProductCard {...product} key={index} />
          </div>
        })}
        {products && products.length % 2 !== 0 && (<div className="flex-grow-2 liff-product-card-list-wrap"></div>)}
      </div>
    </div>
  );
};
