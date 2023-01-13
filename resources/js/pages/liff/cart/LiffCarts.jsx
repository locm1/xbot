import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { PlusIcon, MinusIcon, ShoppingCartIcon, InboxIcon, TrashIcon } from '@heroicons/react/solid';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import cartData from "@/data/carts";

export default () => {
  const [carts, setCarts] = useState(cartData);
  const total = carts.reduce((cart, i) => cart + i.price, 0);

  const deleteCart = (id) => {
    setCarts(carts.filter((cart) => (cart.id !== id)));
  }

  const CartItem = (props) => {
    const { img, name, price, id, quantity } = props;
    
    const increaseQuantity = (id) => {
      const targetCart = carts.find((cart) => (cart.id === id));
      targetCart.quantity++;
      setCarts(carts.map((cart) => (cart.id === id ? targetCart : cart)));
    }

    const decreaseQuantity = (id) => {
      const targetCart = carts.find((cart) => (cart.id === id));
      targetCart.quantity--;
      setCarts(carts.map((cart) => (cart.id === id ? targetCart : cart)));
    }

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Link to={`/liff/product/detail/${id}`}>
          <Row className="">
            <Col xs="5">
              <div className="liff-cart-img">
                <Image rounded src={img} className="m-0" />
              </div>
            </Col>
            <Col xs="7" className="px-0 m-0">
              <h4 className="fs-6 text-dark mb-0">{name}</h4>
              <h4 className="liff-product-detail-price mt-2">￥{price.toLocaleString()}<span>税込</span></h4>
              <p className="mt-3">在庫あり</p>
            </Col>
          </Row>
        </Link>
        <Row className="mt-2">
          <Col xs="5">
            <InputGroup className="liff-cart-change-quantity">
              {(() => {
                if (quantity >= 2) {
                  return (
                    <InputGroup.Text onClick={() => decreaseQuantity(id)}>
                      <MinusIcon className="icon icon-xs" />
                    </InputGroup.Text>
                  )
                } else {
                  return (
                    <InputGroup.Text onClick={() => deleteCart(id)}>
                      <TrashIcon className="icon icon-xs" />
                    </InputGroup.Text>
                  )
                }
              })()}
              <span className="form-control">{quantity}</span>
              <InputGroup.Text onClick={() => increaseQuantity(id)}>
                <PlusIcon className="icon icon-xs" />
              </InputGroup.Text>
            </InputGroup>
          </Col>
          <Col xs="7" className="px-0 m-0">
            <Button variant="primary" size="sm" className="me-1" onClick={() => deleteCart(id)}>削除</Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <>
      {(() => {
        if (carts.length > 0) {
          return (
            <>
              <Card border="0" className="shadow">
                <Card.Header className="border-bottom">
                  <h2 className="fs-5 fw-bold mb-0">カートに入っている商品：{carts.length}点</h2>
                </Card.Header>
                <Card.Body className="py-0">
                  <ListGroup className="list-group-flush">
                    {carts.map(cart => <CartItem key={`cart-${cart.id}`} {...cart} />)}
                  </ListGroup>
                </Card.Body>
              </Card>
              <div className="d-flex justify-content-between flex-wrap align-items-center p-4 pt-3 pb-0">
                <h4 className="fs-6 mb-0">商品合計</h4>
                <h3 className="liff-product-detail-price mt-2">￥{total.toLocaleString()}</h3>
              </div>
              <div className="d-flex justify-content-between flex-wrap align-items-center p-3">
                <Button as={Link} to={Paths.LiffProducts.path} variant="gray-800" className="mt-2 liff-product-detail-button">
                  <InboxIcon className="icon icon-xs me-2" />
                  他の商品を見る
                </Button>
                <Button as={Link} to={Paths.LiffCheckout.path} variant="tertiary" className="mt-2 liff-product-detail-button">
                  <ShoppingCartIcon className="icon icon-xs me-2" />
                  レジに進む
                </Button>
              </div>
            </>
          )
        } else {
          return (
            <Card border="0" className="shadow">
              <Card.Body className="p-3">
                <h2 className="fs-5 fw-bold mb-0">カートに商品がありません。</h2>
                <Button as={Link} to={Paths.LiffProducts.path} variant="gray-800" className="mt-3 liff-product-detail-button">
                  <InboxIcon className="icon icon-xs me-2" />
                  他の商品を見る
                </Button>
              </Card.Body>
            </Card>
          )
        }
      })()}
    </>
  );
};
