import React, { useState, useEffect, useCallback, useRef } from "react";
import moment from "moment-timezone";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, XIcon, HomeIcon, PlusIcon, SearchIcon, TrashIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Card, Image, Breadcrumb, Button, ListGroup, InputGroup, Tab, Nav } from 'react-bootstrap';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Select from 'react-select'
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/l10n/ja.js';

import { 
  showProduct, storeProduct, updateProduct, getProductImages, getRelatedProducts, 
  getAllProducts, updateRelatedProduct, deleteImages, storeImages, updateImages
} from "@/pages/product/api/ProductApiMethods";
import { getCategories, } from "@/pages/product/api/ProductCategoryApiMethods";

export default () => {
  const startOptions = {
    locale: 'ja',
    onChange: (selectedDates, dateStr, instance) => handleSaleChange(dateStr, 'start_date')
  }
  const endOptions = {
    locale: 'ja',
    onChange: (selectedDates, dateStr, instance) => handleSaleChange(dateStr, 'end_date')
  }
  const { id } = useParams();
  const history = useHistory();
  const pathname = useLocation().pathname;
  const [productImages, setProductImages] = useState([
    {image_path: ''}
  ]);
  const [deleteProductImages, setDeleteProductImages] = useState([]);
  const [storeProductImages, setStoreProductImages] = useState([]);
  const [updateProductImages, setUpdateProductImages] = useState([]);
  const [updateProductImageIds, setUpdateProductImageIds] = useState([]);

  const [product, setProduct] = useState({
    product_category_id: 1, name: '', stock_quantity: '',
    price: 0, overview: '', is_undisclosed: 0, 
    is_unlimited: 0, is_picked_up: 0
  });
  const [error, setError] = useState({
    name: '', stock_quantity: '', price: '', overview: '',
    discount_rate: '', start_date: '', end_date: ''
  });
  const [productSale, setProductSale] = useState({
    discount_rate: 0, start_date: '', end_date: ''
  });
  const discount_rate_decimal = productSale.discount_rate / 100.0
  const sale_price = product.price - (product.price * discount_rate_decimal)
  const [categories, setCategories] = useState([]);

  const [relatedProducts, setRelatedProducts] = useState([]);
  if (!relatedProducts.some(v => v.id === 0)) {
    relatedProducts.push({id: 0, table_id: '', name: '', discountPrice: 0})
  }

  const[products, setProducts] = useState([]);


  const handleChange = (e, input) => {
    setProduct({...product, [input]: e.target.value})
  };

  const handleSaleChange = (e, input) => {
    const value = (input == 'start_date' || input == 'end_date') ? e : e.target.value;
    setProductSale({...productSale, [input]: value})
  };

  const onDrop = (acceptedFiles) => {
    const currentImage = productImages.slice(-1)[0];
    const newImage = {
      product_id: id,
      image_path: acceptedFiles.map(acceptedFile => URL.createObjectURL(acceptedFile))[0]
    }
    setStoreProductImages([...storeProductImages, ...acceptedFiles])

    setProductImages([...productImages, newImage]);
  };

  const deleteImage = (id) => {
    const deleteImage = productImages.find((image) => image.id === id)
    setProductImages(productImages.filter(image => image.id !== id))
    // 削除対象のstate から、idがない、つまりフロント側で追加した画像をバックエンドに送らないようにする
    if (Object.keys(deleteImage).indexOf('id') !== -1) {
      setDeleteProductImages([...deleteProductImages, deleteImage]);
    }
  };
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: {'image/*': ['.jpeg', '.jpg', '.png'],},
    onDrop
  });

  const DropzoneFile = (props) => {
    const inputFileRef = useRef();

    const { image_path, index, id, setUpdateProductImages, updateProductImages } = props;
    
    const changeImage = (id) => {
      const inputFile = inputFileRef.current;
      if (!inputFile) return;
      inputFile.click();
    };

    const handleChange = (id, e) => {
      setUpdateProductImages([...updateProductImages, e.target.files[0]])
      setUpdateProductImageIds([...updateProductImageIds, id])
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const currentproductImage = productImages.filter(image => (image.id === id))[0]
        currentproductImage.image_path = e.target.result
        setProductImages(
          productImages.map((image) => (image.id === id ? currentproductImage : image))
        );
      }
      reader.readAsDataURL(e.target.files[0])
    };
    

    return (
      <Col md={2} className="dropzone-preview py-2 product-preview-image-wrap">
        <div>{index + 1}枚目</div>
        <div className="product-preview-image d-flex">
          <Image src={image_path} className="dropzone-image" onClick={() => changeImage(id)} />
          <Button variant="gray-800" className="product-image-button" onClick={() => deleteImage(id)}>
            <XIcon className="icon icon-sm line-preview-image-icon" />
          </Button>
          <input
            accept="image/*"
            className="product-preview-input"
            name="files"
            type="file"
            ref={inputFileRef}
            onChange={(e) => handleChange(id, e)}
          />
        </div>
      </Col>
    );
  };

  const [disableInputForm, setDisable] = useState(false);

  const [privateProduct, setPrivate] = useState(false);
  const [isPickedUp, setIsPickedUp] = useState(false);

  // セット割商品の選択オプションを登録商品から出すが、すでに選択されているものは除外する
  const options = products.filter(v => !(relatedProducts.some(b => b.name === v.name))).map(v => ({value: v.id, label: v.name }))

  const handleRelatedProducts = (e, id) => {
    if (id === 0) {
      // const maxId = Math.max({...relatedProducts}.id);
      const ids = relatedProducts.map(v => (v.id));
      const newRelatedProducts = relatedProducts.map(v => {
        if (v.id === 0) {
          return {id: e.value, table_id: null, name: e.label, discountPrice: 0}
        } else {
          return {...v}
        }
      })
      setRelatedProducts(newRelatedProducts);
    } else {
      const newRelatedProducts = relatedProducts.map(v => {
        if (v.id === id) {
          return {id: e.value, table_id: v.table_id, name: e.label, discountPrice: v.discountPrice}
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
        return {id: v.id, name: v.name, discountPrice: +e.target.value}
      } else {
        return {...v}
      }
    });
    setRelatedProducts(newRelatedProducts);
  }

  const onSaveProduct = () => {
    Object.assign(product, productSale);
    console.log(product);
    
    if (pathname.includes('/edit')) {
      updateProduct(id, product, setError);
      // 画像削除stateに値があればAPI発火
      if (deleteProductImages.length > 0) {
        const params = {
          ids: deleteProductImages.map(deleteProductImage => deleteProductImage.id),
          image_paths: deleteProductImages.map(
            deleteProductImage => deleteProductImage.image_path.split('/')[2] + '/' + deleteProductImage.image_path.split('/')[3]
          )
        }
        deleteImages(id, params)
      }

      // 画像更新stateに値があればAPI発火
      if (updateProductImages.length > 0) {
        console.log(updateProductImages);
        const formData = new FormData();
        updateProductImages.forEach((image) => formData.append("files[]", image));
        updateProductImageIds.forEach((id) => formData.append("product_image_ids[]", id));
        updateImages(id, formData)
      }

    } else {
      storeProduct(product, storeProductImages, storeImages, history, setError)
    }
  }

  const onSaveRelatedProduct = () => {
    updateRelatedProduct(id, relatedProducts);
  }

  const updatePrivate = (privateProduct) => {
    setProduct({...product, ['is_undisclosed']: privateProduct ? 1 : 0})
    setPrivate(privateProduct)
  }

  const updateIsPickedUp = (isPickedUp) => {
    setProduct({...product, ['is_picked_up']: isPickedUp ? 1 : 0})
    setIsPickedUp(isPickedUp)
  }

  const updateIsUnlimited = (disableInputForm) => {
    setProduct({...product, ['is_unlimited']: disableInputForm ? 1 : 0, stock_quantity: 99999})
    setDisable(disableInputForm)
  }

  useEffect(() => {
    if (pathname.includes('/edit')) {
      showProduct(id, setProduct, setPrivate, setIsPickedUp, setProductSale);
      getProductImages(id, setProductImages);
      getRelatedProducts(id, setRelatedProducts);
    } else {
      setProductImages([]);
    }
    getCategories(setCategories)
    getAllProducts(setProducts);
  }, []);

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
            <Nav.Link eventKey="related_products" className={`mb-sm-3 mb-md-0 ${pathname.includes('/edit') ? "" : "bg-gray-400"}`} disabled={pathname.includes('/edit') ? false : true}>
              セット割商品{pathname.includes('/edit') ? "" : "(商品保存後設定できます)"}
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
                    defaultChecked={privateProduct}
                    onClick={() => updatePrivate(!privateProduct)}
                    />
                    <Form.Check
                    type="switch"
                    label="ピックアップ商品に追加する"
                    id="switch2"
                    htmlFor="switch2"
                    defaultChecked={isPickedUp}
                    onClick={() => updateIsPickedUp(!isPickedUp)}
                    />
                  </Form.Group>
                  </div>
                    <Col xs={12} xl={12}>
                      <Row>
                        <Col md={12} className="mb-4">
                          <Form.Group id="name">
                            <Form.Label><span className="questionnaire-required me-2">必須</span>商品名</Form.Label>
                            <Form.Control 
                              required 
                              type="text" 
                              name="name" 
                              value={product.name} 
                              onChange={(e) => handleChange(e, 'name')} 
                              placeholder="シャンプー" 
                              isInvalid={product.name !== '' ? false : error.name ? true : false}
                            />
                            {
                              error.name && 
                              <Form.Control.Feedback type="invalid">{error.name[0]}</Form.Control.Feedback>
                            }
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mb-4">
                          <Form.Group id="category">
                            <Form.Label><span className="questionnaire-required me-2">必須</span>カテゴリー</Form.Label>
                            <Form.Select value={product.product_category_id} className="mb-0" onChange={(e) => {handleChange(e, 'product_category_id')}}>
                              {
                                categories.map((category, index) => <option key={`category-${index}`} value={category.id}>{category.name}</option>)
                              }
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mb-4">
                          <Form.Label><span className="questionnaire-required me-2">必須</span>在庫数</Form.Label>
                          <InputGroup className="me-2 me-lg-3">
                            <InputGroup.Text className="d-flex">
                              <Form.Check id="checkbox1" htmlFor="checkbox1" onClick={() => updateIsUnlimited(!disableInputForm)} />
                              <Form.Label defaultValue={false} htmlFor="checkbox1" className="mb-0">無制限</Form.Label>
                            </InputGroup.Text>
                            <Form.Control
                              disabled={disableInputForm}
                              type="number"
                              placeholder="25"
                              id="stock_quantity"
                              name="stock_quantity"
                              value={product.stock_quantity}
                              onChange={(e) => handleChange(e, 'stock_quantity')}
                              isInvalid={product.stock_quantity !== '' ? false : error.stock_quantity ? true : false}
                            />
                            {
                              error.stock_quantity && 
                              <Form.Control.Feedback type="invalid">{error.stock_quantity[0]}</Form.Control.Feedback>
                            }
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4} className="mb-4">
                          <Form.Group id="price">
                            <Form.Label><span className="questionnaire-required me-2">必須</span>販売価格（税込）</Form.Label>
                            <InputGroup>
                              <Form.Control
                                required 
                                type="number" 
                                name="price" 
                                value={product.price} 
                                onChange={(e) => handleChange(e, 'price')} 
                                placeholder="3000" 
                                isInvalid={product.price !== '' ? false : error.price ? true : false}
                              />
                              <InputGroup.Text>円</InputGroup.Text>
                            </InputGroup>
                            {
                              error.price && 
                              <Form.Control.Feedback type="invalid">{error.price[0]}</Form.Control.Feedback>
                            }
                          </Form.Group>
                        </Col>
                        <Col md={4} className="mb-4">
                          <Form.Group id="discountRate">
                            <Form.Label><span className="questionnaire-required me-2">必須</span>セール割引率（%）</Form.Label>
                            <InputGroup>
                              <Form.Control
                                required 
                                type="number" 
                                name="discount_rate" 
                                value={productSale.discount_rate} 
                                onChange={(e) => handleSaleChange(e, 'discount_rate')} 
                                placeholder="10"
                                isInvalid={productSale.discount_rate !== '' ? false : error.discount_rate ? true : false} 
                              />
                              <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup>
                            {
                              error.discount_rate && 
                              <Form.Control.Feedback type="invalid">{error.discount_rate[0]}</Form.Control.Feedback>
                            }
                          </Form.Group>
                        </Col>
                        <Col md={4} className="mb-4">
                          <ListGroup className="list-group-flush mt-3">
                            <ListGroup.Item className="d-flex align-items-center justify-content-between px-0 mt-4">
                              <div>
                                <Card.Text className="h6">セール金額：￥{isNaN(sale_price) ? product.price.toLocaleString() : sale_price.toLocaleString()}</Card.Text>
                              </div>
                            </ListGroup.Item>
                          </ListGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className="mb-4">
                          <Form.Group id="startDate">
                            <Form.Label><span className="questionnaire-required me-2">必須</span>開始日時</Form.Label>
                            <Flatpickr
                              options={ startOptions }
                              value={productSale.start_date}
                              render={(props, ref) => {
                                return (
                                  <InputGroup>
                                  <InputGroup.Text>
                                    <CalendarIcon className="icon icon-xs" />
                                  </InputGroup.Text>
                                  <Form.Control
                                    data-enable-time
                                    data-time_24hr
                                    required
                                    type="text"
                                    placeholder="YYYY-MM-DD"
                                    ref={ref}
                                    isInvalid={productSale.start_date !== '' ? false : error.start_date ? true : false} 
                                  />
                                </InputGroup>
                                );
                              }}
                            />
                            {
                              error.start_date && 
                              <Form.Control.Feedback type="invalid">{error.start_date[0]}</Form.Control.Feedback>
                            }
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mb-4">
                          <Form.Group id="endDate">
                            <Form.Label><span className="questionnaire-required me-2">必須</span>終了日時</Form.Label>
                            <Flatpickr
                              options={ endOptions }
                              value={productSale.end_date}
                              render={(props, ref) => {
                                return (
                                  <InputGroup>
                                  <InputGroup.Text>
                                    <CalendarIcon className="icon icon-xs" />
                                  </InputGroup.Text>
                                  <Form.Control
                                    data-enable-time
                                    data-time_24hr
                                    required
                                    type="text"
                                    placeholder="YYYY-MM-DD"
                                    ref={ref}
                                    isInvalid={productSale.end_date !== '' ? false : error.end_date ? true : false} 
                                    />
                                  </InputGroup>
                                );
                              }}
                            />
                            {
                              error.end_date && 
                              <Form.Control.Feedback type="invalid">{error.end_date[0]}</Form.Control.Feedback>
                            }
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className="mb-4">
                          <Form.Group id="overview">
                            <Form.Label><span className="questionnaire-required me-2">必須</span>商品概要</Form.Label>
                            <Form.Control 
                              as="textarea" 
                              rows="3" 
                              value={product.overview} 
                              onChange={(e) => handleChange(e, 'overview')} 
                              placeholder="商品の概要を入力してください" 
                              isInvalid={product.overview !== '' ? false : error.overview ? true : false} 
                            />
                            {
                              error.overview && 
                              <Form.Control.Feedback type="invalid">{error.overview[0]}</Form.Control.Feedback>
                            }
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Form.Label>商品画像</Form.Label>
                        {productImages && productImages.map((image, k) => (
                          <DropzoneFile key={k} {...image} index={k} updateProductImages={updateProductImages} setUpdateProductImages={setUpdateProductImages} />
                        ))}
                        <Col md={2} className="pt-4">
                          <Form {...getRootProps({ className: "dropzone rounded d-flex align-items-center justify-content-center" })} width="200px" height="150px" >
                            <Form.Control {...getInputProps()} />
                            <div className="dz-default dz-message text-center">
                              <p className="dz-button mb-0">画像を追加</p>
                            </div>
                          </Form>
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
                          <Select options={options} value={{label: v.name, value: v.id}} onChange={(e) => handleRelatedProducts(e, v.id)} />
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
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      className="d-inline-flex align-items-center"
                      onClick={() => onSaveRelatedProduct()}
                    >
                      保存する
                    </Button>
                  </div>
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