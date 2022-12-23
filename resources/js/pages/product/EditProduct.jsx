import React, { useState } from "react";
import moment from "moment-timezone";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, XIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Card, Image, Breadcrumb, Button, Dropdown } from 'react-bootstrap';

import ProductOverview from "@/pages/product/ProductOverview";
import products from "@/data/products";

export default () => {
  const [transactions, setTransactions] = useState(products.map(t => ({ ...t, show: true })));
  const [statusValue, setStatusValue] = useState("all");
  const [overviews, setOverviews] = useState([
    {id:1, title: '', content: ''}
  ]);
  const categories = [
    {id: 1, name: 'ヘアケア'},
    {id: 2, name: 'テスト'},
    {id: 3, name: '野菜'},
    {id: 4, name: 'テスト'},
    {id: 5, name: '食品'},
  ]

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: files => setFiles(files.map(file => ({
      ...file,
      preview: URL.createObjectURL(file)
    })))
  });

  const DropzoneFile = (props) => {
    const { path, preview } = props;

    return (
      <Col xs={3} className="dropzone-preview line-preview-image-wrap">
        <div className="line-preview-image d-flex">
          <Image src={preview} className="dropzone-image" />
          <Button variant="gray-800" className="product-image-button" onClick={() => setFiles([])}>
            <XIcon className="icon icon-sm line-preview-image-icon" />
          </Button>  
        </div>
      </Col>
    );
  };

  const changeSearchValue = (e) => {
    const newSearchValue = e.target.value;
    const newTransactions = transactions.map(t => {
      const subscription = t.subscription.toLowerCase();
      const shouldShow = subscription.includes(newSearchValue)
        || `${t.price}`.includes(newSearchValue)
        || t.status.includes(newSearchValue)
        || `${t.invoiceNumber}`.includes(newSearchValue);

      return ({ ...t, show: shouldShow });
    });

    setSearchValue(newSearchValue);
    setTransactions(newTransactions);
  };

  const changeStatusValue = (e) => {
    const newStatusValue = e.target.value;
    const newTransactions = transactions.map(u => ({ ...u, show: u.status === newStatusValue || newStatusValue === "all" }));

    setStatusValue(newStatusValue);
    setTransactions(newTransactions);
  };

  const addProductOverview = () => {
    const newOverview = {
      id: overviews.length + 1,
      title: '',
      content: ''
    };
    setOverviews([...overviews, newOverview]);
  };

  const deleteProductOverview = (id) => {
    setOverviews(
      overviews.filter((overview, index) => (overview.id !== id))
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><HomeIcon className="icon icon-xs" /></Breadcrumb.Item>
            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
            <Breadcrumb.Item active>商品リスト</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-title">商品編集</h1>
        </div>
      </div>
      <Row>
        <Col xs={12} xl={6}>
          <Card border="0" className="shadow mb-4">
            <Card.Body>
              <h5 className="mb-4">商品情報</h5>
              <Form>
                <Col xs={12} xl={12}>
                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Group id="name">
                        <Form.Label>商品名</Form.Label>
                        <Form.Control required type="text" name="name" placeholder="" />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group id="name">
                        <Form.Label>税率</Form.Label>
                        <Form.Control required type="number" name="tax" placeholder="" />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group id="price">
                        <Form.Label>販売価格（税込）</Form.Label>
                        <Form.Control required type="number" name="price" placeholder="" />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group id="stock_quantity">
                        <Form.Label>在庫数</Form.Label>
                        <Form.Control required type="number" name="stock_quantity" placeholder="" />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group id="category">
                        <Form.Label>カテゴリー</Form.Label>
                        <Form.Select defaultValue="0" className="mb-0">
                          {
                            categories.map((category, index) => <option key={index} value={category.id}>{category.name}</option>)
                          }
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Col md={12} className="mb-3">
                    <Form.Group id="overview">
                      <Form.Label>商品概要</Form.Label>
                      <Form.Control as="textarea" rows="3" />
                    </Form.Group>
                  </Col>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} xl={6}>
          <Card border="0" className="shadow mb-4">
            <Card.Body>
              <h5 className="mb-4">商品画像</h5>
              <Form {...getRootProps({ className: "dropzone rounded d-flex align-items-center justify-content-center mb-4" })}>
                <Form.Control {...getInputProps()} />
                <div className="dz-default dz-message text-center">
                  <p className="dz-button mb-0">画像をアップロード、もしくはドラッグアンドドロップをしてください。</p>
                </div>
              </Form>
              <Row className="dropzone-files">
                {files.map(file => <DropzoneFile key={file.path} {...file} />)}
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} xl={12}>
          <Card border="0" className="shadow mb-4">
            <Card.Body>
              <h5 className="mb-4">商品概要</h5>
              {
                overviews.map((overview, index) => 
                  <ProductOverview key={index} {...overview} deleteProductOverview={deleteProductOverview} />
                )
              }
              <Button variant="gray-800" className="me-2 text-start" onClick={addProductOverview}>
                <PlusIcon className="icon icon-xs me-2" />
                概要追加
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
