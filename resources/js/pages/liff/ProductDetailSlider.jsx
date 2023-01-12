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
    type: 'fade',
    perPage: 1,
    perMove: 1,
    pagination: false,
    height: '18rem',
    drag: true,
    lazyLoad: true
  }

  const thumbsOptions = {
    rewind: true,
    gap: '1rem',
    pagination: false,
    fixedWidth: 100,
    fixedHeight: 70,
    cover: true,
    focus: 'center',
    isNavigation: true,
    arrows: false,
    lazyLoad: true,
  };

  const mainRef = useRef();
  const thumbsRef = useRef();

  useEffect(() => {
    if ( mainRef.current && thumbsRef.current && thumbsRef.current.splide ) {
      mainRef.current.sync( thumbsRef.current.splide );
    }
  });

  return (
    <>
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
          className="thumbnail-slider"
      >
        <SplideSlide className="thumbnail-slide-img">
          <Image rounded src={Cosmetics} className="slide-img" />
        </SplideSlide>
        <SplideSlide className="thumbnail-slide-img">
          <Image rounded src={Treatment} className="slide-img" />
        </SplideSlide>
        <SplideSlide className="thumbnail-slide-img">
          <Image rounded src={Cosmetics} className="slide-img" />
        </SplideSlide>
      </Splide>
    </>
  );
};
