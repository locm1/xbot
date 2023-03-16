export const getOrderProducts = async (id, setOrderProducts) => {
  axios.get(`/api/v1/management/orders/${id}/products`)
  .then((response) => {
    setOrderProducts(response.data.order_products);
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