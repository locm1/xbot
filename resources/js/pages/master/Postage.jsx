import React, { useState, useEffect } from "react";
import { CurrencyYenIcon } from "@heroicons/react/solid"
import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import { PostageForm } from "./PostageForm"

import { updatePostage, getPostages, storePostage } from "@/pages/master/api/PostageApiMethods";

export default () => {
  const [allApply, setAllApply] = useState();
  const [postages, setPostages] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [results, setResults] = useState([]);

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

  const handleClick = () => {
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
  }, []);


  return (
  <>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      <div className="d-block mb-4 mb-md-0">
        <h1 className="page-title">送料管理</h1>
      </div>
    </div>
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
        <div className="d-flex justify-content-end">
          <Button variant="tertiary" onClick={handleClick}>保存する</Button>
        </div>
      </Card.Body>
    </Card>
  </>
  )
}