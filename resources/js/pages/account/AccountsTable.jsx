import React, { useState, useRef } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Badge, ProgressBar, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths"
import Pagination from "@/components/Pagination";import { getAccounts } from "./api/AdminApiMethods";
;


export const AccountsTable = (props) => {
  const { 
    accounts, setAccounts, showConfirmDeleteModal, links, getUsers, setLinks, paginate, setPaginate
  } = props;

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
      default:
        return {
          class: 'tertiary',
          name: '管理者'
        }
    }
  }

  const TableRow = (props) => {
    const { id, login_id, name, role } = props;
    const link = Paths.EditAccount.path.replace(':id', id);

    return (
      <tr className="border-bottom">
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
          <Button as={Link} to={link} variant="info" size="sm" className="d-inline-flex align-items-center me-3">
            編集
          </Button>
          <Button onClick={(e) => showConfirmDeleteModal(e, id)} variant="danger" size="sm" className="d-inline-flex align-items-center">
            削除
          </Button>
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
        <Pagination 
          links={links}
          paginate={paginate}
          getListBypage={getAccounts} 
          setList={setAccounts}
          setLinks={setLinks}
          setPaginate={setPaginate}
      />
      </Card.Body>
    </Card>
  );
};