import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CheckIcon, CogIcon, HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Paths } from "@/paths";
import { TemplateMessageTable } from "@/pages/message/TemplateMessageTable";
import { getMessages } from "@/pages/message/api/MessageApiMethods";

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary me-3',
    cancelButton: 'btn btn-gray'
  },
  buttonsStyling: false
}));


export default () => {
  const [messages, setMessages] = useState([]);

  const deleteTemplateMessages = async (ids) => {
    const messagesToBeDeleted = ids ? ids : selectedMessagesIds;
    const textMessage = "本当にこのテンプレートを削除しますか？";

    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "削除確認",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル"
    });

    if (result.isConfirmed) {
      const newMessages = messages.filter(f => !messagesToBeDeleted.includes(f.id));
      const confirmMessage = "選択したテンプレートは削除されました。";

      setMessages(newMessages);
      await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
    }
  };

  useEffect(() => {
    getMessages(setMessages)
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">テンプレートリスト</h1>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button as={Link} to={Paths.CreateMessage.path} variant="gray-800" size="sm" className="d-inline-flex align-items-center">
            <PlusIcon className="icon icon-xs me-2" /> 新規作成
          </Button>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="d-flex justify-content-between align-items-center">
          <Col xs={9} lg={8} className="d-md-flex">
          <InputGroup className="me-2 me-lg-3 fmxw-300">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="タイトル"
              />
            </InputGroup>
          </Col>
        </Row>
      </div>

      <TemplateMessageTable
        messages={messages}
        deleteTemplateMessages={deleteTemplateMessages}
      />
    </>
  );
};
