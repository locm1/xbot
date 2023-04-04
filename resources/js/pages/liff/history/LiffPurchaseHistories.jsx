import React, { useState, useRef, useEffect, useContext } from "react";
import { Row, Col, Form, ListGroup, Card, InputGroup, Image, Button } from 'react-bootstrap';
import { SearchIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";
import Cookies from 'js-cookie';
import moment from "moment-timezone";
import { CartItem } from "@/pages/liff/LiffCardItem";
import { LoadingContext } from "@/components/LoadingContext";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { getOrders, searchOrders } from "@/pages/liff/api/OrderApiMethods";

export default () => {
  const { setIsLoading } = useContext(LoadingContext);
  const date = new Date();
  const endYear = date.getFullYear();
  const startYear = endYear - 5;
  const [user, setUser] = useState({
    is_registered: 0
  });
  const [orders, setOrders] = useState([]);
  const [time, setTime] = useState('');

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
      params: {time: e.target.value}
    };
    console.log(searchParams);
    searchOrders(user.id, searchParams, setOrders);
    // searchOrders(101, searchParams, setOrders);
  };

  useEffect(() => {
    //setIsLoading(true);
    const idToken = Cookies.get('TOKEN');
    //getOrders(101, setOrders)

    getUser(idToken, setUser).then(response => {
      getOrders(response.id, setOrders)
    })
  }, []);

  const OrderCard = (props) => {
    const { id, status, created_at, order_products } = props;
    const link = Paths.LiffProductHistoryDetail.path.replace(':id', id);

    const getStatus = (status) => {
      switch (status) {
        case 1:
          return '注文内容確認中'
        case 2:
          return '配送準備中'
        case 3:
          return '当店より発送済み'
        case 4:
          return 'キャンセル'
      }
    }

    return (
      <Card border="0" className="shadow p-0 mb-4">
        <Card.Header className="">
            <h2 className="fs-5 fw-bold mb-0">{getStatus(status)}</h2>
        </Card.Header>
        <Card.Body className="pb-3 rounded-bottompt-3">
          <div className="d-flex align-items-center pb-3">
            <small className="">購入日時：{moment(created_at).format("YYYY-MM-DD HH:mm:ss")}</small>
            <div className="me-1 ms-1">｜</div>
            <small className="">注文番号：{id}</small>
          </div>
          <ListGroup className="list-group-flush">
            {order_products.map(order_product => <CartItem key={`order-product-${order_product.id}`} {...order_product} history="purchase" />)}
          </ListGroup>
          <div className="align-items-center my-3">
            <Button as={Link} to={link} variant="info" className="mt-2 liff-product-detail-button w-100">
              詳細を見る
            </Button>
          </div>
          {/* <div className="d-flex justify-content-between flex-wrap align-items-center mt-2 mb-2">
            <Button as={Link} to={Paths.LiffCarts.path} variant="tertiary" className="mt-2 liff-product-detail-button">
              再購入する
            </Button>
          </div> */}
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
              <Form.Label>注文日でフィルタリング</Form.Label>
              <Form.Select defaultValue="1" className="mb-0 w-100" value={time} onChange={(e) => handleChange(e)}>
                <option value="">注文時期を選択してください</option>
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
      <p className="mb-3 mt-3">件数：{orders.length}件</p>
    </div>
    {orders.map(order => <OrderCard key={`order-${order.id}`} {...order} />)}
    </>
  );
};
