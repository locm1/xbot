import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

export default () => {
  const [paymentMethod, setPaymentMethod] = useState(1);
  const numberOfPayments = [
    {title: '一括払い', value: 1},
    {title: '2回払い', value: 2},
    {title: '3回払い', value: 3},
    {title: '5回払い', value: 4},
    {title: '6回払い', value: 5},
    {title: '10回払い', value: 6},
    {title: '12回払い', value: 7},
    {title: '15回払い', value: 8},
    {title: '18回払い', value: 9},
    {title: '20回払い', value: 10},
    {title: '24回払い', value: 11},
  ]
  const [creditCards, setCreditCards] = useState([
    {id: 1, brand: 'JCB', cardNumber: 'xxxx-xxxx-xxxx-1234', name: 'SEIYA FUKUSHI', paymentNumber: 1, expirationDate: '04/28'},
    {id: 2, brand: 'MasterCard', cardNumber: 'xxxx-xxxx-xxxx-5678', name: 'SEIYA FUKUSHI', paymentNumber: 3, expirationDate: '06/26'},
  ]);

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  }

  const PaymentCard = (props) => {
    const { title, value, defaultChecked } = props;

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0 checkout-card-check-wrap">
        <Row className="">
          <Col xs="12" className="">
            <Form.Check
              type="radio"
              defaultChecked={defaultChecked}
              value={value}
              label={title}
              name="payment_method"
              id='payment_method'
              htmlFor='payment_method'
              onChange={(e) => handleChange(e)}
            />
          </Col>
          {
            paymentMethod == '1' && value == '1' && 
            <div className="m-1">
              <small>※代金引き換えの場合、購入金額に加え別途手数料がかかります。</small>
              <div>
                <small>
                  手数料については「<Card.Link href={Paths.LiffSpecificTrades.path} target="_blank" className="liff-specific-trades-link">特定商法取引法に基づく表記</Card.Link>」
                  をご確認ください。
                </small>
              </div>
              <div>
                <small>※購入履歴には手数料を合算した金額ではなく、購入金額のみの記載になります。</small>
              </div>
            </div>
          }
        </Row>
      </ListGroup.Item>
    );
  }

  const PaymentCreditCard = (props) => {
    const { id, brand, cardNumber, name, paymentNumber, expirationDate, index } = props;
    const defaultChecked = (index == 0) ? true : false

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row className="">
          <Col xs="2" className="mt-5">
            <Form.Check
              type="radio"
              defaultChecked={defaultChecked}
              value={id}
              name="credit_card"
              id='credit_card'
              htmlFor='credit_card'
            />
          </Col>
          <Col xs="8" className="px-0">
            <div className="m-1">
              <h4 className="fs-6 text-dark mb-1">{brand} {cardNumber}</h4>
              <div><small>{name}</small></div>
              <div><small>有効期限：{expirationDate}</small></div>
              <Form.Group className="mt-2">
                <Form.Label>支払い回数</Form.Label>
                <Form.Select defaultValue="1" className="mb-0 w-100">
                  {
                    numberOfPayments.map((numberOfPayment, index) => <option key={index} value={numberOfPayment.value}>{numberOfPayment.title}</option>)
                  }
                </Form.Select>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <>
      <main className="content liff-product-detail">
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
            <h2 className="fs-6 fw-bold mb-0">支払い方法変更</h2>
          </Card.Header>
          <Card.Body className="py-0">
            <ListGroup className="list-group-flush">
              <PaymentCard title="代金引き換え" value={1} defaultChecked={true} />
              <PaymentCard title="Apple Pay" value={2} defaultChecked={false} />
              <PaymentCard title="クレジットカード" value={3} defaultChecked={false} />
              {
                paymentMethod == '3' && 
                <>
                {
                  creditCards.map((creditCard, index) => 
                    <PaymentCreditCard key={index} index={index} {...creditCard} />
                  )
                }
                <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
                  <Link to={Paths.LiffCheckoutPaymentCreditCard.path} className="d-flex align-items-center p-2">
                    <h2 className="fs-6 fw-bold mb-0">カードを追加</h2>
                    <div className="ms-auto">
                      <span className="link-arrow">
                        <ChevronRightIcon className="icon icon-sm" />
                      </span>
                    </div>
                  </Link>
                </ListGroup.Item>
                </>
              }
            </ListGroup> 
          </Card.Body>
        </Card>
        <div className="align-items-center mt-4 mb-5">
          <Button variant="tertiary" as={Link} to={Paths.LiffCheckout.path} className="w-100 p-3">
            変更する
          </Button>
        </div>
      </main>
    </>
  );
};