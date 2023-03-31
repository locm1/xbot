export const searchCoupons = async (userId, params, setCoupons) => {
  axios.get(`/api/v1/users/${userId}/coupons`, params)
  .then((response) => {
    setCoupons(response.data.coupons)
    console.log(response.data.coupons);
  })
  .catch(error => {
      console.error(error);
  });
};