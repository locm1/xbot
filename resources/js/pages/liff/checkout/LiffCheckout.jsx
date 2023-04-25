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
  const location = useLocation();
  const [coupon, setCoupon] = useState({
    discount_price: 0
  });
  const history = useHistory();
  const { setIsLoading } = useContext(LoadingContext);
  const [carts, setCarts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([
    {discount_price: ''}
  ]);
  const [itemsExistInCart, setItemsExistInCart] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [user, setUser] = useState({
    is_registered: 0
  });
  const [paymentMethod, setPaymentMethod] = useState({
    payment_method: 1, payjp_default_card_id: ''
  });
  const [card, setCard] = useState({brand: '', card_number: '', exp_month: '', exp_year: '', name: ''});
  const [ecommerceConfiguration, setEcommerceConfiguration] = useState({
    cash_on_delivery_fee: '', is_enabled: 1, 
  });
  const orderTotal = carts.reduce((cart, i) => cart + i.totalAmount, 0);
  const [postage, setPostage] = useState(0);
  const discountedTotalAmount = relatedProducts.reduce((relatedProduct, i) => relatedProduct + i.discount_price, 0)
  const discount_rate_decimal = coupon.discount_price / 100.0
  const discount_amount = orderTotal * discount_rate_decimal
  const total = (paymentMethod && paymentMethod.payment_method == 1) ? orderTotal + postage - discountedTotalAmount - discount_amount : orderTotal + postage + ecommerceConfiguration.cash_on_delivery_fee - discountedTotalAmount - discount_amount;

  const deleteProperty = (keys) => {
    const cloneObject = Object.assign(deliveryAddress)
    keys.map(key => { delete cloneObject[key]})
    return cloneObject
  }

  const isEmpty = (obj) => {
    return !Object.keys(obj).length;
  }

  const validationCheck = () => {
    const errors = [];
  
    if (isEmpty(deliveryAddress)) {
      errors.push("配送先を選択してください");
    }
    if (paymentMethod.payjp_default_card_id === '') {
      errors.push("支払い方法を選択してください");
    }
    if (Cookies.get('delivery_time') === undefined) {
      errors.push("配送オプションを選択してください");
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
    const keys = ['id', 'is_selected', 'updated_at', 'user_id', 'created_at', 'deleted_at'];
    const delivery_time = Cookies.get('delivery_time')
    const newDeliveryAddress = deleteProperty(keys)
    
    const order = {
      user_id: user.id, delivery_time: delivery_time, purchase_amount: Math.floor(total), status: 1, 
      payment_method: paymentMethod.payment_method, shipping_fee: postage,
      discount_price: discountedTotalAmount
    }
    const products = carts.map(cart => {return {product_id: cart.product_id, quantity:cart.quantity, price: cart.product.price}})
    Object.assign(order, newDeliveryAddress)
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
      order: order, order_products: products, charge: charge
    }
    console.log(formValue);
    storeOrder(user.id, formValue, storeComplete, setIsLoading)
    .then(response => {
      failedStore(response.message)
    });
    // storeOrder(101, formValue, storeComplete, setIsLoading)
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
    setIsLoading(true);
    location.state && setCoupon(location.state.coupon);
    const idToken = liff.getIDToken();
    
    getUser(idToken, setUser).then(response => {
      getSelectOrderDestination(response.id, setDeliveryAddress).then(destination_response => {
        if (destination_response == null) {
          getCartsAndRelatedProducts(response.id, setCarts, setItemsExistInCart, setRelatedProducts)
        } else {
          const searchParams = {
            params: {name: destination_response.prefecture}
          };
          searchPostage(searchParams).then(postage => {
            console.log(postage[0]);
            getCartsAndRelatedProducts(response.id, setCarts, setItemsExistInCart, setRelatedProducts).then(
              response => getEcommerceConfigurationAndPostage(response, postage[0], setPostage, setEcommerceConfiguration)
            )
          })
        }
      });
      showPaymentMethod(response.id, setIsLoading).then(payment_response => {
        setPaymentMethod(payment_response)
        payment_response.payjp_default_card_id && showCard(response.id, payment_response.payjp_customer_id, payment_response.payjp_default_card_id, setCard)
      })
    })


  }, []);

  return (
    <>
      <main className="liff-product-detail">
        <div className="liff-product-list">
          <Card border="0" className="shadow my-3">
            <Card.Header className="border-bottom">
              <h5 className="liff-product-detail-name mb-0">お届け先住所</h5>
            </Card.Header>
            <Card.Body className="py-0">
              <ListGroup className="list-group-flush">
                {<DeliveryAddressItem {...deliveryAddress} />}
              </ListGroup>
            </Card.Body>
          </Card>
          <LIffCheckoutCoupon coupon={coupon} />
          <LiffCheckoutPayment paymentMethod={paymentMethod} ecommerceConfiguration={ecommerceConfiguration} card={card} />
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
          />
        </div>
      </main>
    </>
  );
};