export const getCoupons = async (params, setCoupons, setLinks, setPaginate) => {
  axios.get('/api/v1/management/coupons', params)
  .then((response) => {
    const coupons = response.data.coupons;
    setCoupons(coupons.data);
    setLinks([...Array(coupons.last_page)].map((_, i) => i + 1))
    setPaginate({
      current_page: coupons.current_page, 
      per_page: coupons.per_page,
      from: coupons.from,
      to: coupons.to,
      total: coupons.total,
    })
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

export const storeCoupon = async (coupon, storeComplete, setError) => {
  axios.post('/api/v1/management/coupons', coupon)
  .then((response) => {
    storeComplete();
    location.href = '/manage/coupon/list';
  })
  .catch(error => {
    setError(error.response.data.errors)
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

export const updateCoupon = async (id, coupon, updateComplete, setError) => {
  axios.put(`/api/v1/management/coupons/${id}`, coupon)
  .then((response) => {
    updateComplete();
  })
  .catch(error => {
    setError(error.response.data.errors)
    console.error(error);
  });
};

export const deleteCoupon = async (id, deleteComplete) => {
  axios.delete(`/api/v1/management/coupons/${id}`)
  .then((response) => {
    deleteComplete(id);
  })
  .catch(error => {
      console.error(error);
  });
};