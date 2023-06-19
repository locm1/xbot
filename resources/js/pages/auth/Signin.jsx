
import React, { useState, useEffect } from "react";
import { LockClosedIcon, MailIcon, UserIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, Image, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { getSiteSettings } from "@/pages/site/api/SiteApiMethods";
import { Paths } from "@/paths";
import Logo from "@img/img/logo_login.png";


export default () => {
  const [formValue, setFormValue] = useState(
    {loginId: '', password: ''}
  );
  const [setting, setSetting] = useState({
    logo_login_path: ''
  });
  const history = useHistory();

  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
  };

  const [loginFailed, setLoginFailed] = useState();

  const login = (e) => {
    e.preventDefault();

    const data = {
      login_id: formValue.loginId,
      password: formValue.password
    };

    axios.get('/sanctum/csrf-cookie').then(response => {
      //ログイン
      axios.post('/api/v1/login', data).then(response => {
        history.push(Paths.DashboardOverview.path);
      }).catch(error => {
        console.log(error.response.status);
        if (error.response.status === 401) {
          setLoginFailed("ログインに失敗しました");
        }
      })
    })
  }

  useEffect(() => {
    const dataFetch = async () => {
      try {
        await getSiteSettings(setSetting)
        //setIsRendered(true)
      } catch (error) {
        console.error(error)
      }
    }

    dataFetch()
  }, [])
  
  return (
    <main>
      <section className="d-flex align-items-center vh-lg-100 mt-5 mt-lg-0 bg-soft">
        <Container>
          <Row className="justify-content-center form-bg-image">
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <Form onSubmit={(e) => login(e)}>
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <Image src={setting.logo_login_path} className="navbar-brand-dark navbar-logo-wrap" />
                  </div>
                  {loginFailed ? 
                    <Alert variant="danger">
                      {loginFailed}
                    </Alert> : ""
                  }
                  <Form.Group id="id" className="mb-4">
                    <Form.Label>ユーザーID</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <UserIcon className="icon icon-xs text-gray-600" />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="ユーザーID" name="login_id" value={formValue.loginId} onChange={(e) => handleChange(e, 'loginId')} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>パスワード</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <LockClosedIcon className="icon icon-xs text-gray-600" />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="パスワード" name="password" value={formValue.password} onChange={(e) => handleChange(e, 'password')} />
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="gray-800" type="submit">ログイン</Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
