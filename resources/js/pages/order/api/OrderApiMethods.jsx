export const getOrders = async (setOrders) => {
  axios.get('/api/v1/management/orders')
  .then((response) => {
    setOrders(response.data.orders.data);
  })
  .catch(error => {
      console.error(error);
  });
};

export const getPrefectures = async (setPrefectures) => {
  axios.get('/api/v1/management/prefectures')
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
    setOrders(response.data.orders.data);
  })
  .catch(error => {
      console.error(error);
  });
};


export const showOrder = async (id, setOrder) => {
  axios.get(`/api/v1/management/orders/${id}`)
  .then((response) => {
    setOrder(response.data.order);
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