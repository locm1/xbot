import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Badge, ProgressBar, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";


export const OrdersTable = (props) => {
  const { orders, changeStatusModal } = props;
  const totalOrders = orders.length;

  const getStatusClass = (status) => {
    switch (status) {
      case 1:
        return {
          class: 'warning',
          name: '注文内容確認中'
        }
      case 2:
        return {
          class: 'info',
          name: '配送準備中'
        }
      case 3:
        return {
          class: 'success',
          name: '当店より発送済み'
        }
      case 4:
        return {
          class: 'danger',
          name: 'キャンセル'
        }
    }
  }

  const TableRow = (props) => {
    const { id, created_at, user, order_user, purchase_amount, status, shipping_fee, user_id } = props;
    const userLink = Paths.EditUser.path.replace(':id', user_id);
    const link = Paths.OrderDetail.path.replace(':id', id);
    const date = new Date(created_at)

    return (
      <tr className="border-bottom">
        <td>
        <span className="fw-normal">
            {id}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {date.toLocaleString()}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {purchase_amount.toLocaleString()}円
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {shipping_fee.toLocaleString()}円
          </span>
        </td>
        <td>
          <Card.Link as={Link} to={userLink} className="d-flex align-items-center">
            <div className="d-block">
              <span className="fw-bold text-decoration-underline">
                {
                  user.last_name && user.first_name ? (
                    user.last_name + ' ' + user.first_name
                  ) : (
                    user.nickname
                  )
                }
              </span>
            </div>
          </Card.Link>
        </td>
        <td>
          <div className="order-delivery_address">
            <span className="fw-normal">
              {order_user.prefecture}{order_user.city}{order_user.address} {order_user.building_name}
            </span>
          </div>
        </td>
        <td>
        <Card.Link className="d-flex align-items-center" onClick={() => changeStatusModal(id)}>
          <Badge bg={getStatusClass(status).class} className="me-1 order-status-badge fw-normal">
            {getStatusClass(status).name}
          </Badge>
        </Card.Link>
        </td>
        <td>
          <Button as={Link} to={link} variant="tertiary" size="sm" className="d-inline-flex align-items-center me-3">
            詳細
          </Button>
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
              <th className="border-gray-200">注文番号</th>
              <th className="border-gray-200">注文日時</th>
              <th className="border-gray-200">購入金額</th>
              <th className="border-gray-200">送料</th>
              <th className="border-gray-200">氏名</th>
              <th className="border-gray-200">配送先住所</th>
              <th className="border-gray-200">ステータス</th>
              <th className="border-gray-200">詳細</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {orders.map(t => <TableRow key={`orders-${t.id}`} {...t} />)}
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
            Showing <b>{totalOrders}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};