import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { Col, Row, Form, Card, Image, Badge, Button, Dropdown, InputGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { storeEcommerceConfiguration, getEcommerceConfiguration, updateEcommerceConfiguration } from "@/pages/product/api/EcommerceConfigurationApiMethods";

export default () => {
  const [isDisabled, setIsDisbled] = useState(true);
  const [formValue, setFormValue] = useState({
    target_amount: '', postage: '', cash_on_delivery_fee: '', 
    tel: '', email: '', is_enabled: false, type: 'payment'
  })
  const [error, setError] = useState({
    cash_on_delivery_fee: ''
  });

  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
    setError({...error, [input]: ''})
  };

  const handleClick = () => {
    const is_enabled = (isDisabled ? 0 : 1)
    formValue.is_enabled = is_enabled
    formValue.type = 'payment'
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
          <h1 className="page-title">支払い設定</h1>
        </div>
      </div>
      <Row>
        <Col xs={12} xl={12}>
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