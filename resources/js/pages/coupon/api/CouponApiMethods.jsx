export const getCoupons = async (setCoupons) => {
  axios.get('/api/v1/management/coupons')
  .then((response) => {
    setCoupons(response.data.coupons);
  })
  .catch(error => {
      console.error(error);
  });
};

export const getCouponUsers = async (id, setUsers) => {
  axios.get(`/api/v1/management/coupons/${id}/users`)
  .then((response) => {
    console.log(response.data.coupon_users);
    setUsers(response.data.coupon_users);
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeCoupon = async (coupon, storeComplete) => {
  axios.post('/api/v1/management/coupons/', coupon)
  .then((response) => {
    storeComplete();
    location.href = '/manage/coupon/list';
  })
  .catch(error => {
      console.error(error);
  });
};

export const showCoupon = async (id, setCoupon) => {
  axios.get(`/api/v1/management/coupons/${id}`)
  .then((response) => {
    setCoupon(response.data.coupon);
    console.log(response.data.coupon);
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateCoupon = async (id, coupon, updateComplete) => {
  axios.put(`/api/v1/management/coupons/${id}`, coupon)
  .then((response) => {
    updateComplete();
  })
  .catch(error => {
      console.error(error);
  });
};

export const searchCoupons = async (params, setCoupons) => {
  axios.get('/api/v1/management/coupons', params)
  .then((response) => {
    setCoupons(response.data.coupons);
  })
  .catch(error => {
      console.error(error);
  });
};

export const deleteCoupon = async (id, deleteComplete, setCoupons, coupons) => {
  axios.delete(`/api/v1/management/coupons/${id}`)
  .then((response) => {
    deleteComplete();
    setCoupons(coupons.filter((coupon) => (coupon.id !== id)));
  })
  .catch(error => {
      console.error(error);
  });
};