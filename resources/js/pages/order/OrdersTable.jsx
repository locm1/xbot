import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Badge, ProgressBar, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Pagination from "@/components/Pagination";
import { Paths } from "@/paths";
import OrdersContentLoader from "@/pages/order/OrdersContentLoader";
import PaginationContentLoader from "@/components/loader/PaginationContentLoader";


export const OrdersTable = (props) => {
  const { 
    orders, setOrders, changeStatusModal, links, getOrders, setLinks, 
    paginate, setPaginate, searchValue, isRendered
  } = props;
  const history = useHistory();

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
    const { id, created_at, user, prefecture, city, address, building_name, purchase_amount, status, shipping_fee, user_id } = props;
    const userLink = Paths.EditUser.path.replace(':id', user_id);
    const link = Paths.OrderDetail.path.replace(':id', id);
    const date = new Date(created_at)

    const handleClick = () => {
      history.push(link, user_id)
    }

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
              {prefecture}{city}{address} {building_name}
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
          <Button onClick={handleClick} variant="tertiary" size="sm" className="d-inline-flex align-items-center me-3">
            詳細
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Table hover className="align-items-center">
        <thead className="bg-primary text-white">
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
            {
              isRendered ? (
                orders.map(t => <TableRow key={`orders-${t.id}`} {...t} />)
              ) : (
                <OrdersContentLoader />
              )
            }
          </tbody>
        </Table>
          {
            isRendered ? (
              <Pagination 
                links={links}
                paginate={paginate}
                getListBypage={getOrders} 
                setList={setOrders}
                setLinks={setLinks}
                setPaginate={setPaginate}
                searchValue={searchValue}
              />
            ) : (
              <PaginationContentLoader />
            )
          }
    </Card>
  );
};