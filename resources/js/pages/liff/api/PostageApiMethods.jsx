export const searchPostage = async (params) => {
  return await axios.get('/api/v1/postages', params)
  .then((response) => {
    return response.data.postages;
  })
  .catch(error => {
      console.error(error);
  });
};