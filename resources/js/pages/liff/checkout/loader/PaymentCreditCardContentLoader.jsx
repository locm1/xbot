import React, { useState, useRef, useEffect, useContext } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';
import { LoadingContext } from "@/components/LoadingContext";
import liff from '@line/liff';
import ContentLoader, { BulletList, Facebook } from "react-content-loader";

export default () => {
  return (
    <>
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
            <div id="pay-jp" className="m-3">
            <ContentLoader
              height={32}
              width={146}
              speed={1}
            >
              <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
            </ContentLoader>
            </div>
            <div className="align-items-center mt-4 mb-5">
              <ContentLoader
                height={55}
                width={310}
                speed={1}
              >
                <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
              </ContentLoader>
            </div>
          </Card.Body>
        </Card>
      </main>
    </>
  );
};