import React, { useState, useRef, useEffect, useContext } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';
import liff from '@line/liff';
import { LoadingContext } from "@/components/LoadingContext";

import { getUser } from "@/pages/liff/api/UserApiMethods";
import { getCards } from "@/pages/liff/api/CardApiMethods";
import { updateCustomer, getCustomer } from "@/pages/liff/api/CustomerApiMethods";
import { storePaymentMethod, showPaymentMethod, updatePaymentMethod } from "@/pages/liff/api/PaymentApiMethods";
import { getEcommerceConfigurationAndPayment } from "@/pages/liff/api/EcommerceConfigurationApiMethods";

export default () => {
  const { setIsLoading } = useContext(LoadingContext);
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState({
    payment_method: 1
  });
  const [customer, setCustomer] = useState({
    id: '', default_card: {brand: '', card_number: '', exp_month: '', exp_year: '', name: ''}
  });
  const [creditCards, setCreditCards] = useState([
    {brand: '', card_number: '', exp_month: '', exp_year: '', name: ''}
  ]);
  const [user, setUser] = useState({
    is_registered: 0
  });
  const [payments, setPayments] = useState([]);
  const [selectCardId, setSelectCardId] = useState();
  const [ecommerceConfiguration, setEcommerceConfiguration] = useState();

  const onClick = () => {
    console.log(paymentMethod.payment_method);
    setIsLoading(true);
    if ('id' in paymentMethod) {
      if (paymentMethod.payment_method == 1) {
        paymentMethod.payjp_default_card_id = selectCardId
      }
      updatePaymentMethod(user.id, paymentMethod.id, paymentMethod, onSaveComplete)
      //updatePaymentMethod(101, paymentMethod.id, paymentMethod, onSaveComplete)
    } else {
      storePaymentMethod(user.id, paymentMethod, onSaveComplete)
      //storePaymentMethod(101, paymentMethod, onSaveComplete)
    }
  }

  const handleChange = (value, input) => {
    setPaymentMethod({...paymentMethod, [input]: value})
  };

  const onSaveComplete = () => {
    setIsLoading(false);
    history.push(Paths.LiffCheckout.path);
  };

  useEffect(() => {
    setIsLoading(true);
    const idToken = liff.getIDToken();
    getUser(idToken, setUser).then(response => {
      showPaymentMethod(response.id, setIsLoading).then(
        response => {
          setPaymentMethod(response == null ? {payment_method: 1} : response)
          setSelectCardId(response.payjp_default_card_id)
          response.payjp_customer_id && getCards(response.id, response.payjp_customer_id, setCreditCards)
          // getCustomer(response.id, response.payjp_customer_id, setCustomer, setIsLoading).then(
          //   response => setSelectCardId(response.default_card.id)
          // )
        }
      )
    })
    getEcommerceConfigurationAndPayment(setEcommerceConfiguration, setPayments)
    // showPaymentMethod(response.id, setPaymentMethod).then(
    //   response => {
    //     getCards(101, response.payjp_customer_id, setCreditCards)
    //     getCustomer(101, response.payjp_customer_id, setCustomer, setIsLoading).then(
    //       response => setSelectCardId(response.default_card.id)
    //     )
    //   }
    // )
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
    const { id, brand, card_number, name, exp_month, exp_year, index } = props;
    const defaultChecked = (index == 0) ? true : false

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row className="">
          <Col xs="2" className="mt-5">
            <Form.Check
              type="radio"
              value={id}
              checked={id === selectCardId}
              id={`card-${index}`}
              htmlFor={`card-${index}`}
              onChange={() => setSelectCardId(id)}
            />
          </Col>
          <Col xs="8" className="px-0">
            <div className="m-1">
              <h4 className="fs-6 text-dark mb-1">{brand} {card_number}</h4>
              <div><small>{name}</small></div>
              <div><small>有効期限：{String(exp_month).padStart(2, '0')}/{exp_year}</small></div>
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
          {value == 2 && paymentMethod.payment_method == 2 && <CashondeliveryCard />}
        </Row>
      </ListGroup.Item>
      {
        value == 1 && paymentMethod.payment_method == 1 && 
        <>
        {
          paymentMethod.payjp_customer_id && creditCards.map((creditCard, index) => 
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