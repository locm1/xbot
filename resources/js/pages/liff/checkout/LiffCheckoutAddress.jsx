import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import liff from '@line/liff';
import Cookies from 'js-cookie';

import { getUser } from "@/pages/liff/api/UserApiMethods";
import { getOrderDestinations, updateOrderDestination, updateOrderDestinations } from "@/pages/liff/api/OrderDestinationApiMethods";

export default () => {
  const history = useHistory();
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [selectId, setSelectId] = useState();
  const [user, setUser] = useState({
    is_registered: 0
  });

  const handleClick = () => {
    console.log(selectId);
    const updateAddress = deliveryAddresses.find((deliveryAddress) => deliveryAddress.id === selectId);
    updateAddress.is_selected = 1
    console.log(updateAddress);
    updateOrderDestinations(user.id).then(response => updateOrderDestination(user.id, updateAddress.id, updateAddress, updateComplete))
    //updateOrderDestination(user.id, updateAddress.id, updateAddress, updateComplete)
  }

  const updateComplete = () => {
    history.push(Paths.LiffCheckout.path);
  };

  useEffect(() => {
    const idToken = liff.getIDToken();
    getUser(idToken, setUser).then(response => {
      getOrderDestinations(response.id, setDeliveryAddresses, setSelectId)
    })
    //getOrderDestinations(101, setDeliveryAddresses, setSelectId)
  }, []);

  const DeliveryAddressItem = (props) => {
    const { id, index, last_name, first_name, zipcode, prefecture, city, address, building_name, tel } = props;
    const target_split = zipcode && zipcode.substr(0, 3);
    const link = Paths.LiffCheckoutEditAddress.path.replace(':id', id);

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row className="">
          <Col xs="2" className="mt-5">
            <Form.Check
              type="radio"
              name="delivery_address"
              value={id}
              checked={id === selectId}
              id={id}
              htmlFor={id}
              onChange={() => setSelectId(id)}
            />
          </Col>
          <Col xs="8" className="px-0">
            <Link className="fs-6 text-dark delivery-address-item-edit" to={link}>編集</Link>
            <div className="m-1">
              <h4 className="fs-6 text-dark mb-0">{last_name} {first_name} 様</h4>
              <h4 className="fs-6 text-dark mt-1">〒{target_split}-{zipcode && zipcode.split(target_split)[1]}</h4>
              <h4 className="fs-6 text-dark mt-1">
                {prefecture} {city} {address} {building_name}
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
                <Button onClick={handleClick} variant="tertiary" className="w-100 p-3">
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