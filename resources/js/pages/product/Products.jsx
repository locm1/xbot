import React, { useState, useEffect } from "react";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ProductsTable } from "@/pages/product/ProductsTable";
import products from "@/data/products";
import { Paths } from "@/paths";

import { getProducts, searchProducts } from "@/pages/product/api/ProductApiMethods";
import { getCategories } from "@/pages/product/api/ProductCategoryApiMethods";

export default () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState({
    name: '', category: 1
  });

  const handleChange = (e, input) => {
    setSearchValue({...searchValue, [input]: e.target.value})

    const searchParams = {
      params: {...searchValue, [input]: e.target.value}
    };
    searchProducts(searchParams, setProducts);
  };

  useEffect(() => {
    getProducts(setProducts)
    getCategories(setCategories)
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">商品管理</h1>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button as={Link} to={Paths.CreateProduct.path} variant="gray-800" size="sm" className="d-inline-flex align-items-center">
            <PlusIcon className="icon icon-xs me-2" /> 商品追加
          </Button>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="d-flex justify-content-between align-items-center">
          <Col xs={9} lg={8} className="d-md-flex">
            <InputGroup className="me-2 me-lg-3 fmxw-400">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="商品名"
                value={searchValue.name}
                onChange={(e) => handleChange(e, 'name')}
              />
            </InputGroup>
            <Form.Select value={searchValue.category} className="mb-0" onChange={(e) => handleChange(e, 'category')}>
              <option>カテゴリー名</option>
              {
                categories.map((category, index) => <option key={category.id} value={category.id}>{category.name}</option>)
              }
            </Form.Select>
          </Col>
        </Row>
      </div>

      <ProductsTable
        products={products}
      />
    </>
  );
};
