import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';

import LiffCheckoutPayment from "@/pages/liff/checkout/LiffCheckoutPayment";
import LiffCheckoutOrders from "@/pages/liff/checkout/LiffCheckoutOrders";
import { DeliveryAddressItem } from "@/pages/liff/LiffCardItem";
import { getSelectOrderDestination } from "@/pages/liff/api/OrderDestinationApiMethods";
import { getCarts } from "@/pages/liff/api/CartApiMethods";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { showPaymentMethod } from "@/pages/liff/api/PaymentApiMethods";
import { getCustomer } from "@/pages/liff/api/CustomerApiMethods";
import { getEcommerceConfigurationAndPostage } from "@/pages/liff/api/EcommerceConfigurationApiMethods";

export default () => {
  const [carts, setCarts] = useState([]);
  const [itemsExistInCart, setItemsExistInCart] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState({});
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
  const orderTotal = carts.reduce((cart, i) => cart + i.totalAmount, 0);
  const [postage, setPostage] = useState(500);
  const total = (paymentMethod.payment_method == 1) ? orderTotal + postage : orderTotal + postage + ecommerceConfiguration.cash_on_delivery_fee;

  const deleteProperty = (keys) => {
    const cloneObject = Object.assign(deliveryAddress)
    keys.map(key => { delete cloneObject[key]})
    return cloneObject
  }

  const createOrder = () => {
    const keys = ['id', 'is_selected', 'updated_at', 'user_id', 'created_at', 'deleted_at'];
    const delivery_time = Cookies.get('delivery_time')
    const newDeliveryAddress = deleteProperty(keys)
    
    const order = {
      user_id: 101, delivery_time: delivery_time, purchase_amount: total, status: 1, 
      payment_method: paymentMethod.payment_method, shipping_fee: postage, coupon_id: 1, tax: 1,
    }
    Object.assign(order, newDeliveryAddress)
    console.log(order);
    console.log(total * 0.08);
  }

  useEffect(() => {
    const idToken = Cookies.get('TOKEN');
    getCarts(101, setCarts, setItemsExistInCart).then(
      response => getEcommerceConfigurationAndPostage(response, setPostage, setEcommerceConfiguration)
    )
    //getUser(idToken, setUser).then(response => getCarts(response.id, setCarts, setItemsExistInCart))
    //getUser(idToken, setUser).then(response => getSelectOrderDestination(response.id, setDeliveryAddress))
    getSelectOrderDestination(101, setDeliveryAddress)
    showPaymentMethod(101, setPaymentMethod).then(response => getCustomer(101, response.payjp_customer_id, setCustomer))
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
          <LiffCheckoutPayment paymentMethod={paymentMethod} customer={customer} ecommerceConfiguration={ecommerceConfiguration} />
          <LiffCheckoutOrders 
            carts={carts} 
            createOrder={createOrder} 
            orderTotal={orderTotal}
            total={total}
            postage={postage}
            ecommerceConfiguration={ecommerceConfiguration}
            paymentMethod={paymentMethod}
          />
        </div>
      </main>
    </>
  );
};