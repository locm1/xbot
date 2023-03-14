export const updateOrderDestination = async (userId, formValue) => {
  return await axios.post(`/api/v1/users/${userId}/destinations`, formValue)
  .then((response) => {
    console.log(response.data.order_destination);
  })
  .catch(error => {
      console.error(error);
  });
};