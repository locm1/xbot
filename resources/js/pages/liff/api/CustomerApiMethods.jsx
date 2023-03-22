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