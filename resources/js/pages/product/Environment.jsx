import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { Col, Row, Form, Card, Image, Breadcrumb, Button, Dropdown, InputGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { CurrencyYenIcon } from "@heroicons/react/solid"

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
          <h1 className="page-title">環境設定</h1>
        </div>
      </div>
      <Row>
        <Col xs={12} xl={12}>
          <Card border="0" className="shadow mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between">
              <h5 className="mb-4 border-bottom pb-3">環境情報</h5>
              </div>
              <Row>
                <Col md={12} className="mb-3">
                  <Form.Group id="tel">
                    <Form.Label>電話番号</Form.Label>
                    <Form.Control required type="tel" name="tel" placeholder="例）08000000000" />
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Group id="postage">
                    <Form.Label>送料</Form.Label>
                    <InputGroup className="">
                      <InputGroup.Text><CurrencyYenIcon className="icon icon-xs" /></InputGroup.Text>
                      <Form.Control type="number" placeholder="金額" />
                      <InputGroup.Text>以下</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
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