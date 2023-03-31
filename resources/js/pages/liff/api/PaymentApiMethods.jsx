export const showPaymentMethod = async (userId, setIsLoading) => {
  return await axios.get(`/api/v1/users/${userId}/payments`)
  .then((response) => {
    const order_payment_method = response.data.order_payment_methods
    console.log(order_payment_method);
    setIsLoading(false)
    return order_payment_method;
  })
  .catch(error => {
      console.error(error);
  });
};

export const storePaymentMethod = async (userId, formValue, storeComplete) => {
  return await axios.post(`/api/v1/users/${userId}/payments`, formValue)
  .then((response) => {
    console.log(response.data.order_payment_method);
    storeComplete();
  })
  .catch(error => {
      console.error(error);
  });
};

export const updatePaymentMethod = async (userId, id, formValue, updateComplete) => {
  return await axios.put(`/api/v1/users/${userId}/payments/${id}`, formValue)
  .then((response) => {
    console.log(response.data.order_payment_method);
    updateComplete();
  })
  .catch(error => {
      console.error(error);
  });
};