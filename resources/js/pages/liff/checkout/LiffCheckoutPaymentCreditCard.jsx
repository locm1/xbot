import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

export default () => {

  useEffect(() => {
    const payJp = document.getElementById('pay-jp');
    const scriptUrl = document.createElement('script');
    const key = "pk_test_0383a1b8f91e8a6e3ea0e2a9";
    const submitText = "トークンを作成する";
    const partial = true;
    scriptUrl.type = 'text/javascript';
    scriptUrl.src = 'https://checkout.pay.jp/';
    scriptUrl.setAttribute("data-key", key);
    scriptUrl.setAttribute("class", 'payjp-button');
    scriptUrl.setAttribute("data-submit-text", submitText);
    scriptUrl.setAttribute("data-partial", partial);
    payJp.appendChild(scriptUrl);
  }, []);

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
              <Button variant="tertiary" as={Link} to={Paths.LiffCheckoutPayment.path} className="w-100 p-3">
                カードを追加する
              </Button>
            </div>
          </Card.Body>
        </Card>
      </main>
    </>
  );
};