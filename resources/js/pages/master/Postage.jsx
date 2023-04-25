import React, { useState, useEffect } from "react";
import { CurrencyYenIcon } from "@heroicons/react/solid"
import { Badge, Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import { PostageForm } from "./PostageForm"

import { updatePostage, getPostages, storePostage } from "@/pages/master/api/PostageApiMethods";
import { storeEcommerceConfiguration, getEcommerceConfiguration, updateEcommerceConfiguration } from "@/pages/product/api/EcommerceConfigurationApiMethods";

export default () => {
  const [allApply, setAllApply] = useState();
  const [postages, setPostages] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [results, setResults] = useState([]);
  const [isDisabled, setIsDisbled] = useState(true);
  const [formValue, setFormValue] = useState({
    target_amount: '', postage: '', cash_on_delivery_fee: '', 
    tel: '', email: '', is_enabled: false
  })
  const [error, setError] = useState({
    target_amount: '', postage: '', tel: '', email: '', cash_on_delivery_fee: ''
  });


  const setPostageAll = () => {
    const newPrefectureObject = postages.map((postage) => {
      postage.postage = allApply;
      return postage;
    })
    setPostages(newPrefectureObject);
  }

  const handleChange = (e, id) => {
    const newPostage = postages.filter(postage => (postage.id === id))[0]
    newPostage.postage = e.target.value
    setPostages(
      postages.map(postage => (postage.id === id ? newPostage : postage))
    )
  }

  const handleEnvChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
    setError({...error, [input]: ''})
  };

  const handleClick = () => {
    const is_enabled = (isDisabled ? 0 : 1)
    formValue.is_enabled = is_enabled
    console.log(formValue);
    if (Object.keys(formValue).indexOf('id') !== -1) {
      updateEcommerceConfiguration(formValue.id, formValue, setError)
    } else {
      storeEcommerceConfiguration(formValue, setError);
    }
    const upsertPostages = postages.map(
      (postage) => ({id: postage.id, prefecture_id: postage.prefecture_id, postage: postage.postage})
    )
    if (isUpdate) {
      updatePostage(upsertPostages)
    } else {
      storePostage(upsertPostages)
    }
  }

  useEffect(() => {
    getPostages(setPostages, setIsUpdate)
    getEcommerceConfiguration(setFormValue, setIsDisbled)
  }, []);


  return (
  <>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      <div className="d-block mb-4 mb-md-0">
        <h1 className="page-title">送料管理</h1>
      </div>
        <Button variant="success" onClick={handleClick}>保存する</Button>
    </div>
    <Card border="0" className="shadow mb-4">
      <Card.Header className="bg-primary text-white px-3 py-2">
        <h5 className="mb-0 fw-bolder">値段別送料設定</h5>
      </Card.Header> 
      <Card.Body>
        <Row>
          <Col md={6} className="mb-4">
            <Form.Group id="target-amount">
              <Form.Label><Badge bg="danger" className="me-2">必須</Badge>対象金額</Form.Label>
              <InputGroup className="">
                <Form.Control 
                  type="number"
                  placeholder="金額" 
                  name="target_amount"
                  value={formValue.target_amount}
                  onChange={(e) => handleEnvChange(e, 'target_amount')}
                  isInvalid={!!error.target_amount}
                />
                <InputGroup.Text>以上</InputGroup.Text>
                {
                  error.target_amount && 
                  <Form.Control.Feedback type="invalid">{error.target_amount[0]}</Form.Control.Feedback>
                }
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={6} className="mb-4">
            <Form.Group id="postage">
              <Form.Label><Badge bg="danger" className="me-2">必須</Badge>送料</Form.Label>
              <InputGroup className="">
                <Form.Control
                  type="number"
                  placeholder="金額"
                  name="postage"
                  value={formValue.postage}
                  onChange={(e) => handleEnvChange(e, 'postage')}
                  isInvalid={!!error.postage}
                />
                <InputGroup.Text>円</InputGroup.Text>
                {
                  error.postage && 
                  <Form.Control.Feedback type="invalid">{error.postage[0]}</Form.Control.Feedback>
                }
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        {/* <div className="d-flex justify-content-end">
          <Button variant="success" onClick={handleClick}>保存する</Button>
        </div> */}
      </Card.Body>
    </Card>
    <Card border="0" className="shadow mb-4">
      <Card.Header className="bg-primary text-white px-3 py-2">
        <h5 className="mb-0 fw-bolder">都道府県別送料設定</h5>
      </Card.Header> 
      <Card.Body>
        <div className="pb-4 border-bottom">
          <Form.Label>全国一律に設定</Form.Label>
          <InputGroup>
            <InputGroup.Text><CurrencyYenIcon className="icon icon-xs" /></InputGroup.Text>
            <Form.Control type="text" placeholder="金額" onChange={(e) => setAllApply(e.target.value)} />
            <Button variant="secondary" onClick={() => setPostageAll()}>各都道府県に適用</Button>
          </InputGroup>
        </div>
        <Row md={2} xl={3} className="justify-between">
          {postages.map((postage, index) => (
            <PostageForm {...postage} key={index} handleChange={handleChange} />
          ))}
        </Row>
      </Card.Body>
    </Card>
        <div className="d-flex justify-content-end mb-3">
          <Button variant="success" onClick={handleClick}>保存する</Button>
        </div>
  </>
  )
}