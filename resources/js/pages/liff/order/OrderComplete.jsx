import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { CheckCircleIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

export default () => {
  
  return (
    <>
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        <div className="liff-product-list liff-check-icon-wrap">
          <CheckCircleIcon className="icon liff-check-icon" />
          <h3 className="mt-4 liff-check-complete-title">注文完了</h3>
        </div>
        <div className="liff-product-list order-complete-wrap">
          <p>この度はご注文いただき、<br />誠にありがとうございます。</p>
          <p>購入履歴から購入商品が<br />ご確認いただけます。</p>
        </div>
        <div className="align-items-center m-2 mt-4 mb-5">
          <Button as={Link} to={Paths.LiffProductHistories.path} variant="tertiary" className="w-100 p-3">
            購入履歴を見る
          </Button>
        </div>
      </main>
    </>
  );
};