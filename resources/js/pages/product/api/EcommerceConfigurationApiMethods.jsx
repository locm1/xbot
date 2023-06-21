import Swal from "sweetalert2";

export const getEcommerceConfiguration = async (setFormValue) => {
  return await axios.get(`/api/v1/management/ecommerce-configurations`)
  .then((response) => {
    const ecommerce_configuration = response.data.ecommerce_configuration;

    if (ecommerce_configuration) {
      console.log(ecommerce_configuration);
      setFormValue(ecommerce_configuration);
      return ecommerce_configuration.is_enabled == 1 ? false : true;
    } else {
      setFormValue({
        target_amount: '', postage: '', cash_on_delivery_fee: '', tel: '', is_enabled: false
      });
      return true;
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


export const getApiKeys = async (setApiKey) => {
  return await axios.get('/api/v1/management/api-keys')
  .then((response) => {
    const apis = response.data;
    setApiKey({payjp_secret_key: apis.PAYJP_SECRET_KEY, mix_payjp_public_key: apis.MIX_PAYJP_PUBLIC_KEY })
    return response;
  })
  .catch(error => {
    console.error(error);
  });
};