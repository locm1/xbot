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
          <h3 className="mt-4 liff-check-complete-title">送信完了！</h3>
        </div>
        <div className="liff-product-list pe-5 ps-5">
          <p>簡易アンケートへのご回答<br />ありがとうございました。</p>
        </div>
      </main>
    </>
  );
};