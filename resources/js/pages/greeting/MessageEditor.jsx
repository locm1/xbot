import React, { useState, useEffect } from "react";
import { Nav, Tab, Row, Col, Tooltip, OverlayTrigger, Form, Button, Image, Card } from 'react-bootstrap';
import { ChatIcon, XIcon, ChevronDownIcon, ChevronUpIcon, PhotographIcon, TicketIcon, FilmIcon, PencilIcon } from "@heroicons/react/outline";
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player'

export default (props) => {
  const { 
    handlePreviewChange, messageItem, handleDelete, handlePictureImageDelete, 
    setMessageItems, messageItems, error, index, setError
  } = props;

  const getDefaultActiveKey = (type) => {
    switch (parseInt(type, 10)) {
      case 1:
        return 'text'
      case 2:
        return 'picture'
      case 3:
        return 'movie'
      case 4:
        return 'card'
    }
  }

  const DropzoneFile = (props) => {
    const { messageItem } = props;

    return (
      <Col xs={6} className="dropzone-preview line-preview-image-wrap">
        <div className="product-preview-image d-flex">
          <Image src={messageItem.image_path} className="dropzone-image" />
          <Button variant="gray-800" className="product-image-button">
            <XIcon className="icon icon-sm line-preview-image-icon" onClick={() => handlePictureImageDelete(messageItem.id, messageItem.type)} />
          </Button>
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
            <XIcon className="icon icon-sm line-preview-image-icon" onClick={() => handlePictureImageDelete(messageItem.id, messageItem.type)} />
          </Button>
        </div>
      </Col>
    );
  };

  const addName = (id, value) => {
    const currentMessageItem = messageItems.filter(messageItem => (messageItem.id === id))[0]

    let textarea = document.getElementById(`preview-text-${id}`);
    textarea.value = textarea.value.substr(0, textarea.selectionStart)
    + value
    + textarea.value.substr(textarea.selectionStart);

    currentMessageItem.type = 1
    currentMessageItem.image_path = null
    currentMessageItem.video_path = null
    currentMessageItem.text = textarea.value
    
    setMessageItems(messageItems.map((messageItem) => (messageItem.id === id ? currentMessageItem : messageItem)));
  };

  const handleTabClick = (type) => {
    setMessageItems(prev => prev.map(v => v.id == messageItem.id ? {...v, type: type} : {...v}))
  }

  return (
    <>
    <div className="message-editor-wrap">
      <div className="message-editor-header">
        <Tab.Container activeKey={getDefaultActiveKey(messageItem.type)}>
          <Row>
            <Col lg={10} className="d-flex justify-content-start">
              <Nav>
                <Nav.Item  onClick={() => handleTabClick(1)}>
                  <Nav.Link eventKey="text" className="mb-sm-3 mb-md-0 message-editor-header-item">
                    <OverlayTrigger 
                      key="text"
                      overlay={<Tooltip id="top" className="m-0">テキスト</Tooltip>}
                    >
                      <ChatIcon className="icon icon-sm" />
                    </OverlayTrigger>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item  onClick={() => handleTabClick(2)}>
                  <Nav.Link eventKey="picture" className="mb-sm-3 mb-md-0 message-editor-header-item">
                    <OverlayTrigger 
                      key="picture"
                      overlay={<Tooltip id="top" className="m-0">写真</Tooltip>}
                    >
                      <PhotographIcon className="icon icon-sm" />
                    </OverlayTrigger>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item  onClick={() => handleTabClick(3)}>
                  <Nav.Link eventKey="movie" className="mb-sm-3 mb-md-0 message-editor-header-item">
                    <OverlayTrigger 
                      key="example"
                      overlay={<Tooltip id="top" className="m-0">動画</Tooltip>}
                    >
                      <FilmIcon className="icon icon-sm" />
                    </OverlayTrigger>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            {
              messageItems.length > 1 && (
                <Col lg={2} className="d-flex justify-content-end">
                  <div className="message-editor-header-item-right" onClick={() => handleDelete(messageItem.id)}>
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
                      id={`preview-text-${messageItem.id}`} 
                      value={messageItem.text} 
                      onChange={(e) => handlePreviewChange(e, 'text', messageItem.id, index)}
                      isInvalid={!!error[`messages.${index}.text`]} 
                    />
                    <Form.Control.Feedback type="invalid">
                      {error[`messages.${index}.text`]}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-flex justify-content-start flex-wrap flex-md-nowrap align-items-center py-3">
                    <Button onClick={() => addName(messageItem.id, '%friend_name%')} variant="primary" className="me-2">
                      友だちの表示名
                    </Button>
                    <Button onClick={() => addName(messageItem.id, '%account_name%')} variant="primary" className="me-2">
                      アカウント名
                    </Button>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="picture" className="py-4">
                  {messageItem.image_path == null ? (
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="file"
                        name="file"
                        id="preview-picture" 
                        accept="image/png,image/jpg,image/jpeg"
                        onChange={(e) => handlePreviewChange(e, 'file', messageItem.id, index)} 
                        isInvalid={!!error[`messages.${index}.image_path`]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {error[`messages.${index}.image_path`]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  ) : (
                    <DropzoneFile messageItem={messageItem} />
                  )} 
                </Tab.Pane>
                <Tab.Pane eventKey="movie" className="py-4">
                  {messageItem.video_path == null ? (
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="file"
                        name="video"
                        accept="video/*"
                        id="preview-video" 
                        onChange={(e) => handlePreviewChange(e, 'video', messageItem.id, index)}
                        isInvalid={!!error[`messages.${index}.video_path`]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {error[`messages.${index}.video_path`]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  ) : (
                    <VideoFile messageItem={messageItem} />
                  )} 
                </Tab.Pane>
                <Tab.Pane eventKey="card" className="py-4">
                  <Card>
                    <Card.Body>
                      <Link to="#" className="">リッチカードを選択</Link>
                    </Card.Body>
                  </Card>
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