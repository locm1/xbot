import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import addresses from "@/data/deliveryAddresses";

export default () => {
  const [deliveryAddresses, setDeliveryAddresses] = useState(addresses);

  const DeliveryAddressItem = (props) => {
    const { id, index, lastName, firstName, lastNameKana, firstNameKana, zipcode, prefectures, city, address, buildingName, roomNumber, tel } = props;
    const defaultChecked = (index == 0) ? true : false

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row className="">
          <Col xs="8" className="px-0">
            <div className="m-1">
              <h4 className="fs-6 text-dark mb-0">クレジットカード</h4>
              <h4 className="liff-checkout-payment-title text-dark mt-1">カード番号：xxxx-xxxx-xxxx-xxxx</h4>
              <h4 className="liff-checkout-payment-title text-dark mt-1">支払い回数：3回払い</h4>
            </div>
          </Col>
          <Col xs="4" className="">
            <div className="align-items-center mt-4 ms-4">
              <Button  variant="info" className="w-80">
                変更
              </Button>
            </div>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <>
      <div className="d-flex align-items-center mt-4">
        <h2 className="fs-5 liff-product-detail-name mb-3 ms-3">支払い方法</h2>
      </div>
      <Card border="0" className="shadow">
        <Card.Body className="py-0">
          <ListGroup className="list-group-flush">
            {<DeliveryAddressItem {...deliveryAddresses[0]} />}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};