export const showPaymentMethod = async (userId, setPaymentMethod) => {
  return await axios.get(`/api/v1/users/${userId}/payments`)
  .then((response) => {
    console.log(response.data.order_payment_methods);

    if (response.data.order_payment_methods == null) {
      setPaymentMethod({payment_method: 1});
    } else {
      setPaymentMethod(response.data.order_payment_methods);
    }
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