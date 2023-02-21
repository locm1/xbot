export const getPrivacyPolicies = async (setContent, setId) => {
  axios.get('/api/v1/management/privacy-policy')
  .then((response) => {
    const privacy_policy = response.data.privacy_policy;
    setContent(privacy_policy.content)
    setId(privacy_policy.id)
  })
  .catch(error => {
      console.error(error);
  });
};


export const updatePrivacyPolicy = async (id, formValue, updateCompleteModal) => {
  axios.put(`/api/v1/management/privacy-policy/${id}`, formValue)
  .then((response) => {
    updateCompleteModal();
  })
  .catch(error => {
      console.error(error);
  });
};