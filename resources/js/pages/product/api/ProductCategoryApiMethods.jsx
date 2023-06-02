import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import Swal from "sweetalert2";

export const getCategories = async (setCategories, setIsRendered) => {
  axios.get('/api/v1/management/categories')
  .then((response) => {
    const categories = response.data.categories;
    setCategories(categories.map(category => ({ ...category, show: true, deleted: false })));
    setIsRendered(true)
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

export const storeCategory = async (formValue, history, setError) => {
  axios.post(`/api/v1/management/categories`, formValue)
  .then((response) => {
    const category = response.data.category;
    Swal.fire(
      '保存完了',
      'カテゴリー情報の保存に成功しました',
      'success'
    ).then(result => {
      if (result.isConfirmed) {
        history.push(Paths.EditCategory.path.replace(':id', category.id))
      }
    })
  })
  .catch(error => {
    setError(error.response.data.errors)
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

export const updateCategory = async (id, formValue, setError) => {
  axios.put(`/api/v1/management/categories/${id}`, formValue)
  .then((response) => {
    const category = response.data.category;
    console.log(category);
    Swal.fire(
      '更新完了',
      'カテゴリー情報の更新に成功しました',
      'success'
    )
  })
  .catch(error => {
    setError(error.response.data.errors)
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