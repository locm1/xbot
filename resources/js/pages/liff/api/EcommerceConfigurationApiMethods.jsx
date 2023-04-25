export const getEcommerceConfigurationAndPostage = async (carts, targetPostage, setPostage, setEcommerceConfiguration) => {
  axios.get(`/api/v1/ecommerce-configurations`)
  .then((response) => {
    const ecommerce_configuration = response.data.ecommerce_configuration;

    const orderTotal = carts.reduce((cart, i) => cart + i.totalAmount, 0)
    const postage = (orderTotal >= ecommerce_configuration.target_amount)
      ? ecommerce_configuration.postage
      : targetPostage.postage;
    setPostage(postage)
    console.log(ecommerce_configuration);
    console.log(targetPostage);
    setEcommerceConfiguration(ecommerce_configuration)
  })
  .catch(error => {
      console.error(error);
  });
};

export const getEcommerceConfiguration = async (setEcommerceConfiguration) => {
  axios.get(`/api/v1/ecommerce-configurations`)
  .then((response) => {
    const ecommerce_configuration = response.data.ecommerce_configuration;
    setEcommerceConfiguration(ecommerce_configuration)
  })
  .catch(error => {
      console.error(error);
  });
};

export const getEcommerceConfigurationAndPayment = async (setEcommerceConfiguration, setPayments) => {
  axios.get(`/api/v1/ecommerce-configurations`)
  .then((response) => {
    const ecommerce_configuration = response.data.ecommerce_configuration;
    setEcommerceConfiguration(ecommerce_configuration)

    const payments = (ecommerce_configuration.is_enabled == 1)
      ? ['クレジットカード', '代金引き換え']
      : ['クレジットカード'];
    
      setPayments(payments);
  })
  .catch(error => {
      console.error(error);
  });
};