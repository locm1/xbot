import React, { useState, useRef, useEffect, useContext } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import '@splidejs/splide/css';
import Cookies from 'js-cookie';
import liff from '@line/liff';
import { Link, useLocation, Redirect, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";

import LiffQuestionnaireBirthdateForm from "@/pages/liff/questionnaire/LiffQuestionnaireBirthdateForm";
import LiffQuestionnaireForm from "@/pages/liff/questionnaire/LiffQuestionnaireForm";
import LiffAlreadyQuestionnaire from "@/pages/liff/questionnaire/LiffAlreadyQuestionnaire";
import { getPrefectures } from "@/pages/liff/api/PrefectureApiMethods";
import { getQuestionnaires, storeQuestionnaireAnswers, showQuestionnaireEnabling, getUserInfoStatuses } from "@/pages/liff/api/QuestionnaireApiMethods";
import { getAddress } from "@/pages/liff/api/ZipcodeApiMethods";
import { getUser, updateUser } from "@/pages/liff/api/UserApiMethods";
import { storeOrderDestination } from "@/pages/liff/api/OrderDestinationApiMethods";
import { getOccupations } from "@/pages/liff/api/OccupationApiMethods";
import { LoadingContext } from "@/components/LoadingContext";

export default () => {
  const { setIsLoading } = useContext(LoadingContext);
  const history = useHistory();
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
  const [questionnaireEnabling, setQuestionnaireEnabling] = useState({});
  const [userInfoStatuses, setUserInfoStatuses] = useState([
    {name: '氏名', is_required: 0},
    {name: 'フリガナ', is_required: 0},
    {name: '生年月日', is_required: 0},
    {name: '性別', is_required: 0},
    {name: '電話番号', is_required: 0},
    {name: 'ご職業', is_required: 0},
    {name: '郵便番号', is_required: 0},
    {name: '都道府県', is_required: 0},
    {name: '市区町村', is_required: 0},
    {name: '丁目・番地・号', is_required: 0},
    {name: '建物名/会社名', is_required: 0},
    {name: '部屋番号', is_required: 0},
  ]);
  const [occupations, setOccupations] = useState([]);
  const [formValue, setFormValue] = useState({
    last_name: '', first_name: '', last_name_kana: '', first_name_kana: '',
    year: 1990, month: 1, day: 1, gender: 1, tel: '', occupation_id: 1, zipcode: '',
    prefecture: '', city: '', address: '', building_name: '', room_number: ''
  });
  const [errors, setErrors] = useState({
    last_name: '', first_name: '', last_name_kana: '', first_name_kana: '',
    year: 1990, month: '', day: '', gender: 1, tel: '', occupation_id: 1, zipcode: '',
    prefecture: '', city: '', address: '', building_name: '', room_number: '',
    "questionnaires.0.answer": ''
  });

  const genders = ['男性', '女性', 'その他'];

  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
    setErrors({...errors, [input]: ''})
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
    setIsLoading(true);
    formValue.birth_date = formValue.year + '-' + formValue.month + '-' + formValue.day
    formValue.building_name += ' ' + formValue.room_number
    formValue.is_registered = 1
    formValue.is_selected = 1
    // const newQuestionnaires = questionnaires.filter((questionnaire, index) => {
    //   return questionnaire.answer
    // });
    Object.assign(formValue, {questionnaires: questionnaires});
    console.log(formValue);
    console.log(user);
    // storeQuestionnaireAnswers(user.id, formValue, setErrors, setIsLoading, onSave)
    storeQuestionnaireAnswers(1, formValue, setErrors, setIsLoading, onSave)
    //storeQuestionnaireAnswers(user.id, formValue, setErrors)
    //storeQuestionnaireAnswers(100, {questionnaires: newQuestionnaires}, setQuestionnaireErrors)

  };

  const onSave = () => {
    const currentPage = Cookies.get('current_page')
    const path = (currentPage == 'cart') ? '/checkout' : '/questionnaire/complete'
    history.push(path);
  };

  const answerSurvey = (e, id, type, questionnaire_item_id, index) => {
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
    setErrors({...errors, [`questionnaires.${index}.answer`]: ''})
    setQuestionnaires(questionnaires.map((questionnaire) => (questionnaire.id === id ? targetQuestionnaire : questionnaire)));
  };

  const UserInfoIsRequired = (name) => {
    const userInfoStatus = userInfoStatuses.find(status => status.name == name);
    if (userInfoStatus.is_required == 1) {
      return <span className="questionnaire-required me-2">必須</span>
    } else {
      return <span className="questionnaire-any me-2">任意</span>
    }
  };

  useEffect(() => {
    // const idToken = liff.getIDToken();
    // getUser(idToken, setUser).then(response => {
    //   if (response.is_registered == 1) {
    //     history.push(Paths.LiffAlreadyQuestionnaire.path);
    //   }
    // })
    getUserInfoStatuses(setUserInfoStatuses)
    showQuestionnaireEnabling(1, setQuestionnaireEnabling)
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

          {
            questionnaireEnabling.is_default_questionnaire_enabled == 1 && (
              <Card border="0" className="shadow mt-2">
                <Card.Header className="border-bottom">
                  <h2 className="fs-6 fw-bold mb-0">お客様の情報</h2>
                </Card.Header>
                <Card.Body className="py-0">
                  <Row className="mt-3">
                    <Col xs={12} className="mb-5">
                      <Form.Label>{UserInfoIsRequired('氏名')}氏名</Form.Label>
                      <div className="d-flex">
                        <Form.Group id="last_name" className="pe-3">
                          <Form.Control 
                            required
                            type="text" 
                            name="last_name" 
                            value={formValue.last_name} 
                            onChange={(e) => handleChange(e, 'last_name')} 
                            placeholder="例）山田" 
                            isInvalid={!!errors.last_name}
                            autoComplete="family-name"
                          />
                          {
                            errors.last_name && 
                            <Form.Control.Feedback type="invalid">{errors.last_name[0]}</Form.Control.Feedback>
                          }
                        </Form.Group>
                        <Form.Group id="first_name" className="ps-3">
                          <Form.Control 
                            required
                            type="text"
                            name="first_name"
                            value={formValue.first_name} 
                            onChange={(e) => handleChange(e, 'first_name')} 
                            placeholder="例）太郎"
                            isInvalid={!!errors.first_name}
                            autoComplete="given-name"
                          />
                          {
                            errors.first_name && 
                            <Form.Control.Feedback type="invalid">{errors.first_name[0]}</Form.Control.Feedback>
                          }
                        </Form.Group>
                      </div>
                    </Col>
                    <Col xs={12} className="mb-5">
                      <Form.Label>{UserInfoIsRequired('フリガナ')}フリガナ</Form.Label>
                      <div className="d-flex">
                        <Form.Group id="last_name_kana" className="pe-3">
                          <Form.Control
                            required
                            type="text"
                            name="last_name_kana"
                            value={formValue.last_name_kana} 
                            onChange={(e) => handleChange(e, 'last_name_kana')} 
                            placeholder="例）ヤマダ"
                            isInvalid={!!errors.last_name_kana}
                            autoComplete="family-name"
                          />
                          {
                            errors.last_name_kana && 
                            <Form.Control.Feedback type="invalid">{errors.last_name_kana[0]}</Form.Control.Feedback>
                          }
                        </Form.Group>
                        <Form.Group id="first_name_kana" className="ps-3">
                          <Form.Control
                            required
                            type="text"
                            name="first_name_kana"
                            value={formValue.first_name_kana} 
                            onChange={(e) => handleChange(e, 'first_name_kana')} 
                            placeholder="例）タロウ"
                            isInvalid={!!errors.first_name_kana}
                            autoComplete="given-name"
                          />
                          {
                            errors.last_name_kana && 
                            <Form.Control.Feedback type="invalid">{errors.last_name_kana[0]}</Form.Control.Feedback>
                          }
                        </Form.Group>
                      </div>
                    </Col>
                  </Row>
                        
                  <LiffQuestionnaireBirthdateForm formValue={formValue} handleChange={handleChange} UserInfoIsRequired={UserInfoIsRequired} />
                        
                  <Row className="">
                    <Col xs={12} className="mb-5">
                      <Form.Group id="gender">
                        <Form.Label>{UserInfoIsRequired('性別')}性別</Form.Label>
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
                        <Form.Label>{UserInfoIsRequired('電話番号')}電話番号</Form.Label>
                        <Form.Control
                          required
                          type="tel"
                          name="tel"
                          placeholder="例）08000000000"
                          value={formValue.tel} 
                          onChange={(e) => handleChange(e, 'tel')} 
                          isInvalid={!!errors.tel}
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
                        <Form.Label>{UserInfoIsRequired('ご職業')}ご職業</Form.Label>
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
                        <Form.Label>{UserInfoIsRequired('郵便番号')}郵便番号</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          name="zipcode"
                          placeholder="例）0001111"
                          value={formValue.zipcode} 
                          onChange={(e) => searchZipCode(e, 'zipcode')} 
                          isInvalid={!!errors.zipcode}
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
                        <Form.Label>{UserInfoIsRequired('都道府県')}都道府県</Form.Label>
                        <Form.Select defaultValue="0" value={formValue.prefecture} onChange={(e) => handleChange(e, 'prefecture')} className="mb-0 w-100">
                          {
                            prefectures && prefectures.map((prefecture, index) => <option key={index} value={prefecture.name}>{prefecture.name}</option>)
                          }
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12} className="mb-5">
                      <Form.Group id="city">
                        <Form.Label>{UserInfoIsRequired('市区町村')}市区町村</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="city"
                          placeholder="例）札幌市中央区南一条西"
                          value={formValue.city} 
                          onChange={(e) => handleChange(e, 'city')} 
                          isInvalid={!!errors.city}
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
                        <Form.Label>{UserInfoIsRequired('丁目・番地・号')}丁目・番地・号</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="address"
                          placeholder="例）5-16"
                          value={formValue.address} 
                          onChange={(e) => handleChange(e, 'address')} 
                          isInvalid={!!errors.address}
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
                        <Form.Label>{UserInfoIsRequired('建物名/会社名')}建物名/会社名</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="building_name"
                          placeholder="例）プレジデント松井ビル100"
                          value={formValue.building_name} 
                          onChange={(e) => handleChange(e, 'building_name')} 
                          isInvalid={!!errors.building_name}
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
                        <Form.Label>{UserInfoIsRequired('部屋番号')}部屋番号</Form.Label>
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
            )
          }

          {
            questionnaireEnabling.is_questionnaire_enabled == 1 && (
              <LiffQuestionnaireForm
                questionnaires={questionnaires}
                answerSurvey={answerSurvey}
                questionnaireErrors={errors}
              />
            )
          }

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