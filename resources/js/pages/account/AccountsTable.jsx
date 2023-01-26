import React, { useState, useRef } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Badge, ProgressBar, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";

const getFirstLetterOfEachWord = (text) => (
  text.match(/\b\w/g).join('')
);


export const AccountsTable = (props) => {
  const { accounts = [], allSelected } = props;
  const [bulkOption, setBulkOption] = useState(0);
  const disabledBulkMenu = accounts.filter(u => u.isSelected).length === 0;

  const getRoleClass = (role) => {
    switch (role) {
      case 1:
        return {
          class: 'tertiary',
          name: '管理者'
        }
      case 2:
        return {
          class: 'secondary',
          name: '編集者'
        }
      case 3:
        return {
          class: 'primary',
          name: '一般'
        }
    }
  }

  const TableRow = (props) => {
    const { id, login_id, name, role, isSelected } = props;
    const link = Paths.EditAccount.path.replace(':id', id);

    return (
      <tr className="border-bottom">
        <td>
          <FormCheck type="checkbox" className="dashboard-check">
            <FormCheck.Input id={`admin-${id}`} checked={isSelected} />
            <FormCheck.Label htmlFor={`admin-${id}`} />
          </FormCheck>
        </td>
        <td>
          <span className="fw-normal">{login_id}</span>
        </td>
        <td>
          <span className="fw-normal">{name}</span>
        </td>
        <td>
          <Badge bg={getRoleClass(role).class} className="me-1 product-category-badge fw-normal">
            {getRoleClass(role).name}
          </Badge>
        </td>
        <td className="text-center">
          <Link to={link}>
            <PencilAltIcon className="icon icon-xs me-2"/>
          </Link>
          <TrashIcon role="button" className="icon icon-xs text-danger me-2 " />
        </td>
      </tr>
    );
  };

  return (
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Card.Body>
        <div className="d-flex mb-3">
          <Form.Select className="fmxw-200" value={bulkOption} >
            <option>一括操作</option>
            <option value="send_email">メッセージ送信</option>
            <option value="tag">タグ付与</option>
            <option value="delete_user">削除</option>
          </Form.Select>
          <Button variant="secondary" size="sm" className="ms-3" disabled={disabledBulkMenu} >
            実行
          </Button>
        </div>
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">
                <FormCheck type="checkbox" className="dashboard-check">
                  <FormCheck.Input id="userCheckAll" checked={allSelected} />
                  <FormCheck.Label htmlFor="userCheckAll" />
                </FormCheck>
              </th>
              <th className="border-bottom">ログインID</th>
              <th className="border-bottom">ユーザー名</th>
              <th className="border-bottom">権限レベル</th>
              <th className="border-bottom text-center">編集・削除</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {accounts.map(u => <TableRow key={`account-${u.id}`} {...u} />)}
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
            Showing <b>{accounts.length}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};