import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import { ShoppingCartIcon, InboxIcon } from '@heroicons/react/solid';

import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';
import liff from '@line/liff';
import { LiffMockPlugin } from '@line/liff-mock';
import { generateEnv } from '@/components/common/GenerateEnv';

import ProductDetailSlider from "@/pages/liff/detail/ProductDetailSlider";
import { showProduct, getProductImages, getProductCategory } from "@/pages/liff/api/ProductApiMethods";
import { storeCart } from "@/pages/liff/api/CartApiMethods";

export default () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    product_category_id: 1, name: '', stock_quantity: '', tax_rate: 10, 
    price: '', overview: '', is_undisclosed: 0, is_unlimited: 0, is_picked_up: 0,
  });
  const [productImages, setProductImages] = useState([
    {image_path: ''}
  ]);
  const [category, setCategory] = useState(
    {name: '', color: ''}
  );
  const [formValue, setFormValue] = useState({
    product_id: id, quantity: 1
  });
  const quantities = [...Array(5).keys()].map(i => ++i)

  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
  };

  const saveCart = () => {
    const idToken = Cookies.get('TOKEN');
    formValue.token = idToken
    storeCart(formValue);
  };

  const getLiffIdToken = () => {
    liff.init({
      liffId: process.env.MIX_LIFF_ID
    })
    .then(() => {
      const idToken = liff.getIDToken();
      Cookies.set('TOKEN', idToken, { expires: 1/24 })
    }); 
  };

  useEffect(() => {
    showProduct(id, setProduct)
    getProductImages(id, setProductImages);
    getProductCategory(id, setCategory);

    // const { liffId, mock } = generateEnv();

    // if (process.env.NODE_ENV !== 'production') {
    //   liff.use(new LiffMockPlugin());
    // }
  }, []);

  return (
    <main className="content liff-product-detail">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
      <ProductDetailSlider productImages={productImages} />
      <div className="py-5">
        <div style={{backgroundColor: category.color}} className="me-1 product-category-badge fw-normal mb-3">
          {category.name}
        </div>
        <h3 className="fs-5 mb-0 liff-product-detail-name">{product.name}</h3>
        <h4 className="liff-product-detail-price mt-2">￥{product.price.toLocaleString()}<span>税込</span></h4>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center list-wrap border-bottom border-top py-3 px-0 mt-4">
          <div className="px-3 pb-3">
            <h4 className="fs-6 text-dark mb-0">数量</h4>
          </div>
          <div className="px-3 pb-3">
            <Form.Select defaultValue="1" size="sm" onChange={(e) => handleChange(e, 'quantity')}>
              {
                quantities.map((quantity, index) => <option key={index} value={quantity}>{quantity}</option>)
              }
            </Form.Select>
          </div>
        </div>
        <div className="d-flex justify-content-between flex-wrap align-items-center py-4">
          <Button variant="gray-800" className="mt-2 liff-product-detail-button">
            <InboxIcon className="icon icon-xs me-2" />
            取り置きする
          </Button>
          <Button variant="tertiary" onClick={saveCart} className="mt-2 liff-product-detail-button">
            <ShoppingCartIcon className="icon icon-xs me-2" />
            カートに入れる
          </Button>
        </div>
        <Card border="0" className="shadow mb-4 mt-5">
          <Card.Body>
            <h5 className="mb-4 border-bottom pb-3">説明</h5>
            <p>{product.overview}</p>
          </Card.Body>
        </Card>
      </div>
    </main>
  );
};
