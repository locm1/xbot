import React, { useState, useRef, useEffect, useContext } from "react";
import { Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import Swal from "sweetalert2";
import { ShoppingCartIcon, InboxIcon } from '@heroicons/react/solid';
import { LoadingContext } from "@/components/LoadingContext";
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Paths } from "@/paths";
import moment from "moment-timezone";
import Cookies from 'js-cookie';
import liff from '@line/liff';

import ProductDetailSlider from "@/pages/liff/detail/ProductDetailSlider";
import { showProduct, getProductImages, getProductCategory } from "@/pages/liff/api/ProductApiMethods";
import { storeCart, searchCarts, updateCart } from "@/pages/liff/api/CartApiMethods";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { storeProductReservation } from "@/pages/liff/api/ProductReservationApiMethods";
import { isSalePeriod } from "@/components/common/IsSalePeriod";

export default () => {
  const history = useHistory();
  const location = useLocation().pathname;
  const { id } = useParams();
  const [product, setProduct] = useState({
    product_category_id: 1, name: '', stock_quantity: '', tax_rate: 10, 
    price: '', overview: '', is_undisclosed: 0, is_unlimited: 0, is_picked_up: 0,
    product_sale: {
      discount_rate: 0, start_date: '', end_date: ''
    }
  });
  const [user, setUser] = useState({
    is_registered: 0
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
  const [carts, setCarts] = useState([]);
  const [itemsExistInCart, setItemsExistInCart] = useState(false);
  const quantities = [...Array(5).keys()].map(i => ++i)
  const discount_rate_decimal = product.product_sale.discount_rate / 100.0
  const sale_price = product.price - (product.price * discount_rate_decimal)

  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
  };

  const saveCart = () => {
    console.log(itemsExistInCart);
    if (itemsExistInCart) {
      console.log(formValue);
      updateCart(user.id, carts[0].id, formValue, location, showCart)
      //updateCart(101, carts[0].id, formValue, location)
    } else {
      //storeCart(101, formValue);
      storeCart(user.id, formValue, id, showCart)
    }
  };

  const showCart = () => {
    history.push(Paths.LiffCarts.path);
  };

  const saveReservation = () => {
    console.log(formValue);
    // storeProductReservation(101, formValue)
    storeProductReservation(user.id, formValue)
  };

  useEffect(() => {
    const idToken = liff.getIDToken();

    const fetchData = async () => {
      showProduct(id, setProduct)
      getProductImages(id, setProductImages);
      getProductCategory(id, setCategory);
      const searchParams = {
        params: {product_id: id}
      };
      const user = await getUser(idToken, setUser)
      await searchCarts(user.id, searchParams, setCarts, setItemsExistInCart)
    };

    fetchData()

  }, []);

  return (
    <main className="content liff-product-detail">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
      <ProductDetailSlider productImages={productImages} />
      <div className="py-3">
        {/* <div style={{backgroundColor: category.color}} className="me-1 product-category-badge fw-normal mb-3"> */}
        <div className="me-1 product-category-badge fw-normal bg-tertiary mb-3">
          {category.name}
        </div>
        <h3 className="fs-5 mb-0 liff-product-detail-name">{product.name}</h3>
        {
          isSalePeriod(product.product_sale.start_date, product.product_sale.end_date) && product.product_sale.discount_rate !== 0 ? (
            <>
            <div className="d-flex flex-wrap">
              <div className="liff-product-detail-sale mt-2 mb-2">{product.product_sale.discount_rate}%OFF</div>
              <span className="text-decoration-line-through text-black-50 liff-product-detail-before-price m-2 mt-3">￥{product.price.toLocaleString()}</span>
            </div>
            <h4 className="fw-bold liff-product-detail-price text-danger mb-0">
              ￥{isNaN(sale_price) ? price.toLocaleString() : Math.floor(sale_price).toLocaleString()}
              <span>税込</span>
            </h4>
            </>
          ) : (
            <h4 className="liff-product-detail-price mt-2">￥{product.price.toLocaleString()}<span>税込</span></h4> 
          )
        }
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
          {/* <Button onClick={saveReservation} variant="gray-800" className="mt-2 liff-product-detail-button">
            <InboxIcon className="icon icon-xs me-2" />
            取り置きする
          </Button> */}
          <Button variant="tertiary" onClick={saveCart} className="liff-product-detail-button w-100">
            <ShoppingCartIcon className="icon icon-xs me-2" />
            カートに入れる
          </Button>
        </div>
        <Card border="0" className="shadow">
          <Card.Header className="bg-primary text-white px-3 py-2">
            <h5 className="mb-0 fw-bolder">説明</h5>
          </Card.Header>  
          <Card.Body>
            {product.overview.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index !== product.overview.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </Card.Body>
        </Card>
      </div>
    </main>
  );
};
