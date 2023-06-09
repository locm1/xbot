import React, { useState, useRef, useEffect, useContext } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import Swal from 'sweetalert2';
import liff from '@line/liff';
import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import { getPrefectures } from "@/pages/liff/api/PrefectureApiMethods";
import { storeOrderDestination, showOrderDestination, updateOrderDestination } from "@/pages/liff/api/OrderDestinationApiMethods";
import { getAddress } from "@/pages/liff/api/ZipcodeApiMethods";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { LoadingContext } from "@/components/LoadingContext";
import AddAddressContentLoader from "@/pages/liff/checkout/loader/AddAddressContentLoader";

export default () => {
  const [isRendered, setIsRendered] = useState(false);
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
  const [errors, setErrors] = useState({
    last_name: '', first_name: '', last_name_kana: '', first_name_kana: '',
    year: 1990, month: '', day: '', gender: 1, tel: '', occupation_id: 1, zipcode: '',
    prefecture: '', city: '', address: '', building_name: '', room_number: ''
  });
  const [liffToken, setLiffToken] = useState('');


  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
  };

  const searchZipCode = (e, input) => {
    handleChange(e, input)

    if (e.target.value.length == 7) {
      getAddress(e.target.value, setFormValue, formValue)
    }
  };

  const handleClick = async () => {
    if (formValue.building_name && formValue.room_number) {
      formValue.building_name += ' ' + formValue.room_number
    }
    
    console.log(formValue);
    formValue.is_selected = 0
    formValue.liffToken = liffToken
    if (pathname.includes('/edit')) {
      try {
        await updateOrderDestination(user.id, id, formValue, setErrors)
        updateComplete()
      } catch (error) {
        Swal.fire(
          `データ保存エラー`,
          'データが正常に保存できませんでした',
          'error'
        )
      }
      //updateOrderDestination(101, id, formValue, updateComplete)
    } else {
      try {
        await storeOrderDestination(user.id, formValue, location, updateComplete, setErrors)
      } catch (error) {
        Swal.fire(
          `データ保存エラー`,
          'データが正常に保存できませんでした',
          'error'
        )
      }
      //storeOrderDestination(101, formValue, location)
    }
  };

  const updateComplete = () => {
    history.push(Paths.LiffCheckoutDestinations.path);
  };

  useEffect(() => {
    const dataFetch = async () => {
      const idToken = liff.getIDToken();
      setLiffToken(idToken)
      getPrefectures(setPrefectures)
      
      if (pathname.includes('/edit')) {
        const user = await getUser(idToken, setUser)
        try {
          await showOrderDestination(user.id, id, idToken, setFormValue)
        } catch (error) {
          Swal.fire(
            `データ取得エラー`,
            'データが正常に取得できませんでした',
            'error'
          )
        }
        setIsRendered(true)
        //showOrderDestination(101, id, setFormValue)
      } else {
        await getUser(idToken, setUser)
        setIsRendered(true)
      }
    };

    dataFetch()
  }, []);

  return (
    <>
      <main className="liff-product-detail p-3">
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
          <Card.Header className="bg-primary text-white px-3 py-2">
            <h5 className="mb-0 fw-bolder">{pathname.includes('/edit') ? 'お届け先の編集' : 'お届け先の追加'}</h5>
          </Card.Header>
          {
            isRendered ? (
              <Card.Body className="py-0">
                <Row className="mt-3">
                  <Col xs={12} className="mb-5">
                    <Form.Label><span className="questionnaire-required me-2">必須</span>氏名</Form.Label>
                    <div className="d-flex">
                      <Form.Group id="last_name" className="pe-3">
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
                      <Form.Group id="first_name" className="ps-3">
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
                    </div>
                  </Col>
                  <Col xs={12} className="mb-5">
                    <Form.Label><span className="questionnaire-required me-2">必須</span>フリガナ</Form.Label>
                    <div className="d-flex">
                      <Form.Group id="last_name_kana" className="pe-3">
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
                      <Form.Group id="first_name_kana" className="ps-3">
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
                          errors.last_name_kana && 
                          <Form.Control.Feedback type="invalid">{errors.last_name_kana[0]}</Form.Control.Feedback>
                        }
                      </Form.Group>
                    </div>
                  </Col>
                </Row>
                <Row className="">
                  <Col xs={6} className="mb-5">
                    <Form.Group id="zipcode">
                      <Form.Label><span className="questionnaire-required me-2">必須</span>郵便番号</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        name="zipcode"
                        placeholder="0001111"
                        value={formValue.zipcode} 
                        onChange={(e) => searchZipCode(e, 'zipcode')} 
                        autoComplete="postal-code"
                        isInvalid={formValue.zipcode !== '' ? false : errors.zipcode ? true : false}
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
                        <Form.Label><span className="questionnaire-required me-2">必須</span>都道府県</Form.Label>
                        <Form.Select defaultValue="0" value={formValue.prefecture} onChange={(e) => handleChange(e, 'prefecture')} className="mb-0 w-100">
                          {
                            prefectures && prefectures.map((prefecture, index) => <option key={index} value={prefecture.name}>{prefecture.name}</option>)
                          }
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12} className="mb-5">
                      <Form.Group id="city">
                        <Form.Label><span className="questionnaire-required me-2">必須</span>市区町村</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="city"
                          placeholder="例）札幌市中央区南一条西"
                          value={formValue.city} 
                          onChange={(e) => handleChange(e, 'city')} 
                          autoComplete="address-level2"
                          isInvalid={formValue.city !== '' ? false : errors.city ? true : false}
                        />
                        {
                          errors.city && 
                          <Form.Control.Feedback type="invalid">{errors.city[0]}</Form.Control.Feedback>
                        }
                      </Form.Group>
                    </Col>
                    <Col xs={12} className="mb-5">
                      <Form.Group id="address">
                        <Form.Label><span className="questionnaire-required me-2">必須</span>丁目・番地・号</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="address"
                          placeholder="例）5-16"
                          value={formValue.address} 
                          onChange={(e) => handleChange(e, 'address')} 
                          autoComplete="address-level3"
                          isInvalid={formValue.address !== '' ? false : errors.address ? true : false}
                        />
                        {
                          errors.address && 
                          <Form.Control.Feedback type="invalid">{errors.address[0]}</Form.Control.Feedback>
                        }
                      </Form.Group>
                    </Col>
                    <Col xs={12} className="mb-5">
                      <Form.Group id="building_name">
                        <Form.Label><span className="questionnaire-any me-2">任意</span>建物名/会社名</Form.Label>
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
                    <Col xs={12} className="mb-5">
                      <Form.Group id="room_number">
                        <Form.Label><span className="questionnaire-any me-2">任意</span>部屋番号</Form.Label>
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
                    <Col xs={12} className="mb-5">
                      <Form.Group id="tel">
                        <Form.Label><span className="questionnaire-required me-2">必須</span>電話番号</Form.Label>
                        <Form.Control
                          required
                          type="tel"
                          name="tel"
                          placeholder="08000000000"
                          value={formValue.tel} 
                          onChange={(e) => handleChange(e, 'tel')} 
                          autoComplete="tel"
                          isInvalid={formValue.tel !== '' ? false : errors.tel ? true : false}
                        />
                        {
                          errors.tel && 
                          <Form.Control.Feedback type="invalid">{errors.tel[0]}</Form.Control.Feedback>
                        }
                      </Form.Group>
                    </Col>
                  </Row>
                <div className="align-items-center mb-5">
                  <Button variant="tertiary" onClick={handleClick} className="w-100 p-3">
                    {pathname.includes('/edit') ? '更新する' : '追加する'}
                  </Button>
                </div>
              </Card.Body>
            ) : (
              <AddAddressContentLoader />
            )
          }
        </Card>
      </main>
    </>
  );
};