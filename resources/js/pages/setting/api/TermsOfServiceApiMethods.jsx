export const getTermsOfService = async (setContent, setId) => {
  axios.get('/api/v1/management/terms-of-service')
  .then((response) => {
    const terms_of_service = response.data.terms_of_service;
    setContent(terms_of_service.content)
    setId(terms_of_service.id)
  })
  .catch(error => {
      console.error(error);
  });
};


export const updateTermsOfService = async (id, formValue, updateCompleteModal) => {
  axios.put(`/api/v1/management/terms-of-service/${id}`, formValue)
  .then((response) => {
    updateCompleteModal();
  })
  .catch(error => {
      console.error(error);
  });
};