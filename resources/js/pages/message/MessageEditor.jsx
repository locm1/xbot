import React, { useState, useEffect } from "react";
import { Nav, Tab, Row, Col, Tooltip, OverlayTrigger, Form, Button, Image } from 'react-bootstrap';
import { ChatIcon, XIcon, ChevronDownIcon, ChevronUpIcon, PhotographIcon, TicketIcon } from "@heroicons/react/outline";

import { SmileIcon } from "@/components/icons/Icons";

export default (props) => {
  const lists = ['テスト', 'テスト', 'テスト', 'テスト'];
  const { setFiles, files, getRootProps, getInputProps, setPreviews, handlePreviewChange, index, previews, handleDelete } = props;

  const DropzoneFile = (props) => {
    const { preview } = props;

    return (
      <Col xs={6} className="dropzone-preview line-preview-image-wrap">
        <div className="line-preview-image d-flex">
          <Image src={preview} className="dropzone-image" />
          <Button variant="gray-800" className="line-preview-image-button" onClick={() => setFiles([])}>
            <XIcon className="icon icon-sm line-preview-image-icon" />
          </Button>  
        </div>
      </Col>
    );
  };

  useEffect(() => {
    setPreviews(
      previews.map((preview, previewIndex) => (previewIndex == index ? { ...preview, files: files } : preview))
    )
  }, [files]);

  return (
    <>
    <div className="message-editor-wrap">
      <div className="message-editor-header">
        <Tab.Container defaultActiveKey="text">
          <Row>
            <Col lg={10} className="d-flex justify-content-start">
              <Nav>
                <Nav.Item>
                  <Nav.Link eventKey="text" className="mb-sm-3 mb-md-0 message-editor-header-item">
                    <OverlayTrigger 
                      key="text"
                      overlay={<Tooltip id="top" className="m-0">テキスト</Tooltip>}
                    >
                      <ChatIcon className="icon icon-sm" />
                    </OverlayTrigger>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="stamp" className="mb-sm-3 mb-md-0 message-editor-header-item">
                    <OverlayTrigger 
                      key="stamp"
                      overlay={<Tooltip id="top" className="m-0">スタンプ</Tooltip>}
                    >
                      <SmileIcon className="icon icon-sm" />
                    </OverlayTrigger>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="picture" className="mb-sm-3 mb-md-0 message-editor-header-item">
                    <OverlayTrigger 
                      key="example"
                      overlay={<Tooltip id="top" className="m-0">写真</Tooltip>}
                    >
                      <PhotographIcon className="icon icon-sm" />
                    </OverlayTrigger>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="coupon" className="mb-sm-3 mb-md-0 message-editor-header-item">
                    <OverlayTrigger 
                      key="example"
                      overlay={<Tooltip id="top" className="m-0">クーポン</Tooltip>}
                    >
                      <TicketIcon className="icon icon-sm" />
                    </OverlayTrigger>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="message" className="mb-sm-3 mb-md-0 message-editor-header-item">
                    <OverlayTrigger 
                      key="example"
                      overlay={<Tooltip id="top" className="m-0">リッチメッセージ</Tooltip>}
                    >
                      <ChatIcon className="icon icon-sm" />
                    </OverlayTrigger>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col lg={2} className="d-flex justify-content-center">
              <div className="message-editor-header-item-right">
                <ChevronUpIcon className="icon icon-sm" />
              </div>
              <div className="message-editor-header-item-right">
                <ChevronDownIcon className="icon icon-sm" />
              </div>
              <div className="message-editor-header-item-right" onClick={() => handleDelete(index)}>
                <XIcon className="icon icon-sm" />
              </div>
            </Col>
            <Col lg={12}>
              <Tab.Content>
                <Tab.Pane eventKey="text" className="py-4">
                  <Form.Group className="mb-3">
                    <Form.Control as="textarea" rows="5" placeholder="テキストを入力" id="preview-text" value={previews[index].content} onChange={(e) => handlePreviewChange(e, 'content', index, files)} />
                  </Form.Group>
                </Tab.Pane>
                <Tab.Pane eventKey="stamp" className="py-4">
                  <Form.Select defaultValue="1" className="mb-0" id="preview-stamp">
                    {
                      lists.map((item, index) => <option key={index} value={index + 1}>{item}</option>)
                    }
                  </Form.Select>
                </Tab.Pane>
                <Tab.Pane eventKey="picture" className="py-4">
                  {files.length == 0 ? (
                    <Form {...getRootProps({ className: "dropzone rounded d-flex align-items-center justify-content-center mb-4" })}>
                      <Form.Control {...getInputProps()} id="preview-picture" />
                        <div className="dz-default dz-message text-center">
                          <p className="dz-button mb-0">画像をアップロード</p>
                        </div>
                    </Form>
                  ) : (
                    ''
                  )} 
                  <Row className="dropzone-files">
                    {files.map(file => <DropzoneFile key={file.path} {...file} />)}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="coupon" className="py-4">
                  <Form.Select defaultValue="1" className="mb-0" id="preview-coupon">
                    {
                      lists.map((item, index) => <option key={index} value={index + 1}>{item}</option>)
                    }
                  </Form.Select>
                </Tab.Pane>
                <Tab.Pane eventKey="message" className="py-4">
                  <Form.Select defaultValue="1" className="mb-0" id="preview-message">
                    {
                      lists.map((item, index) => <option key={index} value={index + 1}>{item}</option>)
                    }
                  </Form.Select>
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
