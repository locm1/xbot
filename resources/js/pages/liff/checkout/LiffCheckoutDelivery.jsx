import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form, FormGroup } from 'react-bootstrap';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';

export default () => {
  const history = useHistory();
  const deliveries = ['指定なし', '日時指定'];
  const [deliveryTime, setDeliveryTime] = useState(1);
  const [selectDeliveryTime, setSelectDeliveryTime] = useState(1)

  const deliveryTimes = [
    {id: 1, title: '午前中', value: 2},
    {id: 2, title: '12:00 〜 14:00', value: 3},
    {id: 3, title: '14:00 〜 16:00', value: 4},
    {id: 4, title: '16:00 〜 18:00', value: 5},
    {id: 5, title: '18:00 〜 20:00', value: 6},
    {id: 6, title: '19:00 〜 21:00', value: 7},
    {id: 7, title: '20:00 〜 21:00', value: 8},
  ];

  const handleClick = () => {
    if (selectDeliveryTime == 2) {
      Cookies.set('delivery_time', deliveryTime, { expires: 1 })
    } else {
      Cookies.set('delivery_time', selectDeliveryTime, { expires: 1 })
    }
    history.push(Paths.LiffCheckout.path);
  }

  useEffect(() => {
    const delivery_time = Cookies.get('delivery_time')
    getDeliveryTimeItem(delivery_time)
  }, []);

  const getDeliveryTimeItem = (delivery_time) => {
    if (delivery_time == 1) {
      setSelectDeliveryTime(1)
    } else if (2 <= delivery_time && delivery_time < 9) {
      setSelectDeliveryTime(2)
      setDeliveryTime(delivery_time)
    } else {
      setSelectDeliveryTime(1)
    }
  }

  const DeliveryCard = (props) => {
    const { title, value } = props;

    return (
      <>
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0 checkout-card-check-wrap">
        <Row className="gx-0">
          <Col xs="12" className="">
            <Form.Check
              type="radio"
              checked={value === selectDeliveryTime}
              value={value}
              label={title}
              name="delivery"
              id={`delivery-${value}`}
              htmlFor={`delivery-${value}`}
              onChange={() => setSelectDeliveryTime(value)}
            />
          </Col>
        </Row>
      </ListGroup.Item>
      {value == 2 && selectDeliveryTime == 2 && (
        <Row className="mt-3">
          <Col xs={12} className="mb-3">
            <Form.Group id="firstName">
              <Form.Label>配送時間帯</Form.Label>
              <Form.Select defaultValue={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} className="mb-0 w-100">
                {
                  deliveryTimes.map((deliveryTime, index) => <option key={index} value={deliveryTime.value}>{deliveryTime.title}</option>)
                }
              </Form.Select>
            </Form.Group>
            <h4 className="liff-checkout-payment-title text-dark mt-3">
              ※送料については、<Card.Link href={Paths.LiffSpecificTrades.path} target="_blank" className="liff-specific-trades-link">特定商法取引法に基づく表記</Card.Link>をご覧ください。
            </h4>
          </Col>
        </Row>
      )}
      </>
    )
  }

  return (
    <>
      <main className="p-3">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center list-wrap"></div>
        <Link to={Paths.LiffCheckout.path} className="">
          <ChevronLeftIcon className="icon icon-sm" />
          <div className="d-inline">商品確認画面へ戻る</div>
        </Link>
        <Card border="0" className="shadow mt-2">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">配送時間帯指定</h5>
        </Card.Header>  
          <Card.Body className="py-0">
            <ListGroup className="list-group-flush">
              {
                deliveries.map((delivery, index) => 
                  <DeliveryCard key={`delivery-${index + 1}`} title={delivery} value={index + 1} />
                )
              }
            </ListGroup> 
            <div className="align-items-center my-4">
              <Button variant="tertiary" onClick={handleClick} className="w-100 p-3">
                変更する
              </Button>
            </div>
          </Card.Body>
        </Card>
      </main>
    </>
  );
};