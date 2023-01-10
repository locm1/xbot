import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Badge} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import { pageVisits, pageTraffic, pageRanking } from "@/data/tables";


export const ReservesTable = (props) => {
  const { orders, changeStatusModal } = props;
  const { reserves } = props;
  const totalReserves = reserves.length;

  const deleteUsers = (ids) => {
    props.deleteUsers && props.deleteUsers(ids)
  }

  const TableRow = (props) => {
    const getStatusClass = (status) => {
      switch (status) {
        case 1:
          return {
            class: 'danger',
            name: '取置停止'
          }
        case 2:
          return {
            class: 'success',
            name: '取置予約中'
          }
        case 3:
          return {
            class: 'info',
            name: '受渡済み'
          }
      }
    }
    const { id, userName, name, quantity, price, deadline, status } = props;

    return (
      <tr className="border-bottom">
        <td>
          <span className="fw-normal">
            {userName}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {name}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {quantity}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {price}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {deadline}
          </span>
        </td>
        <td>
          <Card.Link className="d-flex align-items-center" onClick={changeStatusModal}>
            <Badge bg={getStatusClass(status).class} className="me-1 order-status-badge fw-normal">
              {getStatusClass(status).name}
            </Badge>
          </Card.Link>
        </td>
        <td>
          <TrashIcon role="button" onClick={() => deleteUsers([id])} className="icon icon-xs text-danger me-2" />
        </td>
      </tr>
    );
  };

  return (
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Card.Body>
        <Table hover>
          <thead>
            <tr>
              <th className="border-gray-200">ユーザー名</th>
              <th className="border-gray-200">商品名</th>
              <th className="border-gray-200">個数</th>
              <th className="border-gray-200">金額</th>
              <th className="border-gray-200">期日</th>
              <th className="border-gray-200">ステータス</th>
              <th className="border-gray-200">削除</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {reserves.map(t => <TableRow key={`reserves-${t.id}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-0">
              <Pagination.Prev>
                {'<'}
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                {'>'}
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-normal mt-4 mt-lg-0">
            Showing <b>{totalReserves}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};