import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { useDropzone } from "react-dropzone";
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { CalendarIcon, XIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Card, Image, Breadcrumb, Button, Dropdown, InputGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import CheckboxButton from "@/components/CheckboxButton";

import ProductOverview from "@/pages/product/ProductOverview";
import { showCategory } from "@/pages/product/api/ProductCategoryApiMethods";
import { ChangeOrderProductsTable } from "@/pages/product/ChangeOrderProductsTable";
import { getCategoryItems } from "@/pages/product/api/ProductCategoryItemApiMethods";

export default () => {
  const [categoryItems, setCategoryItems] = useState([]);
  const [privateProduct, setPrivate] = useState(false);
  const [category, setCategory] = useState({});
  const { id } = useParams();

  useEffect(() => {
    showCategory(id, setCategory)
    getCategoryItems(id, setCategoryItems)
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">カテゴリ編集</h1>
        </div>
      </div>
      <Row>
        <Col xs={12} xl={12}>
          <Card border="0" className="shadow mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between">
              <h5 className="mb-4 border-bottom pb-3">カテゴリ情報</h5>
              <Form.Group id="category">
                <Form.Check
                type="switch"
                label="非公開にする"
                id="switch1"
                htmlFor="switch1"
                onClick={() => setPrivate(!privateProduct)}
                />
              </Form.Group>
              </div>
              <Form>
                <Col xs={12} xl={12}>
                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Group id="name">
                        <Form.Label>カテゴリ名</Form.Label>
                        <Form.Control required type="text" name="name" value={category.name} placeholder="" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Col md={12} className="mb-3">
                    <Form.Group id="overview">
                      <Form.Label>カテゴリ概要</Form.Label>
                      <Form.Control as="textarea" rows="3" value={category.content} />
                    </Form.Group>
                  </Col>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} xl={12}>
          <Card>
            <Card.Body>
              <h5 className="mb-4 border-bottom pb-3">商品ディスプレイオーダー変更</h5>
              <ChangeOrderProductsTable
                products={categoryItems}
                categoryName={category.name}
                setProducts={setCategoryItems}
                color={category.color}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};