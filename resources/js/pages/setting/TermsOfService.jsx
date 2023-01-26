import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, Card, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
// import { then } from "laravel-mix";



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
      .post(`/api/v1/terms-of-service`, {
        content: content
      })
      .then((res) => {
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
      .put(`/api/v1/terms-of-service/${id}`, {
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
        fetch(`/api/v1/terms-of-service`)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setContent(data.term[0].content)
          setId(data.term[0].id)
    
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
                  <Form.Control as="textarea" rows="30" maxLength="5000" name="content" value={content} onChange={(event) => changeContent(event)} />
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
