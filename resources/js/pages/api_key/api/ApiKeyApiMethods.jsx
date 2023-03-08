export const storeApiKey = async (apiKey, storeComplete) => {
  axios.post('/api/v1/management/api-keys', apiKey)
  .then((response) => {
    console.log(response.data.api_keys);
    storeComplete();
  })
  .catch(error => {
      console.error(error);
  });
};