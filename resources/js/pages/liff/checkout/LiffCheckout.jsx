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

export default () => {
  const [carts, setCarts] = useState([]);
  const [itemsExistInCart, setItemsExistInCart] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [user, setUser] = useState({
    is_registered: 0
  });
  const [paymentMethod, setPaymentMethod] = useState();
  const [customer, setCustomer] = useState({
    id: '', default_card: {brand: '', card_number: '', exp_month: '', exp_year: '', name: ''}
  });

  const createOrder = () => {
    console.log(paymentMethod);
    
    const order = {
      user_id: 101, first_name: deliveryAddress.first_name, first_name_kana: deliveryAddress.first_name_kana, 
      last_name: deliveryAddress.last_name, last_name_kana: deliveryAddress.last_name_kana, zipcode: deliveryAddress.zipcode, 
      prefecture: deliveryAddress.prefecture, city: deliveryAddress.city, address: deliveryAddress.address, 
      building_name: deliveryAddress.building_name, tel: deliveryAddress.tel, 
    }
  }

  useEffect(() => {
    const idToken = Cookies.get('TOKEN');
    getCarts(101, setCarts, setItemsExistInCart)
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
          <LiffCheckoutPayment paymentMethod={paymentMethod} customer={customer} />
          <LiffCheckoutOrders carts={carts} createOrder={createOrder} />
        </div>
      </main>
    </>
  );
};