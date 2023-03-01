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
      updateCoupon(id, coupon, updateComplete)
    } else {
      storeCoupon(coupon, storeComplete)
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
      <Card.Body>
        <h5 className="mb-4 border-bottom pb-3">クーポン情報</h5>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group id="firstName">
              <Form.Label>管理名称</Form.Label>
              <Form.Control required type="text" value={coupon.name} onChange={(e) => handleChange(e, 'name')}  placeholder="例：友達紹介クーポン" />
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group id="lastName">
              <Form.Label>使用上限数</Form.Label>
              <Form.Control required type="number" value={coupon.upper_limit} onChange={(e) => handleChange(e, 'upper_limit')} placeholder="例：20" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group id="name">
              <Form.Label>割引率(%)</Form.Label>
              <InputGroup>
                <Form.Control required type="number" value={coupon.discount_price} onChange={(e) => handleChange(e, 'discount_price')} placeholder="例：20" />
                <InputGroup.Text>％</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group id="lastName">
              <Form.Label>利用コード</Form.Label>
              <Form.Control required type="text" value={coupon.code} onChange={(e) => handleChange(e, 'code')} placeholder="例：#12f57G" />
            </Form.Group>
          </Col>
        </Row>
        <div className="mt-3">
          <Button variant="gray-800" onClick={handleClick} className="mt-2 animate-up-2">
            保存する
          </Button>
        </div>
      </Card.Body>
    </Card>
    </>
  );
};
