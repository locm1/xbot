import Swal from "sweetalert2";

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

export const storeCustomer = async (userId, formValue) => {
  return await axios.post(`/api/v1/users/${userId}/customers`, formValue)
  .then((response) => {
    return response.data.customer_id;
  })
  .catch(error => {
      console.error(error);
      Swal.fire(`エラー`, 'カードが正常に登録できませんでした。', 'error')
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