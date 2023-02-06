import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Modal, ProgressBar, Pagination, Badge } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";


export const ProductsTable = (props) => {
  const { products } = props;
  const totalProducts = products.length;

  const getCategoryClass = (category) => {
    switch (category) {
      case 1:
        return {
          class: 'secondary',
          name: 'ヘアケア'
        }
      case 2:
        return {
          class: 'success',
          name: 'テスト'
        }
      case 3:
        return {
          class: 'danger',
          name: '野菜'
        }
      case 4:
        return {
          class: 'warning',
          name: 'テスト'
        }
      case 5:
        return {
          class: 'info',
          name: '食品'
        }
      default:
        return {
          class: 'primary',
          name: 'テスト'
        }
    }
  }

  const getIsUndisclosed = (isUndisclosed) => {
    switch (isUndisclosed) {
      case 1:
        return '非公開'
      case 0:
        return '公開'
    }
  }

  const TableRow = (props) => {
    const { category, name, price, stockQuantity, isUndisclosed, img, id } = props;
    const link = Paths.EditProduct.path.replace(':id', id);

    return (
      <tr className={`border-bottom product-table-tr ${isUndisclosed == 1 ? "bg-gray-200" : ""}`}>
        <td>
          <div className="d-flex align-items-center">
            <Image src={img} className="me-3 product-image"/>
            <div className="fw-bold">
              <Link to={link} className="fw-bolder">
                <span className="">{name}</span>
              </Link>
            </div>
          </div>
        </td>
        <td>
          <Badge bg={getCategoryClass(category).class} className="me-1 product-category-badge fw-normal">
            {getCategoryClass(category).name}
          </Badge>
        </td>
        <td>
          <span className="fw-normal">
            {price}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {stockQuantity}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {getIsUndisclosed(isUndisclosed)}
          </span>
        </td>
        <td>
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
        <Table hover>
          <thead>
            <tr>
              <th className="border-gray-200">商品名</th>
              <th className="border-gray-200">カテゴリー</th>
              <th className="border-gray-200">販売価格</th>
              <th className="border-gray-200">残在庫数</th>
              <th className="border-gray-200">公開ステータス</th>
              <th className="border-gray-200">編集・削除</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {products.map(t => <TableRow key={`products-${t.id}`} {...t} />)}
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
            Showing <b>{totalProducts}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};