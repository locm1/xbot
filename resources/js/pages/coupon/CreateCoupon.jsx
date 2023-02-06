import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon, PencilAltIcon, TrashIcon} from "@heroicons/react/solid";
import { Col, Row, Form, Button, Breadcrumb, Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';


import { CouponsTable } from "@/pages/coupon/CouponsTable";
import coupons from "@/data/coupons";
import users from "@/data/users";
import { Paths } from "@/paths";

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

  const getFirstLetterOfEachWord = (text) => (
    text.match(/\b\w/g).join('')
  );

  const TableRow = (props) => {
    const sex_array = {1: '男性', 2: '女性', 3: 'その他'};
    const { id, image, name, tel, sex, birthDate, area, isSelected } = props;
    const sexVariant = sex === 1 ? "info" : sex === 2 ? "danger" : "primary";

    return (
      <tr className="border-bottom">
        <td>
          <div className="d-flex align-items-center">
            {image
              ? (
                <Image
                  src={image}
                  className="avatar rounded-circle me-3"
                />
              ) : (
                <div className="avatar d-flex align-items-center justify-content-center fw-bold rounded bg-secondary me-3">
                  <span>{getFirstLetterOfEachWord(name)}</span>
                </div>
            )}
            <div className="d-block">
              <Link to={`/user/edit/${id}`}>
                <span className="fw-bold">{name}</span>
                </Link>
            </div>
          </div>
        </td>
        <td>
          <span className="fw-normal">
            {tel}
          </span>
        </td>
        <td>
          <span className={`fw-normal text-${sexVariant}`}>
            {sex_array[sex]}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {birthDate}
          </span>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">クーポン追加</h1>
        </div>
      </div>
      <Card border="0" className="shadow mb-4">
      <Card.Body>
        <h5 className="mb-4 border-bottom pb-3">クーポン情報</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>管理名称</Form.Label>
                <Form.Control required type="text" placeholder="名称を入力してください" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>使用上限数</Form.Label>
                <Form.Control required type="number" placeholder="上限数を入力してください" />
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
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Card.Body>
        <h5 className="mb-4 border-bottom pb-3">クーポン利用者一覧</h5>
        <Table hover>
          <thead>
            <tr>
              <th className="border-bottom">氏名</th>
              <th className="border-bottom">電話番号</th>
              <th className="border-bottom">性別</th>
              <th className="border-bottom">誕生日</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {users.map(t => <TableRow key={`coupons-${t.id}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-normal mt-4 mt-lg-0">
            Showing <b>total</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
    </>
  );
};
