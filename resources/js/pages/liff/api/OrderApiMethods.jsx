import Swal from "sweetalert2";
import { Paths } from "@/paths";
import { Link, useLocation, useParams, useHistory } from 'react-router-dom';

export const getOrders = async (userId, setOrders, setIsLoading = null) => {
  axios.get(`/api/v1/users/${userId}/orders`)
  .then((response) => {
    setOrders(response.data.orders)
    console.log(response.data.orders);
    setIsLoading(false);
    //成功したらメール通知する処理
  })
  .catch(error => {
      console.error(error);
      setIsLoading(false);
  });
};

export const searchOrders = async (userId, params, setOrders) => {
  axios.get(`/api/v1/users/${userId}/orders`, params)
  .then((response) => {
    setOrders(response.data.orders)
    console.log(response.data.orders);
  })
  .catch(error => {
      console.error(error);
      setIsLoading(false);
  });
};


export const storeOrder = async (userId, formValue, storeComplete, setIsLoading) => {
  return await axios.post(`/api/v1/users/${userId}/orders`, formValue)
  .then((response) => {
    console.log(response.data.order);
    storeComplete();
    setIsLoading(false);
    //成功したらメール通知する処理
  })
  .catch(error => {
    console.error(error);
    console.log(error.response.data.message);
    setIsLoading(false);

    const message = (error.response.data.status == 'failed') ? error.response.data.message : '購入処理が失敗しました。もう一度お試しください。';
    return {
      status: error.response.data.status,
      message: message
    }
  });
};

export const showOrder = async (userId, id, setOrder, setCoupon, setDiscountedTotalAmount) => {
  return await axios.get(`/api/v1/users/${userId}/orders/${id}`)
  .then((response) => {
    const order = response.data.order
    const order_products = order.order_products.map(order_product => ({ ...order_product, totalAmount: order_product.product.price * order_product.quantity }));
    const orderTotal = order_products.reduce((cart, i) => cart + i.totalAmount, 0);
    setOrder({...order, order_total: orderTotal})
    setDiscountedTotalAmount(order.discount_price)
    setCoupon(order.coupon)
    console.log({...order, order_total: orderTotal});
    return {...order, order_total: orderTotal};
    //setIsLoading(false);
    //成功したらメール通知する処理
  })
  .catch(error => {
      console.error(error);
      setIsLoading(false);
  });
};