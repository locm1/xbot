import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Badge} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import noImage from "@img/img/noimage.jpg"

export const ReservesTable = (props) => {
  const { reserves, changeStatusModal, deleteReserveHistoryConfirmModal } = props;
  const totalReserves = reserves.length;

  const deleteUsers = (ids) => {
    props.deleteUsers && props.deleteUsers(ids)
  }

  const TableRow = (props) => {
    const getStatusClass = (status) => {
      switch (status) {
        case 1:
          return {
            class: 'info',
            name: '取置予約中'
          }
        case 2:
          return {
            class: 'success',
            name: '受渡済み'
          }
        case 3:
          return {
            class: 'danger',
            name: '取置停止'
          }
        default:
          return {
            class: 'success',
            name: '受渡済み'
          }
      }
    }
    const { id, product, user, quantity, deadline, status, user_id, product_id } = props;
    const userLink = Paths.EditUser.path.replace(':id', user_id);
    const productLink = Paths.EditProduct.path.replace(':id', product_id);

    return (
      <tr className="border-bottom">
        <td>
          <Card.Link className="d-flex align-items-center" as={Link} to={userLink}>
            <div className="d-flex align-items-center">
              {user.img_path ? (<Image src={user.img_path} className="avatar rounded-circle me-3"/>) : (<Image src="/images/default_user_icon.png" className="avatar rounded-circle me-3"/>)}
              <div className="d-block">
                {user.first_name && user.first_name_kana && user.last_name && user.last_name_kana ? 
                  <>
                    <div className="text-gray small">{user.last_name_kana} {user.first_name_kana}</div>
                    <span className="fw-bold text-decoration-underline">{user.last_name} {user.first_name}</span> 
                  </>
                :
                  <span className="fw-bold text-decoration-underline">{user.nickname}</span> 
                }
              </div>
            </div>
          </Card.Link>
        </td>
        <td>
          <Card.Link as={Link} to={productLink} className="d-flex align-items-center">
            {product.product_images[0] ? (<Image src={product.product_images[0].image_path} className="me-3 product-image"/>) : (<Image src={noImage} className="me-3 product-image"/>)}
            <div className="d-block product-name">
              <span className="fw-bold text-decoration-underline">{product.name}</span>
            </div>
          </Card.Link>
        </td>
        <td className="product-table-tr">
          <span className="fw-normal">
            {quantity}
          </span>
        </td>
        <td className="product-table-tr">
          <span className="fw-normal">
            {product.price.toLocaleString()}円
          </span>
        </td>
        <td className="product-table-tr">
          <span className="fw-normal">
            {deadline.split(' ')[0]}まで
          </span>
        </td>
        <td>
          <Card.Link className="d-flex align-items-center mt-1" onClick={() => changeStatusModal(id)}>
            <Badge bg={getStatusClass(status).class} className="me-1 order-status-badge fw-normal">
              {getStatusClass(status).name}
            </Badge>
          </Card.Link>
        </td>
        <td>
          <Button onClick={() => deleteReserveHistoryConfirmModal(id)} variant="danger" size="sm" className="d-inline-flex align-items-center">
            削除
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