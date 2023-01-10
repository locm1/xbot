import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Nav, Breadcrumb, Card, Image } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { HomeIcon, UserCircleIcon, CogIcon, MailIcon, ShoppingCartIcon } from '@heroicons/react/solid';

import OrdererInformation from "@/pages/order/detail/OrdererInformation";
import { ProductWidget } from "@/pages/order/detail/ProductWidget";
import { DetailWidget } from "@/pages/order/detail/DetailWidget";
import Cosmetics from '@img/img/products/cosmetics.jpeg';
import Treatment from '@img/img/products/treatment.jpeg';

export default () => {

  const mainOptions = {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    gap: '1rem',
    pagination: false,
    height: '18rem',
    arrows: false
  }

  const thumbsOptions = {
    type: 'slide',
    rewind: true,
    gap: '1rem',
    pagination: false,
    fixedWidth: 110,
    fixedHeight: 70,
    cover: true,
    focus: 'center',
    isNavigation: true,
    arrows: false
  };

  const mainRef = useRef();
  const thumbsRef = useRef();

  useEffect(() => {
    if ( mainRef.current && thumbsRef.current && thumbsRef.current.splide ) {
      mainRef.current.sync( thumbsRef.current.splide );
    }
  });

  return (
    <main className="content">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><HomeIcon className="icon icon-xs" /></Breadcrumb.Item>
            <Breadcrumb.Item active>商品</Breadcrumb.Item>
            <Breadcrumb.Item active>商品</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-title">商品詳細</h1>
        </div>
      </div>
      <Splide
        aria-labelledby="thumbnail-slider"
        options={mainOptions}
        ref={mainRef}
      >
        <SplideSlide>
          <Image rounded src={Cosmetics} className="slide-img" />
        </SplideSlide>
        <SplideSlide>
          <Image rounded src={Treatment} className="slide-img" />
        </SplideSlide>
        <SplideSlide>
          <Image rounded src={Cosmetics} className="slide-img" />
        </SplideSlide>
      </Splide>
      <Splide
          options={ thumbsOptions }
          ref={thumbsRef}
      >
        <SplideSlide>
          <Image rounded src={Cosmetics} className="slide-img" />
        </SplideSlide>
        <SplideSlide>
          <Image rounded src={Treatment} className="slide-img" />
        </SplideSlide>
        <SplideSlide>
          <Image rounded src={Cosmetics} className="slide-img" />
        </SplideSlide>
      </Splide>
    </main>
  );
};
