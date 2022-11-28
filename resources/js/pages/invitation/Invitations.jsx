import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';

import { InvitationsTable } from "@/pages/invitation/InvitationsTable";
import invitations from "@/data/invitations";

export default () => {
  const [transactions, setTransactions] = useState(invitations.map(t => ({ ...t, show: true })));
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
            <Breadcrumb.Item active>招待リスト</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-title">招待リスト</h1>
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
                placeholder="Search orders"
                value={searchValue}
                onChange={changeSearchValue}
              />
            </InputGroup>
            <Form.Select value={statusValue} className="fmxw-200 d-none d-md-inline" onChange={changeStatusValue}>
              <option value="all">All</option>
              <option value="paid">Paid</option>
              <option value="due">Due</option>
              <option value="cancelled">Cancelled</option>
            </Form.Select>
          </Col>
          <Col xs={3} lg={4} className="d-flex justify-content-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-1">
                <CogIcon className="icon icon-sm" />
                <span className="visually-hidden">Toggle Dropdown</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-end pb-0">
                <small className="ps-3 fw-bold text-dark">Show</small>
                <Dropdown.Item className="d-flex align-items-center fw-bold">
                  10 <CheckIcon className="icon icon-xxs ms-auto" />
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                <Dropdown.Item className="fw-bold rounded-bottom">30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      <InvitationsTable
        invitations={transactions.filter(t => t.show)}
      />
    </>
  );
};
