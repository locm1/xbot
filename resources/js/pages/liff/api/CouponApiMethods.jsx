import Swal from "sweetalert2";

export const getCouponOwnerships = async (userId, setCoupons) => {
  axios.get(`/api/v1/users/${userId}/coupons`)
  .then((response) => {
    setCoupons(response.data.coupons)
    console.log(response.data.coupons);
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