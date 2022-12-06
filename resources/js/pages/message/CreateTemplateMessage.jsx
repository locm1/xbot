import React, { useState } from "react";
import { HomeIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, Dropdown, Breadcrumb } from 'react-bootstrap';

// forms
import TemplateMessageForm from "@/pages/message/form/TemplateMessageForm";
import MessageEditor from "@/pages/message/MessageEditor";
import { Link } from 'react-router-dom';
import AccordionComponent from "@/components/AccordionComponent";

import { Paths } from "@/paths";

export default () => {
  const [formValue, setFormValue] = useState(
    {title: ''}
  );

  const handleChange = (e, input) => {
    return setFormValue({...formValue, [input]: e.target.value})
};

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><HomeIcon className="icon icon-xs" /></Breadcrumb.Item>
            <Breadcrumb.Item active>メッセージ管理</Breadcrumb.Item>
            <Breadcrumb.Item active>メッセージ作成</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-title">メッセージ作成</h1>
        </div>
        <div className="d-flex">
          <Button as={Link} to={Paths.Calendar.path} variant="gray-800" className="me-2">
            保存する
          </Button>
        </div>
      </div>

      <Row>
        <Col xs={12} xl={12}>
          <TemplateMessageForm handleChange={handleChange} formValue={formValue} />
        </Col>
      </Row>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <MessageEditor />
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <AccordionComponent data={[
          {
            id: 1,
            eventKey: "panel-1",
            title: "プレビュー",
            description: "a"
          },
        ]} />
      </div>
      <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
        <Button href={Paths.TemplateMessages.path} variant="gray-800" className="mt-2 animate-up-2">
          テンプレートリストに戻る
        </Button>
      </div>
    </>
  );
};
