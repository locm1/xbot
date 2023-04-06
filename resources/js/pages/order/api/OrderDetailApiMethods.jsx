export const getOrderProducts = async (id, setOrderProducts, setOrderTotal) => {
  axios.get(`/api/v1/management/orders/${id}/products`)
  .then((response) => {
    const order_products = response.data.order_products;

    const new_order_products = order_products.map(order_product => ({ ...order_product, totalAmount: order_product.price * order_product.quantity }));
    const orderTotal = new_order_products.reduce((cart, i) => cart + i.totalAmount, 0);
    setOrderProducts(order_products);
    setOrderTotal(orderTotal)
  })
  .catch(error => {
      console.error(error);
  });
};

export const getOrderUser = async (id, setOrderUser) => {
  axios.get(`/api/v1/management/orders/${id}/user`)
  .then((response) => {
    setOrderUser(response.data.order_user.user);
  })
  .catch(error => {
      console.error(error);
  });
};