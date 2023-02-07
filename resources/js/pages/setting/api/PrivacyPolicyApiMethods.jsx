export const getPrivacyPolicies = async (setContent, setId) => {
  axios.get('/api/v1/management/privacy-policy')
  .then((response) => {
    const privacyPolicies = response.data.privacy_policies;
    console.log(privacyPolicies);

    if (privacyPolicies.length == 0) {
      setContent(privacyPolicies.content)
      setId(privacyPolicies.id)
    } else {
      setContent(privacyPolicies[0].content)
      setId(privacyPolicies[0].id)
    }
  })
  .catch(error => {
      console.error(error);
  });
};


export const storePrivacyPolicy = async (content, setId) => {
  axios.post('/api/v1/management/privacy-policy', content)
  .then((response) => {
    setId(response.data.id)
    alert('登録しました');
  })
  .catch(error => {
      console.error(error);
  });
};


export const updatePrivacyPolicy = async (id, formValue) => {
  axios.put(`/api/v1/management/privacy-policy/${id}`, formValue)
  .then((response) => {
    alert('更新しました');
  })
  .catch(error => {
      console.error(error);
  });
};