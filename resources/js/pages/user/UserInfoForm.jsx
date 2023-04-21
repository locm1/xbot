
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Tab, InputGroup, Button } from 'react-bootstrap';
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/l10n/ja.js';

import prefectures from "@/data/postage";
import { TagForm } from "./TagForm";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const UserInfoForm = (props) => {
  const { 
    first_name, last_name, first_name_kana, last_name_kana, birthDate, birth_date, gender, id,
    zipcode, prefecture, city, address, building_name, tel, occupation_id, setBirthDate, saveUser, occupations,
    selectedTags, tags, setSelectedTags
  } = props;

  const birthDateOptions = {
    locale: 'ja',
    onChange: (selectedDates, dateStr, instance) => setBirthDate(dateStr)
  }
  const areas = [
    '中央区', '北区', '東区', '白石区', '厚別区', '豊平区', 
    '清田区', '南区', '西区', '手稲区', '札幌市以外', '道外'
  ];

  const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary me-3",
      cancelButton: "btn btn-gray-100"
    },
    buttonsStyling: false
  }));



  return (
    <Card border="0" className="shadow mb-4">
      <Card.Header className="bg-primary text-white px-3 py-2">
        <h5 className="mb-0 fw-bolder">お客様情報</h5>
      </Card.Header>  
      <Card.Body>
        <Form>
          {/* <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>氏名（姓）</Form.Label>
                <Form.Control required type="text" name="last_name" value={last_name ?? ''} onChange={(e) => props.handleChange(e.target.value, 'last_name')} placeholder="" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>氏名（名）</Form.Label>
                <Form.Control required type="text" name="first_name" value={first_name ?? ''} onChange={(e) => props.handleChange(e.target.value, 'first_name')} placeholder="" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>ふりがな（姓）</Form.Label>
                <Form.Control required type="text" name="last_name_kana" value={last_name_kana ?? ''} onChange={(e) => props.handleChange(e.target.value, 'last_name_kana')} placeholder="" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>ふりがな（名）</Form.Label>
                <Form.Control required type="text" name="first_name_kana" value={first_name_kana ?? ''} onChange={(e) => props.handleChange(e.target.value, 'first_name_kana')} placeholder="" />
              </Form.Group>
            </Col>
          </Row> */}
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>生年月日</Form.Label>
                <Flatpickr
                  options={ birthDateOptions }
                  value={birth_date}
                  onChange={(e) => {
                    const formatedBirthDate = moment(e[0]).format("YYYY-MM-DD");
                    props.handleChange(formatedBirthDate, 'birth_date');
                  }}
                  render={(props, ref) => {
                    return (
                      <InputGroup>
                        <InputGroup.Text>
                          <CalendarIcon className="icon icon-xs" />
                        </InputGroup.Text>
                        <Form.Control
                          data-time_24hr
                          required
                          type="text"
                          placeholder="YYYY-MM-DD"
                          ref={ref}
                        />
                      </InputGroup>
                    );
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>性別</Form.Label>
                <Form.Select value={gender ?? ''} className="mb-0" onChange={(e) => props.handleChange(e.target.value, 'gender')}>
                  <option>選択してください</option>
                  <option value="1">男性</option>
                  <option value="2">女性</option>
                  <option value="3">その他</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col md={4} className="mb-3">
              <Form.Group id="zipcode">
                <Form.Label>郵便番号</Form.Label>
                <Form.Control required type="text" name="zipcode" value={zipcode ?? ''} onChange={(e) => props.handleChange(e.target.value, 'zipcode')} placeholder="" />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="email">
                <Form.Label>都道府県</Form.Label>
                <Form.Select value={prefecture ?? ''} className="mb-0" onChange={(e) => props.handleChange(e.target.value, 'prefecture')}>
                  {
                    prefectures.map((prefecture, index) => <option key={index} value={index + 1}>{prefecture.name}</option>)
                  }
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>市区町村</Form.Label>
                <Form.Control required type="text" name="city" value={city ?? ''} onChange={(e) => props.handleChange(e.target.value, 'city')} placeholder="" />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="address">
                <Form.Label>丁目・番地・号</Form.Label>
                <Form.Control required type="text" name="address" value={address ?? ''} onChange={(e) => props.handleChange(e.target.value, 'address')} placeholder="" />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="building_name">
                <Form.Label>建物名/会社名</Form.Label>
                <Form.Control required type="text" name="building_name" value={building_name ?? ''} onChange={(e) => props.handleChange(e.target.value, 'building_name')} placeholder="" />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>電話番号</Form.Label>
                <Form.Control required type="tel" name="tel" value={tel ?? ''} onChange={(e) => props.handleChange(e.target.value, 'tel')} placeholder="" />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>職業</Form.Label>
                <Form.Select value={occupation_id ?? ''} className="mb-0" name="occupation" onChange={(e) => props.handleChange(e.target.value, 'occupation')}>
                  <option>選択してください</option>
                  {
                    occupations.map((occupation, index) => <option key={index} value={occupation.id}>{occupation.name}</option>)
                  }
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={12} className="mb-3">
              <TagForm userId={id} tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            </Col>
          </Row>
        </Form>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-content-end">
          <Button variant="success" className="me-2 col-md-4 col-6" onClick={saveUser}>
            保存する
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};