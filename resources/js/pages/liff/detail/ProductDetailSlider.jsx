import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Nav, Breadcrumb, Card, Image } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { HomeIcon, UserCircleIcon, CogIcon, MailIcon, ShoppingCartIcon } from '@heroicons/react/solid';
import noImage from "@img/img/noimage.jpg"

export default (props) => {
  const { productImages } = props;
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
        {productImages && productImages.map((image, index) => 
          <SplideSlide>
            <Image rounded src={image.image_path} className="slide-img" />
          </SplideSlide>
        )}
      </Splide>
      <Splide
          options={ thumbsOptions }
          ref={thumbsRef}
          className="thumbnail-slider"
      >
        {productImages && productImages.map((image, index) => 
          <SplideSlide className="thumbnail-slide-img">
            <Image rounded src={image.image_path} className="slide-img" />
          </SplideSlide>
        )}
      </Splide>
    </>
  );
};
