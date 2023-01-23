import React, { useState, useEffect } from "react";
import { Component } from 'react';
import moment from "moment-timezone";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, Card, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';



const TermsOfService = (props) => {
  const [id, setId] = useState('');
  const [content, setContent] = useState('');

  const changeContent = (event) => {
    setContent(event.target.value);
  };

  const savePost = async() => {
    if(content == '' && id == ''){
      return;
    }
    if(id == '') {
      //入力値を投げる
      await axios
      .post('/api/setting/terms-of-service/store', {
        content: content
      })
      .then((res) => {
console.log(res)
        //戻り値をtodosにセット
        setId(res['data']['id'])
        alert('登録しました');
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      //入力値を投げる
      await axios
      .post('/api/setting/terms-of-service/update', {
        id: id,
        content: content
      })
      .then((res) => {
        //戻り値をtodosにセット
        alert('登録しました');
      })
      .catch(error => {
        console.log(error);
      });

    }
  }

  useEffect(() => {
        fetch(`/api/setting/terms-of-service`)
        .then(response => response.json())
        .then(data => {
                if(data.length > 0) {
                        setId(data[0]['id']);
                        setContent(data[0]['content']);
                }
        })
        .catch(error => {
                console.log(error)
        })
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">利用規約</h1>
        </div>
      </div>
      <Card border="0" className="shadow mb-4">
        <Card.Body>
          <Row>
            <Col xs={12} sm={6} xl={12}>
              <Form>
              <Form.Control required type="hidden" name="id" value={id} />
                <Form.Group className="mb-3">
                  <Form.Label>利用規約</Form.Label>
                  <Form.Control as="textarea" rows="30" maxlength="5000" name="content" value={content} onChange={(event) => changeContent(event)} />
                </Form.Group>
                <div className="mt-3">
                  <Button variant="gray-800" type="submit" className="mt-2 animate-up-2" onClick={savePost}>
                    保存する
                  </Button>
              </div>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
        )
};

export default TermsOfService;