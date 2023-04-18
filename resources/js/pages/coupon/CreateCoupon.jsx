import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Col, Row, Form, Button, InputGroup, Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';

import { Paths } from "@/paths";

import { showCoupon, updateCoupon, getCouponUsers, storeCoupon } from "@/pages/coupon/api/CouponApiMethods";

export default () => {
  const { id } = useParams();
  const pathname = useLocation().pathname;
  const [coupon, setCoupon] = useState({
    id: id, name: '', upper_limit: '', discount_price: '', code: ''
  });
  const [error, setError] = useState({
    name: '', upper_limit: '', discount_price: '', code: '',
  });

  useEffect(() => {
    if (pathname.includes('/edit')) {
      showCoupon(id, setCoupon);
    }
  }, []);

  const handleChange = (e, input) => {
    setCoupon({...coupon, [input]: e.target.value})
  };

  const updateComplete = () => {
    Swal.fire(
      '更新完了',
      'クーポン情報の更新に成功しました',
      'success'
    )
  } 

  const storeComplete = () => {
    Swal.fire(
      '作成完了',
      'クーポン情報の作成に成功しました',
      'success'
    )
  } 

  const handleClick = () => {
    if (pathname.includes('/edit')) {
      updateCoupon(id, coupon, updateComplete, setError)
    } else {
      storeCoupon(coupon, storeComplete, setError)
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">{pathname.includes('/edit') ? 'クーポン編集' : 'クーポン追加'}</h1>
        </div>
      </div>
      <Card border="0" className="shadow mb-4">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">クーポン情報</h5>
        </Card.Header> 
        <Card.Body>
          <Row>
            <Col md={6} className="mb-4">
              <Form.Group id="firstName">
                <Form.Label><span className="questionnaire-required me-2">必須</span>管理名称</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={coupon.name}
                  onChange={(e) => handleChange(e, 'name')}
                  placeholder="例：友達紹介クーポン"
                  isInvalid={coupon.name !== '' ? false : error.name ? true : false}
                />
                {
                  error.name && 
                  <Form.Control.Feedback type="invalid">{error.name[0]}</Form.Control.Feedback>
                }
              </Form.Group>
            </Col>
            <Col md={6} className="mb-4">
              <Form.Group id="lastName">
                <Form.Label><span className="questionnaire-required me-2">必須</span>使用上限数</Form.Label>
                <Form.Control
                  required
                  type="number"
                  value={coupon.upper_limit}
                  onChange={(e) => handleChange(e, 'upper_limit')}
                  placeholder="例：20"
                  isInvalid={coupon.upper_limit !== '' ? false : error.upper_limit ? true : false}
                />
                {
                  error.upper_limit && 
                  <Form.Control.Feedback type="invalid">{error.upper_limit[0]}</Form.Control.Feedback>
                }
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-4">
              <Form.Group id="name">
                <Form.Label><span className="questionnaire-required me-2">必須</span>割引率(%)</Form.Label>
                <InputGroup>
                  <Form.Control
                    required
                    type="number"
                    value={coupon.discount_price}
                    onChange={(e) => handleChange(e, 'discount_price')}
                    placeholder="例：20"
                    isInvalid={coupon.discount_price !== '' ? false : error.discount_price ? true : false}
                  />
                  <InputGroup.Text>％</InputGroup.Text>
                  {
                    error.discount_price && 
                    <Form.Control.Feedback type="invalid">{error.discount_price}</Form.Control.Feedback>
                  }
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-4">
              <Form.Group id="lastName">
                <Form.Label><span className="questionnaire-required me-2">必須</span>利用コード</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={coupon.code}
                  onChange={(e) => handleChange(e, 'code')}
                  placeholder="例：#1234abc"
                  isInvalid={coupon.code !== '' ? false : error.code ? true : false}
                />
                {
                  error.code && 
                  <Form.Control.Feedback type="invalid">{error.code[0]}</Form.Control.Feedback>
                }
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center py-4 me-4">
            <Button
              variant="success"
              className="d-inline-flex align-items-center"
              onClick={handleClick}
            >
              保存する
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
