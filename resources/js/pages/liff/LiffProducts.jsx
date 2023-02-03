import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { ShoppingCartIcon, InboxIcon } from '@heroicons/react/solid';

import LiffProductCategorySlideCardList from "@/pages/liff/LiffProductCategorySlideCardList";
import LiffProductCategoryCardList from "./LiffProductCategoryCardList";

export default () => {

  return (
    <>
    <main className="content liff-product-detail">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
      <LiffProductCategorySlideCardList />
    </main>
    <LiffProductCategoryCardList />
    </>
  );
};
