import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';

import { CouponDetailItem } from "@/pages/liff/LiffCardItem";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { showPaymentMethod } from "@/pages/liff/api/PaymentApiMethods";
import { getCustomer } from "@/pages/liff/api/CustomerApiMethods";
import ContentLoader from "react-content-loader";

export default (props) => {
  const { coupon, isRendered } = props;

  return isRendered ? (
    <>
      <Card border="0" className="shadow my-3">
        <Card.Header className="bg-primary text-white px-3 py-2 d-flex align-items-center justify-content-between">
          <h2 className="fs-5 fw-bolder mb-0">クーポンの追加</h2>
          <Button variant="outline-white" size="sm" as={Link} to={Paths.LIffCheckoutAddCoupon.path}>
            変更
          </Button>
        </Card.Header>
        <Card.Body className="py-0">
          <ListGroup className="list-group-flush">
            <CouponDetailItem coupon={coupon} />
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  ) : (
    <Card border="0" className="shadow my-3">
      <Card.Header className="bg-primary text-white px-3 py-2 d-flex align-items-center justify-content-between">
        <h2 className="fs-5 fw-bolder mb-0">クーポンの追加</h2>
        <Button variant="outline-white" size="sm" as={Link} to={Paths.LIffCheckoutAddCoupon.path}>
          変更
        </Button>
      </Card.Header>
      <Card.Body className="py-0">
        <ListGroup className="list-group-flush pt-3">
          <ContentLoader
            height={70}
            width={"100%"}
            speed={1}
          >
            <rect x="0" y="5" rx="3" ry="3" width="130" height="18" />
            <rect x="0" y="33" rx="3" ry="3" width={"100%"} height="18" />
          </ContentLoader>
        </ListGroup>
      </Card.Body>
    </Card>
  )
};