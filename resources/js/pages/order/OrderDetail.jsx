import React, { useState, useEffect } from "react";
import { Row, Col, Nav, Button, Card, ListGroup, Image, Table } from 'react-bootstrap';
import moment from "moment-timezone";
import { ProductWidget } from "@/pages/order/detail/ProductWidget";
import DeliveryWidget from "@/pages/order/detail/DeliveryWidget";
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Paths } from "@/paths";
import { showOrder } from "@/pages/order/api/OrderApiMethods";
import { getOrderProducts, getOrderUser, getOrderDelivery } from "@/pages/order/api/OrderDetailApiMethods";
import OrderDetailContentLoader from "@/pages/order/OrderDetailContentLoader";

export default () => {
  const history = useHistory();
  const { id } = useParams();
  const [orderProducts, setOrderProducts] = useState([
    {id: 1, name: '', quantity: '', price: '', product_id: 1, product_image: [
      {image_path: ''}
    ]}
  ]);
  const [order, setOrder] = useState({
    id: 1, purchase_amount: '', status: 1, shipping_fee: '', coupon: {name: ''}, 
    created_at: '', status: 1, payment_method: 1, delivery_time: 1, first_name: '', last_name: '', 
    first_name_kana: '', last_name_kana: '', zipcode: '', prefecture: '', city: '', address: '', 
    building_name: '', tel: '', discount_price: ''
  });
  const [orderTotal, setOrderTotal] = useState(0);
  const [isRendered, setIsRendered] = useState(false);

  const getTotal = (amount) => {
    if (order.coupon) {
      const discount_rate_decimal = order.coupon.discount_price / 100.0
      const discount_amount = orderTotal * discount_rate_decimal
      return amount - discount_amount;  
    } 

    return amount;
  }

  const getDiscountAmount = () => {
    if (order.coupon) {
      const discount_rate_decimal = order.coupon.discount_price / 100.0
      const discount_amount = orderTotal * discount_rate_decimal
      return discount_amount
    } else {
      return 0;
    }
  }

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

  const amount = (order.payment_method == 1) ? orderTotal + order.shipping_fee - order.discount_price : orderTotal + order.shipping_fee - order.discount_price
  const total = getTotal(amount)

  useEffect(() => {
    showOrder(id, setOrder)
    getOrderProducts(id, setOrderProducts, setOrderTotal).then(
      setIsRendered(true)
    );
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">注文情報</h1>
        </div>
      </div>

      {
        isRendered ? (
          <>
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
                                <td className="right">￥{orderTotal.toLocaleString()}</td>
                              </tr>
                              {
                                (order.coupon) && (
                                  <tr>
                                    <td className="left pe-6">
                                      <div>クーポン利用</div>
                                    </td>
                                    <td className="right">-￥{isNaN(getDiscountAmount()) ? 0 : Math.floor(getDiscountAmount()).toLocaleString()}</td>
                                  </tr>
                                )
                              }
                              <tr>
                                <td className="left pe-6">
                                  <div>送料</div>
                                </td>
                                <td className="right">￥{order.shipping_fee.toLocaleString()}</td>
                              </tr>
                              <tr>
                                <td className="left pe-6">
                                  <div className="fw-bold fs-5">合計</div>
                                </td>
                                <td className="right fw-bold fs-5">￥{Math.floor(total).toLocaleString()}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </Col>
                  </Row>
                            
                  <DeliveryWidget {...order} />
                </Card>
              </Col>
            </Row>
            <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
              <Button onClick={() => {history.push(Paths.Orders.path)}} size="lg" className="mt-2" variant="gray-500">
                一覧へ戻る
              </Button>
            </div>
          </>
        ) : (
          <OrderDetailContentLoader />
        )
      }
    </>
  );
};
