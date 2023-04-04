import React, { useState, useEffect } from "react";
import { Nav, Tab, Row, Col, Tooltip, OverlayTrigger, Form, Button, Image, Card } from 'react-bootstrap';
import { ChatIcon, XIcon, ChevronDownIcon, ChevronUpIcon, PhotographIcon, TicketIcon, FilmIcon, PencilIcon } from "@heroicons/react/outline";
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player'

export default (props) => {
  const { handlePreviewChange, messageItem, handleDelete, handlePictureImageDelete, setMessageItems, messageItems,
     handleAddCarouselProductButtonClick, handleAddCarouselImageButtonClick } = props;

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
      <Col xs={6} className="dropzone-preview line-preview-image-wrap">
        <div className="product-preview-image d-flex">
          <Image src={messageItem.image_path} className="dropzone-image" />
          {/* <Button variant="gray-800" className="product-image-button">
            <XIcon className="icon icon-sm line-preview-image-icon" onClick={() => handlePictureImageDelete(messageItem.display_id, messageItem.type)} />
          </Button> */}
        </div>
      </Col>
    );
  };

  const VideoFile = (props) => {
    const { messageItem } = props;

    return (
      <Col xs={6} className="dropzone-preview line-preview-image-wrap">
        <div className="product-preview-video d-flex">
          <Form className="rounded d-flex align-items-center justify-content-center mb-4">
            <Form.Control
              type="file"
              name="video"
              accept="video/*"
              id="preview-video" 
            />
          </Form>
          <Button variant="gray-800" className="product-image-button">
            <XIcon className="icon icon-sm line-preview-image-icon" onClick={() => handlePictureImageDelete(messageItem.display_id, messageItem.type)} />
          </Button>
        </div>
      </Col>
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
    const newCarouselImages = messageItem.carousel_images.map(v => v.display_id == display_id ? {...v, is_deleted: true} : {...v});
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

  const handleCarouselImageChange = (e, display_id) => {
    const newCarouselImages = messageItem.carousel_images.map(v => v.display_id == display_id ? {...v, [e.target.name]: e.target.value} : {...v});
    const newMessageItems = messageItems.map(v => v.display_id == messageItem.display_id ? {...v, carousel_images: newCarouselImages, type: 4} : {...v});
    console.log(newMessageItems);
    setMessageItems(newMessageItems);
  }

  const handleCarouselProductChange = (e, display_id) => {
    const newCarouselProduct = messageItem.carousel_products.map(v => v.display_id == display_id ? {...v, [e.target.name]: e.target.value} : {...v});
    const newMessageItems = messageItems.map(v => v.display_id == messageItem.display_id ? {...v, carousel_products: newCarouselProduct, type: 5} : {...v});
    console.log(newMessageItems);
    setMessageItems(newMessageItems);
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
                      placeholder="テキストを入力" 
                      id={`preview-text-${messageItem.display_id}`} 
                      value={messageItem.text} 
                      onChange={(e) => handlePreviewChange(e, 'text', messageItem.display_id)} 
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-start flex-wrap flex-md-nowrap align-items-center py-3">
                    <Button onClick={() => addName(messageItem.display_id, '%friend_name%')} variant="primary" className="me-2">
                      友だちの表示名
                    </Button>
                    <Button onClick={() => addName(messageItem.display_id, '%account_name%')} variant="primary" className="me-2">
                      アカウント名
                    </Button>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="picture" className="py-4">
                  {messageItem.image_path == null ? (
                    <Form className="rounded d-flex align-items-center justify-content-center mb-4">
                      <Form.Control
                        type="file"
                        name="file"
                        id="preview-picture" 
                        accept="image/*"
                        onChange={(e) => handlePreviewChange(e, 'file', messageItem.display_id)} 
                      />
                    </Form>
                  ) : (
                    <DropzoneFile messageItem={messageItem} />
                  )} 
                </Tab.Pane>
                <Tab.Pane eventKey="movie" className="py-4">
                  {messageItem.video_path == null ? (
                    <Form className="rounded d-flex align-items-center justify-content-center mb-4">
                      <Form.Control
                        type="file"
                        name="video"
                        accept="video/*"
                        id="preview-video" 
                        onChange={(e) => handlePreviewChange(e, 'video', messageItem.display_id)} 
                      />
                    </Form>
                  ) : (
                    <VideoFile messageItem={messageItem} />
                  )} 
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
                                type="file"
                                name="file"
                                id="carousel-image-picture" 
                                accept="image/*"
                                onChange={(e) => handlePreviewChange(e, 'carousel-image', messageItem.display_id, v.display_id)} 
                              />
                            </Col>
                            <Col xs={6}>
                              <Form.Label>ラベル</Form.Label>
                              <Form.Control name="label" value={v.label} onChange={(e) => handleCarouselImageChange(e, v.display_id)} />
                            </Col>
                            <Col xs={12} className="mt-3">
                              <DropzoneFile messageItem={v} />
                            </Col>
                            <Col xs={12}>
                              <Form.Label className="mt-2">URL</Form.Label>
                              <Form.Control name="uri" value={v.uri} onChange={(e) => handleCarouselImageChange(e, v.display_id)} />
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
                                <Form.Control
                                  type="file"
                                  name="file"
                                  id="carousel-product-picture" 
                                  accept="image/*"
                                  onChange={(e) => handlePreviewChange(e, 'carousel-product', messageItem.display_id, v.display_id)} 
                                />
                              </Col>
                              <Col xs={6}>
                                <Form.Label>タイトル</Form.Label>
                                <Form.Control name="title" value={v.title} onChange={(e) => handleCarouselProductChange(e, v.display_id)} />
                              </Col>
                              <Col xs={12} className="mt-3">
                                <DropzoneFile messageItem={v} />
                              </Col>
                              <Col xs={12}>
                                <Form.Label className="mt-2">テキスト</Form.Label>
                                <Form.Control name="text" value={v.text} onChange={(e) => handleCarouselProductChange(e, v.display_id)} as="textarea" />
                              </Col>
                              <Col xs={6}>
                                <Form.Label className="mt-2">ボタン名</Form.Label>
                                <Form.Control name="label" value={v.label} onChange={(e) => handleCarouselProductChange(e, v.display_id)} />
                              </Col>
                              <Col xs={6}>
                                <Form.Label className="mt-2">URL</Form.Label>
                                <Form.Control name="uri" value={v.uri} onChange={(e) => handleCarouselProductChange(e, v.display_id)} />
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
