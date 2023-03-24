export const getCustomer = async (userId, payjp_customer_id, setCustomer, setIsLoading) => {
  return await axios.get(`/api/v1/users/${userId}/customers/${payjp_customer_id}`)
  .then((response) => {
    console.log(response.data.customer);
    setCustomer(response.data.customer);
    setIsLoading(false);
    return response.data.customer;
  })
  .catch(error => {
      console.error(error);
      setIsLoading(false);
  });
};

export const storeCustomer = async (userId, formValue, paymentMethod, updatePaymentMethod, onSaveComplete) => {
  return await axios.post(`/api/v1/users/${userId}/customers`, formValue)
  .then((response) => {
    const customer_id = response.data.customer_id;
    paymentMethod.payjp_customer_id = customer_id
    updatePaymentMethod(101, paymentMethod.id, paymentMethod, onSaveComplete)
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateCustomer = async (userId, formValue) => {
  return await axios.put(`/api/v1/users/${userId}/customers`, formValue)
  .then((response) => {
    console.log(response.data.customer);
  })
  .catch(error => {
      console.error(error);
  });
};