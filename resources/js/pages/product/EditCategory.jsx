import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { Col, Row, Form, Card, Badge, Breadcrumb, Button, Dropdown, InputGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { CirclePicker } from 'react-color';

import { storeCategory, showCategory, updateCategory } from "@/pages/product/api/ProductCategoryApiMethods";

export default () => {
  const history = useHistory();
  const [privateProduct, setPrivate] = useState(false);
  const [category, setCategory] = useState({
    name: '', content: ''
  });
  const [error, setError] = useState({
    name: '', content: '', color: '',
  });
  const { id } = useParams();
  const pathname = useLocation().pathname;
  const [backgroundColor, setBackgroundColor] = useState();

  const handleChange = (e, input) => {
    setCategory({...category, [input]: e.target.value})
    setError({...error, [input]: ''})
  };

  const handleBackgroundColorChange = (color) => {
    const colorHex = color.hex;
    setBackgroundColor(colorHex);
    setError({...error, color: ''})
  };

  const handleClick = () => {
    const isUndisclosed = (privateProduct ? 1 : 0)
    category.is_undisclosed = isUndisclosed
    category.color = backgroundColor

    if (pathname.includes('/edit')) {
      updateCategory(id, category, setError)
    } else {
      storeCategory(category, history, setError)
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
        <Col xs={8}>
          <Card border="0" className="shadow mb-4">
            <Card.Header className="bg-primary text-white px-3 py-2">
              <h5 className="mb-0 fw-bolder">カテゴリー情報</h5>
            </Card.Header> 
            <Card.Body>
              <Row>
                <Col md={12} className="mb-4">
                  <Form.Group id="name">
                    <Form.Label><Badge bg="danger" className="me-2">必須</Badge>カテゴリー名</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="name"
                      value={category.name}
                      onChange={(e) => handleChange(e, 'name')}
                      placeholder="飲料水"
                      isInvalid={!!error.name}
                    />
                    {
                      error.name && 
                      <Form.Control.Feedback type="invalid">{error.name[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-4">
                  <Form.Group id="overview">
                    <Form.Label><Badge bg="gray-600" className="me-2">任意</Badge>カテゴリー概要</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      value={category.content}
                      onChange={(e) => handleChange(e, 'content')} 
                      isInvalid={!!error.content}
                    />
                    {
                      error.content && 
                      <Form.Control.Feedback type="invalid">{error.content[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
                {/* <Col md={12} className="mb-4">
                  <Form.Group id="overview">
                    <Form.Label><Badge bg="danger" className="me-2">必須</Badge>カテゴリー色選択</Form.Label>
                    <CirclePicker
                      colors={['#F47373', '#37D67A', '#2CCCE4', '#ff8a65', '#ba68c8', '#697689']}
                      onChange={handleBackgroundColorChange}
                    />
                    <Form.Control
                      type="hidden"
                      name="color"
                      defaultValue={backgroundColor}
                      isInvalid={!!error.color}
                    />
                    {
                      error.color && 
                      <Form.Control.Feedback type="invalid">{error.color[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                  <div className="category-color" style={{backgroundColor: backgroundColor}}>{backgroundColor}</div>
                </Col> */}
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
					<Card className="mb-3">
						<Card.Header className="bg-primary text-white px-3 py-2">
							<h5 className="mb-0 fw-bolder">詳細設定</h5>
						</Card.Header>
						<Card.Body>
              <Form.Group id="category">
                <Form.Check
                defaultChecked={privateProduct}
                type="switch"
                label="非公開にする"
                id="switch1"
                htmlFor="switch1"
                onClick={() => setPrivate(!privateProduct)}
                />
              </Form.Group>
						</Card.Body>
					</Card>
				</Col>
      </Row>
          <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center pt-2">
            <Button
              variant="success"
              className="btn-default-success"
              onClick={() => handleClick()}
            >
              保存する
            </Button>
          </div>
    </>
  );
};