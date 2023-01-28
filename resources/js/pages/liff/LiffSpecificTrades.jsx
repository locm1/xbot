import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';

export default () => {
  const [SpecificTrades, setSpecificTrades] = useState([]);
  const requiredPrices = [
    '・消費税（商品代金欄に税込価格を表示）', 
    '・送料一律500円、5000円以上購入で送料無料'
  ];
  const orderMethods = [
    '①リッチメニュー「商品購入・取置き」を押下',
    '②カテゴリーメニューのいずれかを押下',
    '③商品カード内の「詳細を見る」を押下',
    '④詳細ページ内設置の「カートに追加」を押下',
    '⑤カートページ内設置の「購入する」を押下',
    '⑥注文者情報、配送先の入力及び配送時間帯指定を選択',
    '⑦クレジットカード情報を入力し「注文を確定する」を押下',
    '⑧注文完了',
    '⑨リッチメニュー「購入履歴」から注文商品を確認',
  ];
  const paymentMethods = [
    '・各種クレジットカード決済',
    '「VISA」「Master Card」',
    '「Diners Club」「JCB」',
    '「AMERICAN EXPRESS」',
    '「Discover」',
  ];
  const others = [
    'お客様都合での返品は承っておりません。',
    '不良品の場合は商品到着後7日以内にお電話にてご連絡ください。送料は当社負担で良品と交換させていただきます。'
  ];

  useEffect(() => {
    axios.get(`/api/v1/specific-trades`)
    .then((data) => {
      setSpecificTrades(data.data.specific_trades);
      console.log(data.data.specific_trades);
    })
    .catch(error => {
        console.error(error);
    });
  }, []);

  const SpecificTradesItem = (props) => {
    const { title, content } = props;

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row>
          <Col xs="4" xl={4} className="pb-2 mt-2">
            <h4 className="fs-6 fw-bolder text-dark mb-0">{title}</h4>
          </Col>
          <Col xs="8" xl={8} className="pb-2 mt-2">
          <span className="fs-6 text-dark liff-specific-trade-content">{content}</span>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <>
      <main className="liff-product-detail">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        <div className="liff-product-list">
          <Card border="0" className="shadow">
            <Card.Header className="border-bottom">
              <h5 className="liff-product-detail-name mb-0">特定商取引法に基づく表記</h5>
            </Card.Header>
            <Card.Body className="py-0">
              <ListGroup className="list-group-flush">
                {
                  SpecificTrades.map((SpecificTrade, index) =>
                  <SpecificTradesItem key={index} title={SpecificTrade.title} content={SpecificTrade.content} />
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </main>
    </>
  );
};