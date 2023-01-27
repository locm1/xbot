
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AdjustmentsIcon, CheckIcon, CogIcon, HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, Breadcrumb, Card, FormCheck, Dropdown } from 'react-bootstrap';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import BackToListLink from "@/components/BackToListLink";

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary me-3',
    cancelButton: 'btn btn-gray'
  },
  buttonsStyling: false
}));

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const pathname = useLocation().pathname;

  const [isCheck, setIsCheck] = useState(false);
  const [formValue, setFormValue] = useState(
    {login_id: '', name: '', role: 1, password: '', password_confirmation: ''}
  );
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const roles = [
    {role: 1, name: '管理者'},
    {role: 2, name: '編集者'},
    {role: 3, name: '一般'},
  ]

  useEffect(() => {
    if (pathname.includes('/edit')) {
      getAdmin();
    }
  }, []);

  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
  };

  const getAdmin = async () => {
    await axios.get(`/api/v1/admins/${id}`)
    .then((response) => {
      const admin = response.data.admin;
      setFormValue({
        login_id: admin.login_id, 
        name: admin.name, 
        role: admin.role,
        password: '',
        password_confirmation: '',
      })
    });
  }

  const registerAdmin = async () => {
    await axios.post('/api/v1/admins', formValue)
    .then((response) => {
      history.push(Paths.Accounts.path);
      alert('登録しました');
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  }


  const updateAdmin = async () => {
    const newFormValues = {
      data: formValue,
      is_checked: isCheck
    }
    await axios.put(`/api/v1/admins/${id}`, newFormValues)
    .then((response) => {
      alert('更新しました');
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <>
    <BackToListLink path={Paths.Accounts.path} />
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 mb-4 list-wrap">
        <div className="d-block">
          <h1 className="page-title">{pathname.includes('/edit') ? 'アカウント編集' : 'アカウント登録'}</h1>
        </div>
      </div>
      <Card border="0" className="shadow mb-4">
        <Card.Body>
          <h5 className="mb-4 border-bottom pb-3">アカウント情報</h5>
          <Row className="mb-3">
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>ログインID</Form.Label>
                <Form.Control required type="text" name="login_id" value={formValue.login_id} onChange={(e) => handleChange(e, 'login_id')} placeholder="" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>ユーザー名</Form.Label>
                <Form.Control required type="text" name="name" value={formValue.name} onChange={(e) => handleChange(e, 'name')} placeholder="" />
              </Form.Group>
            </Col>
            <Col md={12} className="mb-3">
              <Form.Group id="email">
                <Form.Label>権限レベル</Form.Label>
                <Form.Select className="mb-0" defaultValue={formValue.role} onChange={(e) => handleChange(e, 'role')}>
                  {
                    roles.map((role, index) => <option key={index} value={role.role}>{role.name}</option>)
                  }
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          {(() => {
            if (pathname.includes('/edit')) {
              return (
                <>
                <Row>
                <Col md={12}>
                  <Form.Check label="パスワードを変更する" onClick={() => setIsCheck(!isCheck)} id="password_chenge_checkbox" htmlFor="password_chenge_checkbox" />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>パスワード</Form.Label>
                    <Form.Control required type="password" name="password" value={formValue.password} onChange={(e) => handleChange(e, 'password')} placeholder="" disabled={!isCheck} />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>確認用パスワード</Form.Label>
                    <Form.Control required type="password" name="confirm_password" value={formValue.password_confirmation} onChange={(e) => handleChange(e, 'password_confirmation')} placeholder="" disabled={!isCheck} />
                  </Form.Group>
                </Col>
                </Row>
                <div onClick={updateAdmin} className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center pt-4">
                  <Button variant="gray-800" className="animate-up-2">
                    更新する
                  </Button>
                </div>
                </>
              );
            } else {
              return (
                <>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="firstName">
                      <Form.Label>パスワード</Form.Label>
                      <Form.Control required type="password" name="password" value={formValue.password} onChange={(e) => handleChange(e, 'password')} placeholder="" />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="firstName">
                      <Form.Label>確認用パスワード</Form.Label>
                      <Form.Control required type="password" name="confirm_password" value={formValue.password_confirmation} onChange={(e) => handleChange(e, 'password_confirmation')} placeholder="" />
                    </Form.Group>
                  </Col>
                </Row>
                <div onClick={registerAdmin} className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center pt-4">
                  <Button variant="gray-800" className="animate-up-2">
                    登録する
                  </Button>
                </div>
                </>
              );
            }
          })()}
        </Card.Body>
      </Card>
    </>
  );
};
