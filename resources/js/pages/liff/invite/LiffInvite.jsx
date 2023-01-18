import React, { useState, useRef, useEffect } from "react";
import { Image, Form, Button, Card } from 'react-bootstrap';
import { ShoppingCartIcon, InboxIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import LineFigure from "@img/img/line-figure.png";

export default () => {
  const link = 'https://liff.line.me/1657047920-wRaqR42Z?l=invite&id=124';

  const CouponCard = () => {
    return (
      <Card border="0" className="shadow p-0">
        <Link>
          <Card.Body className="pb-3 p-2 pt-3 coupon-main">
            <svg xmlns="http://www.w3.org/2000/svg" className="cp-img" id="cp-img1" width="60.152" height="60.152" viewBox="0 0 60.152 60.152">
              <path id="交差_1" data-name="交差 1" d="M78.674,120.73,136,63.407h2.829L78.674,123.559Zm0-9.9L126.1,63.407h2.829L78.674,113.659Zm0-9.9L116.2,63.407h2.828L78.674,103.76Zm0-9.9L106.3,63.407h2.829L78.674,93.861Zm0-9.9L96.4,63.407h2.828L78.674,83.961Zm0-9.9L86.5,63.407h2.829L78.674,74.062Zm0-7.826h.755l-.755.755Z" transform="translate(-78.674 -63.407)" fill="#fff" opacity="0.4"></path>
            </svg>
            <div className="coupon-main__t1">SPECIAL COUPON</div>
            <div class="coupon-main__price">
              QUOカードプレゼント
            </div>
            <div class="coupon-main__t2">※当店でのみご利用いただけます。</div>
            <svg xmlns="http://www.w3.org/2000/svg" className="cp-img cp-img2" id="cp-img2" width="60.152" height="60.152" viewBox="0 0 60.152 60.152">
              <path id="交差_2" data-name="交差 2" d="M0,57.325,57.325,0h2.828L0,60.152Zm0-9.9L47.425,0h2.828L0,50.252Zm0-9.9L37.525,0h2.828L0,40.353Zm0-9.9L27.625,0h2.83L0,30.454Zm0-9.9L17.726,0h2.828L0,20.554Zm0-9.9L7.826,0h2.829L0,10.655ZM0,0H.755L0,.755Z" transform="translate(60.152 60.152) rotate(180)" fill="#fff" opacity="0.4"></path>
            </svg>
          </Card.Body>
          <div class="coupon-main__t3">クーポンを使用する</div>
        </Link>
      </Card>
    );
  }

  return (
    <>
    <main className="liff-product-detail">
      <div className="liff-content">
        <div className="content__inner">
          <div className="coupon">
            <div className="coupon-box-head">
              <Image src={LineFigure} className="liff-invite-image" />
            </div>
            <div className="c-box">
              <div className="coupon-title">
                友達を招待して<br />お得なクーポンをもらおう！
              </div>
                <div className="coupon-label">ご紹介ルール</div>
                <div className="coupon-text">
                  クーポンを受け取るには、友だちが新規友だち追加後に<br />①アンケートに回答すると、クーポンが発行されます。<br />②ご来店すると、スペシャルクーポンが当たります。
                </div>
                <div className="coupon-label">あなたの招待コード</div>
                <div className="coupon-input form-group">
                  <Form.Control type="text" value={link} />
                </div>
                <Button as={Link} to={Paths.DashboardOverview.path} variant="gray-800" className="common-button common-button--line mt-0 mb-0">
                  LINEでコードを送る
                </Button>
            </div>
            <div className="c-box mb-0">
              <div className="coupon-title">
                獲得済クーポンはこちら！
              </div>
              <CouponCard />
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
};
