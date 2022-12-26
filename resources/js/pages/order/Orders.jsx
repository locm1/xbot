import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';

import { OrdersTable } from "@/pages/order/OrdersTable";
import { ChangeStatusModal } from "@/pages/order/ChangeStatusModal";
import orders from "@/data/orders";

export default () => {
  const [transactions, setTransactions] = useState(orders.map(t => ({ ...t, show: true })));
  const [searchValue, setSearchValue] = useState("");
  const [birthday, setBirthday] = useState("");
  const [statusValue, setStatusValue] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

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

  const changeStatusModal = () => {
    setModalOpen(!modalOpen);
  }

  return (
    <>
      {modalOpen && (
        <ChangeStatusModal
          show={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><HomeIcon className="icon icon-xs" /></Breadcrumb.Item>
            <Breadcrumb.Item>注文リスト</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-title">注文リスト</h1>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="d-flex justify-content-between align-items-center">
          <Col xs={3} lg={3} className="d-md-flex">
            <InputGroup className="me-2 me-lg-3 fmxw-400">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="氏名"
                value={searchValue}
                onChange={changeSearchValue}
              />
            </InputGroup>
          </Col>
          <Col xs={3} lg={3} className="d-md-flex">
            <InputGroup className="me-2 me-lg-3 fmxw-400">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Select value={statusValue} className="fmxw-200 d-none d-md-inline" onChange={changeStatusValue} placeholder="ステータスを選択">
                <option value="all">All</option>
                <option value="paid">Paid</option>
                <option value="due">Due</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </InputGroup>
          </Col>
          <Col xs={3} lg={3} className="d-md-flex">
            <InputGroup className="me-2 me-lg-3 fmxw-400">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="注文番号"
                value={searchValue}
                onChange={changeSearchValue}
              />
            </InputGroup>
          </Col>
          <Col xs={3} lg={3} className="d-md-flex">
            <InputGroup className="me-2 me-lg-3 fmxw-400">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Select value={statusValue} className="fmxw-200 d-none d-md-inline" onChange={changeStatusValue} placeholder="都道府県を選択">
                <option value="all">All</option>
                <option value="paid">Paid</option>
                <option value="due">Due</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>
      </div>

      <OrdersTable
        orders={transactions.filter(t => t.show)}
        changeStatusModal={changeStatusModal}
      />
    </>
  );
};
