import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import addresses from "@/data/deliveryAddresses";

import LiffCheckoutPayment from "@/pages/liff/checkout/LiffCheckoutPayment";
import LiffCheckoutOrders from "@/pages/liff/checkout/LiffCheckoutOrders";
import { DeliveryAddressItem } from "@/pages/liff/history/LiffCardItem";

export default () => {
  const [deliveryAddresses, setDeliveryAddresses] = useState(addresses);

  return (
    <>
      <main className="liff-product-detail">
        <div className="liff-product-list">
          <Card border="0" className="shadow my-3">
            <Card.Header className="border-bottom">
              <h5 className="liff-product-detail-name mb-0">お届け先住所</h5>
            </Card.Header>
            <Card.Body className="py-0">
              <ListGroup className="list-group-flush">
                {<DeliveryAddressItem {...deliveryAddresses[0]} />}
              </ListGroup>
            </Card.Body>
          </Card>
          <LiffCheckoutPayment />
          <LiffCheckoutOrders />
        </div>
      </main>
    </>
  );
};