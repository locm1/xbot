import React, { useState, useRef, useEffect, useContext } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';
import { LoadingContext } from "@/components/LoadingContext";
import liff from '@line/liff';
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { showPaymentMethod, updatePaymentMethod, storePaymentMethod } from "@/pages/liff/api/PaymentApiMethods";
import { storeCustomer } from "@/pages/liff/api/CustomerApiMethods";
import { storeCard } from "@/pages/liff/api/CardApiMethods";

export default () => {
  const { setIsLoading } = useContext(LoadingContext);
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState();
  const [user, setUser] = useState({
    is_registered: 0
  });

  useEffect(() => {
    setIsLoading(true)
    const idToken = liff.getIDToken();
    showCreditCardForm()
    getUser(idToken, setUser).then(
      response => showPaymentMethod(response.id, setIsLoading).then(response => setPaymentMethod(response))
    )
    //showPaymentMethod(101, setPaymentMethod)
  }, []);

  const showCreditCardForm = () => {
    const payJp = document.getElementById('pay-jp');
    const scriptUrl = document.createElement('script');
    const key = process.env.MIX_PAYJP_PUBLIC_KEY
    const submitText = "トークンを作成する";
    const partial = true;
    scriptUrl.type = 'text/javascript';
    scriptUrl.src = 'https://checkout.pay.jp/';
    scriptUrl.setAttribute("data-key", key);
    scriptUrl.setAttribute("class", 'payjp-button');
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
      updatePaymentMethod(user.id, paymentMethod.id, paymentMethod, onSaveComplete)
    } else {
      storePaymentMethod(user.id, paymentMethod, onSaveComplete)
    }
  }

  const createCustomer = () => {
    const payjpToken = document.getElementsByName('payjp-token');
    const formValue = {payjp_token: payjpToken[0].value};
    //storeCustomer(user.id, formValue, paymentMethod)
    storeCustomer(user.id, formValue, paymentMethod).then(
      response => {
        paymentMethod.payjp_customer_id = response
        createPaymentMethod(paymentMethod)
      }
    )
    //storeCustomer(101, formValue, paymentMethod, updatePaymentMethod, onSaveComplete)
  };

  const createCreditCard = () => {
    const payjpToken = document.getElementsByName('payjp-token');
    const formValue = {
      payjp_token: payjpToken[0].value, payjp_customer_id: paymentMethod.payjp_customer_id
    };
    storeCard(user.id, formValue, onSaveComplete)
    //storeCard(101, formValue, onSaveComplete)
  };

  const onSaveComplete = () => {
    history.push(Paths.LiffCheckoutPayment.path);
  };

  return (
    <>
      <main className="liff-product-detail">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
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
          <Card.Header className="border-bottom">
            <h2 className="fs-6 fw-bold mb-0">クレジットカード情報入力</h2>
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
    </>
  );
};