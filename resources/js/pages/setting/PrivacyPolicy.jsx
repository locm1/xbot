import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, Card, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
// import { then } from "laravel-mix";



const PrivacyPolicy = (props) => {
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
      .post('/api/v1/management/privacy-policy', {
        content: content
      })
      .then((res) => {
        //戻り値をtodosにセット
console.log(res)
        setId(res['data']['id'])
        alert('登録しました');
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      //入力値を投げる
      await axios
      .put(`/api/v1/management/privacy-policy/${id}`, {
        id: id,
        content: content
      })
      .then((res) => {
        //戻り値をtodosにセット
console.log(res)
        alert('更新しました');
      })
      .catch(error => {
        console.error(error);
      });

    }
  }

  useEffect(() => {
    fetch(`/api/v1/management/privacy-policy`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      setContent(data.policy[0].content)
      setId(data.policy[0].id)

    })
    .catch(error => {
            console.error(error)
    })
  }, []);

return (
<>
  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
    <div className="d-block mb-4 mb-md-0">
      <h1 className="page-title">プライバシーポリシー</h1>
    </div>
  </div>
  <Card border="0" className="shadow mb-4">
    <Card.Body>
      <Row>
        <Col xs={12} sm={6} xl={12}>
          <Form>
            <Form.Control required type="hidden" name="id" value={id} />
            <Form.Group className="mb-3">
              <Form.Label>プライバシーポリシー</Form.Label>
              <Form.Control as="textarea" rows="30" maxLength="5000" name="privacy_policy" value={content} onChange={(event) => changeContent(event)} />
            </Form.Group>
            <div className="mt-3">
              <Button variant="gray-800" className="mt-2 animate-up-2" onClick={savePost}>
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

export default PrivacyPolicy;
