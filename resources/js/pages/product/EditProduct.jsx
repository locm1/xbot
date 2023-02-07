import React, { useState } from "react";
import moment from "moment-timezone";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, XIcon, HomeIcon, PlusIcon, SearchIcon, TrashIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Card, Image, Breadcrumb, Button, Dropdown, InputGroup, Tab, Nav } from 'react-bootstrap';
import CheckboxButton from "@/components/CheckboxButton";
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";

import ProductOverview from "@/pages/product/ProductOverview";
import products from "@/data/products";
import Select from 'react-select'

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

  const [relatedProducts, setRelatedProducts] = useState([
    {id: 1, name: 'シャンプー&トリートメント', discountPrice: 200},
    {id: 2, name: '北海道ミルクプリン', discountPrice: 200},
    {id: 3, name: '生搾りジュース', discountPrice: 200},
    {id: 4, name: '宇宙', discountPrice: 200},
    {id: 5, name: '海', discountPrice: 200},
  ]);
  if (!relatedProducts.some(v => v.id === 0)) {
    relatedProducts.push({id: 0, name: '', discountPrice: 0})
  }

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

  const [disableInputForm, setDisable] = useState(false);

  const [privateProduct, setPrivate] = useState(false);

  // セット割商品の選択オプションを登録商品から出すが、すでに選択されているものは除外する
  const options = products.filter(v => !(relatedProducts.some(b => b.name === v.name))).map(v => ({value: v.name, label: v.name }))

  const handleRelatedProducts = (e, id) => {
    if (id === 0) {
      // const maxId = Math.max({...relatedProducts}.id);
      const ids = relatedProducts.map(v => (v.id));
      const maxId = Math.max(...ids)
      const newRelatedProducts = relatedProducts.map(v => {
        if (v.id === 0) {
         return {id: maxId + 1, name: e.value, price: 0}
        } else {
          return {...v}
        }
      })
      setRelatedProducts(newRelatedProducts);
    } else {
      const newRelatedProducts = relatedProducts.map(v => {
        if (v.id === id) {
          return {id: maxId + 1, name: e.value, price: v.price}
        } else {
          return {...v}
        }
      });
      setRelatedProducts(newRelatedProducts);
    }
  }

  const deleteRelatedProducts = (id) => {
    const newRelatedProducts = relatedProducts.filter(v => (v.id !== id));
    setRelatedProducts(newRelatedProducts);
  }

  const handleRelatedPrice = (e, id) => {
    const newRelatedProducts = relatedProducts.map(v => {
      if (v.id === id) {
        return {id: v.id, name: v.name, price: e.target.value}
      } else {
        return {...v}
      }
    });
    setRelatedProducts(newRelatedProducts);
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">商品編集</h1>
        </div>
      </div>
      <Tab.Container defaultActiveKey="products" className="mb-6">
        <Nav fill variant="pills" className="flex-column flex-sm-row">
          <Nav.Item>
            <Nav.Link eventKey="products" className="mb-sm-3 mb-md-0">
              商品情報
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="related_products" className="mb-sm-3 mb-md-0">
              セット割商品
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="products" className="py-4">
            <Col xs={12} xl={12}>
              <Card border="0" className="shadow mb-4">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                  <h5 className="mb-4 border-bottom pb-3">商品情報</h5>
                  <Form.Group id="category">
                    <Form.Check
                    type="switch"
                    label="非公開にする"
                    id="switch1"
                    htmlFor="switch1"
                    onClick={() => setPrivate(!privateProduct)}
                    />
                  </Form.Group>
                  </div>
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
                            <InputGroup>
                              <Form.Control required type="number" name="tax" placeholder="" />
                              <InputGroup.Text>％</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                          <Form.Group id="price">
                            <Form.Label>販売価格（税込）</Form.Label>
                            <InputGroup>
                              <Form.Control required type="number" name="price" placeholder="" />
                              <InputGroup.Text>円</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                          <Form.Label>在庫数</Form.Label>
                          <InputGroup className="me-2 me-lg-3">
                            <InputGroup.Text className="d-flex">
                              <Form.Check id="checkbox1" htmlFor="checkbox1" onClick={() => setDisable(!disableInputForm)} />
                              <Form.Label htmlFor="checkbox1" className="mb-0">無制限</Form.Label>
                            </InputGroup.Text>
                            <Form.Control
                              disabled={disableInputForm}
                              type="number"
                              placeholder=""
                              id="stock_quantity"
                              name="stock_quantity"
                            />
                          </InputGroup>
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
                          <Form.Label>商品画像</Form.Label>
                      <Form {...getRootProps({ className: "dropzone rounded d-flex align-items-center justify-content-center mb-4" })}>
                        <Form.Control {...getInputProps()} />
                        <div className="dz-default dz-message text-center">
                          <p className="dz-button mb-0">画像をアップロード、もしくはドラッグアンドドロップをしてください。</p>
                        </div>
                      </Form>
                      <Row className="dropzone-files">
                        {files.map(file => <DropzoneFile key={file.path} {...file} />)}
                      </Row>
                    </Col>
                </Card.Body>
              </Card>
            </Col>
          </Tab.Pane>
        </Tab.Content>
        <Tab.Content>
          <Tab.Pane eventKey="related_products" className="py-4 pb-12">
            <Col xs={12} xl={12}>
              <Card border="0" className="shadow mb-4">
                <Card.Body>
                  <h5 className="mb-4 border-bottom pb-3">セット割商品</h5>
                  <Row>
                    {relatedProducts.map((v,k) => (
                      <React.Fragment key={`relatedProducts-${k}`}>
                        <Col xl={8} className={"my-2"}>
                          <Select options={options} value={{label: v.name, value: v.name}} onChange={(e) => handleRelatedProducts(e, v.id)} />
                        </Col>
                        <Col xl={3} className={"my-2"}>
                        <Form.Group>
                          <InputGroup>
                            <Form.Control required type="number" name="tax" placeholder="" disabled={v.name ? false : true} value={v.discountPrice} onChange={(e) => handleRelatedPrice(e, v.id)} />
                            <InputGroup.Text>円OFF</InputGroup.Text>
                          </InputGroup>
                        </Form.Group>
                        </Col>
                        <Col xl={1}>
                          <div className="d-flex h-100 align-items-center">
                            <TrashIcon onClick={v.id ? () => deleteRelatedProducts(v.id) : null} role={`button`} className={`icon icon-xs ${v.id ? "text-danger" : "text-bg-gray not-allowed"}`} />
                          </div>
                        </Col>
                      </React.Fragment>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
        {/* <Col xs={12} xl={12}>
          <Card border="0" className="shadow mb-4">
            <Card.Body>
              <h5 className="mb-4 border-bottom pb-3">商品概要</h5>
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
        </Col> */}
    </>
  );
};