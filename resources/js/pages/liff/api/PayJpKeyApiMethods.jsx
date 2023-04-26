export const getPublicKey = async () => {
  return await axios.get(`/api/v1/payjp-public-key`)
  .then((response) => {
    console.log(response.data.payjp_public_key);
    return response.data.payjp_public_key;
  })
  .catch(error => {
      console.error(error);
  });
};