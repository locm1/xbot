import React, { useState } from "react";
import { CurrencyYenIcon } from "@heroicons/react/solid"
import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import prefectures from "@/data/postage"
import { PostageForm } from "./PostageForm"
export default () => {
  const [allApply, setAllApply] = useState();
  const [prefecturesObject, setPrefectures] = useState(prefectures);
  const setPostageAll = () => {
    const newPrefectureObject = prefecturesObject.map((prefecture) => {
      prefecture.value = allApply;
      return prefecture;
    })
    console.log(newPrefectureObject);
    setPrefectures(newPrefectureObject);
  }
  return (
  <>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      <div className="d-block mb-4 mb-md-0">
        <h1 className="page-title">送料管理</h1>
      </div>
    </div>
    <Card border="0" className="shadow mb-4">
      <Card.Body>
        <h5 className="mb-4 border-bottom pb-3">都道府県別送料設定</h5>
        <Form className="pb-4 border-bottom">
          <Form.Label>全国一律に設定</Form.Label>
          <InputGroup>
            <InputGroup.Text><CurrencyYenIcon className="icon icon-xs" /></InputGroup.Text>
            <Form.Control type="text" placeholder="金額" onChange={(e) => setAllApply(e.target.value)} />
            <Button variant="secondary" onClick={() => setPostageAll()}>各都道府県に適用</Button>
          </InputGroup>
        </Form>
        <Container>
          <Row md={2}>
            {prefecturesObject.map((prefecture, index) => (
              <PostageForm {...prefecture} key={index} />
            ))}
          </Row>
        </Container>
        <div className="d-flex justify-content-end">
          <Button variant="tertiary">保存する</Button>
        </div>
      </Card.Body>
    </Card>
  </>
  )
}