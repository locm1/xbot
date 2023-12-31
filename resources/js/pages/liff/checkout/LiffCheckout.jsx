import React, { useState, useRef, useEffect, useContext } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import '@splidejs/splide/css';
import Swal from "sweetalert2";
import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';
import liff from '@line/liff';
import { LoadingContext } from "@/components/LoadingContext";

import LiffCheckoutPayment from "@/pages/liff/checkout/LiffCheckoutPayment";
import LiffCheckoutOrders from "@/pages/liff/checkout/LiffCheckoutOrders";
import LIffCheckoutCoupon from "@/pages/liff/checkout/LIffCheckoutCoupon";
import { DeliveryAddressItem } from "@/pages/liff/LiffCardItem";
import { searchPostage } from "@/pages/liff/api/PostageApiMethods";
import { getSelectOrderDestination } from "@/pages/liff/api/OrderDestinationApiMethods";
import { getCarts, getCartsAndRelatedProducts } from "@/pages/liff/api/CartApiMethods";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { showPaymentMethod } from "@/pages/liff/api/PaymentApiMethods";
import { getCustomer } from "@/pages/liff/api/CustomerApiMethods";
import { showCard } from "@/pages/liff/api/CardApiMethods";
import { getEcommerceConfigurationAndPostage } from "@/pages/liff/api/EcommerceConfigurationApiMethods";
import { storeOrder } from "@/pages/liff/api/OrderApiMethods";

