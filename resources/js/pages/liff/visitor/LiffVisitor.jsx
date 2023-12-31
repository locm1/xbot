import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";
import QRCode from "qrcode.react";
import liff from '@line/liff';
import Swal from "sweetalert2";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { getVisitorHistoryCount } from "@/pages/liff/api/VisitorHistoryApiMethods";
import { getSiteSettings } from "@/pages/site/api/SiteApiMethods";
import Logo from "@img/img/logo_admin.png";
import { LoadingContext } from "@/components/LoadingContext";
import VisitorContentLoader from "@/pages/liff/visitor/loader/VisitorContentLoader";

export default () => {
  const [isRendered, setIsRendered] = useState(false);
  const { setIsLoading } = useContext(LoadingContext);
  const [privileges, setPrivileges] = useState([
    {
      "id": 1,
      "visits_times": 0,
      "items": [
        { id: 1, name: '' },
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
  const [setting, setSetting] = useState({
    logo_sidebar_path: ''
  });

  const getPrivileges = async () => {
    return await axios.get('/api/v1/privileges')
      .then(response => {
        const privileges = response.data.sort((a, b) => a.visits_times - b.visits_times)
        console.log(privileges);
        setPrivileges(privileges);
        return privileges;
      })
      .catch((error) => {
        console.error(error);
      })
  }

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const idToken = liff.getIDToken();
        const user = await getUser(idToken, setUser)
        const location = window.location.href
        setUri(`${location}/confirm/${user.id}`)
        await getVisitorHistoryCount(user.id, idToken, setVisitorCount)
        await getPrivileges()
        await getSiteSettings(setSetting)
        setIsRendered(true)

      } catch (error) {
        console.error(error)
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

  const LiffVisitorCard = (props) => {
    return (
      <>
        <Card border="0" className="rounded-0 liff-visitor-card m-3 z-1">
          <Card.Body className="py-0">
            <Row className="">
              <Col xs="12" className="mt-3 mb-3 liff-visitor-card-item">
                <div className="text-center text-md-center mb-4 mt-md-0 border-bottom">
                  <Image src={setting.logo_sidebar_path} width={144} className="mb-3" />
                </div>
                <div className="text-center text-md-center mb-4 mt-md-0 border-bottom">
                  <h2 className="mb-3 ms-3 liff-visitor-name">{user.last_name + user.first_name}<span>様</span></h2>
                </div>
                <div className="text-center text-md-center mt-md-0">
                  <h4 className="fs-5 text-white">来店回数</h4>
                  <h5 className="text-white"><span className="liff-visitor-count">{visitorCount}</span>回</h5>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </>
    );
  }

  const LiffVisitorQrCard = (props) => {

    return (
      <Card border="0" className="my-4 rounded-0">
        <Card.Header className="pb-0 border-0">
          <div className="">
            <h5 className="text-center fw-bolder fs-1 text-primary">来店QRコード</h5>
          </div>
        </Card.Header>
        <Card.Body className="py-0">
          <Row className="">
            <Col xs="12" className="mt-3 mb-3">
              <p className="text-center">来店されましたら<br />QRコードをスタッフにお見せください。</p>
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
          <div className="">
            {
              privileges.length > 0 && (
                <>
                  <h5 className="text-center fw-bolder fs-1 text-primary mt-3">特典一覧</h5>
                  {privileges && privileges.map(v => <LiffVisitorPrivilegeCard key={`privilege-${v.id}`}  {...v} />)}
                </>
              )
            }
          </div>
        </Card.Body>
      </Card>
    );
  }

  const LiffVisitorPrivilegeCard = (props) => {
    const { items, id, visits_times } = props;
    const LiffVisitorPrivilegeItem = (props) => {
      const { name, id, number } = props;

      return (
        <ListGroup.Item className="bg-transparent border-bottom">
          <div className="d-flex align-items-center">
            <h4 className="fs-6 text-dark mb-0">{name}</h4>
          </div>
        </ListGroup.Item>
      );
    }

    return (
      <Card border="0" className="mb-4">
        <Card.Header className="rounded-0 bg-primary p-1 text-center border-0 card-header text-white">
          <h5 className="liff-product-detail-name mb-0">来店{visits_times}回目</h5>
        </Card.Header>
        <Card.Body className="py-0 px-0 bg-secondary-alt">
          <ListGroup className="list-group-flush">
            {items.map((item, k) => <LiffVisitorPrivilegeItem key={`item-${item.id}`} number={k + 1} {...item} />)}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }

  return (
    isRendered ? (
      <main className="liff-product-detail">
        <div className="p-3">
          <LiffVisitorCard />
          <LiffVisitorQrCard />
        </div>
      </main>
    ) : (
      <VisitorContentLoader />
    )
  );
};