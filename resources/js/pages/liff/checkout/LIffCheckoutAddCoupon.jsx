import React, { useState, useRef, useEffect, useContext } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import Swal from 'sweetalert2';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';
import liff from '@line/liff';
import { LoadingContext } from "@/components/LoadingContext";
import { CouponDetailItem } from "@/pages/liff/LiffCardItem";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { showPaymentMethod } from "@/pages/liff/api/PaymentApiMethods";
import { getCustomer } from "@/pages/liff/api/CustomerApiMethods";
import { getCouponOwnerships, storeCouponOwnership } from "@/pages/liff/api/CouponApiMethods";

export default (props) => {
  const [user, setUser] = useState({
    is_registered: 0
  });
  const { setIsLoading } = useContext(LoadingContext)
  const history = useHistory();
  const [couponCode, setCouponCode] = useState('');
  const [coupons, setCoupons] = useState([]);
  const [selectId, setSelectId] = useState();
  const [error, setError] = useState('');
  const [liffToken, setLiffToken] = useState('');

  const handleClick = () => {
    const searchParams = {
      params: {
        code: couponCode
      }
    };
    const formValue = {
      code: couponCode, liffToken: liffToken
    }
    storeCouponOwnership(user.id, formValue, coupons, setCoupons, setError)
    //storeCouponOwnership(102, {code: couponCode}, coupons, setCoupons, setError)
    //searchCoupons(88, searchParams, setCoupons);
  };

  const handleEnterClick = (e) => {
    if (e.key == 'Enter') {
      handleClick()
    }
  };

  const saveCoupon = () => {
    const selectCoupon = coupons.find(coupon => coupon.id === selectId)
    console.log(selectCoupon);
    history.push(Paths.LiffCheckout.path, {coupon: selectCoupon})
  };

  useEffect(() => {
    setIsLoading(true)

    const dataFetch = async () => {
      try {
        const idToken = liff.getIDToken();
        const user = await getUser(idToken, setUser)
        setLiffToken(idToken);
        await getCouponOwnerships(user.id, idToken, setCoupons)
        setIsLoading(false)

      } catch (error) {
        console.error(error)
        setIsLoading(false)
        Swal.fire(
          `データ取得エラー`,
          'データが正常に取得できませんでした）',
          'error'
        ).then((result) => {
          //LIFF閉じる
          liff.closeWindow()
        })
      }
    }

    dataFetch()
  }, []);

  const CouponCard = (props) => {
    const { id, name, discount_price } = props;

    return (
      <>
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
      <Row className="">
          <Col xs="2" className="mt-4">
            <Form.Check
              type="radio"
              name="coupon_owner"
              value={id}
              checked={id === selectId}
              id={id}
              htmlFor={id}
              onChange={() => setSelectId(id)}
            />
          </Col>
          <Col xs="8" className="px-0">
            <div className="m-1">
              <h4 className="fs-5 text-dark mb-0">{name}</h4>
              <h4 className="fs-6 text-dark mt-1">{discount_price}%割引</h4>
            </div>
          </Col>
        </Row>
      </ListGroup.Item>
      </>
    );
  }

  return (
    <>
      <main className="liff-product-detail p-3">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center list-wrap"></div>
        <div className="">
          <Link to={Paths.LiffCheckout.path} className="d-flex align-items-center p-2">
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
            <h5 className="mb-0 fw-bolder">クーポン変更</h5>
          </Card.Header>
          <Card.Body className="py-0">
            <div className="table-settings mb-4">
              <Row className="d-flex justify-content-between align-items-center mt-3">
                <Col xs={12} lg={12} className="d-md-flex">
                  <InputGroup className="me-2 me-lg-3 fmxw-400">
                    <InputGroup.Text>
                      <SearchIcon className="icon icon-xs" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="coupon_code"
                      placeholder="クーポンコードを入力する"
                      value={couponCode}
                      isInvalid={couponCode !== '' && error !== ''}
                      onChange={(e) => setCouponCode(e.target.value)}
                      onKeyPress={(e) => handleEnterClick(e)}
                    />
                    {
                      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                    }
                  </InputGroup>
                </Col>
                  <Col xs={12} lg={12} className="d-md-flex">
                    <div className="align-items-center my-4">
                      <Button onClick={handleClick} variant="success" disabled={!couponCode} className="w-100">
                        適用
                      </Button>
                    </div>
                  </Col>
              </Row>
            </div>
            <div>
              <h5 className="fs-5 liff-product-detail-name mb-0">利用可能なクーポン</h5>
              <small className="mt-1">1件のご注文で1回限り有効です</small>
            </div>
            <ListGroup className="list-group-flush">
              {
                coupons && coupons.map((coupon, index) => 
                  <CouponCard key={`coupon-${index + 1}`} {...coupon} />
                )
              }
            </ListGroup> 
            <div className="align-items-center my-4">
              <Button onClick={saveCoupon} variant="tertiary" className="w-100">
                変更する
              </Button>
            </div>
          </Card.Body>
        </Card>
      </main>
    </>
  );
};