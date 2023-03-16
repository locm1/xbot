export const getAddress = async (zipcode, setFormValue, formValue) => {
  const searchParams = {
    params: { zipcode: zipcode }
  };
  axios.get('/api/v1/address', searchParams)
  .then((response) => {
    const address = response.data.address.results[0];
    console.log(response.data.address.results);
    setFormValue({
      ...formValue,
      prefecture: address.address1, city: address.address2 + ' ' + address.address3, zipcode: zipcode
    });
  })
  .catch(error => {
      console.error(error);
  });
};