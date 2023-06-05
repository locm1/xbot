import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DisplayOrderCategoryTable from "@/pages/display/DisplayOrderCategoryTable";
import { getCategories, searchCategories, deleteCategory, sortCategory } from "@/pages/product/api/ProductCategoryApiMethods";
import { Paths } from "@/paths";

export default () => {
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

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


  useEffect(() => {
    getCategories(setCategories, setIsRendered).then(
      setIsRendered(true)
    )
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">カテゴリー設定</h1>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button as={Link} to={Paths.CreateCategory.path} variant="primary" size="sm" className="d-inline-flex align-items-center">
            <PlusIcon className="icon icon-xs me-2" /> カテゴリー追加
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
                placeholder="カテゴリー名検索"
                value={searchValue}
                onChange={(e) => handleChange(e)}
              />
            </InputGroup>
          </Col>
        </Row>
      </div>

      <DisplayOrderCategoryTable
        categories={categories}
        deleteCategory={deleteCategory}
        sortCategory={sortCategory}
        isRendered={isRendered}
      />
    </>
  );
}