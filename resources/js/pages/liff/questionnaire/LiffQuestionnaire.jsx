import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import '@splidejs/splide/css';
import Cookies from 'js-cookie';
import liff from '@line/liff';
import { Link, useLocation } from 'react-router-dom';
import { Paths } from "@/paths";

import LiffQuestionnaireBirthdateForm from "@/pages/liff/questionnaire/LiffQuestionnaireBirthdateForm";
import LiffQuestionnaireForm from "@/pages/liff/questionnaire/LiffQuestionnaireForm";
import { getPrefectures } from "@/pages/liff/api/PrefectureApiMethods";
import { getQuestionnaires, storeQuestionnaireAnswers } from "@/pages/liff/api/QuestionnaireApiMethods";
import { getAddress } from "@/pages/liff/api/ZipcodeApiMethods";
import { getUser, updateUser } from "@/pages/liff/api/UserApiMethods";
import { storeOrderDestination } from "@/pages/liff/api/OrderDestinationApiMethods";
import { getOccupations } from "@/pages/liff/api/OccupationApiMethods";

export default () => {
  const location = useLocation().pathname;
  const [questionnaires, setQuestionnaires] = useState([
    {id: '', title: '', type: 1, answer: '', is_required: 0, questionnaire_items: [{
      name: ''
    }]}
  ]);
  const [user, setUser] = useState({
    is_registered: 0
  });
  const [prefectures, setPrefectures] = useState([]);
  const [isChecks, setIsChecks] = useState([]);

  const [occupations, setOccupations] = useState([]);
  const [formValue, setFormValue] = useState({
    last_name: '', first_name: '', last_name_kana: '', first_name_kana: '',
    year: 1990, month: '', day: '', gender: 1, tel: '', occupation_id: 1, zipcode: '',
    prefecture: '', city: '', address: '', building_name: '', room_number: ''
  });
  const [errors, setErrors] = useState({
    last_name: '', first_name: '', last_name_kana: '', first_name_kana: '',
    year: 1990, month: '', day: '', gender: 1, tel: '', occupation_id: 1, zipcode: '',
    prefecture: '', city: '', address: '', building_name: '', room_number: ''
  });
  const [questionnaireErrors, setQuestionnaireErrors] = useState({
    "questionnaires.0.answer": ''
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

  const onSaveUser = () => {
    formValue.is_registered = 1
    console.log(formValue);
    //updateUser(100, formValue, setErrors)
    updateUser(user.id, formValue, setErrors)
  };

  const onSaveOrderDestination = () => {
    console.log(location);
    formValue.is_selected = 1
    console.log(formValue);
    storeOrderDestination(user.id, formValue, location)
    // storeOrderDestination(101, formValue)
  };

  const onSaveQuestionnaireAnswers = () => {
    const newQuestionnaires = questionnaires.filter((questionnaire, index) => {
      return questionnaire.answer
    });
    console.log(newQuestionnaires);
    storeQuestionnaireAnswers(user.id, {questionnaires: newQuestionnaires}, setQuestionnaireErrors)
    //storeQuestionnaireAnswers(100, {questionnaires: newQuestionnaires}, setQuestionnaireErrors)
  };

  const handleClick = () => {
    formValue.birth_date = formValue.year + '-' + formValue.month + '-' + formValue.day
    formValue.building_name += ' ' + formValue.room_number
    onSaveUser()
    onSaveOrderDestination()
    onSaveQuestionnaireAnswers()
  };

  const answerSurvey = (e, id, type, questionnaire_item_id) => {
    const targetQuestionnaire = questionnaires.find((questionnaire) => (questionnaire.id === id));

    if (type == 4) {
      const newAnswer = {questionnaire_item_id: questionnaire_item_id, value: e.target.value};

      if (e.target.checked) {
        targetQuestionnaire.answer = (targetQuestionnaire.answer) ? [...targetQuestionnaire.answer, newAnswer] : [newAnswer];
      } else {
        targetQuestionnaire.answer = targetQuestionnaire.answer.filter((answer, index) => (answer.questionnaire_item_id !== questionnaire_item_id));
      }

    } else {
      targetQuestionnaire.answer = e.target.value;
    }
    setQuestionnaires(questionnaires.map((questionnaire) => (questionnaire.id === id ? targetQuestionnaire : questionnaire)));
  };

  const getLiffIdToken = () => {
    liff.init({
      liffId: process.env.MIX_LIFF_ID
    })
    .then(() => {
      const idToken = liff.getIDToken();
      Cookies.set('TOKEN', idToken, { expires: 1/24 })
    }); 
  };
  
  const getLiffLocalStorageKeys = (prefix) => {
    const keys = []
    for (var i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key.indexOf(prefix) === 0) {
        keys.push(key)
      }
    }
    return keys
  }
  
  const clearExpiredIdToken = (liffId) => {
    const keyPrefix = `LIFF_STORE:${liffId}:`
    const key = keyPrefix + 'decodedIDToken'
    const decodedIDTokenString = localStorage.getItem(key)
    if (!decodedIDTokenString) {
      return
    }
    const decodedIDToken = JSON.parse(decodedIDTokenString)
    // 有効期限をチェック
    if (new Date().getTime() > decodedIDToken.exp * 1000) {
        const keys = getLiffLocalStorageKeys(keyPrefix)
        keys.forEach(function(key) {
          localStorage.removeItem(key)
        })
    }
  }

  useEffect(() => {
    const idToken = Cookies.get('TOKEN');
    getUser(idToken, setUser)
    getPrefectures(setPrefectures)
    getQuestionnaires(setQuestionnaires)
    getOccupations(setOccupations)
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
                <Col xs={6} className="mb-5">
                  <Form.Group id="last_name">
                    <Form.Label>
                      <span class="questionnaire-required me-2">必須</span>氏名（姓）</Form.Label>
                    <Form.Control 
                      required
                      type="text" 
                      name="last_name" 
                      value={formValue.last_name} 
                      onChange={(e) => handleChange(e, 'last_name')} 
                      placeholder="例）山田" 
                      isInvalid={formValue.last_name !== '' ? false : errors.last_name ? true : false}
                      autoComplete="family-name"
                    />
                    {
                      errors.last_name && 
                      <Form.Control.Feedback type="invalid">{errors.last_name[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
                <Col xs={6} className="mb-5">
                  <Form.Group id="first_name">
                    <Form.Label><span class="questionnaire-required me-2">必須</span>氏名（名）</Form.Label>
                    <Form.Control 
                      required
                      type="text"
                      name="first_name"
                      value={formValue.first_name} 
                      onChange={(e) => handleChange(e, 'first_name')} 
                      placeholder="例）太郎"
                      isInvalid={formValue.first_name !== '' ? false : errors.first_name ? true : false}
                      autoComplete="given-name"
                    />
                    {
                      errors.first_name && 
                      <Form.Control.Feedback type="invalid">{errors.first_name[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
                <Col xs={6} className="mb-5">
                  <Form.Group id="last_name_kana">
                    <Form.Label><span class="questionnaire-required me-2">必須</span>フリガナ（姓）</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="last_name_kana"
                      value={formValue.last_name_kana} 
                      onChange={(e) => handleChange(e, 'last_name_kana')} 
                      placeholder="例）ヤマダ"
                      isInvalid={formValue.last_name_kana !== '' ? false : errors.last_name_kana ? true : false}
                      autoComplete="family-name"
                    />
                    {
                      errors.last_name_kana && 
                      <Form.Control.Feedback type="invalid">{errors.last_name_kana[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
                <Col xs={6} className="mb-5">
                  <Form.Group id="first_name_kana">
                    <Form.Label><span class="questionnaire-required me-2">必須</span>フリガナ（名）</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="first_name_kana"
                      value={formValue.first_name_kana} 
                      onChange={(e) => handleChange(e, 'first_name_kana')} 
                      placeholder="例）タロウ" 
                      isInvalid={formValue.first_name_kana !== '' ? false : errors.first_name_kana ? true : false}
                      autoComplete="given-name"
                    />
                    {
                      errors.first_name_kana && 
                      <Form.Control.Feedback type="invalid">{errors.first_name_kana[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
              </Row>

              <LiffQuestionnaireBirthdateForm formValue={formValue} handleChange={handleChange} />

              <Row className="">
                <Col xs={12} className="mb-5">
                  <Form.Group id="gender">
                    <Form.Label><span class="questionnaire-required me-2">必須</span>性別</Form.Label>
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
                              value={index + 1}
                              id={`gender-${gender}`}
                              htmlFor={`gender-${gender}`}
                              onChange={() => changeGender(index + 1)}
                            />
                          )
                        }
                      </div>
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-5">
                  <Form.Group id="tel">
                    <Form.Label><span class="questionnaire-required me-2">必須</span>電話番号</Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      name="tel"
                      placeholder="例）08000000000"
                      value={formValue.tel} 
                      onChange={(e) => handleChange(e, 'tel')} 
                      isInvalid={formValue.tel !== '' ? false : errors.tel ? true : false}
                      autoComplete="tel"
                    />
                    {
                      errors.tel && 
                      <Form.Control.Feedback type="invalid">{errors.tel[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-5">
                  <Form.Group id="occupation">
                    <Form.Label><span class="questionnaire-required me-2">必須</span>ご職業</Form.Label>
                    <Form.Select defaultValue="0" value={formValue.occupation_id} onChange={(e) => handleChange(e, 'occupation_id')} className="mb-0 w-100">
                      {
                        occupations.map((occupation, index) => <option key={index} value={occupation.id}>{occupation.name}</option>)
                      }
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="">
                <Col xs={12} className="mb-5">
                  <Form.Group id="zipcode">
                    <Form.Label><span class="questionnaire-required me-2">必須</span>郵便番号</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="zipcode"
                      placeholder="例）0001111"
                      value={formValue.zipcode} 
                      onChange={(e) => searchZipCode(e, 'zipcode')} 
                      isInvalid={formValue.zipcode !== '' ? false : errors.zipcode ? true : false}
                      autoComplete="postal-code"
                    />
                    {
                      errors.zipcode && 
                      <Form.Control.Feedback type="invalid">{errors.zipcode[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
              </Row>
              <Row className="">
                <Col xs={12} className="mb-5">
                  <Form.Group id="prefecture">
                    <Form.Label><span class="questionnaire-required me-2">必須</span>都道府県</Form.Label>
                    <Form.Select defaultValue="0" value={formValue.prefecture} onChange={(e) => handleChange(e, 'prefecture')} className="mb-0 w-100">
                      {
                        prefectures && prefectures.map((prefecture, index) => <option key={index} value={prefecture.name}>{prefecture.name}</option>)
                      }
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-5">
                  <Form.Group id="city">
                    <Form.Label><span class="questionnaire-required me-2">必須</span>市区町村</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="city"
                      placeholder="例）札幌市中央区南一条西"
                      value={formValue.city} 
                      onChange={(e) => handleChange(e, 'city')} 
                      isInvalid={formValue.city !== '' ? false : errors.city ? true : false}
                      autoComplete="address-level2"
                    />
                    {
                      errors.city && 
                      <Form.Control.Feedback type="invalid">{errors.city[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-5">
                  <Form.Group id="address">
                    <Form.Label><span class="questionnaire-required me-2">必須</span>丁目・番地・号</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="address"
                      placeholder="例）5-16"
                      value={formValue.address} 
                      onChange={(e) => handleChange(e, 'address')} 
                      isInvalid={formValue.address !== '' ? false : errors.address ? true : false}
                      autoComplete="address-level3"
                    />
                    {
                      errors.address && 
                      <Form.Control.Feedback type="invalid">{errors.address[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-5">
                  <Form.Group id="building_name">
                    <Form.Label><span class="questionnaire-required me-2">必須</span>建物名/会社名</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="building_name"
                      placeholder="例）プレジデント松井ビル100"
                      value={formValue.building_name} 
                      onChange={(e) => handleChange(e, 'building_name')} 
                      isInvalid={formValue.building_name !== '' ? false : errors.building_name ? true : false}
                      autoComplete="address-level4"
                    />
                    {
                      errors.building_name && 
                      <Form.Control.Feedback type="invalid">{errors.building_name[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-5">
                  <Form.Group id="room_number">
                    <Form.Label><span class="questionnaire-any me-2">任意</span>部屋番号</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="room_number"
                      placeholder="例）3"
                      value={formValue.room_number} 
                      onChange={(e) => handleChange(e, 'room_number')} 
                      autoComplete="address-level4"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <LiffQuestionnaireForm questionnaires={questionnaires} answerSurvey={answerSurvey} questionnaireErrors={questionnaireErrors} />

          <Card border="0" className="shadow mt-4">
            <Card.Header className="border-bottom">
              <h2 className="fs-6 fw-bold mb-0">個人情報の取り扱いについて</h2>
            </Card.Header>
            <Card.Body className="py-0">
              <Row className="mt-3">
                <Col xs={12} className="mb-5">
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