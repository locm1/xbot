import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from 'react-router-dom';
import '@splidejs/splide/css';

export default (props) => {
  const { img, name, price, id } = props;

  return (
    <Card border="0" className="shadow p-0">
      <Link to={`/liff/product/detail/${id}`}>
        <div style={{ backgroundImage: `url(${img})` }} className="profile-cover rounded-top liff-product-card-img" />
        <Card.Body className="pb-3 rounded-bottom p-2 pt-3">
          <Card.Title className="liff-product-card-title">{name}</Card.Title>
          <Card.Subtitle className="fw-bold liff-product-card-price">{price}</Card.Subtitle>
        </Card.Body>
      </Link>
    </Card>
  );
};