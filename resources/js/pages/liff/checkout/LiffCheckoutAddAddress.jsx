import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import Cookies from 'js-cookie';
import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import { getPrefectures } from "@/pages/liff/api/PrefectureApiMethods";
import { storeOrderDestination, showOrderDestination, updateOrderDestination } from "@/pages/liff/api/OrderDestinationApiMethods";
import { getAddress } from "@/pages/liff/api/ZipcodeApiMethods";
import { getUser } from "@/pages/liff/api/UserApiMethods";

export default () => {
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation().pathname;
  const pathname = useLocation().pathname;
  const [prefectures, setPrefectures] = useState([]);
  const [formValue, setFormValue] = useState({
    last_name: '', first_name: '', last_name_kana: '', first_name_kana: '',
    tel: '', occupation_id: 1, zipcode: '', prefecture: '北海道', city: '', 
    address: '', building_name: '', room_number: ''
  });
  const [user, setUser] = useState({
    is_registered: 0
  });

  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
  };

  const searchZipCode = (e, input) => {
    handleChange(e, input)

    if (e.target.value.length == 7) {
      getAddress(e.target.value, setFormValue, formValue)
    }
  };

  const handleClick = () => {
    formValue.building_name += ' ' + formValue.room_number
    console.log(formValue);
    formValue.is_selected = 0
    if (pathname.includes('/edit')) {
      updateOrderDestination(user.id, id, formValue, updateComplete)
      //updateOrderDestination(101, id, formValue, updateComplete)
    } else {
      storeOrderDestination(user.id, formValue, location)
      //storeOrderDestination(101, formValue, location)
    }
  };

  const updateComplete = () => {
    if (pathname.includes('/edit')) {
      history.push(Paths.LiffCheckoutDestinations.path);
    } else {
      //storeOrderDestination(user.id, formValue)
      //storeOrderDestination(101, formValue, location)
    }
  };

  useEffect(() => {
    const idToken = Cookies.get('TOKEN');
    getPrefectures(setPrefectures)

    if (pathname.includes('/edit')) {
      getUser(idToken, setUser).then(response => {
        showOrderDestination(response.id, id, setFormValue)
      })
      //showOrderDestination(101, id, setFormValue)
    }
  }, []);

  return (
    <>
      <main className="liff-product-detail">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        <div className="">
          <Link to={Paths.LiffCheckoutDestinations.path} className="d-flex align-items-center p-2">
            <div className="">
              <span className="link-arrow">
                <ChevronLeftIcon className="icon icon-sm" />
              </span>
            </div>
            <h2 className="fs-6 fw-bold mb-0 ms-2">戻る</h2>
          </Link>
        </div>
        <Card border="0" className="shadow mt-2">
          <Card.Header className="border-bottom">
            <h2 className="fs-6 fw-bold mb-0">{pathname.includes('/edit') ? 'お届け先の編集' : 'お届け先の追加'}</h2>
          </Card.Header>
          <Card.Body className="py-0">
            <Row className="mt-3">
              <Col xs={6} className="mb-3">
                <Form.Group id="last_name">
                  <Form.Label><span class="questionnaire-required me-2">必須</span>氏名（姓）</Form.Label>
                  <Form.Control 
                    required
                    type="text" 
                    name="last_name" 
                    value={formValue.last_name} 
                    onChange={(e) => handleChange(e, 'last_name')} 
                    placeholder="山田" 
                    autoComplete="family-name"
                  />
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group id="first_name">
                  <Form.Label><span class="questionnaire-required me-2">必須</span>氏名（名）</Form.Label>
                  <Form.Control 
                    required
                    type="text"
                    name="first_name"
                    value={formValue.first_name} 
                    onChange={(e) => handleChange(e, 'first_name')} 
                    placeholder="太郎"
                    autoComplete="given-name"
                  />
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group id="last_name_kana">
                  <Form.Label><span class="questionnaire-required me-2">必須</span>フリガナ（姓）</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="last_name_kana"
                    value={formValue.last_name_kana} 
                    onChange={(e) => handleChange(e, 'last_name_kana')} 
                    placeholder="ヤマダ"
                    autoComplete="family-name"
                  />
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group id="first_name_kana">
                  <Form.Label><span class="questionnaire-required me-2">必須</span>フリガナ（名）</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="first_name_kana"
                    value={formValue.first_name_kana} 
                    onChange={(e) => handleChange(e, 'first_name_kana')} 
                    placeholder="タロウ" 
                    autoComplete="given-name"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="">
              <Col xs={6} className="mb-3">
                <Form.Group id="zipcode">
                  <Form.Label><span class="questionnaire-required me-2">必須</span>郵便番号</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="zipcode"
                    placeholder="0001111"
                    value={formValue.zipcode} 
                    onChange={(e) => searchZipCode(e, 'zipcode')} 
                    autoComplete="postal-code"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="">
                <Col xs={12} className="mb-3">
                  <Form.Group id="prefecture">
                    <Form.Label><span class="questionnaire-required me-2">必須</span>都道府県</Form.Label>
                    <Form.Select defaultValue="0" value={formValue.prefecture} onChange={(e) => handleChange(e, 'prefecture')} className="mb-0 w-100">
                      {
                        prefectures && prefectures.map((prefecture, index) => <option key={index} value={prefecture.name}>{prefecture.name}</option>)
                      }
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-3">
                  <Form.Group id="city">
                    <Form.Label><span class="questionnaire-required me-2">必須</span>市区町村</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="city"
                      placeholder="例）札幌市中央区南一条西"
                      value={formValue.city} 
                      onChange={(e) => handleChange(e, 'city')} 
                      autoComplete="address-level2"
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-3">
                  <Form.Group id="address">
                    <Form.Label><span class="questionnaire-required me-2">必須</span>丁目・番地・号</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="address"
                      placeholder="例）5-16"
                      value={formValue.address} 
                      onChange={(e) => handleChange(e, 'address')} 
                      autoComplete="address-level3"
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-3">
                  <Form.Group id="building_name">
                    <Form.Label><span class="questionnaire-required me-2">必須</span>建物名/会社名</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="building_name"
                      placeholder="例）プレジデント松井ビル100"
                      value={formValue.building_name} 
                      onChange={(e) => handleChange(e, 'building_name')} 
                      autoComplete="address-level4"
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-3">
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
                <Col xs={12} className="mb-3">
                  <Form.Group id="tel">
                    <Form.Label><span class="questionnaire-required me-2">必須</span>電話番号</Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      name="tel"
                      placeholder="08000000000"
                      value={formValue.tel} 
                      onChange={(e) => handleChange(e, 'tel')} 
                      autoComplete="tel"
                    />
                  </Form.Group>
                </Col>
              </Row>
            <div className="align-items-center mt-4 mb-4">
              <Button variant="tertiary" onClick={handleClick} className="w-100 p-3">
                {pathname.includes('/edit') ? '更新する' : '追加する'}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </main>
    </>
  );
};