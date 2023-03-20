import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';

import cartData from "@/data/carts";
import { CartItem, OrderDetailItem } from "@/pages/liff/LiffCardItem";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { getCarts, updateCart, deleteCart } from "@/pages/liff/api/CartApiMethods";

export default () => {
  const [carts, setCarts] = useState([]);
  const [user, setUser] = useState({
    is_registered: 0
  });
  const orderTotal = carts.reduce((cart, i) => cart + i.price, 0);
  const total = orderTotal + 500;
  const [specificTime, setSpecificTime] = useState(1);
  const [itemsExistInCart, setItemsExistInCart] = useState(true);

  const deliveryTimes = [
    {id: 1, title: '午前中', value: 1},
    {id: 2, title: '12:00 〜 14:00', value: 2},
    {id: 3, title: '14:00 〜 16:00', value: 3},
    {id: 4, title: '16:00 〜 18:00', value: 4},
    {id: 5, title: '18:00 〜 20:00', value: 5},
    {id: 6, title: '19:00 〜 21:00', value: 6},
    {id: 7, title: '20:00 〜 21:00', value: 7},
  ];

  useEffect(() => {
    const cookie = Cookies.get('specific_time')
    const idToken = Cookies.get('TOKEN');
    getCarts(idToken, setCarts, setItemsExistInCart)
    getUser(idToken, setUser)
    getSpecificTimeItem(cookie)
  }, []);

  const getSpecificTimeItem = (specificTime) => {
    switch (parseInt(specificTime, 10)) {
      case 1:
        setSpecificTime('日時指定なし')
        break
      case 2:
        const time = Cookies.get('delivery_time')
        const currentDeliveryTime = deliveryTimes.find((deliveryTime) => deliveryTime.id === parseInt(time, 10))
        setSpecificTime(`お届け日時指定 ${currentDeliveryTime.title}`)
        break
      default:
        setSpecificTime('選択してください')
        break
    }
  }

  const TimeSpecificationItem = (props) => {
    const { img, name, price, id, quantity } = props;

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row className="">
          <Col xs="8" className="px-0">
            <div className="m-1">
              <h4 className="fs-6 text-dark mb-0">{specificTime}</h4>
              <h4 className="liff-checkout-payment-title text-dark mt-2">
                ※送料については、<Card.Link href={Paths.LiffSpecificTrades.path} target="_blank" className="liff-specific-trades-link">特定商法取引法に基づく表記</Card.Link>をご覧ください。
              </h4>
            </div>
          </Col>
          <Col xs="4" className="">
            <div className="align-items-center mt-2 ms-4">
              <Button as={Link} to={Paths.LiffCheckoutDelivery.path} variant="info" className="w-80">
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
      <Card border="0" className="shadow my-3">
        <Card.Header className="border-bottom">
          <h5 className="liff-product-detail-name mb-0">購入商品</h5>
        </Card.Header>
        <Card.Body className="py-0">
          <ListGroup className="list-group-flush">
            <TimeSpecificationItem />
          </ListGroup>
          <ListGroup className="list-group-flush">
            {carts.map(cart => <CartItem key={`cart-${cart.id}`} {...cart} />)}
          </ListGroup>
          <ListGroup className="list-group-flush">
            <OrderDetailItem total={total} orderTotal={orderTotal} />
          </ListGroup>
        </Card.Body>
        <div className="align-items-center m-2 mt-4 mb-4">
          <Button as={Link} to={Paths.LiffCheckout.path} variant="tertiary" className="w-100 p-3">
            注文を確定する
          </Button>
        </div>
      </Card>
    </>
  );
};