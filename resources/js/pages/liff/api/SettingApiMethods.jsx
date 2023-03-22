export const getPrivacyPolicy = async (setPrivacyPolicy) => {
  axios.get(`/api/v1/privacy-policy`)
  .then((response) => {
    setPrivacyPolicy(response.data.privacy_policy);
  })
  .catch(error => {
      console.error(error);
  });
};

export const getTermsOfService = async (setTermsOfService) => {
  axios.get(`/api/v1/terms-of-service`)
  .then((response) => {
    setTermsOfService(response.data.terms_of_service);
  })
  .catch(error => {
      console.error(error);
  });
};

export const getSpecificTrades = async (setSpecificTrades) => {
  axios.get(`/api/v1/specific-trades`)
  .then((response) => {
    console.log(response.data.specific_trades);
    setSpecificTrades(response.data.specific_trades);
  })
  .catch(error => {
      console.error(error);
  });
};