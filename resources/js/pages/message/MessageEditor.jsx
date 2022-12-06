import React, { useState } from "react";
import { Nav, Tab, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { ChatIcon, XIcon, ChevronDownIcon, ChevronUpIcon, PhotographIcon, TicketIcon } from "@heroicons/react/outline";

import { SmileIcon } from "@/components/icons/Icons";
import TextForm from "@/pages/message/form/TextForm";
import FileUploadForm from "@/pages/message/form/FileUploadForm";

export default () => {
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
              <div className="message-editor-header-item-right">
                <XIcon className="icon icon-sm" />
              </div>
            </Col>
            <Col lg={12}>
              <Tab.Content>
                <Tab.Pane eventKey="text" className="py-4">
                  <TextForm />
                </Tab.Pane>
                <Tab.Pane eventKey="stamp" className="py-4">
                  <FileUploadForm />
                </Tab.Pane>
                <Tab.Pane eventKey="picture" className="py-4">
                  <FileUploadForm />
                </Tab.Pane>
                <Tab.Pane eventKey="coupon" className="py-4">
                <p>aaa</p>
                </Tab.Pane>
                <Tab.Pane eventKey="message" className="py-4">
                <p>aaa</p>
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
