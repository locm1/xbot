import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Image, Button, Card, ListGroup } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { ShoppingCartIcon, InboxIcon } from '@heroicons/react/solid';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';
import moment from "moment-timezone";
import liff from '@line/liff';
import { LoadingContext } from "@/components/LoadingContext";
import { CartItem, OrderDetailItem, PaymentDetailItem, DeliveryAddressItem } from "@/pages/liff/LiffCardItem";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { showCard } from "@/pages/liff/api/CardApiMethods";
import { showOrder } from "@/pages/liff/api/OrderApiMethods";
import { showPaymentMethod } from "@/pages/liff/api/PaymentApiMethods";
import { getCustomer } from "@/pages/liff/api/CustomerApiMethods";
import { getEcommerceConfiguration } from "@/pages/liff/api/EcommerceConfigurationApiMethods";

export default () => {
  const { setIsLoading } = useContext(LoadingContext);
  const [isRendered, setIsRendered] = useState(false);
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
  const [coupon, setCoupon] = useState({
    discount_price: 0
  });
  const [paymentMethod, setPaymentMethod] = useState({
    payment_method: 1, payjp_default_card_id: ''
  });
  const [ecommerceConfiguration, setEcommerceConfiguration] = useState({
    cash_on_delivery_fee: '', is_enabled: 1, 
  });
  const [discountedTotalAmount, setDiscountedTotalAmount] = useState([
    {discount_price: ''}
  ]);
  const [card, setCard] = useState({brand: '', card_number: '', exp_month: '', exp_year: '', name: ''});
  const deliveryAddress = {
    id: id,last_name: order.last_name, first_name: order.first_name, zipcode: order.zipcode, 
    prefecture: order.prefecture, city: order.city, address: order.address, 
    building_name: order.building_name, tel: order.tel
  }

  const getTotal = (amount) => {
    if (coupon) {
      const discount_rate_decimal = coupon.discount_price / 100.0
      const discount_amount = order.order_total * discount_rate_decimal
      return amount - discount_amount;  
    } 

    return amount;
  }

  const amount = (paymentMethod.payment_method == 1) ? order.order_total + order.shipping_fee - discountedTotalAmount : order.order_total + order.shipping_fee + ecommerceConfiguration.cash_on_delivery_fee - discountedTotalAmount
  const total = getTotal(amount)

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
    const idToken = liff.getIDToken();
    getEcommerceConfiguration(setEcommerceConfiguration)
    getUser(idToken, setUser).then(response => {
      showPaymentMethod(response.id, setIsRendered).then(payment_response => {
        setPaymentMethod(payment_response)
        payment_response.payjp_default_card_id && showCard(response.id, payment_response.payjp_customer_id, payment_response.payjp_default_card_id, setCard)
        showOrder(response.id, id, setOrder, setCoupon, setDiscountedTotalAmount, idToken)
      })
    })

    const dataFetch = async () => {
      try {
        getEcommerceConfiguration(setEcommerceConfiguration)
        const response = await getUser(idToken, setUser);
        const paymentMethod = await showPaymentMethod(response.id, idToken)
        setPaymentMethod(paymentMethod)
        paymentMethod.payjp_default_card_id && showCard(response.id, idToken, paymentMethod.payjp_customer_id, paymentMethod.payjp_default_card_id, setCard)
        showOrder(response.id, id, setOrder, setCoupon, setDiscountedTotalAmount)
      } catch (error) {
        console.error(error)
        Swal.fire(
          `データ取得エラー`,
          'データが正常に取得できませんでした',
          'error'
        ).then((result) => {
          //LIFF閉じる
          liff.closeWindow()
        })
      }
    }
    dataFetch();

    //getOrders(101, setOrders)
  }, []);

  const PurchaseDetailCard = (props) => {
    return (
      <Card border="0" className="shadow">
      <Card.Header className="bg-primary text-white px-3 py-2">
        <h5 className="mb-0 fw-bolder">注文詳細</h5>
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
              coupon={coupon}
              discountedTotalAmount={discountedTotalAmount}
            />
          </ListGroup>
          <div className="align-items-center my-4">
            <Button as={Link} to={Paths.LiffProductHistories.path} variant="gray-800" className="w-100">
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
      <div className="mx-3 my-3">
        <Card border="0" className="shadow mb-4">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">お届け先情報</h5>
        </Card.Header>  
          <Card.Body className="py-0">
            <ListGroup className="list-group-flush">
              <DeliveryAddressItem {...deliveryAddress} />
            </ListGroup>
          </Card.Body>
        </Card>
        <Card border="0" className="shadow mb-4">
      <Card.Header className="bg-primary text-white px-3 py-2">
        <h5 className="mb-0 fw-bolder">お支払い情報</h5>
      </Card.Header>  
          <Card.Body className="py-0">
            <ListGroup className="list-group-flush">
              <PaymentDetailItem
                paymentMethod={paymentMethod}
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
