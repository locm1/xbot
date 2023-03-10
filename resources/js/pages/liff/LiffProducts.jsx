import React, { useState, useRef, useEffect } from "react";
import '@splidejs/splide/css';

import LiffProductCategorySlideCardList from "@/pages/liff/LiffProductCategorySlideCardList";
import LiffProductList from "@/pages/liff/LiffProductList";
import { getProducts } from "@/pages/liff/api/ProductApiMethods";

export default () => {
  const [products, setProducts] = useState([]);
  const pickUpProducts = products.filter(product => {
    return product.is_picked_up == 1
  })

  useEffect(() => {
    getProducts(setProducts)
  }, []);

  return (
    <>
    <main className="content liff-product-detail">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
      <LiffProductCategorySlideCardList products={pickUpProducts} />
    </main>
    <LiffProductList products={products} />
    </>
  );
};
