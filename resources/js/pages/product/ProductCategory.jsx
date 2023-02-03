import React, { useState, useEffect } from "react";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ProductCategoryTable from "@/pages/product/ProductCategoryTable";
import DisplayOrderCategoryTable from "@/pages/display/DisplayOrderCategoryTable";
import { getCategories } from "@/pages/product/api/ProductCategoryApiMethods";
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

  const changeSearchValue = (e) => {
    const newSearchValue = e.target.value;
    // const newTransactions = transactions.map(t => {
    //   const subscription = t.subscription.toLowerCase();
    //   const shouldShow = subscription.includes(newSearchValue)
    //     || `${t.price}`.includes(newSearchValue)
    //     || t.status.includes(newSearchValue)
    //     || `${t.invoiceNumber}`.includes(newSearchValue);

    //   return ({ ...t, show: shouldShow });
    // });

    setSearchValue(newSearchValue);
  };

  const changeStatusValue = (e) => {
    const newStatusValue = e.target.value;
    const newTransactions = transactions.map(u => ({ ...u, show: u.status === newStatusValue || newStatusValue === "all" }));

    setStatusValue(newStatusValue);
    setTransactions(newTransactions);
  };

  const ChangeOrderCategoryTable = () => {
    if(isEditing) {
      return <DisplayOrderCategoryTable />
    } else {
      return <ProductCategoryTable categories={categories} />
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
          <Button as={Link} to={Paths.CreateProduct.path} variant="primary" size="sm" className="d-inline-flex align-items-center">
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
                onChange={changeSearchValue}
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