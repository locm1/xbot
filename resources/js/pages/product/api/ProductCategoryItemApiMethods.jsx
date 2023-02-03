import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";

export const getCategoryItems = async (id, setCategoryItems) => {
  axios.get(`/api/v1/management/categories/${id}/products`)
  .then((response) => {
    const categoryItems = response.data.categoryItems;
    console.log(categoryItems);
    setCategoryItems(categoryItems);
  })
  .catch(error => {
      console.error(error);
  });
};