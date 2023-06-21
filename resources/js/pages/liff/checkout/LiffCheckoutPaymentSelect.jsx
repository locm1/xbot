import React, { useState, useRef, useEffect, useContext } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';
import liff from '@line/liff';
import { LoadingContext } from "@/components/LoadingContext";
import Swal from "sweetalert2";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { getCards } from "@/pages/liff/api/CardApiMethods";
import { updateCustomer, getCustomer } from "@/pages/liff/api/CustomerApiMethods";
import { storePaymentMethod, showPaymentMethod, updatePaymentMethod } from "@/pages/liff/api/PaymentApiMethods";
import { getEcommerceConfigurationAndPayment } from "@/pages/liff/api/EcommerceConfigurationApiMethods";
import ContentLoader from "react-content-loader";

export default () => {
  const [isRendered, setIsRendered] = useState(false);
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState({
    payment_method: null
  });
  const [customer, setCustomer] = useState({
    id: '', default_card: { brand: '', card_number: '', exp_month: '', exp_year: '', name: '' }
  });
  const [creditCards, setCreditCards] = useState([
    { brand: '', card_number: '', exp_month: '', exp_year: '', name: '' }
  ]);
  const [user, setUser] = useState({
    is_registered: 0
  });
  const [payments, setPayments] = useState([]);
  const [selectCardId, setSelectCardId] = useState();
  const [ecommerceConfiguration, setEcommerceConfiguration] = useState();
  const [liffToken, setLiffToken] = useState('');

  const onClick = () => {
    console.log(paymentMethod.payment_method);
    paymentMethod.liffToken = liffToken

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
    setPaymentMethod({ ...paymentMethod, [input]: value })
  };

  const onSaveComplete = () => {
    history.push(Paths.LiffCheckout.path);
  };

  useEffect(() => {
    const fetchData = async () => {
    const idToken = liff.getIDToken();
    setLiffToken(idToken)
    
    try {
      const userResponse = await getUser(idToken, setUser);
      const paymentResponse = await showPaymentMethod(userResponse.id, idToken);
      setPaymentMethod(paymentResponse == null ? { payment_method: 1 } : paymentResponse);
      setSelectCardId(paymentResponse.payjp_default_card_id);
      
      if (paymentResponse.payjp_customer_id) {
        await getCards(userResponse.id, idToken, paymentResponse.payjp_customer_id, setCreditCards);
      }

      await getEcommerceConfigurationAndPayment(setEcommerceConfiguration, setPayments);
      setIsRendered(true);
    } catch (error) {
      setIsRendered(true);
      Swal.fire(
        `データ取得エラー`,
        'データが正常に取得できませんでした',
        'error'
      )
    }
  }
  
  fetchData();
  }, []);

  const CashondeliveryCard = () => {
    return (
      <div className="m-1">
        <small>※代金引き換えには手数料が発生する場合があります。</small>
        <div>
          <small>
            手数料については商品購入画面、手数料項目をご確認ください。
          </small>
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
          <Form.Check
            type="radio"
            checked={value === paymentMethod.payment_method}
            value={value}
            label={title}
            name="payment_method"
            id={`payment_method-${value}`}
            htmlFor={`payment_method-${value}`}
            onChange={() => handleChange(value, 'payment_method')}
            className="align-items-center"
          />
          {value == 2 && paymentMethod.payment_method == 2 && <CashondeliveryCard />}
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

  return isRendered ? (
    <>
      <main className="liff-product-detail p-3">
        {/* <div className="">
          <Link to={Paths.LiffCheckout.path} className="d-flex align-items-center p-2">
            <div className="">
              <span className="link-arrow">
                <ChevronLeftIcon className="icon icon-sm" />
              </span>
            </div>
            <h2 className="fs-6 fw-bold mb-0 ms-2">戻る</h2>
          </Link>
        </div> */}
        <Card border="0" className="shadow mt-2">
          <Card.Header className="bg-primary text-white px-3 py-2">
            <h5 className="mb-0 fw-bolder">支払い方法変更</h5>
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
  ) : (
    <>
      <main className="liff-product-detail p-3">
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
          <Card.Header className="bg-primary text-white px-3 py-2">
            <h5 className="mb-0 fw-bolder">支払い方法変更</h5>
          </Card.Header>
          <Card.Body className="py-0">
            <ListGroup className="list-group-flush border-bottom">
              <ContentLoader
                height={50}
                width={'100%'}
                speed={1}
                className="mb-4"
              >
                <rect x="0" y="25" rx="3" ry="3" width="680" height="30" />
              </ContentLoader>
            </ListGroup>
            <ListGroup className="list-group-flush border-bottom">
              <ContentLoader
                height={50}
                width={'100%'}
                speed={1}
                className="mb-4"
              >
                <rect x="0" y="25" rx="3" ry="3" width="680" height="30" />
              </ContentLoader>
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
  )
};