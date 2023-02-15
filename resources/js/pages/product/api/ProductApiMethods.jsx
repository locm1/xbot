import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import Swal from "sweetalert2";

export const getProducts = async (setProducts) => {
  axios.get('/api/v1/management/products')
  .then((response) => {
    setProducts(response.data.products);
  })
  .catch(error => {
      console.error(error);
  });
};

export const searchProducts = async (params, setProducts) => {
  axios.get('/api/v1/management/products', params)
  .then((response) => {
    setProducts(response.data.products);
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeProduct = async (formValue, history) => {
  axios.post(`/api/v1/management/products/`, formValue)
  .then((response) => {
    const product = response.data.product;
    console.log(product);
    history.push(Paths.ProductProduct.path);
    alert('登録しました');
  })
  .catch(error => {
      console.error(error);
  });
};


export const showProduct = async (id, setProduct) => {
  axios.get(`/api/v1/management/products/${id}`)
  .then((response) => {
    setProduct(response.data.product)
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateProduct = (id, formValue) => {
  axios.put(`/api/v1/management/products/${id}`, formValue)
  .then((response) => {
    const product = response.data.product;
    Swal.fire(
      '保存完了',
      'ユーザー情報の保存に成功しました',
      'success'
    )
  })
  .catch(error => {
      console.error(error);
  });
};

export const deleteProduct = async (id, completeDelete) => {
  axios.delete(`/api/v1/management/products/${id}`)
  .then((response) => {
    completeDelete();
  })
  .catch(error => {
      console.error(error);
  });
};

export const sortProduct = async (id, formValue) => {
  axios.put(`/api/v1/management/products/${id}/sort`, formValue)
  .then((response) => {
    const displayOrder = response.data.display_order;
    console.log(displayOrder);
  })
  .catch(error => {
      console.error(error);
  });
};

export const getProductImages = async (id, setProductImages) => {
  axios.get(`/api/v1/management/products/${id}/product-image`)
  .then((response) => {
    setProductImages(response.data.product_images);
    console.log(response.data.product_images);
  })
  .catch(error => {
      console.error(error);
  });
};