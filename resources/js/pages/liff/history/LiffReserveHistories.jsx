import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, ListGroup, Card, InputGroup, Image, Button } from 'react-bootstrap';
import { SearchIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';
import liff from '@line/liff';
import AccordionComponent from "@/pages/liff/history/LiffReserveHistoryAccordion";
import { CartItem } from "@/pages/liff/LiffCardItem";
import QrCode from "@img/img/add_friend_qr.png"

import { getProductReservations, searchProductReservations } from "@/pages/liff/api/ProductReservationApiMethods";
import { getUser } from "@/pages/liff/api/UserApiMethods";

export default () => {
  const date = new Date();
  const endYear = date.getFullYear();
  const startYear = endYear - 5;
  const [productReservations, setProductReservations] = useState([]);
  const [time, setTime] = useState('');
  const [user, setUser] = useState({
    is_registered: 0
  });
  const idToken = liff.getIDToken();

  const getPurchaseTimes = () => {
    const purchaseTimes = [];
    for (let index = startYear; index < endYear + 1; index++) {
      purchaseTimes.push(<option key={index} value={index}>{index}年</option>)
      
    }
    return purchaseTimes.reverse();
  }

  const handleChange = (e) => {
    setTime(e.target.value)

    const searchParams = {
      params: {time: e.target.value, liffToken: idToken}
    };
    console.log(searchParams);
    searchProductReservations(101, searchParams, setProductReservations);
  };

  useEffect(() => {
    //setIsLoading(true);
    //getProductReservations(101, setProductReservations)

    getUser(idToken, setUser).then(response => {
      getProductReservations(response.id, setProductReservations, {liffToken: idToken})
    })
  }, []);

  const ReserveCard = (props) => {
    const { id, reserve } = props;

    return (
      <Card border="0" className="shadow p-0 mb-4">
        <Card.Body className="pb-3 rounded-bottompt-3">
          <ListGroup className="list-group-flush">
            <CartItem {...reserve} history="reserve" />
          </ListGroup>
          <AccordionComponent
            id={1}
            eventKey="panel-1"
            title="QRコードを表示"
          >
            <Image src={QrCode} className="m-0" />
          </AccordionComponent>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
    <Card border="0" className="shadow p-0">
      <Card.Body className="pb-3 rounded-bottompt-3">
        <Row>
          <Col xs={12} className="my-1">
            <Form.Group id="order-date">
              <Form.Label>取り置き日でフィルタリング</Form.Label>
              <Form.Select defaultValue="1" className="mb-0 w-100" value={time} onChange={(e) => handleChange(e)}>
                <option value="">取り置き時期を選択してください</option>
                <option value={1}>過去1ヶ月</option>
                <option value={2}>過去半年</option>
                {getPurchaseTimes()}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
    <div className="d-flex align-items-center content">
      <p className="mb-3 mt-3">件数：{productReservations.length}件</p>
    </div>
    {productReservations.map(productReservation => <ReserveCard key={`product-reserve-${productReservation.id}`} reserve={productReservation} />)}
    </>
  );
};
