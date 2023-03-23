export const getEcommerceConfigurationAndPostage = async (carts, setPostage, setEcommerceConfiguration) => {
  axios.get(`/api/v1/ecommerce-configurations`)
  .then((response) => {
    const ecommerce_configuration = response.data.ecommerce_configuration;

    const orderTotal = carts.reduce((cart, i) => cart + i.totalAmount, 0)
    const postage = (orderTotal <= ecommerce_configuration.target_amount)
      ? ecommerce_configuration.postage
      : 0;
    console.log(ecommerce_configuration);
    setPostage(postage)
    setEcommerceConfiguration(ecommerce_configuration)
  })
  .catch(error => {
      console.error(error);
  });
};

export const getEcommerceConfiguration = async (setEcommerceConfiguration, setPayments) => {
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