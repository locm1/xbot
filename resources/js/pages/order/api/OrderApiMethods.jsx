export const getOrders = async (params, setOrders, setLinks, setPaginate) => {
  return await axios.get('/api/v1/management/orders', params)
  .then((response) => {
    const orders = response.data.orders;
    setOrders(orders.data);
    setLinks([...Array(orders.last_page)].map((_, i) => i + 1))
    setPaginate({
      current_page: orders.current_page, 
      per_page: orders.per_page,
      from: orders.from,
      to: orders.to,
      total: orders.total,
    })
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