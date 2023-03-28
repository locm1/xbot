import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { CheckCircleIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';

export default () => {
  return (
    <>
      <main className="">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        <div className="liff-product-list liff-check-icon-wrap">
          <CheckCircleIcon className="icon liff-check-icon" />
          <h3 className="mt-4 liff-check-complete-title">すでに回答済みです</h3>
        </div>
      </main>
    </>
  );
};