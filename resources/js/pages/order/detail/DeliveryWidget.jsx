
import { zip } from "lodash";
import React, { useState } from "react";
import { Col, Row, Table } from 'react-bootstrap';

export default (props) => {
  const { 
    delivery_time, first_name, last_name, first_name_kana, last_name_kana,
    zipcode, prefecture, city, address, building_name, tel, payment_method
  } = props;

  const getDeliveryTime = (delivery_time) => {
    switch (delivery_time) {
      case 1:
        return '指定なし'
      case 2:
        return '午前中'
      case 3:
        return '12:00 〜 14:00'
      case 4:
        return '14:00 〜 16:00'
      case 5:
        return '16:00 〜 18:00'
      case 6:
        return '18:00 〜 20:00'
      case 7:
        return '19:00 〜 21:00'
      case 8:
        return '20:00 〜 21:00'
    }
  }

  const getPaymentMethod = (payment_method) => {
    switch (payment_method) {
      case 1:
        return 'クレジットカード'
      case 2:
        return '代金引き換え'
      case 3:
        return 'PayPay決済'
      default:
        return 'クレジットカード'
    }
  }

  return (
    <Row>
      <Col xs={12}>
        <div className="d-sm-flex justify-content-between border-bottom border-light pb-4">
          <h4>配送情報</h4>
        </div>
        <Table responsive className="mb-0">
          <tbody className="border-0">
            <tr className="border-bottom">
              <th className="h6 text-left fw-bolder">配送先氏名</th>
              <td>{last_name} {first_name}</td>
            </tr>
            <tr className="border-bottom">
              <th className="h6 text-left fw-bolder">配送先氏名(カタカナ)</th>
              <td>{last_name_kana} {first_name_kana}</td>
            </tr>
            <tr className="border-bottom">
              <th className="h6 text-left fw-bolder">配送先住所</th>
              <td>
                <div>〒{zipcode}</div>
                <div>{prefecture} {city} {address}</div>
                <div>{building_name}</div>
              </td>
            </tr>
            <tr className="border-bottom">
              <th className="h6 text-left fw-bolder">お支払い方法</th>
              <td>{getPaymentMethod(payment_method)}</td>
            </tr>
            <tr className="border-bottom">
              <th className="h6 text-left fw-bolder">配送時間帯</th>
              <td>{getDeliveryTime(delivery_time)}</td>
            </tr>
            <tr className="border-bottom">
              <th className="h6 text-left fw-bolder">電話番号</th>
              <td>{tel}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};