import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";

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

export const storeCategory = async (formValue, history) => {
  axios.post(`/api/v1/management/categories/`, formValue)
  .then((response) => {
    const category = response.data.category;
    console.log(category);
    history.push(Paths.ProductCategory.path);
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

export const updateCategory = async (id, formValue) => {
  axios.put(`/api/v1/management/categories/${id}`, formValue)
  .then((response) => {
    const category = response.data.category;
    console.log(category);
    alert('更新しました');
  })
  .catch(error => {
      console.error(error);
  });
};

export const deleteCategory = async (id, completeDelete) => {
  axios.delete(`/api/v1/management/categories/${id}`)
  .then((response) => {
    completeDelete();
  })
  .catch(error => {
      console.error(error);
  });
};

export const sortCategory = async (id, formValue) => {
  axios.put(`/api/v1/management/categories/${id}/sort`, formValue)
  .then((response) => {
    const displayOrder = response.data.display_order;
    console.log(displayOrder);
  })
  .catch(error => {
      console.error(error);
  });
};