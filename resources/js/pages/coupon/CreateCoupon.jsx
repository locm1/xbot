import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Card } from 'react-bootstrap';

import { CouponsTable } from "@/pages/coupon/CouponsTable";
import coupons from "@/data/coupons";

export default () => {
  const [transactions, setTransactions] = useState(coupons.map(t => ({ ...t, show: true })));
  const [searchValue, setSearchValue] = useState("");
  const [birthday, setBirthday] = useState("");
  const [statusValue, setStatusValue] = useState("all");

  const changeSearchValue = (e) => {
    const newSearchValue = e.target.value;
    const newTransactions = transactions.map(t => {
      const subscription = t.subscription.toLowerCase();
      const shouldShow = subscription.includes(newSearchValue)
        || `${t.price}`.includes(newSearchValue)
        || t.status.includes(newSearchValue)
        || `${t.invoiceNumber}`.includes(newSearchValue);

      return ({ ...t, show: shouldShow });
    });

    setSearchValue(newSearchValue);
    setTransactions(newTransactions);
  };

  const changeStatusValue = (e) => {
    const newStatusValue = e.target.value;
    const newTransactions = transactions.map(u => ({ ...u, show: u.status === newStatusValue || newStatusValue === "all" }));

    setStatusValue(newStatusValue);
    setTransactions(newTransactions);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><HomeIcon className="icon icon-xs" /></Breadcrumb.Item>
            <Breadcrumb.Item>クーポン管理</Breadcrumb.Item>
            <Breadcrumb.Item active>クーポン追加</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-title">クーポン追加</h1>
        </div>
      </div>
      <Card border="0" className="shadow mb-4">
      <Card.Body>
        <h5 className="mb-4">クーポン情報</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>管理名称</Form.Label>
                <Form.Control required type="text" placeholder="Enter your first name" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>使用上限数</Form.Label>
                <Form.Control required type="text" placeholder="Also your last name" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>割引率(%)</Form.Label>
                <Form.Control required type="text" placeholder="Enter your first name" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>利用コード</Form.Label>
                <Form.Control required type="text" placeholder="Also your last name" />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="gray-800" type="submit" className="mt-2 animate-up-2">
              保存する
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
    </>
  );
};
