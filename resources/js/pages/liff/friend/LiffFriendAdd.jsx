import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { PlusIcon, MinusIcon, ShoppingCartIcon, InboxIcon, TrashIcon } from '@heroicons/react/solid';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { Link, useHistory, Redirect, useLocation, useParams } from 'react-router-dom';
import { Paths } from "@/paths";
import noImage from "@img/img/noimage.jpg"
import Cookies from 'js-cookie';
import liff from '@line/liff';
import { LiffMockPlugin } from '@line/liff-mock';
import LiffCartSlideCard from "@/pages/liff/cart/LiffCartSlideCard";
import { isSalePeriod } from "@/components/common/IsSalePeriod";

export default () => {
  const { userId, versionKey, date } = useParams();

  // liff.idげっとしたら、踏んだやつのLINE IDとってこれる
  //　5分以内

  useEffect(() => {
    location.href = "https://www.google.com/";
  }, []);

  return (
    <div></div>
  );
};
