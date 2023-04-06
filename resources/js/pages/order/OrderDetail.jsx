import React, { useState, useEffect } from "react";
import { Row, Col, Nav, Breadcrumb, Card, ListGroup, Image, Table } from 'react-bootstrap';
import moment from "moment-timezone";
import OrdererInformation from "@/pages/order/detail/OrdererInformation";
import { ProductWidget } from "@/pages/order/detail/ProductWidget";
import { DetailWidget } from "@/pages/order/detail/DetailWidget";
import { invoiceItems } from "@/data/tables";
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { showOrder } from "@/pages/order/api/OrderApiMethods";
import { getOrderProducts, getOrderUser, getOrderDelivery } from "@/pages/order/api/OrderDetailApiMethods";
import { getUserPurchase } from "@/pages/user/api/UserApiMethods";

export default () => {
  const subtotal = invoiceItems.reduce((acc, curr) => acc += parseFloat(curr.price) * curr.quantity, 0);
  const totalDiscount = 20 / 100 * subtotal;
  const vat = 10 / 100 * (subtotal - totalDiscount);

  const [orderProducts, setOrderProducts] = useState([
    {id: 1, name: '', quantity: '', price: '', product_id: 1, product_image: [
      {image_path: ''}
    ]}
  ]);
  const [orderUser, setOrderUser] = useState({
    id: 1, first_name: '', last_name: '', first_name_kana: '', last_name_kana: '', img_path: '',
    zipcode: '', prefecture: '', city: '', address: '', building_name: '', tel: ''
  });
  const [order, setOrder] = useState({
    id: 1, purchase_amount: '', status: 1, shipping_fee: '', coupon: {name: ''}, 
    created_at: '', status: 1, payment_method: 1, delivery_time: 1, first_name: '', last_name: '', 
    first_name_kana: '', last_name_kana: '', zipcode: '', prefecture: '', city: '', address: '', 
    building_name: '', tel: '', discount_price: ''
  });
  const [purchaseTime, setPurchaseTime] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);

  const { id } = useParams();
  const { state } = useLocation();

  const getTotal = (amount) => {
    if (order.coupon) {
      const discount_rate_decimal = order.coupon.discount_price / 100.0
      const discount_amount = orderTotal * discount_rate_decimal
      return amount - discount_amount;  
    } 

    return amount;
  }

  const TableRow = (props) => {
    const { item, description, price, quantity } = props;
    const itemTotal = parseFloat(price) * quantity;

    return (
      <tr className="border-bottom">
        <th className="h6 text-left fw-bold">{item}</th>
        <td>{description}</td>
        <td>${price}</td>
        <td>{quantity}</td>
        <td>${itemTotal.toFixed(2)}</td>
      </tr>
    );
  };
  const getStatus = (status) => {
    switch (status) {
      case 1:
        return '注文内容確認中'
      case 2:
        return '配送準備中'
      case 3:
        return '当店より発送済み'
      case 4:
        return 'キャンセル'
    }
  }

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
      default:
        return 'クレジットカード'
    }
  }

  //const amount = (order.payment_method == 1) ? orderTotal + order.shipping_fee - order.discount_price : orderTotal + order.shipping_fee + ecommerceConfiguration.cash_on_delivery_fee - order.discount_price
  // //const total = getTotal(amount)

  const ordererInformations = {
    name: `${orderUser.last_name} ${orderUser.first_name}`,
    nameKana: `${orderUser.last_name_kana} ${orderUser.first_name_kana}`,
  };
  const details = [
    {id: 1, title: '郵便番号', value: orderUser.zipcode},
    {id: 2, title: '住所', value: `${orderUser.prefecture}${orderUser.city}${orderUser.address} ${orderUser.building_name}`},
    {id: 3, title: '電話番号', value: orderUser.tel},
    {id: 4, title: '購入回数', value: `${purchaseTime}回`},
  ];

  const orders = [
    {id: 1, title: '注文番号', value: order.id},
    {id: 2, title: '注文日時', value: order.created_at},
    {id: 3, title: '購入金額', value: `${order.purchase_amount.toLocaleString()}円`},
    {id: 4, title: '送料', value: `${order.shipping_fee.toLocaleString()}円`},
    {id: 5, title: '利用クーポン', value: (order.coupon) ? order.coupon.name : null},
  ];

  const deliveries = [
    {id: 1, title: '配送先氏名', value: `${order.last_name} ${order.first_name}`},
    {id: 2, title: '配送先氏名（フリガナ）', value: `${order.last_name_kana} ${order.first_name_kana}`},
    {id: 3, title: '配送先郵便番号', value: order.zipcode},
    {id: 4, title: '配送先住所', value: `${order.prefecture}${order.city}${order.address} ${order.building_name}`},
    {id: 5, title: '配送時間帯', value: getDeliveryTime(order.delivery_time)},
    {id: 6, title: 'お支払い方法', value: getPaymentMethod(order.payment_method)},
    {id: 7, title: 'ステータス', value: getStatus(order.status)},
  ];

  useEffect(() => {
    showOrder(id, setOrder)
    getOrderProducts(id, setOrderProducts, setOrderTotal);
    getOrderUser(id, setOrderUser);
    getUserPurchase(state, setPurchaseTime)
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">注文情報</h1>
        </div>
      </div>
      {/* <Row className="mt-5">
        <Col xs={12} xl={8}>
          <DetailWidget details={orders} title='注文情報' />
          <Col className="mt-5">
            <ProductWidget details={orderProducts} title='商品情報' />
          </Col>
          <Col className="mt-5">
            <DetailWidget details={deliveries} title='配送情報' />
          </Col>
        </Col>
        <Col xs={12} xl={4}>
          <OrdererInformation {...ordererInformations} details={details} img_path={orderUser.img_path} />
        </Col>
      </Row> */}

      <Row className="">
        <Col xs={12} xl={12}>
          <Card border="0" className="shadow p-5">
            <div className="d-sm-flex justify-content-between border-bottom border-light pb-4">
              <div>
                <h4>
                  <span className="fw-bold">ご購入日</span>
                  <span className="ps-4">{moment(order.created_at).format("YYYY年MM月DD日 H:m:s")}</span>
                </h4>
                <div className="d-flex align-items-center">
                  <div className="">注文番号：{id}</div>
                  <div className="me-1 ms-1">｜</div>
                  <div className="">ステータス：{getStatus(order.status)}</div>
                </div>
              </div>
            </div>

            <Row>
              <ProductWidget orderProducts={orderProducts} />
            </Row>

            <Row>
              <Col xs={12}>
                <div className="d-flex justify-content-end text-end mb-4 py-4">
                  <div className="mt-2">
                    <Table className="table-clear">
                      <tbody>
                        <tr>
                          <td className="left pe-6">
                            <div>小計</div>
                          </td>
                          <td className="right">${subtotal.toFixed(2)}</td>
                        </tr>
                        {
                          (order.coupon) && (
                            <tr>
                              <td className="left pe-6">
                                <div>クーポン利用</div>
                              </td>
                              <td className="right">${totalDiscount.toFixed(2)}</td>
                            </tr>
                          )
                        }
                        order.coupon.name : null
                        <tr>
                          <td className="left pe-6">
                            <div>VAT (10%)</div>
                          </td>
                          <td className="right">${vat.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};
