export const storeCart = async (userId, formValue) => {
  axios.post(`/api/v1/users/${userId}/carts`, formValue)
  .then((response) => {
    console.log(response.data.cart);
    location.href = '/cart';
  })
  .catch(error => {
      console.error(error);
  });
};

export const getCarts = async (userId, setCarts, setItemsExistInCart) => {
  return await axios.get(`/api/v1/users/${userId}/carts`)
  .then((response) => {
    const carts = response.data.carts;
    if (carts.length > 0) {
      setItemsExistInCart(true);
    } else {
      setItemsExistInCart(false);
    }
    setCarts(carts.map(cart => ({ ...cart, totalAmount: cart.product.price * cart.quantity })))
    console.log(carts.map(cart => ({ ...cart, totalAmount: cart.product.price * cart.quantity })));
    return carts.map(cart => ({ ...cart, totalAmount: cart.product.price * cart.quantity }));
  })
  .catch(error => {
      console.error(error);
  });
};

export const searchCarts = async (userId, params, setCarts, setItemsExistInCart) => {
  axios.get(`/api/v1/users/${userId}/carts`, params)
  .then((response) => {
    const carts = response.data.carts;
    setCarts(carts)
    console.log(carts);
    if (carts.length > 0) {
      setItemsExistInCart(true);
    } else {
      setItemsExistInCart(false);
    }
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateCart = async (userId, id, cart, location) => {
  axios.put(`/api/v1/users/${userId}/carts/${id}`, cart)
  .then((response) => {
    console.log(response.data.cart);
    if (location.includes('/product/detail')) {
      window.location.href = '/cart';
    }
  })
  .catch(error => {
      console.error(error);
  });
};

export const deleteCart = async (userId, id) => {
  axios.delete(`/api/v1/users/${userId}/carts/${id}`)
  .then((response) => {
  })
  .catch(error => {
      console.error(error);
  });
};