export const getTermsOfService = async (setContent, setId) => {
  axios.get('/api/v1/management/terms-of-service')
  .then((response) => {
    const termsOfServices = response.data.terms_of_services;

    if (termsOfServices.length == 0) {
      setContent(termsOfServices.content)
      setId(termsOfServices.id)
    } else {
      setContent(termsOfServices[0].content)
      setId(termsOfServices[0].id)
    }
  })
  .catch(error => {
      console.error(error);
  });
};


export const storeTermsOfService = async (content, setId) => {
  axios.post('/api/v1/management/terms-of-service', content)
  .then((response) => {
    setId(response.data.id)
    alert('登録しました');
  })
  .catch(error => {
      console.error(error);
  });
};


export const updateTermsOfService = async (id, formValue) => {
  axios.put(`/api/v1/management/terms-of-service/${id}`, formValue)
  .then((response) => {
    alert('更新しました');
  })
  .catch(error => {
      console.error(error);
  });
};