export const storeCart = async (formValue) => {
  axios.post('/api/v1/carts', formValue)
  .then((response) => {
    console.log(response.data.cart);
    //location.href = '/cart';
  })
  .catch(error => {
      console.error(error);
  });
};

export const getCarts = async (setCarts, setItemsExistInCart) => {
  axios.get('/api/v1/carts')
  .then((response) => {
    const carts = response.data.carts;
    if (carts.length > 0) {
      setItemsExistInCart(true);
    } else {
      setItemsExistInCart(false);
    }
    setCarts(carts.map(cart => ({ ...cart, totalAmount: cart.product.price * cart.quantity })))
    console.log(carts.map(cart => ({ ...cart, totalAmount: cart.product.price * cart.quantity })));
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateCart = async (id, cart) => {
  axios.put(`/api/v1/carts/${id}`, cart)
  .then((response) => {
    console.log(response.data.cart);
  })
  .catch(error => {
      console.error(error);
  });
};

export const deleteCart = async (id) => {
  axios.delete(`/api/v1/carts/${id}`)
  .then((response) => {
  })
  .catch(error => {
      console.error(error);
  });
};