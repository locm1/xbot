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
          <Col xs="2" className="mt-5">
            <Form.Check
              type="radio"
              defaultChecked={defaultChecked}
              defaultValue="option1"
              name="delivery_address"
              id={id}
              htmlFor={id}
            />
          </Col>
          <Col xs="8" className="px-0">
            <Link className="fs-6 text-dark delivery-address-item-edit" to={Paths.LiffCheckoutAddress.path}>編集</Link>
            <div className="m-1">
              <h4 className="fs-6 text-dark mb-0">{lastName} {firstName} 様</h4>
              <h4 className="fs-6 text-dark mt-1">{zipcode}</h4>
              <h4 className="fs-6 text-dark mt-1">
                {prefectures} {city} {address} {buildingName} {roomNumber}
              </h4>
              <h4 className="fs-6 text-dark mt-1">{tel}</h4>
            </div>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <>
      <main className="liff-product-detail">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        <div className="liff-product-list">
          <Card border="0" className="shadow">
            <Card.Header className="border-bottom">
              <h5 className="liff-product-detail-name mb-0">お届け先住所の選択</h5>
            </Card.Header>
            <Card.Body className="py-0">
              <ListGroup className="list-group-flush">
                {deliveryAddresses.map((deliveryAddress, index) => <DeliveryAddressItem key={`address-${deliveryAddress.id}`} {...deliveryAddress} index={index} />)}
              </ListGroup>
              <Link to={Paths.LiffCheckoutAddress.path} className="d-flex align-items-center border-bottom py-3">
                <h2 className="fs-6 fw-bold mb-0">お届け先住所を追加</h2>
                <div className="ms-auto">
                  <span className="link-arrow">
                    <ChevronRightIcon className="icon icon-sm" />
                  </span>
                </div>
              </Link>
              <div className="align-items-center my-4">
                <Button as={Link} to={Paths.LiffCheckout.path} variant="tertiary" className="w-100 p-3">
                  変更する
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </main>
    </>
  );
};