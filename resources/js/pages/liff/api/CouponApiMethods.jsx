import Swal from "sweetalert2";

export const getCouponOwnerships = async (userId, liffToken, setCoupons) => {
  const params = {params: {liffToken: liffToken}}
  return await axios.get(`/api/v1/users/${userId}/coupons`, params)
  .then((response) => {
    const coupons = response.data.coupons;
    setCoupons(coupons)
    console.log(coupons);
    return coupons
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeCouponOwnership = async (userId, formValue, coupons, setCoupons, setError) => {
  axios.post(`/api/v1/users/${userId}/coupons`, formValue)
  .then((response) => {
    setCoupons([...coupons, response.data.coupon])
    console.log(response.data.coupon);
    Swal.fire(
      '取得完了',
      'クーポンを取得しました',
      'success'
    )
  })
  .catch(error => {
      console.error(error);
      setError(error.response.data.message)
  });
};