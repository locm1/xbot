import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { PlusIcon, MinusIcon, ShoppingCartIcon, InboxIcon, TrashIcon } from '@heroicons/react/solid';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from 'react-router-dom';
import '@splidejs/splide/css';
import { Paths } from "@/paths";
import noImage from "@img/img/noimage.jpg"
import moment from "moment-timezone";
import { isSalePeriod } from "@/components/common/IsSalePeriod";

export default (props) => {
  const { name, price, id, product_images, relatedProduct, page, addCart, product_sale } = props;
  const link = (page == 'cart' ? Paths.LiffProductDetail.path.replace(':id', relatedProduct.related_product_id) : Paths.LiffProductDetail.path.replace(':id', id))
  const discount_rate_decimal = page == 'cart' ? relatedProduct.related_product.product_sale.discount_rate : product_sale.discount_rate / 100.0
  const sale_price = price - (price * discount_rate_decimal)

  const getImages = (image) => {
    if (image) {
      return image.image_path
    } else {
      return noImage;
    }
  }

  return (
    <Card className="p-0">
      <Link to={link}>
        {
          page == 'cart' ? (
            <>
              <div style={{ backgroundImage: `url(${getImages(relatedProduct.related_product.product_images[0])})` }} className="profile-cover rounded-top liff-product-card-img" />
              <Card.Body className="p-3">
                <Card.Title className="liff-product-card-title overflow-x-scroll">{relatedProduct.related_product.name}</Card.Title>
                <Card.Subtitle className="fw-bold liff-product-card-price">￥{relatedProduct.related_product.price.toLocaleString()}</Card.Subtitle>
                <Card.Subtitle className="fw-bold liff-product-card-price pt-2">
                  <span className="liff-product-card-title">合計金額より</span>
                  <div className="text-danger mt-2">{relatedProduct.discount_price.toLocaleString()}円OFF</div>
                </Card.Subtitle>
                <Button onClick={(e) => addCart(e, relatedProduct.related_product_id)} variant="tertiary" className="mt-3 w-100">
                  追加
                </Button>
              </Card.Body>
            </>
          ) : (
            <>
              <div style={{ backgroundImage: `url(${getImages(product_images[0])})` }} className="profile-cover rounded-top liff-product-card-img position-relative">
                {isSalePeriod(product_sale.start_date, product_sale.end_date) && product_sale.discount_rate !== 0 &&
                  <div className="liff-product-sale position-absolute">{product_sale.discount_rate}%OFF</div>
                }
              </div>
              <Card.Body className="p-3">
                <Card.Title className="liff-product-card-title overflow-x-scroll">{name}</Card.Title>
                {
                  isSalePeriod(product_sale.start_date, product_sale.end_date) && product_sale.discount_rate !== 0 ? (
                    <div className="d-flex align-items-end">
                      <Card.Subtitle className="fw-bold liff-product-card-price text-danger">{isNaN(sale_price) ? price.toLocaleString() : Math.floor(sale_price).toLocaleString()}円</Card.Subtitle>
                      <span className="text-decoration-line-through text-black-50 liff-product-card-price liff-product-before-price mx-1">{price.toLocaleString()}円</span>
                    </div>
                  ) : (
                    <>
                      <Card.Subtitle className="fw-bold liff-product-card-price">{price.toLocaleString()}円</Card.Subtitle>
                    </>
                  )
                }

              </Card.Body>
            </>
          )
        }
      </Link>
    </Card>
  );
};