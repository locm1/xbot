import React, { useState, useRef, useEffect, useContext } from "react";
import '@splidejs/splide/css';
import liff from '@line/liff';
import { useLocation } from "react-router-dom";
import { LoadingContext } from "@/components/LoadingContext";
import LiffProductCategorySlideCardList from "@/pages/liff/LiffProductCategorySlideCardList";
import LiffProductList from "@/pages/liff/LiffProductList";
import { getProducts } from "@/pages/liff/api/ProductApiMethods";

export default () => {
  const [products, setProducts] = useState([]);
  const { setIsLoading } = useContext(LoadingContext);
  const pickUpProducts = products.filter(product => {
    return product.is_picked_up == 1
  })

  useEffect(() => {
    setIsLoading(true);
    getProducts(setProducts, setIsLoading)
  }, []);

  return (
    <>
      <main className="content liff-product-detail">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        {pickUpProducts.length > 0 && <LiffProductCategorySlideCardList products={pickUpProducts} />}
      </main>
      <LiffProductList products={products} />
    </>
  );
};
