import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Badge, ProgressBar, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import { pageVisits, pageTraffic, pageRanking } from "@/data/tables";
import { create } from "lodash";


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
          class: 'success',
          name: '配送準備中'
        }
      case 3:
        return {
          class: 'info',
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
    const { id, createdAt, name, prefectures, purchasePrice, status, userImage, shippingFee, userId } = props;
    const userLink = Paths.EditUser.path.replace(':id', userId);
    const productLink = Paths.OrderDetail.path.replace(':id', id);

    return (
      <tr className="border-bottom">
        <td>
        <span className="fw-normal">
            {id}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {createdAt}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {purchasePrice}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {shippingFee}
          </span>
        </td>
        <td>
          <Card.Link as={Link} to={userLink} className="d-flex align-items-center">
            {userImage
              ? (
                <Image
                  src={userImage}
                  className="avatar rounded-circle me-3"
                />
              ) : (
                <div className="avatar d-flex align-items-center justify-content-center fw-bold rounded bg-secondary me-3">
                  <span>{getFirstLetterOfEachWord(name)}</span>
                </div>
              )}
            <div className="d-block">
              <span className="fw-bold">{name}</span>
            </div>
          </Card.Link>
        </td>
        <td>
        <Card.Link className="d-flex align-items-center" onClick={changeStatusModal}>
          <Badge bg={getStatusClass(status).class} className="me-1 order-status-badge fw-normal">
            {getStatusClass(status).name}
          </Badge>
        </Card.Link>
        </td>
        <td>
          <Link to={productLink}>
            <PencilAltIcon className="icon icon-xs me-2"/>
          </Link>
          <TrashIcon role="button" className="icon icon-xs text-danger me-2" />
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
              <th className="border-gray-200">ステータス</th>
              <th className="border-gray-200">詳細・削除</th>
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