export const getAddress = async (zipcode) => {
  const searchParams = {
    params: { zipcode: zipcode }
  };
  return axios.get('/api/v1/address', searchParams)
  .then((response) => {
    const address = response.data.address.results[0];
    console.log(response.data.address.results);
    return address
  })
  .catch(error => {
      console.error(error);
  });
};