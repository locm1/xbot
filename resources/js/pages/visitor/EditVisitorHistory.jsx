import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon, CreditCardIcon, HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Paths } from "@/paths";
import { EditVisitorHistoryForm } from "@/pages/visitor/EditVisitorHistoryForm";
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

  const [formValue, setFormValue] = useState(
    {firstName: '', lastName: '', firstNameKana: '', lastNameKana: '', birthDate: '', sex: 1, area: 1, tel: '', occupation: 1}
  );
  const [files, setFiles] = useState([]);

  const handleChange = (e, input) => {
    return setFormValue({...formValue, [input]: e.target.value})
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><HomeIcon className="icon icon-xs" /></Breadcrumb.Item>
            <Breadcrumb.Item active>来店履歴</Breadcrumb.Item>
            <Breadcrumb.Item active>来店履歴詳細</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="d-flex">
          <Button as={Link} to={Paths.Calendar.path} variant="gray-800" className="me-2">
            保存する
          </Button>
        </div>
      </div>

      <Row>
        <Col xs={12} xl={12}>
          <EditVisitorHistoryForm handleChange={handleChange} formValue={formValue} />
        </Col>
      </Row>
      <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
        <Button href={Paths.VisitorHistories.path} variant="gray-800" className="mt-2 animate-up-2">
          来店履歴に戻る
        </Button>
      </div>
    </>
  );
};
