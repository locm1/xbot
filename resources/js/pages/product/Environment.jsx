import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { Col, Row, Form, Card, Image, Badge, Button, Dropdown, InputGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { storeEcommerceConfiguration, getEcommerceConfiguration, updateEcommerceConfiguration } from "@/pages/product/api/EcommerceConfigurationApiMethods";

export default () => {
  const [isDisabled, setIsDisbled] = useState(true);
  const [formValue, setFormValue] = useState({
    target_amount: '', postage: '', cash_on_delivery_fee: '', 
    tel: '', email: '', is_enabled: false
  })
  const [error, setError] = useState({
    target_amount: '', postage: '', tel: '', email: '', cash_on_delivery_fee: ''
  });

  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
    setError({...error, [input]: ''})
  };

  const handleClick = () => {
    const is_enabled = (isDisabled ? 0 : 1)
    formValue.is_enabled = is_enabled
    formValue.type = 'environment'
    console.log(formValue);
    if (Object.keys(formValue).indexOf('id') !== -1) {
      updateEcommerceConfiguration(formValue.id, formValue, setError)
    } else {
      storeEcommerceConfiguration(formValue, setError);
    }
  };

  useEffect(() => {
    getEcommerceConfiguration(setFormValue, setIsDisbled)
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">環境設定</h1>
        </div>
      </div>
      <Row>
        <Col xs={12} xl={12}>
          <Card border="0" className="shadow mb-4">
            <Card.Header className="bg-primary text-white px-3 py-2">
              <h5 className="mb-0 fw-bolder">環境情報</h5>
            </Card.Header> 
            <Card.Body>
              <Row>
                <Col md={12} className="mb-4">
                  <Form.Group id="tel">
                    <Form.Label><Badge bg="danger" className="me-2">必須</Badge>電話番号</Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      name="tel"
                      value={formValue.tel}
                      onChange={(e) => handleChange(e, 'tel')}
                      placeholder="例）08000000000"
                      isInvalid={!!error.tel}
                    />
                    {
                      error.tel && 
                      <Form.Control.Feedback type="invalid">{error.tel[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-4">
                  <Form.Group id="email">
                    <Form.Label><Badge bg="danger" className="me-2">必須</Badge>メールアドレス</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      name="email"
                      value={formValue.email}
                      onChange={(e) => handleChange(e, 'email')}
                      placeholder="例）sample@sample.com"
                      isInvalid={!!error.email}
                    />
                    {
                      error.email && 
                      <Form.Control.Feedback type="invalid">{error.email[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-end">
                <Button variant="success" className="btn-default-success" onClick={handleClick}>
                  保存する
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
};