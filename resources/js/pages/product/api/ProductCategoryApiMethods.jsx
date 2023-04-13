import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";

export const getCategories = async (setCategories) => {
  axios.get('/api/v1/management/categories')
  .then((response) => {
    const categories = response.data.categories;
    setCategories(categories.map(category => ({ ...category, show: true, deleted: false })));
  })
  .catch(error => {
      console.error(error);
  });
};

export const searchCategories = async (params, setCategories) => {
  axios.get('/api/v1/management/categories', params)
  .then((response) => {
    const categories = response.data.categories;
    setCategories(categories.map(category => ({ ...category, show: true, deleted: false })));
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeCategory = async (formValue, history) => {
  axios.post(`/api/v1/management/categories`, formValue)
  .then((response) => {
    const category = response.data.category;
    history.push(Paths.ProductCategory.path);
    alert('登録しました');
  })
  .catch(error => {
      console.error(error);
  });
};


export const showCategory = async (id, setCategory, setBackgroundColor, setPrivate) => {
  axios.get(`/api/v1/management/categories/${id}`)
  .then((response) => {
    const category = response.data.category;
    setCategory(category);
    setBackgroundColor(category.color)
    setPrivate(category.is_undisclosed)
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