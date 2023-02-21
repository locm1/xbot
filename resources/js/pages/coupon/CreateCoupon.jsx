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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (pathname.includes('/edit')) {
      showCoupon(id, setCoupon);
      getCouponUsers(id, setUsers);
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

  const TableRow = (props) => {
    const { id, last_name, first_name, last_name_kana, first_name_kana, img_path, nickname, pivot } = props;
    const name = last_name + ' ' + first_name;
    const link = Paths.EditUser.path.replace(':id', id);

    return (
      <tr className="border-bottom">
        <td>
          <Link to={link}>
          <div className="d-flex align-items-center">
            {img_path ? (<Image src={img_path} className="avatar rounded-circle me-3"/>) : (<Image src="/images/default_user_icon.png" className="avatar rounded-circle me-3"/>)}
            <div className="d-block">
              {first_name && first_name_kana && last_name && last_name_kana ? 
                <>
                  <div className="text-gray small">{last_name_kana} {first_name_kana}</div>
                  <span className="fw-bold text-decoration-underline">{name}</span> 
                </>
              :
                <span className="fw-bold text-decoration-underline">{nickname}</span> 
              }
            </div>
          </div>
          </Link>
        </td>
        <td><span className="fw-normal">{pivot.created_at}</span></td>
      </tr>
    );
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
    {
      users && pathname.includes('/edit') && (
        <Card border="0" className="table-wrapper table-responsive shadow">
          <Card.Body>
            <h5 className="mb-4 border-bottom pb-3">クーポン利用者一覧</h5>
            <Table hover>
              <thead>
                <tr>
                  <th className="border-bottom">氏名</th>
                  <th className="border-bottom">利用日時</th>
                </tr>
              </thead>
              <tbody className="border-0">
                {users.map(t => <TableRow key={`coupon-users-${t.id}`} {...t} />)}
              </tbody>
            </Table>
            <Card.Footer className="px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
              <Nav>
                <Pagination className="mb-0">
                  <Pagination.Prev>
                    Previous
                  </Pagination.Prev>
                  <Pagination.Item active>1</Pagination.Item>
                  <Pagination.Item>2</Pagination.Item>
                  <Pagination.Item>3</Pagination.Item>
                  <Pagination.Item>4</Pagination.Item>
                  <Pagination.Item>5</Pagination.Item>
                  <Pagination.Next>
                    Next
                  </Pagination.Next>
                </Pagination>
              </Nav>
              <small className="fw-normal mt-4 mt-lg-0">
              {users.length} 件中 1〜{users.length} 件表示
              </small>
            </Card.Footer>
          </Card.Body>
        </Card>
      )
    }
    </>
  );
};
