import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, Card, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';



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
      .post('/api/setting/privacy-policy/store', {
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
      .post('/api/setting/privacy-policy/update', {
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
    fetch(`/api/setting/privacy-policy`)
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