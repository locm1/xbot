
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AdjustmentsIcon, CheckIcon, CogIcon, HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, Breadcrumb, Card, Badge, Dropdown } from 'react-bootstrap';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import BackToListLink from "@/components/BackToListLink";
import { getAccount, storeAccount, updateAccount } from "@/pages/account/api/AdminApiMethods";

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const pathname = useLocation().pathname;

  const [isCheck, setIsCheck] = useState(false);
  const [formValue, setFormValue] = useState(
    {login_id: '', name: '', role: 1, password: '', password_confirmation: ''}
  );
  const [error, setError] = useState({
    login_id: '', password: '', password_confirmation: '', name: ''
  });
  const roles = [
    {role: 1, name: '管理者'},
    {role: 2, name: '編集者'},
    {role: 3, name: '一般'},
  ]

  useEffect(() => {
    if (pathname.includes('/edit')) {
      getAccount(id, setFormValue);
    }
  }, []);

  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
  };

  const onSaveAccount = () => {
    if (pathname.includes('/edit')) {
      Object.assign(formValue, {is_checked: isCheck})
      updateAccount(id, formValue, setError)
    } else {
      storeAccount(formValue, setError)
    }
  };

  const isRequired = (isCheck) => {
    if (pathname.includes('/edit') && isCheck === false) {
      return <Badge bg="gray-600" className="me-2">任意</Badge>
    } else if (pathname.includes('/edit') && isCheck === true) {
      return <Badge bg="danger" className="me-2">必須</Badge>
    } else if (pathname.includes('/register')) {
      return <Badge bg="danger" className="me-2">必須</Badge>
    } else {
      return <Badge bg="danger" className="me-2">必須</Badge>
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 mb-4 list-wrap">
        <div className="d-block">
          <h1 className="page-title">{pathname.includes('/edit') ? 'アカウント編集' : 'アカウント登録'}</h1>
        </div>
      </div>
      <Card border="0" className="shadow mb-4">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">アカウント情報</h5>
        </Card.Header> 
        <Card.Body>
          <Row className="mb-3">
            <Col md={6} className="mb-3">
              <Form.Group id="login_id">
                <Form.Label><Badge bg="danger" className="me-2">必須</Badge>ログインID</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="login_id"
                  value={formValue.login_id}
                  onChange={(e) => handleChange(e, 'login_id')} 
                  placeholder="x-bot" 
                  isInvalid={!!error.login_id}
                />
                {
                  error.login_id && 
                  <Form.Control.Feedback type="invalid">{error.login_id[0]}</Form.Control.Feedback>
                }
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="name">
                <Form.Label><Badge bg="danger" className="me-2">必須</Badge>ユーザー名</Form.Label>
                <Form.Control
                  required
                  type="text" 
                  name="name"
                  value={formValue.name}
                  onChange={(e) => handleChange(e, 'name')}
                  placeholder="管理者用アカウント"
                  isInvalid={!!error.name}
                />
                {
                  error.name && 
                  <Form.Control.Feedback type="invalid">{error.name[0]}</Form.Control.Feedback>
                }
              </Form.Group>
            </Col>
            <Col md={12} className="mb-3">
              <Form.Group id="role">
                <Form.Label><Badge bg="danger" className="me-2">必須</Badge>権限レベル</Form.Label>
                <Form.Select className="mb-0" value={formValue.role} onChange={(e) => handleChange(e, 'role')}>
                  {
                    roles.map((role, index) => <option key={index} value={role.role}>{role.name}</option>)
                  }
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {
              pathname.includes('/edit') && (
                <Col md={12}>
                  <Form.Check
                    label="パスワードを変更する"
                    onClick={() => setIsCheck(!isCheck)}
                    id="password_chenge_checkbox"
                    htmlFor="password_chenge_checkbox"
                  />
                </Col>
              )
            }
            <Col md={6} className="mb-3">
              <Form.Group id="password">
                <Form.Label>
                  {isRequired(isCheck)}
                  パスワード
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  value={formValue.password}
                  onChange={(e) => handleChange(e, 'password')}
                  placeholder=""
                  disabled={pathname.includes('/edit') ? !isCheck : false}
                  isInvalid={!!error.password}
                />
                {
                  error.password && 
                  <Form.Control.Feedback type="invalid">{error.password[0]}</Form.Control.Feedback>
                }
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="confirm_password">
              <Form.Label>
                  {isRequired(isCheck)}
                  確認用パスワード
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="confirm_password"
                  value={formValue.password_confirmation}
                  onChange={(e) => handleChange(e, 'password_confirmation')}
                  placeholder=""
                  disabled={pathname.includes('/edit') ? !isCheck : false}
                  isInvalid={!!error.password_confirmation}
                />
                {
                  error.password_confirmation && 
                  <Form.Control.Feedback type="invalid">{error.password_confirmation[0]}</Form.Control.Feedback>
                }
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-end">
            <Button variant="success" className="btn-default-success" onClick={onSaveAccount}>
              保存する
            </Button>
          </div>
        </Card.Footer>
      </Card>
      <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
        <Button as={Link} to={Paths.Accounts.path} variant='tertiary' className="mt-2 animate-up-2">
          アカウント管理に戻る
        </Button>
      </div>
    </>
  );
};
