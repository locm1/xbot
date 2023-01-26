
import React, { useState } from "react";
import { LockClosedIcon, MailIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import { Paths } from "@/paths";
import Logo from "@img/img/logo_login.png";


export default () => {
  const [formValue, setFormValue] = useState(
    {loginId: '', password: ''}
  );
  const history = useHistory();

  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
  };

  const login = () => {

    const data = {
      login_id: formValue.loginId,
      password: formValue.password
    };

    axios.get('/sanctum/csrf-cookie').then(response => {
      //ログイン
      axios.post('/api/v1/login', data).then(response => {
        const xsrfToken = Cookies.get('XSRF-TOKEN')
        Cookies.set('TOKEN', xsrfToken, { expires: 120/1440 })
        
        history.push(Paths.DashboardOverview.path);
      }).catch(error => {
        Cookies.remove('TOKEN')
      })
    })
  }
  
  return (
    <main>
      <section className="d-flex align-items-center vh-lg-100 mt-5 mt-lg-0 bg-soft">
        <Container>
          <Row className="justify-content-center form-bg-image">
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <Image src={Logo} className="navbar-brand-dark navbar-logo-wrap" />
                </div>
                <Form.Group id="id" className="mb-4">
                  <Form.Label>ユーザーID</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <MailIcon className="icon icon-xs text-gray-600" />
                    </InputGroup.Text>
                    <Form.Control autoFocus required type="text" name="login_id" value={formValue.loginId} onChange={(e) => handleChange(e, 'loginId')} />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>パスワード</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <LockClosedIcon className="icon icon-xs text-gray-600" />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Password" name="password" value={formValue.password} onChange={(e) => handleChange(e, 'password')} />
                    </InputGroup>
                  </Form.Group>
                  <div className="d-flex justify-content-between align-items-top mb-4">
                    <Form.Check type="checkbox">
                      <FormCheck.Input id="defaultCheck5" className="me-2" />
                      <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                    </Form.Check>
                    <Card.Link className="small text-end">パスワードを忘れた場合</Card.Link>
                  </div>
                </Form.Group>
                <div className="d-grid">
                  <Button variant="gray-800" onClick={login}>ログイン</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
