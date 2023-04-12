export const getApiKeys = async () => {
  return await axios.get('/api/v1/management/api-keys')
  .then((response) => {
    return response;
  })
  .catch(error => {
    console.error(error);
  });
};

export const storeApiKey = async (apiKey, storeComplete) => {
  axios.post('/api/v1/management/api-keys', apiKey)
  .then((response) => {
    console.log(response.data);
    storeComplete();
  })
  .catch(error => {
    console.error(error);
  });
};