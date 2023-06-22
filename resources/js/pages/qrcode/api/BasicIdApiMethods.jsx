export const getBasicId = async (setBasicId) => {
  return await axios.get('/api/v1/basic-id')
  .then(({ data }) => {
    setBasicId(data.basic_id)
    return data.basic_id;
  })
  .catch(error => {
      console.error(error);
  });
};