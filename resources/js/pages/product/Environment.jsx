import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { Col, Row, Form, Card, Image, Badge, Button, Dropdown, InputGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { storeEcommerceConfiguration, getEcommerceConfiguration, updateEcommerceConfiguration, getApiKeys } from "@/pages/product/api/EcommerceConfigurationApiMethods";

export default () => {
  const [isDisabled, setIsDisbled] = useState(true);
  const [formValue, setFormValue] = useState({
    target_amount: '', postage: '', cash_on_delivery_fee: '', 
    tel: '', email: '', is_enabled: false
  })
  const [apiKey, setApiKey] = useState({
    payjp_secret_key: '', mix_payjp_public_key: ''
  })
  const [error, setError] = useState({
    target_amount: '', postage: '', tel: '', email: '', cash_on_delivery_fee: '', 
    payjp_secret_key: '', mix_payjp_public_key: ''
  });

  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
    setError({...error, [input]: ''})
  };

  const handleApiChange = (e, input) => {
    setApiKey({...apiKey, [input]: e.target.value})
    setError({...error, [input]: ''})
  };

  const handleClick = () => {
    const is_enabled = (isDisabled ? 0 : 1)
    formValue.is_enabled = is_enabled
    formValue.type = 'environment'
    Object.assign(formValue, apiKey);

    if (Object.keys(formValue).indexOf('id') !== -1) {
      updateEcommerceConfiguration(formValue.id, formValue, setError)
    } else {
      storeEcommerceConfiguration(formValue, setError);
    }
  };

  useEffect(() => {
    getEcommerceConfiguration(setFormValue, setIsDisbled)
    getApiKeys(setApiKey)
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">EC環境設定</h1>
        </div>
        <Button variant="success" className="btn-default-success" onClick={handleClick}>
          保存する
        </Button>
      </div>
      <Row>
        <Col xs={8}>
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
          </Card>
          <Card border="0" className="shadow mb-4">
            <Card.Header className="bg-primary text-white px-3 py-2">
              <h5 className="mb-0 fw-bolder">API設定</h5>
            </Card.Header> 
            <Card.Body>
              <Row>
                <Col md={12} className="mb-4">
                  <Form.Group id="pay-jp-secret-key">
                    <Form.Label><Badge bg="danger" className="me-2">必須</Badge>Pay.jp 秘密鍵</Form.Label>
                    <Form.Control
                      type="text"
                      name="payjp_secret_key"
                      value={apiKey.payjp_secret_key}
                      onChange={(e) => handleApiChange(e, 'payjp_secret_key')}
                      placeholder="例）sk_test_*****"
                      isInvalid={!!error.payjp_secret_key}
                    />
                    {
                      error.payjp_secret_key && 
                      <Form.Control.Feedback type="invalid">{error.payjp_secret_key[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-4">
                  <Form.Group id="pay-jp-public-key">
                    <Form.Label><Badge bg="danger" className="me-2">必須</Badge>Pay.jp 公開鍵</Form.Label>
                    <Form.Control
                      type="text"
                      name="mix_payjp_public_key"
                      value={apiKey.mix_payjp_public_key}
                      onChange={(e) => handleApiChange(e, 'mix_payjp_public_key')}
                      placeholder="例）pk_test_*****"
                      isInvalid={!!error.mix_payjp_public_key}
                    />
                    {
                      error.mix_payjp_public_key && 
                      <Form.Control.Feedback type="invalid">{error.mix_payjp_public_key[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border="0" className="shadow mb-4">
            <Card.Header className="bg-primary text-white px-3 py-2">
              <h5 className="mb-0 fw-bolder">支払い情報</h5>
            </Card.Header> 
            <Card.Body>
              <Row>
                <Col md={12} className="mb-4">
                  <Form.Group>
                    <div className="d-flex flex-wrap flex-md-nowrap align-items-center">
                      <Form.Label>
                        {
                          isDisabled ? (
                            <Badge bg="gray-600" className="me-2">任意</Badge>
                          ) : (
                            <Badge bg="danger" className="me-2">必須</Badge>
                          )
                        }
                        代引き手数料
                      </Form.Label>
                      <Form.Check
                        label="代引きを有効にする"
                        id="cash_on_delivery"
                        htmlFor="cash_on_delivery"
                        className="ps-5" 
                        checked={!isDisabled}
                        onClick={() => setIsDisbled(!isDisabled)}
                      />
                    </div>
                    <InputGroup className="">
                      <Form.Control
                        type="number"
                        placeholder="金額"
                        disabled={isDisabled}
                        name="cash_on_delivery_fee"
                        value={formValue.cash_on_delivery_fee}
                        onChange={(e) => handleChange(e, 'cash_on_delivery_fee')}
                        isInvalid={!!error.cash_on_delivery_fee}
                        />
                      <InputGroup.Text>円</InputGroup.Text>
                      {
                        error.cash_on_delivery_fee && 
                        <Form.Control.Feedback type="invalid">{error.cash_on_delivery_fee[0]}</Form.Control.Feedback>
                      }
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};