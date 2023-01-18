import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import addresses from "@/data/deliveryAddresses";
import { PurchaseItem, OrderDetailItem, PaymentDetailItem } from "@/pages/liff/history/LiffCardItem";

export default () => {
  const [deliveryAddresses, setDeliveryAddresses] = useState(addresses);

  return (
    <>
      <Card border="0" className="shadow my-3">
        <Card.Header className="border-bottom">
          <h5 className="liff-product-detail-name mb-0">支払い方法</h5>
        </Card.Header>
        <Card.Body className="py-0">
          <ListGroup className="list-group-flush">
            <PaymentDetailItem />
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};