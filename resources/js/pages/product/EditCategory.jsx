import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { Col, Row, Form, Card, Image, Breadcrumb, Button, Dropdown, InputGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { CirclePicker } from 'react-color';

import { storeCategory, showCategory, updateCategory } from "@/pages/product/api/ProductCategoryApiMethods";

export default () => {
  const history = useHistory();
  const [privateProduct, setPrivate] = useState(false);
  const [category, setCategory] = useState({
    name: '', content: ''
  });
  const { id } = useParams();
  const pathname = useLocation().pathname;
  const [backgroundColor, setBackgroundColor] = useState();

  const handleChange = (e, input) => {
    setCategory({...category, [input]: e.target.value})
  };

  const handleBackgroundColorChange = (color) => {
    const colorHex = color.hex;
    setBackgroundColor(colorHex);
  };

  const handleClick = () => {
    const isUndisclosed = (privateProduct ? 1 : 0)
    category.is_undisclosed = isUndisclosed
    category.color = backgroundColor

    if (pathname.includes('/edit')) {
      updateCategory(id, category)
    } else {
      storeCategory(category, history)
    }
  };

  useEffect(() => {
    if (pathname.includes('/edit')) {
      showCategory(id, setCategory, setBackgroundColor, setPrivate);
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">{pathname.includes('/edit') ? 'カテゴリー編集' : 'カテゴリー追加'}</h1>
        </div>
      </div>
      <Row>
        <Col xs={12} xl={12}>
          <Card border="0" className="shadow mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between">
              <h5 className="mb-4 border-bottom pb-3">カテゴリー情報</h5>
              <Form.Group id="category">
                <Form.Check
                checked={privateProduct}
                type="switch"
                label="非公開にする"
                id="switch1"
                htmlFor="switch1"
                onClick={() => setPrivate(!privateProduct)}
                />
              </Form.Group>
              </div>
              <Row>
                <Col md={12} className="mb-3">
                  <Form.Group id="name">
                    <Form.Label>カテゴリー名</Form.Label>
                    <Form.Control required type="text" name="name" value={category.name} onChange={(e) => handleChange(e, 'name')} placeholder="カテゴリー名" />
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Group id="overview">
                    <Form.Label>カテゴリー概要</Form.Label>
                    <Form.Control as="textarea" rows="3" value={category.content} onChange={(e) => handleChange(e, 'content')} />
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Group id="overview">
                    <Form.Label>カテゴリー色選択</Form.Label>
                    <CirclePicker colors={['#F47373', '#37D67A', '#2CCCE4', '#ff8a65', '#ba68c8', '#697689']} onChange={handleBackgroundColorChange} />
                  </Form.Group>
                  <div className="category-color" style={{backgroundColor: backgroundColor}}>{backgroundColor}</div>
                </Col>
              </Row>
              <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center py-4 me-4">
                <Button
                  variant="primary"
                  className="d-inline-flex align-items-center"
                  onClick={handleClick}
                >
                  保存する
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};