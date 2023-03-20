import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';

import { PaymentDetailItem } from "@/pages/liff/LiffCardItem";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { showPaymentMethod } from "@/pages/liff/api/PaymentApiMethods";

export default () => {
  const [paymentMethod, setPaymentMethod] = useState();
  const [user, setUser] = useState({
    is_registered: 0
  });

  useEffect(() => {
    const idToken = Cookies.get('TOKEN');
    //getUser(idToken, setUser).then(response => showPaymentMethod(response.id, setPaymentMethod))
    showPaymentMethod(101, setPaymentMethod)
  }, []);

  return (
    <>
      <Card border="0" className="shadow my-3">
        <Card.Header className="border-bottom">
          <h5 className="liff-product-detail-name mb-0">支払い方法</h5>
        </Card.Header>
        <Card.Body className="py-0">
          <ListGroup className="list-group-flush">
            <PaymentDetailItem paymentMethod={paymentMethod} />
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};