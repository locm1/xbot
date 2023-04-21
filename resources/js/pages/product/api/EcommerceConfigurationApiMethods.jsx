import Swal from "sweetalert2";

export const getEcommerceConfiguration = async (setFormValue, setIsDisbled) => {
  axios.get(`/api/v1/management/ecommerce-configurations`)
  .then((response) => {
    const ecommerce_configuration = response.data.ecommerce_configuration;

    if (ecommerce_configuration) {
      setFormValue(ecommerce_configuration);
      setIsDisbled(ecommerce_configuration.is_enabled == 1 ? false : true)
    } else {
      setFormValue({
        target_amount: '', postage: '', cash_on_delivery_fee: '', tel: '', is_enabled: false
      });
      setIsDisbled(true)
    }
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeEcommerceConfiguration = async (formValue, setError) => {
  axios.post(`/api/v1/management/ecommerce-configurations`, formValue)
  .then((response) => {
    const ecommerce_configuration = response.data.ecommerce_configuration;
    console.log(ecommerce_configuration);
    Swal.fire(
      '保存完了',
      'EC環境設定の保存に成功しました',
      'success'
    )
  })
  .catch(error => {
    setError(error.response.data.errors)
    console.error(error);
  });
};

export const updateEcommerceConfiguration = async (id, formValue, setError) => {
  axios.put(`/api/v1/management/ecommerce-configurations/${id}`, formValue)
  .then((response) => {
    const ecommerce_configuration = response.data.ecommerce_configuration;
    console.log(ecommerce_configuration);
    Swal.fire(
      '更新完了',
      'EC環境設定の更新に成功しました',
      'success'
    )
  })
  .catch(error => {
    setError(error.response.data.errors)
    console.error(error);
  });
};