export default () => {
  const idToken = liff.getIDToken();
  const [isRendered, setIsRendered] = useState(false)
  const location = useLocation();
  const [coupon, setCoupon] = useState({
    discount_price: 0
  });
  const history = useHistory();
  const { setIsLoading } = useContext(LoadingContext);
  const [carts, setCarts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([
    { discount_price: '' }
  ]);
  const [itemsExistInCart, setItemsExistInCart] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [user, setUser] = useState({
    is_registered: 0
  });
  const [paymentMethod, setPaymentMethod] = useState({
    payment_method: 1, payjp_default_card_id: ''
  });
  const [card, setCard] = useState({ brand: '', card_number: '', exp_month: '', exp_year: '', name: '' });
  const [ecommerceConfiguration, setEcommerceConfiguration] = useState({
    cash_on_delivery_fee: '', is_enabled: 1,
  });
  const orderTotal = carts && carts.reduce((cart, i) => cart + i.totalAmount, 0);
  const [postage, setPostage] = useState(0);
  const discountedTotalAmount = relatedProducts.reduce((relatedProduct, i) => relatedProduct + i.discount_price, 0)
  const discount_rate_decimal = coupon.discount_price / 100.0
  const discount_amount = orderTotal * discount_rate_decimal
  const total = (paymentMethod && paymentMethod.payment_method == 1)
    ? orderTotal + postage - discountedTotalAmount - discount_amount
    : (paymentMethod && paymentMethod.payment_method == 2 && ecommerceConfiguration.is_enabled == 1)
      ? orderTotal + postage + ecommerceConfiguration.cash_on_delivery_fee - discountedTotalAmount - discount_amount
      : orderTotal + postage - discountedTotalAmount - discount_amount

  const isEmpty = (obj) => {
    return !Object.keys(obj).length;
  }

  const validationCheck = () => {
    const errors = [];

    if (isEmpty(deliveryAddress)) {
      errors.push("お届け先住所を選択してください");
    }
    if (paymentMethod.payment_method == 1 && !paymentMethod.payjp_customer_id) {
      errors.push("クレジットカードを選択してください");
    }
    if (paymentMethod.payjp_default_card_id === '') {
      errors.push("支払い方法を選択してください");
    }
    if (paymentMethod.payment_method == 2 && ecommerceConfiguration.is_enabled == 0) {
      errors.push("支払い方法を選択してください");
    }

    return errors;
  }

  const createOrder = () => {
    setIsLoading(true);
    const errors = validationCheck();
    console.log(errors);
    if (errors.length > 0) {
      Swal.fire({
        title: 'エラー',
        icon: 'error',
        html: errors.join('<br>')
      })
      setIsLoading(false);
      return;
    }
    const keys = ['updated_at', 'user_id', 'created_at', 'deleted_at'];
    keys.forEach((key) => delete deliveryAddress[key]);
    
    const delivery_time = Cookies.get('delivery_time') ?? 1;

    const order = {
      user_id: user.id, delivery_time: delivery_time, purchase_amount: Math.floor(total), status: 1,
      payment_method: paymentMethod.payment_method, shipping_fee: postage ? postage : 0,
      discount_price: discountedTotalAmount
    }
    const products = carts.map(cart => { return { product_id: cart.product_id, quantity: cart.quantity, price: cart.price } })
    Object.assign(order, deliveryAddress)
    if (paymentMethod.payment_method == 1) {
      order.payjp_url = `https://pay.jp/d/customers/${paymentMethod.payjp_customer_id}`
      order.payjp_card_id = card.id
    }
    if (coupon) {
      order.coupon_id = coupon.id
    }
    const charge = {
      payjp_customer_id: paymentMethod.payjp_customer_id, purchase_amount: order.purchase_amount
    }
    const formValue = {
      order: order, order_products: products, charge: charge, liffToken: idToken
    }
    console.log(formValue);
    storeOrder(user.id, formValue, storeComplete, setIsLoading)
      .then(response => {
        failedStore(response.message)
        if (response.status == 500) {
          history.push(Paths.LiffCheckout.path);
        }
      });
    //storeOrder(101, formValue, storeComplete, setIsLoading)
  }

  const storeComplete = () => {
    history.push(Paths.LiffOrderComplete.path);
  }

  const failedStore = (message) => {
    Swal.fire(
      `エラー`,
      message,
      'error',
    )
  }

  useEffect(() => {
    const dataFetch = async () => {
      try {
        setCoupon(location.state?.coupon ?? {
          discount_price: 0
        });
        const response = await getUser(idToken, setUser);
        const destination_response = await getSelectOrderDestination(response.id, idToken, setDeliveryAddress);
        if (destination_response == null) {
          await getCartsAndRelatedProducts(response.id, idToken, setCarts, setItemsExistInCart, setRelatedProducts);
        } else {
          const searchParams = {
            params: { name: destination_response.prefecture }
          };
          const postage = await searchPostage(searchParams);
          const carts = await getCartsAndRelatedProducts(response.id, idToken, setCarts, setItemsExistInCart, setRelatedProducts);
          await getEcommerceConfigurationAndPostage(carts, postage[0], setPostage, setEcommerceConfiguration);
        }
        const payment_response = await showPaymentMethod(response.id, idToken);
        setPaymentMethod(payment_response);
        setIsRendered(true);

        if (payment_response.payjp_default_card_id) {
          await showCard(response.id, idToken, payment_response.payjp_customer_id, payment_response.payjp_default_card_id, setCard);
        }
      } catch (error) {
        console.error(error)
        Swal.fire(
          `データ取得エラー`,
          'データが正常に取得できませんでした',
          'error'
        )
      }
    }
    dataFetch();
  }, []);

  return (
    <>
      <main className="liff-product-detail">
        <div className="liff-product-list px-3">
          <Card border="0" className="shadow my-3">
            <Card.Header className="bg-primary text-white px-3 py-2 d-flex align-items-center justify-content-between">
              <h5 className="mb-0 fw-bolder">お届け先住所</h5>
              <Button variant="outline-white" size="sm" as={Link} to={Paths.LiffCheckoutDestinations.path}>
                変更
              </Button>
            </Card.Header>
            <Card.Body className="py-0">
              <ListGroup className="list-group-flush">
                <DeliveryAddressItem {...deliveryAddress} isRendered={isRendered} />
              </ListGroup>
            </Card.Body>
          </Card>
          <LIffCheckoutCoupon coupon={coupon} isRendered={isRendered} />
          <LiffCheckoutPayment paymentMethod={paymentMethod} ecommerceConfiguration={ecommerceConfiguration} card={card} isRendered={isRendered} />
          <LiffCheckoutOrders
            carts={carts}
            createOrder={createOrder}
            orderTotal={orderTotal}
            total={total}
            postage={postage}
            ecommerceConfiguration={ecommerceConfiguration}
            paymentMethod={paymentMethod}
            discountedTotalAmount={discountedTotalAmount}
            coupon={coupon}
            isRendered={isRendered}
            deliveryAddress={deliveryAddress}
          />
        </div>
      </main>
    </>
  );
};