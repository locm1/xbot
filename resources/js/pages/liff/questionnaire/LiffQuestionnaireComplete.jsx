import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { CheckCircleIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";

export default () => {
  const history = useHistory();
  const location = useLocation();
  const [showButton, setShowButton] = useState(false);

  const handleClick = () => {
    history.push(Paths.LiffCheckout.path)
  };

  useEffect(() => {
    console.log(location.state.page);
    if (location.state.page == 'checkout') {
      setShowButton(true);
    }
  }, []);

  return (
    <>
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        <div className="liff-product-list liff-check-icon-wrap">
          <CheckCircleIcon className="icon liff-check-icon" />
          <h3 className="mt-4 liff-check-complete-title">送信完了！</h3>
        </div>
        <div className="liff-product-list text-center">
          <p>簡易アンケートへのご回答<br />ありがとうございました。</p>
        </div>
        {
          showButton && (
            <div className="align-items-center m-2 mt-4 mb-5">
              <Button onClick={handleClick} variant="tertiary" className="w-100">
                商品購入画面に戻る
              </Button>
            </div>
          )
        }
      </main>
    </>
  );
};