export const getOrders = async (userId, setOrders) => {
  axios.get(`/api/v1/users/${userId}/orders`)
  .then((response) => {
    setOrders(response.data.orders)
    console.log(response.data.orders);
    //setIsLoading(false);
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
  axios.post(`/api/v1/users/${userId}/orders`, formValue)
  .then((response) => {
    storeComplete();
    setIsLoading(false);
    //成功したらメール通知する処理
  })
  .catch(error => {
      console.error(error);
      setIsLoading(false);
  });
};

export const showOrder = async (userId, id, setOrder) => {
  return await axios.get(`/api/v1/users/${userId}/orders/${id}`)
  .then((response) => {
    const order = response.data.order
    const order_products = order.order_products.map(order_product => ({ ...order_product, totalAmount: order_product.product.price * order_product.quantity }));
    const orderTotal = order_products.reduce((cart, i) => cart + i.totalAmount, 0);
    setOrder({...order, order_total: orderTotal})
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