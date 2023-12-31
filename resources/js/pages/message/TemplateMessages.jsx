import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CheckIcon, CogIcon, HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Paths } from "@/paths";
import { TemplateMessageTable } from "@/pages/message/TemplateMessageTable";
import { getMessages, deleteMessage } from "@/pages/message/api/MessageApiMethods";

export default () => {
  const [isRendered, setIsRendered] = useState(false);
  const [messages, setMessages] = useState([]);
  const [paginate, setPaginate] = useState({ 
    current_page: 0, per_page: 0, from: 0, to: 0,total: 0 
  })
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const [timer, setTimer] = useState(null);

  const handleChange = (e) => {
    setTitle(e.target.value)

    const searchParams = {
      params: { title: e.target.value, page: 1 }
    };

    const search = async () => {
      try {
        await getMessages(searchParams, setMessages, setLinks, setPaginate)
        setIsRendered(true)
      } catch (error) {
        console.error(error)
      }
    }

    clearTimeout(timer);

    // 一定期間操作がなかったらAPI叩く
    const newTimer = setTimeout(() => {
      search()
    }, 1000)

    setTimer(newTimer)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChange(e)
  };

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const searchParams = {
          params: {title: null, page: 1}
        };
        await getMessages(searchParams, setMessages, setLinks, setPaginate)
        setIsRendered(true)
      } catch (error) {
        console.error(error)
      }
    }

    dataFetch();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">テンプレート管理</h1>
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
            <Form onSubmit={handleSubmit}>
              <InputGroup className="me-2 me-lg-3 fmxw-300">
                <InputGroup.Text>
                  <SearchIcon className="icon icon-xs" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="タイトル"
                  value={title}
                  onChange={(e) => handleChange(e)}
                />
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </div>

      <TemplateMessageTable
        messages={messages}
        deleteMessage={deleteMessage}
        setMessages={setMessages}
        getMessages={getMessages}
        links={links}
        paginate={paginate}
        setLinks={setLinks}
        setPaginate={setPaginate}
        title={title}
        isRendered={isRendered}
      />
    </>
  );
};
