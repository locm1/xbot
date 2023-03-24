import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Image, Button, Card, ListGroup } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { ShoppingCartIcon, InboxIcon } from '@heroicons/react/solid';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';
import moment from "moment-timezone";
import { LoadingContext } from "@/components/LoadingContext";

import Purchases from "@/data/purchases";
import { CartItem, OrderDetailItem, PaymentDetailItem, DeliveryAddressItem } from "@/pages/liff/LiffCardItem";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { showCard } from "@/pages/liff/api/CardApiMethods";
import { showOrder } from "@/pages/liff/api/OrderApiMethods";
import { showPaymentMethod } from "@/pages/liff/api/PaymentApiMethods";
import { getCustomer } from "@/pages/liff/api/CustomerApiMethods";
import { getEcommerceConfiguration } from "@/pages/liff/api/EcommerceConfigurationApiMethods";

export default () => {
  const { setIsLoading } = useContext(LoadingContext);
  const { id } = useParams();
  const [order, setOrder] = useState({
    last_name: '', first_name: '', zipcode: '', prefecture: '', city: '', 
    address: '', building_name: '', tel: '', status: 1, created_at: '', 
    purchase_amount: '', shipping_fee: '', order_total: '', order_products: [],
    payjp_card_id: ''
  });
  const [user, setUser] = useState({
    is_registered: 0
  });
  const [paymentMethod, setPaymentMethod] = useState({
    payment_method: 1
  });
  const [customer, setCustomer] = useState({
    id: '', default_card: {brand: '', card_number: '', exp_month: '', exp_year: '', name: ''}
  });
  const [ecommerceConfiguration, setEcommerceConfiguration] = useState({
    cash_on_delivery_fee: '', is_enabled: 1, 
  });
  const [card, setCard] = useState({brand: '', card_number: '', exp_month: '', exp_year: '', name: ''});
  const deliveryAddress = {
    last_name: order.last_name, first_name: order.first_name, zipcode: order.zipcode, prefecture: order.prefecture, 
    city: order.city, address: order.address, building_name: order.building_name, tel: order.tel
  }
  const total = (paymentMethod.payment_method == 1) ? order.order_total + order.shipping_fee : order.order_total + order.shipping_fee + ecommerceConfiguration.cash_on_delivery_fee;

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

  useEffect(() => {
    setIsLoading(true);
    const idToken = Cookies.get('TOKEN');
    getEcommerceConfiguration(setEcommerceConfiguration)
    getUser(idToken, setUser).then(response => {
      showPaymentMethod(response.id, setPaymentMethod).then(
        payment_response => {
          showOrder(response.id, id, setOrder).then(response => showCard(101, payment_response.payjp_customer_id, response.payjp_card_id, setCard))  
          getCustomer(response.id, payment_response.payjp_customer_id, setCustomer, setIsLoading)
        }
      )
    })
    //getOrders(101, setOrders)
  }, []);

  const PurchaseDetailCard = (props) => {
    return (
      <Card border="0" className="shadow">
        <Card.Header className="border-bottom">
            <h5 className="liff-product-detail-name mb-0">注文詳細</h5>
          </Card.Header>
        <Card.Body className="py-0">
          <Row className="mt-3 mb-3 pb-3 border-bottom">
            <Col xs={5}>
              <div className="liff-purchase-detail-card-title">ステータス</div>
              <div className="liff-purchase-detail-card-title">注文日時</div>
              <div className="liff-purchase-detail-card-title">注文番号</div>
            </Col>
            <Col xs={7}>
              <div>{getStatus(order.status)}</div>
              <div>{moment(order.created_at).format("YYYY-MM-DD HH:mm:ss")}</div>
              <div>{id}</div>
            </Col>
          </Row>
          <ListGroup className="list-group-flush">
          {order.order_products.map(order_product => <CartItem key={`order-product-${order_product.id}`} {...order_product} />)}
          </ListGroup>
          <ListGroup className="list-group-flush">
            <OrderDetailItem 
              total={total}
              orderTotal={order.order_total}
              postage={order.shipping_fee}
              paymentMethod={paymentMethod}
              ecommerceConfiguration={ecommerceConfiguration}
            />
          </ListGroup>
          <div className="align-items-center my-4">
            <Button as={Link} to={Paths.LiffProductHistories.path} variant="gray-800" className="w-100 p-3">
              購入履歴に戻る
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
    <main className="liff-product-detail">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
      <div className="liff-product-list">
        <Card border="0" className="shadow mb-4">
          <Card.Header className="border-bottom">
            <h5 className="liff-product-detail-name mb-0">お届け先情報</h5>
          </Card.Header>
          <Card.Body className="py-0">
            <ListGroup className="list-group-flush">
              <DeliveryAddressItem {...deliveryAddress} />
            </ListGroup>
          </Card.Body>
        </Card>
        <Card border="0" className="shadow mb-4">
          <Card.Header className="border-bottom">
            <h5 className="liff-product-detail-name mb-0">お支払い情報</h5>
          </Card.Header>
          <Card.Body className="py-0">
            <ListGroup className="list-group-flush">
              <PaymentDetailItem
                paymentMethod={paymentMethod}
                customer={customer}
                ecommerceConfiguration={ecommerceConfiguration}
                page="purchase-history"
                card={card}
              />
            </ListGroup>
          </Card.Body>
        </Card>
        <PurchaseDetailCard />
      </div>
    </main>
    </>
  );
};
