import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';

import { OrdersTable } from "@/pages/order/OrdersTable";
import { ChangeStatusModal } from "@/pages/order/ChangeStatusModal";

import { getOrders, updateOrder } from "@/pages/order/api/OrderApiMethods";

export default () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatusValue] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

  const changeStatusValue = (e) => {
    const newStatusValue = e.target.value;
    const newTransactions = transactions.map(u => ({ ...u, show: u.status === newStatusValue || newStatusValue === "all" }));

    setStatusValue(newStatusValue);
    setTransactions(newTransactions);
  };

  const changeStatusModal = (id) => {
    setModalOpen(!modalOpen);
    setOrderId(id);
  }

  useEffect(() => {
    getOrders(setOrders);
  }, []);

  return (
    <>
      {modalOpen && (
        <ChangeStatusModal
          show={modalOpen}
          setModalOpen={setModalOpen}
          updateOrder={updateOrder}
          orders={orders}
          setOrders={setOrders}
          orderId={orderId}
        />
      )}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">注文管理</h1>
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
        orders={orders}
        changeStatusModal={changeStatusModal}
      />
    </>
  );
};
