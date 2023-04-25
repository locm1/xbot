import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Modal, ProgressBar, Badge } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import Pagination from "@/components/Pagination";
import noImage from "@img/img/noimage.jpg"


export const ProductsTable = (props) => {
  const { products, setProducts, links, getProducts, setLinks, paginate, setPaginate, searchValue, deleteProducts } = props;

  const getImages = (image) => {
    if (image) {
      return image.image_path
    } else {
      return noImage;
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
    const { name, price, stock_quantity, is_undisclosed, id, product_images, product_category } = props;
    const link = Paths.EditProduct.path.replace(':id', id);

    return (
      <tr className={`border-bottom product-table-tr ${is_undisclosed == 1 ? "bg-gray-200" : ""}`}>
        <td>
          <span className="fw-normal">{id}</span>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <Image src={getImages(product_images[0])} className="me-3 product-image"/>
            <div className="fw-bold product-name">
              <Link to={link} className="fw-bolder">
                <span className="text-decoration-underline">{name}</span>
              </Link>
            </div>
          </div>
        </td>
        <td>
          {/* <div className="me-1 product-category-badge fw-normal bg-tertiary"> */}
          <div className="me-1 product-category-badge fw-normal bg-tertiary">
            {product_category.name}
          </div>
        </td>
        <td>
          <span className="fw-normal">
          {price.toLocaleString()}円
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {stock_quantity}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {getIsUndisclosed(is_undisclosed)}
          </span>
        </td>
        <td>
          <Button as={Link} to={link} variant="info" size="sm" className="d-inline-flex align-items-center me-3">
            編集
          </Button>
          <Button onClick={() => deleteProducts(id)} variant="danger" size="sm" className="d-inline-flex align-items-center">
            削除
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
              <th className="border-gray-200">商品ID</th>
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
      <Pagination 
        links={links}
        paginate={paginate}
        getListBypage={getProducts} 
        setList={setProducts}
        setLinks={setLinks}
        setPaginate={setPaginate}
        searchValue={searchValue}
      />
    </Card>
  );
};