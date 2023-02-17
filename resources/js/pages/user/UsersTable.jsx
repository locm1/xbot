import React, { useState, useRef } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import { first } from "lodash";

// const getFirstLetterOfEachWord = (text) => (
//   text.match(/\b\w/g).join('')
// );


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

  const deleteUsers = (id) => {
    props.deleteUsers && props.deleteUsers(id)
  }

  const TableRow = (props) => {
    const sex_array = {1: '男性', 2: '女性', 3: 'その他'};
    const { id, last_name, first_name, last_name_kana, first_name_kana, img_path, nickname, tel, gender, birth_date, prefecture, isSelected } = props;
    const name = last_name + ' ' + first_name;
    const sexVariant = gender === 1 ? "info" : gender === 2 ? "danger" : "primary";
    const link = Paths.EditUser.path.replace(':id', id);

    return (
      <tr className="border-bottom">
        <td>
          <Link to={link}>
          <div className="d-flex align-items-center">
            {img_path ? (<Image src={img_path} className="avatar rounded-circle me-3"/>) : (<Image src="/images/default_user_icon.png" className="avatar rounded-circle me-3"/>)}
            <div className="d-block">
              {first_name && first_name_kana && last_name && last_name_kana ? 
                <>
                  <div className="text-gray small">{last_name_kana} {first_name_kana}</div>
                  <span className="fw-bold text-decoration-underline">{name}</span> 
                </>
              :
                <span className="fw-bold text-decoration-underline">{nickname}</span> 
              }
            </div>
          </div>
          </Link>
        </td>
        <td><span className="fw-normal">{tel}</span></td>
        <td>
          <span className={`fw-normal text-${sexVariant}`}>
            {sex_array[gender]}
          </span>
        </td>
        <td><span className="fw-normal">{birth_date}</span></td>
        <td><span className="fw-normal">{prefecture}</span></td>
        <td className="text-center">
          {/* <Link to={link}>
            <PencilAltIcon className="icon icon-xs me-2"/>
          </Link> */}
          <Button as={Link} to={link} variant="info" size="sm" className="d-inline-flex align-items-center me-3">
            編集
          </Button>
          <Button onClick={() => deleteUsers(id)} variant="danger" size="sm" className="d-inline-flex align-items-center">
            削除
          </Button>
          {/* <TrashIcon role="button" onClick={() => deleteUsers([id])} className="icon icon-xs text-danger me-2 " /> */}
        </td>
      </tr>
    );
  };

  return (
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Card.Body>
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">氏名</th>
              <th className="border-bottom">電話番号</th>
              <th className="border-bottom">性別</th>
              <th className="border-bottom">生年月日</th>
              <th className="border-bottom">都道府県</th>
              <th className="border-bottom text-center">編集・削除</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {users.map(u => <TableRow key={`user-${u.id}`} {...u} />)}
          </tbody>
        </Table>
      </Card.Body>
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
    </Card>
  );
};