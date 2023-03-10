import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from 'react-router-dom';
import '@splidejs/splide/css';
import { Paths } from "@/paths";
import noImage from "@img/img/noimage.jpg"

export default (props) => {
  const { name, price, id, product_images } = props;
  const link = Paths.LiffProductDetail.path.replace(':id', id);

  const getImages = (image) => {
    if (image) {
      return image.image_path
    } else {
      return noImage;
    }
  }

  return (
    <Card border="0" className="shadow p-0">
      <Link to={link}>
        <div style={{ backgroundImage: `url(${getImages(product_images[0])})` }} className="profile-cover rounded-top liff-product-card-img" />
        <Card.Body className="pb-3 rounded-bottom p-2 pt-3">
          <Card.Title className="liff-product-card-title">{name}</Card.Title>
          <Card.Subtitle className="fw-bold liff-product-card-price">￥{price.toLocaleString()}</Card.Subtitle>
        </Card.Body>
      </Link>
    </Card>
  );
};