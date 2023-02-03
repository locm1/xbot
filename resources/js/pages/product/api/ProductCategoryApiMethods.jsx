import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";

export const getCategories = async (setCategories) => {
  axios.get('/api/v1/management/categories')
  .then((response) => {
    const categories = response.data.categories;
    console.log(categories);
    setCategories(categories.map(category => ({ ...category, show: true, deleted: false })));
  })
  .catch(error => {
      console.error(error);
  });
};


export const showCategory = async (id, setCategory) => {
  axios.get(`/api/v1/management/categories/${id}`)
  .then((response) => {
    const category = response.data.category;
    console.log(category);
    setCategory(category);
  })
  .catch(error => {
      console.error(error);
  });
};