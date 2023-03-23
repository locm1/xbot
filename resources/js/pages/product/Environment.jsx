import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { Col, Row, Form, Card, Image, Breadcrumb, Button, Dropdown, InputGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { storeEcommerceConfiguration, getEcommerceConfiguration, updateEcommerceConfiguration } from "@/pages/product/api/EcommerceConfigurationApiMethods";

export default () => {
  const [isDisabled, setIsDisbled] = useState(true);
  const [formValue, setFormValue] = useState({
    target_amount: '', postage: '', cash_on_delivery_fee: '', tel: '', is_enabled: false
  })

  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
  };

  const handleClick = () => {
    const is_enabled = (isDisabled ? 0 : 1)
    formValue.is_enabled = is_enabled
    console.log(formValue);
    if (Object.keys(formValue).indexOf('id') !== -1) {
      console.log('update');
      updateEcommerceConfiguration(formValue.id, formValue)
    } else {
      storeEcommerceConfiguration(formValue);
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
            <Card.Body>
              <div className="d-flex justify-content-between">
              <h5 className="mb-4 border-bottom pb-3">環境情報</h5>
              </div>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="postage">
                    <Form.Label>対象金額</Form.Label>
                    <InputGroup className="">
                      <Form.Control 
                        type="number"
                        placeholder="金額" 
                        name="target_amount"
                        value={formValue.target_amount}
                        onChange={(e) => handleChange(e, 'target_amount')}
                      />
                      <InputGroup.Text>以下</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="postage">
                    <Form.Label>送料</Form.Label>
                    <InputGroup className="">
                      <Form.Control
                        type="number"
                        placeholder="金額"
                        name="postage"
                        value={formValue.postage}
                        onChange={(e) => handleChange(e, 'postage')}
                      />
                      <InputGroup.Text>円</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Group id="tel">
                    <div className="d-flex flex-wrap flex-md-nowrap align-items-center">
                      <Form.Label>代引き手数料</Form.Label>
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
                        />
                      <InputGroup.Text>円</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Group id="tel">
                    <Form.Label>電話番号</Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      name="tel"
                      value={formValue.tel}
                      onChange={(e) => handleChange(e, 'tel')}
                      placeholder="例）08000000000"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center py-4 me-4">
                <Button
                  variant="primary"
                  className="d-inline-flex align-items-center"
                  onClick={handleClick}
                >
                  保存する
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};