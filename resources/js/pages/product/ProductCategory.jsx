import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ProductCategoryTable from "@/pages/product/ProductCategoryTable";
import DisplayOrderCategoryTable from "@/pages/display/DisplayOrderCategoryTable";
import { getCategories, searchCategories, deleteCategory, sortCategory } from "@/pages/product/api/ProductCategoryApiMethods";
import { Paths } from "@/paths";

export default () => {
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatusValue] = useState("all");
  const [isEditing, setIsEditing] = useState(false);

  const editingHandler = (e) => {
    setIsEditing(!isEditing);
    e
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    const params = {
      params: {
        name: e.target.value
      }
    };
    searchCategories(params, setCategories);
  };

  const ChangeOrderCategoryTable = () => {
    if(isEditing) {
      return <DisplayOrderCategoryTable categories={categories} sortCategory={sortCategory} />
    } else {
      return <ProductCategoryTable categories={categories} deleteCategory={deleteCategory} />
    }
  }


  useEffect(() => {
    getCategories(setCategories)
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">カテゴリ管理</h1>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button as={Link} to={Paths.CreateCategory.path} variant="primary" size="sm" className="d-inline-flex align-items-center">
            <PlusIcon className="icon icon-xs me-2" /> カテゴリ追加
          </Button>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="d-flex justify-content-between align-items-center">
          <Col xs={9} lg={6} className="d-md-flex">
            <InputGroup className="me-2 me-lg-3 fmxw-400">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="カテゴリ名検索"
                value={searchValue}
                onChange={(e) => handleChange(e)}
              />
            </InputGroup>
          </Col>
          <Col xs={3} lg={4} className="d-flex justify-content-end">
            <Button variant={isEditing ? "secondary" : "outline-secondary"} onClick={() => setIsEditing(!isEditing)}>
              
              {isEditing ? "カテゴリオーダー変更モード解除" : "カテゴリオーダー変更モード"}
            </Button>
          </Col>
        </Row>
      </div>

      <ChangeOrderCategoryTable />
    </>
  );
}