import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { storePaymentMethod, showPaymentMethod, updatePaymentMethod } from "@/pages/liff/api/PaymentApiMethods";

export default () => {
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState({
    payment_method: 1
  });
  const [creditCards, setCreditCards] = useState([
    {id: 1, brand: 'JCB', cardNumber: 'xxxx-xxxx-xxxx-1234', name: 'SEIYA FUKUSHI', paymentNumber: 1, expirationDate: '04/28'},
    {id: 2, brand: 'MasterCard', cardNumber: 'xxxx-xxxx-xxxx-5678', name: 'SEIYA FUKUSHI', paymentNumber: 3, expirationDate: '06/26'},
  ]);
  const [user, setUser] = useState({
    is_registered: 0
  });
  const payments = ['クレジットカード', 'Apple Pay', '代金引き換え'];

  const onClick = () => {

    if ('id' in paymentMethod) {
      console.log(paymentMethod);
      updatePaymentMethod(101, paymentMethod.id, paymentMethod, onSaveComplete)
    } else {
      storePaymentMethod(101, paymentMethod, onSaveComplete)
    }
  }

  const handleChange = (value, input) => {
    setPaymentMethod({...paymentMethod, [input]: value})
  };

  const onSaveComplete = () => {
    history.push(Paths.LiffCheckout.path);
  };

  useEffect(() => {
    //const idToken = Cookies.get('TOKEN');
    //getUser(idToken, setUser)
    showPaymentMethod(101, setPaymentMethod)
  }, []);

  const CashondeliveryCard = () => {
    return (
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
            </div>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  const PaymentCard = (props) => {
    const { title, value } = props;

    return (
      <>
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0 checkout-card-check-wrap">
        <Row className="">
          <Col xs="12" className="">
            <Form.Check
              type="radio"
              checked={value === paymentMethod.payment_method}
              value={value}
              label={title}
              name="payment_method"
              id={`payment_method-${value}`}
              htmlFor={`payment_method-${value}`}
              onChange={() => handleChange(value, 'payment_method')}
            />
          </Col>
          {value == 3 && paymentMethod.payment_method == 3 && <CashondeliveryCard />}
        </Row>
      </ListGroup.Item>
      {
        value == 1 && paymentMethod.payment_method == 1 && 
        <>
        {
          creditCards.map((creditCard, index) => 
            <PaymentCreditCard key={index} index={index} {...creditCard} />
          )
        }
        <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
          <a href={Paths.LiffCheckoutPaymentCreditCard.path} className="d-flex align-items-center p-2">
            <h2 className="fs-6 fw-bold mb-0">カードを追加</h2>
            <div className="ms-auto">
              <span className="link-arrow">
                <ChevronRightIcon className="icon icon-sm" />
              </span>
            </div>
          </a>
        </ListGroup.Item>
        </>
      }
      </>
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
        <Card border="0" className="shadow mt-2">
          <Card.Header className="border-bottom">
            <h2 className="fs-6 fw-bold mb-0">支払い方法変更</h2>
          </Card.Header>
          <Card.Body className="py-0">
            <ListGroup className="list-group-flush">
              {
                payments.map((payment, index) => 
                  <PaymentCard key={`payment-${index + 1}`} title={payment} value={index + 1} />
                )
              }
            </ListGroup> 
            <div className="align-items-center my-4">
              <Button variant="tertiary" onClick={onClick} className="w-100 p-3">
                変更する
              </Button>
            </div>
          </Card.Body>
        </Card>
      </main>
    </>
  );
};