import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon, PencilAltIcon, TrashIcon} from "@heroicons/react/solid";
import { Col, Row, Form, Button, Badge , Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';


import { CouponsTable } from "@/pages/coupon/CouponsTable";
import coupons from "@/data/coupons";
import users from "@/data/users";
import issueUsers from "@/data/issueUsers";
import { Paths } from "@/paths";

export default () => {
  const [formValue, setFormValue] = useState(
    {name: '', content: ''}
  );

  const handleChange = (e, input) => {
    return setFormValue({...formValue, [input]: e.target.value})
  };


  const getFirstLetterOfEachWord = (text) => (
    text.match(/\b\w/g).join('')
  );

  const getStatusClass = (status) => {
    switch (status) {
      case 1:
        return {
          class: 'tertiary',
          name: '未'
        }
      case 2:
        return {
          class: 'info',
          name: '済'
        }
    }
  }

  const TableRow = (props) => {
    const { id, image, name, getTime, status } = props;

    return (
      <tr className="border-bottom">
        <td>
          <span className="fw-normal">
            {getTime}
          </span>
        </td>
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
          <Badge bg={getStatusClass(status).class} className="me-1 order-status-badge fw-normal">
            {getStatusClass(status).name}
          </Badge>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">招待編集</h1>
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
                <Form.Control required type="text" name="name" value={formValue.name} onChange={(e) => handleChange(e, 'name')} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>特典内容</Form.Label>
                <Form.Control required type="text" name="content" value={formValue.content} onChange={(e) => handleChange(e, 'content')} />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="gray-800" type="submit" className="mt-2 animate-up-2">
              更新する
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Card.Body>
        <h5 className="mb-4 border-bottom pb-3">発行者一覧</h5>
        <Table hover>
          <thead>
            <tr>
              <th className="border-bottom">取得日時</th>
              <th className="border-bottom">利用者</th>
              <th className="border-bottom">使用状況</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {issueUsers.map(t => <TableRow key={`issue-user-${t.id}`} {...t} />)}
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
