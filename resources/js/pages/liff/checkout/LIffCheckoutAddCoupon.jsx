import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon, SearchIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';

import { CouponDetailItem } from "@/pages/liff/LiffCardItem";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { showPaymentMethod } from "@/pages/liff/api/PaymentApiMethods";
import { getCustomer } from "@/pages/liff/api/CustomerApiMethods";
import { searchCoupons } from "@/pages/liff/api/CouponApiMethods";

export default (props) => {
  const { paymentMethod, ecommerceConfiguration, card } = props;
  const [user, setUser] = useState({
    is_registered: 0
  });
  const [couponCode, setCouponCode] = useState();
  const [coupons, setCoupons] = useState({});

  const handleClick = () => {
    const searchParams = {
      params: {
        code: couponCode
      }
    };
    searchCoupons(88, searchParams, setCoupons);
  };

  return (
    <>
      <main className="liff-product-detail">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        <div className="">
          <Link to={Paths.LiffCheckout.path} className="d-flex align-items-center p-2">
            <div className="">
              <span className="link-arrow">
                <ChevronLeftIcon className="icon icon-sm" />
              </span>
            </div>
            <h2 className="fs-6 fw-bold mb-0 ms-2">戻る</h2>
          </Link>
        </div>
        <Card border="0" className="shadow mt-2">
          <Card.Header className="border-bottom">
            <h2 className="fs-6 fw-bold mb-0">クーポン変更</h2>
          </Card.Header>
          <Card.Body className="py-0">
            <div className="table-settings mb-4">
              <Row className="d-flex justify-content-between align-items-center mt-3">
                <Col xs={12} lg={12} className="d-md-flex">
                  <InputGroup className="me-2 me-lg-3 fmxw-400">
                    <InputGroup.Text>
                      <SearchIcon className="icon icon-xs" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="クーポンコードを入力する"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                {
                  couponCode && (
                    <Col xs={12} lg={12} className="d-md-flex">
                      <div className="align-items-center my-4">
                        <Button onClick={handleClick} variant="gray-800" className="w-100 p-3">
                          適用
                        </Button>
                      </div>
                    </Col>
                  )
                }
              </Row>
            </div>
            {/* <ListGroup className="list-group-flush">
              {
                payments.map((payment, index) => 
                  <PaymentCard key={`payment-${index + 1}`} title={payment} value={index + 1} />
                )
              }
            </ListGroup>  */}
            <div className="align-items-center my-4">
              <Button variant="tertiary" className="w-100 p-3">
                変更する
              </Button>
            </div>
          </Card.Body>
        </Card>
      </main>
    </>
  );
};