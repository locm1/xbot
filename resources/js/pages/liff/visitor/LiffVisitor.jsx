import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";
import QRCode from "qrcode.react";
import liff from '@line/liff';
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { getVisitorHistoryCount } from "@/pages/liff/api/VisitorHistoryApiMethods";
import Logo from "@img/img/logo_admin.png";
import { LoadingContext } from "@/components/LoadingContext";

export default () => {
  const { setIsLoading } = useContext(LoadingContext);
  const [privileges, setPrivileges] = useState([
    {
      "id": 1,
      "visits_times": 0,
      "items": [
        {id: 1, name: ''},
      ]
    },
  ]);
  const [visitorCount, setVisitorCount] = useState(0);
  const [uri, setUri] = useState('');
  const [user, setUser] = useState({
    "id": 9999999,
    "first_name": "",
    "last_name": "",
    "first_name_kana": "",
    "last_name_kana": "",
    "nickname": "",
    "status_message": "",
    "birth_date": "",
    "gender": "",
    "zipcode": "",
    "prefecture": "",
    "city": "",
    "address": "",
    "building_name": "",
    "tel": "",
    "occupation_id": "",
    "img_path": "",
    "line_id": "",
    "is_registered": 0,
    "deleted_at": "",
    "created_at": "",
    "updated_at": "",
    "block_date": "",
    "is_blocked": 0
  })
  const [liffId, setLiffId] = useState('');

  useEffect(() => {
    setIsLoading(true)
    const idToken = liff.getIDToken();

    axios.get('/api/v1/privileges')
      .then(response => {
        console.log(response.data.sort((a, b) => a.visits_times - b.visits_times));
        setPrivileges(response.data.sort((a, b) => a.visits_times - b.visits_times));
      })
      .catch((error) => {
        console.error(error);
      })

    axios.get('/api/v1/get-liff-id')
      .then((liff) => {
        getUser(idToken, setUser).then((response) => {
          const location = window.location.href
          setUri(`${location}/confirm/${response.id}`)
          getVisitorHistoryCount(response.id, setVisitorCount, setIsLoading)
        });
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  const LiffVisitorCard = (props) => {
    return (
      <Card border="0" className=" liff-visitor-card">
        <Card.Body className="py-0">
          <Row className="">
            <Col xs="12" className="mt-3 mb-3 liff-visitor-card-item">
              <div className="text-center text-md-center mb-4 mt-md-0 border-bottom">
                <Image src={Logo} className="navbar-logo-wrap" />
              </div>
              <div className="text-center text-md-center mb-4 mt-md-0 border-bottom">
                <h2 className="mb-3 ms-3 liff-visitor-name">{user.last_name + user.first_name}<span>様</span></h2>
              </div>
              <div className="text-center text-md-center mb-4 mt-md-0">
                <h4 className="fs-5 text-white">来店回数</h4>
                <h5 className="mb-3 text-white"><span className="liff-visitor-count">{visitorCount}</span>回</h5>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }

  const LiffVisitorQrCard = (props) => {

    return (
      <Card border="0" className=" my-4">
        <Card.Header className="border-bottom">
          <h5 className="liff-product-detail-name mb-0">来店QRコード</h5>
        </Card.Header>
        <Card.Body className="py-0">
          <Row className="">
            <Col xs="12" className="mt-3 mb-3">
              <p>来店されましたら、QRコードをスタッフにお見せください。</p>
              <div className="text-center text-md-center mt-md-0">
              <QRCode
                id={`qr`}
                value={uri}
                size={150}
                level={"L"}
                includeMargin={false}
              />
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }

  const LiffVisitorPrivilegeCard = (props) => {
    const { items, id, visits_times } = props;
    const LiffVisitorPrivilegeItem = (props) => {
      const { name, id, number } = props;
  
      return (
        <ListGroup.Item className="bg-transparent border-bottom px-0">
          <Row className="align-items-center">
            <Col xs="2">
              <h4 className="fs-6 text-dark mb-0">{number}.</h4>
            </Col>
            <Col xs="10" className="px-0">
              <h4 className="fs-6 text-dark mb-0">{name}プレゼント</h4>
            </Col>
          </Row>
        </ListGroup.Item>
      );
    }

    return (
      <Card border="0" className="mb-4">
        <Card.Header className="border-bottom">
          <h5 className="liff-product-detail-name mb-0">来店{visits_times}回目</h5>
        </Card.Header>
        <Card.Body className="py-0">
          <ListGroup className="list-group-flush">
            {items.map((item, k) => <LiffVisitorPrivilegeItem key={`item-${item.id}`} number={k + 1} {...item} />)}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <main className="liff-product-detail">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        <div className="mb-2 px-5">
          <LiffVisitorCard />
          <LiffVisitorQrCard />
          {
            privileges.length > 0 && (
              <>
              <h2 className="ps-3">特典一覧</h2>
              {privileges && privileges.map(v => <LiffVisitorPrivilegeCard key={`privilege-${v.id}`}  {...v} />)}
              </>
            )
          }
          {/* <div className="d-flex justify-content-end me-2">
            <Link to={Paths.LiffAboutVisitorPrivileges.path} className="text-decoration-underline py-3">
              来店特典一覧確認
            </Link>
          </div> */}
        </div>
      </main>
    </>
  );
};