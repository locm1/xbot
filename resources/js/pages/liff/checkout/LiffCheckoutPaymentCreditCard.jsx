import React, { useState, useRef, useEffect, useContext } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';
import { LoadingContext } from "@/components/LoadingContext";
import liff from '@line/liff';
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { showPaymentMethod, updatePaymentMethod, storePaymentMethod } from "@/pages/liff/api/PaymentApiMethods";
import { storeCustomer } from "@/pages/liff/api/CustomerApiMethods";
import { storeCard } from "@/pages/liff/api/CardApiMethods";
import { getPublicKey } from "@/pages/liff/api/PayJpKeyApiMethods";
import PaymentCreditCardContentLoader from "@/pages/liff/checkout/loader/PaymentCreditCardContentLoader";

export default () => {
  const idToken = liff.getIDToken();
  const [isRendered, setIsRendered] = useState(false);
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState();
  const [user, setUser] = useState({
    is_registered: 0
  });

  const showCreditCardForm = (key) => {
    const payJp = document.getElementById('pay-jp');
    const scriptUrl = document.createElement('script');
    const submitText = "トークンを作成する";
    const partial = true;
    scriptUrl.type = 'text/javascript';
    scriptUrl.src = 'https://checkout.pay.jp/';
    scriptUrl.setAttribute("class", 'payjp-button');
    scriptUrl.setAttribute("data-key", key);
    scriptUrl.setAttribute("data-submit-text", submitText);
    scriptUrl.setAttribute("data-partial", partial);
    payJp.appendChild(scriptUrl);
  };

  const createCard = () => {
    if (paymentMethod.payjp_customer_id) {
      createCreditCard();
    } else {
      createCustomer();
    }
  };

  const createPaymentMethod = (paymentMethod) => {
    if ('id' in paymentMethod) {
      console.log(paymentMethod);
      updatePaymentMethod(user.id, paymentMethod.id, paymentMethod, onSaveComplete)
    } else {
      storePaymentMethod(user.id, paymentMethod, onSaveComplete)
    }
  }

  const createCustomer = () => {
    const payjpToken = document.getElementsByName('payjp-token');
    const formValue = {payjp_token: payjpToken[0].value, liffToken: idToken};
    //storeCustomer(user.id, formValue, paymentMethod)
    storeCustomer(user.id, formValue, paymentMethod).then(
      response => {
        console.log(response);
        paymentMethod.payment_method = 1
        paymentMethod.payjp_customer_id = response.customer_id
        paymentMethod.payjp_default_card_id = response.card.id
        paymentMethod.liffToken = idToken
        createPaymentMethod(paymentMethod)
      }
    )
    //storeCustomer(101, formValue, paymentMethod, updatePaymentMethod, onSaveComplete)
  };

  const createCreditCard = () => {
    const payjpToken = document.getElementsByName('payjp-token');
    const formValue = {
      payjp_token: payjpToken[0].value, payjp_customer_id: paymentMethod.payjp_customer_id,
      liffToken: idToken
    };
    console.log();
    storeCard(user.id, formValue).then(
      response => {
        console.log(response);
        paymentMethod.payjp_default_card_id = response.id
        paymentMethod.payment_method = 1
        paymentMethod.liffToken = idToken
        createPaymentMethod(paymentMethod)
      }
    )
    //storeCard(101, formValue, onSaveComplete)
  };

  const onSaveComplete = () => {
    history.push(Paths.LiffCheckoutPayment.path);
  };

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await getUser(idToken, setUser);
        const paymentMethod = await showPaymentMethod(response.id, idToken)
        setPaymentMethod(paymentMethod)
        setIsRendered(true)
        await getPublicKey().then(response => showCreditCardForm(response))
      } catch (error) {
        setIsRendered(false)
        console.error(error)
        Swal.fire(
          `データ取得エラー`,
          'データが正常に取得できませんでした',
          'error'
        )
      }
    }
    dataFetch();
    //showPaymentMethod(101, setPaymentMethod)
  }, []);

  return (
    isRendered ? (
      <main className="liff-product-detail p-3">
        <div className="">
          <Link to={Paths.LiffCheckoutPayment.path} className="d-flex align-items-center p-2">
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
            <h5 className="mb-0 fw-bolder">クレジットカード情報入力</h5>
          </Card.Header>
          <Card.Body className="py-0">
            <div className="m-3">
              <p>下記「カード情報を入力する」から利用するカードのカード番号・有効期限・CVC番号・名義をお間違いなくご入力ください。</p>
            </div>
            <div id="pay-jp" className="m-3"></div>
            <div className="align-items-center mt-4 mb-5">
              <Button variant="tertiary" onClick={createCard} className="w-100 p-3">
                カードを追加する
              </Button>
            </div>
          </Card.Body>
        </Card>
      </main>
    ) : (
      <PaymentCreditCardContentLoader />
    )
  );
};