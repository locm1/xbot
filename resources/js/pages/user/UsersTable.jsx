import React, { useState, useRef } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";

const getFirstLetterOfEachWord = (text) => (
  text.match(/\b\w/g).join('')
);


export const UsersTable = (props) => {
  const { users = [], allSelected } = props;
  const [bulkOption, setBulkOption] = useState(0);
  const disabledBulkMenu = users.filter(u => u.isSelected).length === 0;

  const selectUser = (id) => {
    props.selectUser && props.selectUser(id);
  };

  const selectAllUsers = () => {
    props.selectAllUsers && props.selectAllUsers();
  };

  const bulkActionChange = (e) => {
    const newOption = e.target.value;
    setBulkOption(newOption);
  }

  const applyBulkAction = () => {
    if (bulkOption === "delete_user") deleteUsers();
  }

  const deleteUsers = (ids) => {
    props.deleteUsers && props.deleteUsers(ids)
  }

  const TableRow = (props) => {
    const sex_array = {1: '男性', 2: '女性', 3: 'その他'};
    const { id, image, name, tel, sex, birthDate, area, isSelected } = props;
    const sexVariant = sex === 1 ? "info" : sex === 2 ? "danger" : "primary";
    const link = Paths.EditUser.path.replace(':id', id);

    return (
      <tr className="border-bottom">
        <td>
          <FormCheck type="checkbox" className="dashboard-check">
            <FormCheck.Input id={`user-${id}`} checked={isSelected} onChange={() => selectUser(id)} />
            <FormCheck.Label htmlFor={`user-${id}`} />
          </FormCheck>
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
              <span className="fw-bold">{name}</span>
              {/* <div className="small text-gray">{email}</div> */}
            </div>
          </div>
        </td>
        <td><span className="fw-normal">{tel}</span></td>
        <td>
          <span className={`fw-normal text-${sexVariant}`}>
            {sex_array[sex]}
          </span>
        </td>
        <td><span className="fw-normal">{birthDate}</span></td>
        <td><span className="fw-normal">{area}</span></td>
        <td className="text-center">
          <Link to={link}>
            <PencilAltIcon className="icon icon-xs me-2"/>
          </Link>
          <TrashIcon role="button" onClick={() => deleteUsers([id])} className="icon icon-xs text-danger me-2 " />
        </td>
      </tr>
    );
  };

  return (
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Card.Body>
        <div className="d-flex mb-3">
          <Form.Select className="fmxw-200" value={bulkOption} onChange={bulkActionChange}>
            <option>一括操作</option>
            <option value="send_email">メッセージ送信</option>
            <option value="tag">タグ付与</option>
            <option value="delete_user">削除</option>
          </Form.Select>
          <Button variant="secondary" size="sm" className="ms-3" disabled={disabledBulkMenu} onClick={applyBulkAction}>
            実行
          </Button>
        </div>
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">
                <FormCheck type="checkbox" className="dashboard-check">
                  <FormCheck.Input id="userCheckAll" checked={allSelected} onChange={selectAllUsers} />
                  <FormCheck.Label htmlFor="userCheckAll" />
                </FormCheck>
              </th>
              <th className="border-bottom">氏名</th>
              <th className="border-bottom">電話番号</th>
              <th className="border-bottom">性別</th>
              <th className="border-bottom">生年月日</th>
              <th className="border-bottom">お住まいエリア</th>
              <th className="border-bottom text-center">編集・削除</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {users.map(u => <TableRow key={`user-${u.id}`} {...u} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-0">
              <Pagination.Prev>
                前
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                次
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-normal small mt-4 mt-lg-0">
            Showing <b>{users.length}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};