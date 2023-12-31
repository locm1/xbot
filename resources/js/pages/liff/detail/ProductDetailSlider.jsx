import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Nav, Breadcrumb, Card, Image } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { HomeIcon, UserCircleIcon, CogIcon, MailIcon, ShoppingCartIcon } from '@heroicons/react/solid';
import noImage from "@img/img/noimage.jpg"

export default (props) => {
  const { productImages } = props;
  const mainOptions = {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    pagination: true,
    drag: true,
    lazyLoad: false,
    // arrows: productImages.length > 1 ? true : false,
    arrows: false,
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
    padding: 12,
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
          <SplideSlide key={`product-slide-${index}`}>
            <div className="d-flex justify-content-center">
              <Image src={image.image_path} className="" />
            </div>
          </SplideSlide>
        )}
      </Splide>
      {/* {
        productImages.length > 1 && (
          <Splide
            options={ thumbsOptions }
            ref={thumbsRef}
            className="thumbnail-slider"
          >
            {productImages && productImages.map((image, index) => 
              <SplideSlide className="thumbnail-slide-img" key={`product-slide-thumbnail-${index}`}>
                <Image src={image.image_path} className="slide-img" />
              </SplideSlide>
            )}
          </Splide>
        )
      } */}
    </>
  );
};
