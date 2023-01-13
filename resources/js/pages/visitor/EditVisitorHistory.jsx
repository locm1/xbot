import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon, CreditCardIcon, HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Paths } from "@/paths";
import { EditVisitorHistoryForm } from "@/pages/visitor/EditVisitorHistoryForm";
import visitorHistories from "@/data/visitorHistories";
import UserInformation from "@/components/UserInformation.jsx";

export default () => {
  const userInformations = {
    name: '宮島拡夢',
    nameKana: 'ミヤジマヒロム',
  };
  const details = [
    {id: 1, title: '郵便番号', value: '0030809'},
    {id: 2, title: '住所', value: '北海道札幌市白石区菊水九条4-1-708'},
    {id: 3, title: '電話番号', value: '08060666789'},
    {id: 4, title: '来店回数', value: '3回'},
  ];
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
          <h1 className="page-title">来店履歴詳細</h1>
        </div>
      </div>

      <Row>
        <Col xs={12} xl={8}>
          <EditVisitorHistoryForm handleChange={handleChange} formValue={formValue} />
        </Col>
        <Col xs={12} xl={4}>
          <UserInformation {...userInformations} details={details} />
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
