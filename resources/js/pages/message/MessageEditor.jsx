import React, { useState, useEffect } from "react";
import { Nav, Tab, Row, Col, Tooltip, OverlayTrigger, Form, Button, Image, Card } from 'react-bootstrap';
import { ChatIcon, XIcon, ChevronDownIcon, ChevronUpIcon, PhotographIcon, TicketIcon, FilmIcon, PencilIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player'

export default (props) => {
  const { 
    handlePreviewChange, messageItem, handleDelete, handlePictureImageDelete, setMessageItems, messageItems,
    handleAddCarouselProductButtonClick, handleAddCarouselImageButtonClick, error, index, setError,
    deleteCarouselImages, deleteCarouselProducts, updateCarouselImageImageIds, updateCarouselImageImages
  } = props;

  const getDefaultActiveKey = (type) => {
    switch (type) {
      case 1:
        return 'text'
      case 2:
        return 'picture'
      case 3:
        return 'movie'
      case 4:
        return 'carousel-image'
      case 5:
        return 'carousel-product'
    }
  }

  const DropzoneFile = (props) => {
    const { messageItem } = props;

    return (
      <Col xs={6} className="dropzone-preview line-preview-image-wrap mt-3">
        <div className="product-preview-image d-flex">
          <Image src={messageItem.image_path} className="dropzone-image" />
          {/* <Button variant="gray-800" className="product-image-button">
            <XIcon className="icon icon-sm line-preview-image-icon" onClick={() => handlePictureImageDelete(messageItem.display_id, messageItem.type)} />
          </Button> */}
        </div>
      </Col>
    );
  };

  // const VideoFile = (props) => {
  //   const { messageItem } = props;

  //   return (
  //     <>
  //     <Col xs={6} className="text-center text-lg-start mt-3">
  //       <div className="line-preview-comment-image">
  //         <ReactPlayer url={messageItem.video_path} controls width="100%" />
  //       </div>
  //     </Col>
  //   </>
  //   );
  // };

  const VideoFile = (props) => {
    const { messageItem } = props;

    return (
      <div>
        {messageItem.thumbnail_path &&
          (
            <>
              <div className="mt-3">
                動画サムネイル画像
              </div>
              <div className="position-relative d-inline-block">
                <Image src={messageItem.thumbnail_path} width={300} thumbnail />
                <div className="bg-gray-300 d-flex align-items-center justify-content-center position-absolute end-0 top-0 pe-auto" style={{ width: 26, height: 26, cursor: "pointer" }}>
                  <XIcon className="icon icon-sm bg-gray-300" onClick={() => handlePictureImageDelete(messageItem.display_id, messageItem.type)} />
                </div>
              </div>
            </>
          )
        }
      </div>
    );
  };

  const addName = (id, value) => {
    const currentMessageItem = messageItems.filter(messageItem => (messageItem.display_id === display_id))[0]

    let textarea = document.getElementById(`preview-text-${id}`);
    textarea.value = textarea.value.substr(0, textarea.selectionStart)
    + value
    + textarea.value.substr(textarea.selectionStart);

    currentMessageItem.type = 1
    currentMessageItem.image_path = null
    currentMessageItem.video_path = null
    currentMessageItem.text = textarea.value
    
    setMessageItems(messageItems.map((messageItem) => (messageItem.display_id === display_id ? currentMessageItem : messageItem)));
  };

  const handleDeleteCarouselImageClick = (display_id) => {
    const carouselImages = messageItem.carousel_images.map(v => v.display_id == display_id ? {...v, is_deleted: true} : {...v});
    const newCarouselImages = carouselImages.filter(image => (image.display_id !== display_id));
    const newMessageItems = messageItems.map(v => v.display_id == messageItem.display_id ? {...v, carousel_images: newCarouselImages} : {...v});
    console.log(newMessageItems);
    setMessageItems(newMessageItems);
  }

  const handleDeleteCarouselProductClick = (display_id) => {
    const newCarouselProducts = messageItem.carousel_products.map(v => v.display_id == display_id ? {...v, is_deleted: true} : {...v});
    const newMessageItems = messageItems.map(v => v.display_id == messageItem.display_id ? {...v, carousel_products: newCarouselProducts} : {...v});
    console.log(newMessageItems);
    setMessageItems(newMessageItems);
  }

  const handleCarouselImageChange = (e, display_id, carouselImagesIndex) => {
    const newCarouselImages = messageItem.carousel_images.map(v => v.display_id == display_id ? {...v, [e.target.name]: e.target.value} : {...v});
    messageItem.image_path = null
    messageItem.video_path = null
    messageItem.text = ''
    deleteCarouselProducts(messageItem)
    const newMessageItems = messageItems.map(v => v.display_id == messageItem.display_id ? {...v, carousel_images: newCarouselImages, type: 4} : {...v});
    console.log(newMessageItems);
    setMessageItems(newMessageItems);

    switch (e.target.name) {
      case 'file':
        setError({...error, [`message_items.${index}.carousel_images.${carouselImagesIndex}.image_path`]: ''})
        break;
      default:
        setError({...error, [`message_items.${index}.carousel_images.${carouselImagesIndex}.${e.target.name}`]: ''})
        break;
    }
  }

  const handleCarouselProductChange = (e, display_id, carouselImagesIndex) => {
    const newCarouselProduct = messageItem.carousel_products.map(v => v.display_id == display_id ? {...v, [e.target.name]: e.target.value} : {...v});
    messageItem.image_path = null
    messageItem.video_path = null
    messageItem.text = ''
    deleteCarouselImages(messageItem)
    const newMessageItems = messageItems.map(v => v.display_id == messageItem.display_id ? {...v, carousel_products: newCarouselProduct, type: 5} : {...v});
    console.log(newMessageItems);
    setMessageItems(newMessageItems);

    switch (e.target.name) {
      case 'file':
        setError({...error, [`message_items.${index}.carousel_products.${carouselImagesIndex}.image_path`]: ''})
        break;
      default:
        setError({...error, [`message_items.${index}.carousel_products.${carouselImagesIndex}.${e.target.name}`]: ''})
        break;
    }
  }

  const handleTabClick = (type) => {
    setMessageItems(prev => prev.map(v => v.display_id == messageItem.display_id ? {...v, type: type} : {...v}))
  }

  return (
    <>
    <div className="message-editor-wrap">
      <div className="message-editor-header">
        <Tab.Container activeKey={getDefaultActiveKey(messageItem.type)}>
          <Row>
            <Col lg={10} className="d-flex justify-content-start">
              <Nav>
                <Nav.Item onClick={() => handleTabClick(1)}>
                  <Nav.Link eventKey="text"  className="mb-sm-3 mb-md-0 message-editor-header-item">
                    <OverlayTrigger 
                      key="text"
                      overlay={<Tooltip id="top" className="m-0">テキスト</Tooltip>}
                    >
                      <ChatIcon className="icon icon-sm" />
                    </OverlayTrigger>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => handleTabClick(2)}>
                  <Nav.Link eventKey="picture" className="mb-sm-3 mb-md-0 message-editor-header-item">
                    <OverlayTrigger 
                      key="example"
                      overlay={<Tooltip id="top" className="m-0">写真</Tooltip>}
                    >
                      <PhotographIcon className="icon icon-sm" />
                    </OverlayTrigger>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => handleTabClick(3)}>
                  <Nav.Link eventKey="movie" className="mb-sm-3 mb-md-0 message-editor-header-item">
                    <OverlayTrigger 
                      key="example"
                      overlay={<Tooltip id="top" className="m-0">動画</Tooltip>}
                    >
                      <FilmIcon className="icon icon-sm" />
                    </OverlayTrigger>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => handleTabClick(4)}>
                  <Nav.Link eventKey="carousel-image" className="mb-sm-3 mb-md-0 message-editor-header-item">
                    <OverlayTrigger 
                      key="example"
                      overlay={<Tooltip id="top" className="m-0">画像カルーセル</Tooltip>}
                    >
                      <PencilIcon className="icon icon-sm" />
                    </OverlayTrigger>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => handleTabClick(5)}>
                  <Nav.Link eventKey="carousel-product" className="mb-sm-3 mb-md-0 message-editor-header-item">
                    <OverlayTrigger 
                      key="example"
                      overlay={<Tooltip id="top" className="m-0">商品カルーセル</Tooltip>}
                    >
                      <PencilIcon className="icon icon-sm" />
                    </OverlayTrigger>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            {
              messageItems.length > 1 && (
                <Col lg={2} className="d-flex justify-content-center">
                  <div className="message-editor-header-item-right" onClick={() => handleDelete(messageItem.display_id)}>
                    <XIcon className="icon icon-sm" />
                  </div>
                </Col>
              )
            }
            <Col lg={12}>
              <Tab.Content>
                <Tab.Pane eventKey="text" className="py-4">
                  <Form.Group className="mb-3">
                    <Form.Control 
                      as="textarea"
                      rows="5" 
                      name="text"
                      placeholder="テキストを入力" 
                      id={`preview-text-${messageItem.display_id}`} 
                      value={messageItem.text} 
                      onChange={(e) => handlePreviewChange(e, 'text', messageItem.display_id, _, index)} 
                      isInvalid={!!error[`message_items.${index}.text`]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {error[`message_items.${index}.text`]}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* <div className="d-flex justify-content-start flex-wrap flex-md-nowrap align-items-center py-3">
                    <Button onClick={() => addName(messageItem.display_id, '%friend_name%')} variant="primary" className="me-2">
                      友だちの表示名
                    </Button>
                    <Button onClick={() => addName(messageItem.display_id, '%account_name%')} variant="primary" className="me-2">
                      アカウント名
                    </Button>
                  </div> */}
                </Tab.Pane>
                <Tab.Pane eventKey="picture" className="py-4">
                  <Form.Control
                    type="file"
                    name="image"
                    id="preview-picture"
                    accept="image/png,image/jpg,image/jpeg"
                    onChange={(e) => handlePreviewChange(e, 'file', messageItem.display_id, _, index)} 
                    isInvalid={!!error[`message_items.${index}.image_path`]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error[`message_items.${index}.image_path`]}
                  </Form.Control.Feedback>
                  <DropzoneFile messageItem={messageItem} />
                </Tab.Pane>
                <Tab.Pane eventKey="movie" className="py-4">
                    <Form.Control
                      type="file"
                      name="video"
                      accept="video/*"
                      id="preview-video" 
                      onChange={(e) => handlePreviewChange(e, 'video', messageItem.display_id, _, index)} 
                      isInvalid={!!error[`message_items.${index}.video_path`]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {error[`message_items.${index}.video_path`]}
                    </Form.Control.Feedback>
                  {messageItem.video_path && <VideoFile messageItem={messageItem} />}
                </Tab.Pane>
                <Tab.Pane eventKey="carousel-image" className="py-4">
                  {messageItem.carousel_images.map((v, k) => {
                    if (v.is_deleted !== true) { return (
                      <Card key={`carousel_image${k}`} className="mb-4">
                        {messageItem.carousel_images.filter(v => v.is_deleted === false).length > 0 &&
                          <Col xs={12} className="d-flex justify-content-end">
                            <div className="message-editor-header-item-right me-4 mt-2 position-absolute" onClick={() => handleDeleteCarouselImageClick(v.display_id)}>
                              <XIcon className="icon icon-sm" />
                            </div>
                          </Col>
                        }
                        <Card.Body>
                          <Row>
                            <Col xs={6}>
                              <Form.Label>画像</Form.Label>
                              <Form.Control
                                required={v.image_path ? false : true}
                                type="file"
                                name="file"
                                id="carousel-image-picture" 
                                accept="image/png,image/jpg,image/jpeg"
                                onChange={(e) => handlePreviewChange(e, 'carousel-image', messageItem.display_id, v.display_id, index, k)}
                                isInvalid={!!error[`message_items.${index}.carousel_images.${k}.image_path`]} 
                              />
                              <Form.Control.Feedback type="invalid">
                                {error[`message_items.${index}.carousel_images.${k}.image_path`]}
                              </Form.Control.Feedback>
                            </Col>
                            <Col xs={6}>
                              <Form.Label>ラベル(最大12文字)</Form.Label>
                              <Form.Control
                                required
                                maxLength="12"
                                name="label"
                                value={v.label}
                                onChange={(e) => handleCarouselImageChange(e, v.display_id, k)} 
                                isInvalid={!!error[`message_items.${index}.carousel_images.${k}.label`]}
                              />
                              <Form.Control.Feedback type="invalid">
                                {error[`message_items.${index}.carousel_images.${k}.label`]}
                              </Form.Control.Feedback>
                            </Col>
                            <Col xs={12} className="mt-3">
                              <DropzoneFile messageItem={v} />
                            </Col>
                            <Col xs={12}>
                              <Form.Label className="mt-2">URL</Form.Label>
                              <Form.Control 
                                type="text" 
                                placeholder="https://example.com" 
                                pattern="https?://.+"
                                required 
                                name="uri" 
                                value={v.uri} 
                                onChange={(e) => handleCarouselImageChange(e, v.display_id, k)}
                                isInvalid={!!error[`message_items.${index}.carousel_images.${k}.uri`]}
                              />
                              <Form.Control.Feedback type="invalid">
                                {error[`message_items.${index}.carousel_images.${k}.uri`]}
                              </Form.Control.Feedback>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    )}
                  })}
                  <div className="d-flex justify-content-center mt-3">
                    <Button onClick={() => handleAddCarouselImageButtonClick(messageItem.display_id)}>カルーセルを追加</Button>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="carousel-product" className="py-4">
                {messageItem.carousel_products.map((v, k) => 
                  {
                    if (v.is_deleted === false) {
                      return (
                        <Card key={`carousel_product${k}`} className="mb-4">
                        {messageItem.carousel_products.filter(v => v.is_deleted === false).length > 1 &&
                          <Col xs={12} className="d-flex justify-content-end">
                            <div className="message-editor-header-item-right me-4 mt-2 position-absolute" onClick={() => handleDeleteCarouselProductClick(v.display_id)}>
                              <XIcon className="icon icon-sm" />
                            </div>
                          </Col>
                        }
                          <Card.Body>
                            <Row>
                              <Col xs={6}>
                                <Form.Label>画像</Form.Label>
                                  <OverlayTrigger 
                                    key="image"
                                    overlay={
                                      <Tooltip className="m-0">
                                        JPEGまたはPNG<br />
                                        推奨縦横比：1:1.51<br />
                                        最大横幅サイズ：1024px<br />
                                        最大ファイルサイズ：10MB<br />
                                      </Tooltip>
                                    }
                                  >
                                    <QuestionMarkCircleIcon className="mb-1" width={20} height={20} />
                                  </OverlayTrigger>
                                <Form.Control
                                  required={v.image_path ? false : true}
                                  type="file"
                                  name="file"
                                  id="carousel-product-picture" 
                                  accept="image/png,image/jpg,image/jpeg"
                                  onChange={(e) => handlePreviewChange(e, 'carousel-product', messageItem.display_id, v.display_id, index, k)} 
                                  isInvalid={!!error[`message_items.${index}.carousel_products.${k}.image_path`]}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {error[`message_items.${index}.carousel_products.${k}.image_path`]}
                                </Form.Control.Feedback>
                              </Col>
                              <Col xs={6}>
                                <Form.Label>タイトル(最大40文字)</Form.Label>
                                <Form.Control
                                  required
                                  maxLength="40"
                                  name="title"
                                  value={v.title}
                                  onChange={(e) => handleCarouselProductChange(e, v.display_id, k)}
                                  isInvalid={!!error[`message_items.${index}.carousel_products.${k}.title`]}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {error[`message_items.${index}.carousel_products.${k}.title`]}
                                </Form.Control.Feedback>
                              </Col>
                              <Col xs={12} className="mt-3">
                                <DropzoneFile messageItem={v} />
                              </Col>
                              <Col xs={12}>
                                <Form.Label className="mt-2">テキスト(最大60文字)</Form.Label>
                                <Form.Control
                                  required
                                  maxLength="60"
                                  name="text"
                                  value={v.text}
                                  onChange={(e) => handleCarouselProductChange(e, v.display_id, k)}
                                  as="textarea" 
                                  isInvalid={!!error[`message_items.${index}.carousel_products.${k}.text`]}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {error[`message_items.${index}.carousel_products.${k}.text`]} 
                                </Form.Control.Feedback>
                              </Col>
                              <Col xs={6}>
                                <Form.Label className="mt-2">ボタン名(最大20文字)</Form.Label>
                                <Form.Control
                                  required
                                  maxLength="20"
                                  name="label"
                                  value={v.label}
                                  onChange={(e) => handleCarouselProductChange(e, v.display_id, k)} 
                                  isInvalid={!!error[`message_items.${index}.carousel_products.${k}.label`]}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {error[`message_items.${index}.carousel_products.${k}.label`]} 
                                </Form.Control.Feedback>
                              </Col>
                              <Col xs={6}>
                                <Form.Label className="mt-2">URL</Form.Label>
                                <Form.Control 
                                  type="text" 
                                  placeholder="https://example.com" 
                                  pattern="https?://.+"
                                  required 
                                  name="uri" 
                                  value={v.uri} 
                                  onChange={(e) => handleCarouselProductChange(e, v.display_id, k)} 
                                  isInvalid={!!error[`message_items.${index}.carousel_products.${k}.uri`]}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {error[`message_items.${index}.carousel_products.${k}.uri`]} 
                                </Form.Control.Feedback>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      )
                    }
                  }
                )}
                  <div className="d-flex justify-content-center mt-3">
                    <Button onClick={() => handleAddCarouselProductButtonClick(messageItem.display_id)}>カルーセルを追加</Button>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
    </>
  );
}
