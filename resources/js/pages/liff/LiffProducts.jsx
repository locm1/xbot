import React, { useState, useRef, useEffect, useContext } from "react";
import '@splidejs/splide/css';
import liff from '@line/liff';
import { useLocation } from "react-router-dom";
import { LoadingContext } from "@/components/LoadingContext";
import LiffProductCategorySlideCardList from "@/pages/liff/LiffProductCategorySlideCardList";
import LiffProductList from "@/pages/liff/LiffProductList";
import { getProducts, getProductCategories } from "@/pages/liff/api/ProductApiMethods";
import ContentLoader from "react-content-loader";
import { Button } from "react-bootstrap";

export default () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { setIsLoading } = useContext(LoadingContext);
  const [isRendered, setIsRendered] = useState(false)
  const pickUpProducts = products.filter(product => {
    return product.is_picked_up == 1
  })

  useEffect(() => {
    Promise.all([getProducts(setProducts, setIsLoading), getProductCategories(setCategories)]).then(() => {
      setIsRendered(true);
    })
  }, []);

  return  isRendered ? 
    <>
      <main className="content liff-product-detail">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        {pickUpProducts.length > 0 && <LiffProductCategorySlideCardList products={pickUpProducts} />}
      </main>
      <LiffProductList products={products} categories={categories} />
    </>
   : 
    <>
      <ContentLoader
      height={750}
      width={"auto"}
      backgroundColor={'#6e6e6e'}
      foregroundColor={'#999'}
      >
      <rect x="20" y="40" rx="13" ry="13" width="200" height="26" />
      <rect x="17" y="100" rx="9" ry="9" width="43%" height="200" />
      <rect x="200" y="100" rx="9" ry="9" width="43%" height="200" />
      <rect x="17" y="320" rx="9" ry="9" width="43%" height="200" />
      <rect x="200" y="320" rx="9" ry="9" width="43%" height="200" />
      <rect x="17" y="540" rx="9" ry="9" width="43%" height="200" />
      <rect x="200" y="540" rx="9" ry="9" width="43%" height="200" />
      </ContentLoader>
    </>
};
