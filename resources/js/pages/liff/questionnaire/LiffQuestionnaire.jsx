import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import '@splidejs/splide/css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import LiffQuestionnaireBirthdateForm from "@/pages/liff/questionnaire/LiffQuestionnaireBirthdateForm";
import LiffQuestionnaireForm from "@/pages/liff/questionnaire/LiffQuestionnaireForm";
import { getPrefectures } from "@/pages/liff/api/PrefectureApiMethods";
import { getQuestionnaires } from "@/pages/liff/api/QuestionnaireApiMethods";
import { getAddress } from "@/pages/liff/api/ZipcodeApiMethods";

export default () => {
  const [questionnaires, setQuestionnaires] = useState([
    {id: '', title: '', questionnaire_items: [{
      name: ''
    }], type: 1}
  ]);
  const [prefectures, setPrefectures] = useState([]);

  const occupations = [
    '会社員', '公務員', '自営業', '会社役員', '自由業', 
    '専業主婦（夫）', '学生', 'パート・アルバイト', '無職', 
  ];
  const [formValue, setFormValue] = useState({
    last_name: '', first_name: '', last_name_kana: '', first_name_kana: '',
    year: 1990, month: '', day: '', gender: '男性', tel: '', occupation: '会社員', zipcode: '',
    prefecture: '', city: '', address: '', building_name: '', room_number: ''
  });

  const genders = ['男性', '女性', 'その他'];

  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
  };

  const changeGender = (gender) => {
    setFormValue({...formValue, gender: gender})
  };

  const searchZipCode = (e, input) => {
    handleChange(e, input)

    if (e.target.value.length == 7) {
      getAddress(e.target.value, setFormValue, formValue)
    }
  };

  const handleClick = () => {
    const idToken = Cookies.get('TOKEN');
    formValue.birth_date = formValue.year + '-' + formValue.month + '-' + formValue.day
    formValue.building_name += ' ' + formValue.room_number
    console.log(formValue);
  };

  useEffect(() => {
    getPrefectures(setPrefectures)
    getQuestionnaires(setQuestionnaires)
  }, []);
  
  return (
    <>
      <main className="">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        <div className="liff-product-list">
          <div className="d-flex align-items-center">
            <h2 className="fs-5 liff-product-detail-name mb-3 ms-3">アンケートにお答えください</h2>
          </div>
          <Card border="0" className="shadow mt-2">
            <Card.Header className="border-bottom">
              <h2 className="fs-6 fw-bold mb-0">お客様の情報</h2>
            </Card.Header>
            <Card.Body className="py-0">
              <Row className="mt-3">
                <Col xs={6} className="mb-3">
                  <Form.Group id="last_name">
                    <Form.Label>氏名（姓）</Form.Label>
                    <Form.Control 
                      required
                      type="text" 
                      name="last_name" 
                      value={formValue.last_name} 
                      onChange={(e) => handleChange(e, 'last_name')} 
                      placeholder="山田" 
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} className="mb-3">
                  <Form.Group id="first_name">
                    <Form.Label>氏名（名）</Form.Label>
                    <Form.Control 
                      required
                      type="text"
                      name="first_name"
                      value={formValue.first_name} 
                      onChange={(e) => handleChange(e, 'first_name')} 
                      placeholder="太郎"
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} className="mb-3">
                  <Form.Group id="last_name_kana">
                    <Form.Label>フリガナ（姓）</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="last_name_kana"
                      value={formValue.last_name_kana} 
                      onChange={(e) => handleChange(e, 'last_name_kana')} 
                      placeholder="ヤマダ"
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} className="mb-3">
                  <Form.Group id="first_name_kana">
                    <Form.Label>フリガナ（名）</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="first_name_kana"
                      value={formValue.first_name_kana} 
                      onChange={(e) => handleChange(e, 'first_name_kana')} 
                      placeholder="タロウ" 
                    />
                  </Form.Group>
                </Col>
              </Row>

              <LiffQuestionnaireBirthdateForm formValue={formValue} handleChange={handleChange} />

              <Row className="">
                <Col xs={12} className="mb-3">
                  <Form.Group id="gender">
                    <Form.Label>性別</Form.Label>
                      <div>
                        {
                          genders.map((gender, index) => 
                            <Form.Check
                              key={`gender-${index + 1}`}
                              defaultChecked={index == 0 ? true : false}
                              type="radio"
                              defaultValue={gender}
                              label={gender}
                              name="gender"
                              value={gender}
                              id={`gender-${gender}`}
                              htmlFor={`gender-${gender}`}
                              onChange={() => changeGender(gender)}
                            />
                          )
                        }
                      </div>
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-3">
                  <Form.Group id="tel">
                    <Form.Label>電話番号</Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      name="tel"
                      placeholder="08000000000"
                      value={formValue.tel} 
                      onChange={(e) => handleChange(e, 'tel')} 
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-3">
                  <Form.Group id="occupation">
                    <Form.Label>ご職業</Form.Label>
                    <Form.Select defaultValue="0" value={formValue.occupation} onChange={(e) => handleChange(e, 'occupation')} className="mb-0 w-100">
                      {
                        occupations.map((occupation, index) => <option key={index} value={index + 1}>{occupation}</option>)
                      }
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="">
                <Col xs={6} className="mb-3">
                  <Form.Group id="zipcode">
                    <Form.Label>郵便番号</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="zipcode"
                      placeholder="0001111"
                      value={formValue.zipcode} 
                      onChange={(e) => searchZipCode(e, 'zipcode')} 
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="">
                <Col xs={12} className="mb-3">
                  <Form.Group id="prefecture">
                    <Form.Label>都道府県</Form.Label>
                    <Form.Select defaultValue="0" value={formValue.prefecture} onChange={(e) => handleChange(e, 'prefecture')} className="mb-0 w-100">
                      {
                        prefectures && prefectures.map((prefecture, index) => <option key={index} value={prefecture.name}>{prefecture.name}</option>)
                      }
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-3">
                  <Form.Group id="city">
                    <Form.Label>市区町村</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="city"
                      placeholder="例）札幌市中央区南一条西"
                      value={formValue.city} 
                      onChange={(e) => handleChange(e, 'city')} 
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-3">
                  <Form.Group id="address">
                    <Form.Label>丁目・番地・号</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="address"
                      placeholder="例）5-16"
                      value={formValue.address} 
                      onChange={(e) => handleChange(e, 'address')} 
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-3">
                  <Form.Group id="building_name">
                    <Form.Label>建物名/会社名</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="building_name"
                      placeholder="例）プレジデント松井ビル100"
                      value={formValue.building_name} 
                      onChange={(e) => handleChange(e, 'building_name')} 
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-3">
                  <Form.Group id="room_number">
                    <Form.Label>部屋番号</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="room_number"
                      placeholder="例）3"
                      value={formValue.room_number} 
                      onChange={(e) => handleChange(e, 'room_number')} 
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <LiffQuestionnaireForm questionnaires={questionnaires} />

          <Card border="0" className="shadow mt-4">
            <Card.Header className="border-bottom">
              <h2 className="fs-6 fw-bold mb-0">個人情報の取り扱いについて</h2>
            </Card.Header>
            <Card.Body className="py-0">
              <Row className="mt-3">
                <Col xs={12} className="mb-3">
                  <p>
                    記載していただいた個人情報は、お客様により良いサービスをご提供する目的で使用し、ご本人の同意がなければ第三者に個人情報を提供することはございません。
                  </p>
                  <p>
                    取得した個人情報は管理責任者を定め、紛失や漏洩などが発生しないよう積極的な安全対策を実施いたします。
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <div className="align-items-center m-2 mt-4">
            <Button onClick={handleClick} variant="tertiary" className="w-100 p-3">
              上記内容に同意して送信する
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};