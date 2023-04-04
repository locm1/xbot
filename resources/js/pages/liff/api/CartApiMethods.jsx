import { isSalePeriod } from "@/components/common/IsSalePeriod";

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

export const storeRelatedProdcutInCart = async (userId, formValue ,setCarts, carts) => {
  axios.post(`/api/v1/users/${userId}/carts`, formValue)
  .then((response) => {
    const cart = response.data.cart
    setCarts([...carts, {
      id: cart.id, user_id: cart, product_id: cart.product_id, quantity: cart.quantity, deleted_at: cart.deleted_at,
      created_at: cart.created_at, updated_at: cart.updated_at, product: formValue.product,
      totalAmount: formValue.product.price * cart.quantity
    }]);
  })
  .catch(error => {
      console.error(error);
  });
};

export const getCarts = async (userId, setCarts, setItemsExistInCart, setRelatedProducts) => {
  return await axios.get(`/api/v1/users/${userId}/carts`)
  .then((response) => {
    const carts = response.data.carts;
    if (carts.cart_items.length > 0) {
      setItemsExistInCart(true);
    } else {
      setItemsExistInCart(false);
    }

    setCarts(
      carts.cart_items.map(cart => {
        if (isSalePeriod(cart.product.product_sale.start_date, cart.product.product_sale.end_date)) {
          const discount_rate_decimal = cart.product.product_sale.discount_rate / 100.0
          const sale_price = cart.product.price - (cart.product.price * discount_rate_decimal)
          var totalAmount = Math.floor(sale_price) * cart.quantity
        } else {
          var totalAmount = cart.product.price * cart.quantity
        }
        return { ...cart, totalAmount: totalAmount }
      })
    )
    setRelatedProducts(carts.related_products)
    console.log(carts.cart_items.map(cart => ({ ...cart, totalAmount: cart.product.price * cart.quantity })));
    return carts.cart_items.map(cart => ({ ...cart, totalAmount: cart.product.price * cart.quantity }));
  })
  .catch(error => {
      console.error(error);
  });
};

export const getCartsAndRelatedProducts = async (userId, setCarts, setItemsExistInCart, setRelatedProducts) => {
  return await axios.get(`/api/v1/users/${userId}/carts`)
  .then((response) => {
    const carts = response.data.carts;
    if (carts.cart_items.length > 0) {
      setItemsExistInCart(true);
    } else {
      setItemsExistInCart(false);
    }
    setCarts(
      carts.cart_items.map(cart => {
        if (isSalePeriod(cart.product.product_sale.start_date, cart.product.product_sale.end_date)) {
          const discount_rate_decimal = cart.product.product_sale.discount_rate / 100.0
          const sale_price = cart.product.price - (cart.product.price * discount_rate_decimal)
          var totalAmount = Math.floor(sale_price) * cart.quantity
        } else {
          var totalAmount = cart.product.price * cart.quantity
        }
        return { ...cart, totalAmount: totalAmount }
      })
    )
    //console.log(carts.related_products);
    //console.log(carts.cart_items.map(cart => ({ ...cart, totalAmount: cart.product.price * cart.quantity })));

    // セット割商品リストからカートにある商品IDで検索をかけ、ヒットした金額の合計値を出す
    let relatedProducts = [];
    carts.cart_items.forEach(cart => {
      const related_product = carts.related_products.find((related_product) => related_product.related_product_id === cart.product_id)
      
      if (typeof related_product !== "undefined") {
        relatedProducts.push(related_product)
      }
    })
    console.log(relatedProducts);
    setRelatedProducts(relatedProducts)
    return carts.cart_items.map(cart => ({ ...cart, totalAmount: cart.product.price * cart.quantity }));
  })
  .catch(error => {
      console.error(error);
  });
};

export const searchCarts = async (userId, params, setCarts, setItemsExistInCart) => {
  axios.get(`/api/v1/users/${userId}/carts`, params)
  .then((response) => {
    const carts = response.data.carts;
    setCarts(carts.cart_items)
    console.log(carts);
    if (carts.cart_items.length > 0) {
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