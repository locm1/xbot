import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, XIcon, HomeIcon, PlusIcon, SearchIcon, TrashIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Card, Image, Breadcrumb, Button, Dropdown, InputGroup, Tab, Nav } from 'react-bootstrap';
import CheckboxButton from "@/components/CheckboxButton";
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Paths } from "@/paths";

import ProductOverview from "@/pages/product/ProductOverview";
import products from "@/data/products";
import Select from 'react-select'

import { showProduct, storeProduct, updateProduct, getProductImages } from "@/pages/product/api/ProductApiMethods";
import { getCategories, } from "@/pages/product/api/ProductCategoryApiMethods";

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const pathname = useLocation().pathname;
  const [productImages, setProductImages] = useState([]);

  const [product, setProduct] = useState({
    product_category_id: 1, name: '', stock_quantity: '', tax_rate: 10, 
    price: '', overview: '', is_undisclosed: 0, is_unlimited: 0
  });
  const [categories, setCategories] = useState([]);

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


  const handleChange = (e, input) => {
    setProduct({...product, [input]: e.target.value})
  };

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

  useEffect(() => {
    if (pathname.includes('/edit')) {
      showProduct(id, setProduct);
    }
    getCategories(setCategories)
  }, []);

  const onSaveProduct = () => {
    updateProduct(id, product);
  }

  useEffect(() => {
    getProductImages(id, setProductImages);
  }, [])

  const selectProductImage = () => {
    <Form.Control {...getInputProps()} />
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">{pathname.includes('/edit') ? '商品編集' : '商品登録'}</h1>
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
                            <Form.Control required type="text" name="name" value={product.name} onChange={(e) => handleChange(e, 'name')} placeholder="シャンプー" />
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                          <Form.Group id="name">
                            <Form.Label>税率</Form.Label>
                            <InputGroup>
                              <Form.Control required type="number" name="tax_rate" value={product.tax_rate} onChange={(e) => handleChange(e, 'tax_rate')} placeholder="10" />
                              <InputGroup.Text>％</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                          <Form.Group id="price">
                            <Form.Label>販売価格（税込）</Form.Label>
                            <InputGroup>
                              <Form.Control required type="number" name="price" value={product.price} onChange={(e) => handleChange(e, 'price')} placeholder="3000" />
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
                              placeholder="25"
                              id="stock_quantity"
                              name="stock_quantity"
                              value={product.stock_quantity}
                              onChange={(e) => handleChange(e, 'stock_quantity')}
                            />
                          </InputGroup>
                        </Col>
                        <Col md={6} className="mb-3">
                          <Form.Group id="category">
                            <Form.Label>カテゴリー</Form.Label>
                            <Form.Select value={product.product_category_id} className="mb-0" onChange={(e) => {handleChange(e, 'product_category_id')}}>
                              {
                                categories.map((category, index) => <option key={`category-${index}`} value={category.id}>{category.name}</option>)
                              }
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Col md={12} className="mb-3">
                        <Form.Group id="overview">
                          <Form.Label>商品概要</Form.Label>
                          <Form.Control as="textarea" rows="3" value={product.overview} onChange={(e) => handleChange(e, 'overview')} placeholder="商品の概要を入力してください" />
                        </Form.Group>
                      </Col>
                      <Form.Label>商品画像</Form.Label>
                      <Row>
                        {productImages.map((v, k) => (
                          <Col md={2} className="py-2">
                            <div>{k + 1}枚目</div>
                            <Image src="https://via.placeholder.com/300.png/09f/fff" className="py-1" />
                          </Col>
                        ))}
                        <Col md={2}>
                          <div className="py-2">画像を追加</div>
                          <Form {...getRootProps({ className: "dropzone rounded d-flex align-items-center justify-content-center" })} width="200px" height="200px" >
                            <Form.Control {...getInputProps()} />
                            <div className="dz-default dz-message text-center">
                              <p className="dz-button mb-0">画像をアップロード、もしくはドラッグアンドドロップをしてください</p>
                            </div>
                          </Form>
                          <Row className="dropzone-files">
                            {files.map(file => <DropzoneFile key={file.path} {...file} />)}
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center py-4 me-4">
                      <Button
                        variant="primary"
                        className="d-inline-flex align-items-center"
                        onClick={() => onSaveProduct()}
                      >
                        保存する
                      </Button>
                    </div>
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