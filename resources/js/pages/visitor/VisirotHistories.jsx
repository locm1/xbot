import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon, CreditCardIcon, HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';

import { VisitorHistoriesTable } from "@/components/Tables";
import visitorHistories from "@/data/visitorHistories";

export default () => {
  const [transactions, setTransactions] = useState(visitorHistories.map(t => ({ ...t, show: true })));
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
            <Breadcrumb.Item active>来店履歴</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-title">来店履歴</h1>
          <div className="list-head d-flex flex-wrap mb-4 align-items-center">
            <h2 className="list-head__title h4 mr-5 font-weight-bold">来店総数：3</h2>
          </div>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="d-flex justify-content-between align-items-center">
          <Col xs={6} lg={7} className="d-md-flex">
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
            <InputGroup className="me-2 me-lg-3 fmxw-400">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="電話番号"
                value={searchValue}
                onChange={changeSearchValue}
              />
            </InputGroup>
          </Col>
          <Col xs={6} lg={5} className="d-flex justify-content-end">
            <InputGroup className="me-3 me-lg-3 fmxw-500">
              <Datetime
                timeFormat={false}
                renderInput={(props, openCalendar) => (
                  <InputGroup>
                    <Form.Control
                      required
                      type="text"
                      value={birthday ? moment(birthday).format("DD/MM/YYYY") : ""}
                      placeholder="来店日（FROM）"
                      onFocus={openCalendar}
                      onChange={() => { }} />
                      <InputGroup.Text><span>〜</span></InputGroup.Text>
                      <Form.Control
                      required
                      type="text"
                      value={birthday ? moment(birthday).format("DD/MM/YYYY") : ""}
                      placeholder="来店日（TO）"
                      onFocus={openCalendar}
                      onChange={() => { }} />
                      <InputGroup.Text>
                      <CalendarIcon className="icon icon-xs" />
                    </InputGroup.Text>
                  </InputGroup>
                )} 
              />
            </InputGroup>
          </Col>
        </Row>
      </div>

      <VisitorHistoriesTable
        visitorHistories={transactions.filter(t => t.show)}
      />
    </>
  );
};
