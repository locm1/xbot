export const getOrders = async (setOrders) => {
  axios.get('/api/v1/management/orders')
  .then((response) => {
    setOrders(response.data.orders);
  })
  .catch(error => {
      console.error(error);
  });
};

export const getPrefectures = async (setPrefectures) => {
  axios.get('/api/v1/prefectures')
  .then((response) => {
    setPrefectures(response.data.prefectures);
  })
  .catch(error => {
      console.error(error);
  });
};

export const searchOrders = async (params, setOrders) => {
  axios.get('/api/v1/management/orders', params)
  .then((response) => {
    setOrders(response.data.orders);
  })
  .catch(error => {
      console.error(error);
  });
};


export const showOrder = async (id, setOrder) => {
  axios.get(`/api/v1/management/orders/${id}`)
  .then((response) => {
    const order = response.data.order
    setOrder(order)
    console.log(response.data.order);
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateOrder = async (id, status, setOrders, orders, setModalOpen) => {
  axios.put(`/api/v1/management/orders/${id}`, {
    status: status
  })
  .then((response) => {
    setOrders(
      orders.map((order) => (order.id === id ? { ...order, status: status } : order))
    );
    setModalOpen(false);
  })
  .catch(error => {
      console.error(error);
  });
};