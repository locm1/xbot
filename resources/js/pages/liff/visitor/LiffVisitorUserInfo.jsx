import axios from "axios";
import { useEffect, useState } from "react"
import { Row, Col, Nav, Button, Card, ListGroup, Image, Table } from 'react-bootstrap';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import liff from '@line/liff';
import { getUser } from "@/pages/liff/api/UserApiMethods";

export default () => {
  const [password, setPassword] = useState('');
  const params = useParams();  
  const [user, setUser] = useState({
    is_registered: 0
  });

  useEffect(() => {
    setIsLoading(true);
    const idToken = liff.getIDToken();
    getUser(idToken, setUser)
  }, []);

  return (
    <div className="mx-3 mt-3">
      <Card border="0" className="shadow my-3">
        <Card.Header className="border-bottom">
          <h5 className="liff-product-detail-name mb-0">お客様の情報</h5>
        </Card.Header>
        <Card.Body className="py-0">
          <Table responsive className="mb-0">
            <tbody className="border-0">
              <tr className="border-bottom">
                <th className="h6 text-left fw-bolder">お名前</th>
                <td>{user.last_name} {user.first_name}</td>
              </tr>
              <tr className="border-bottom">
                <th className="h6 text-left fw-bolder">お名前(カタカナ)</th>
                <td>{user.last_name_kana} {user.first_name_kana}</td>
              </tr>
              <tr className="border-bottom">
                <th className="h6 text-left fw-bolder">性別</th>
                <td>{user.gender}</td>
              </tr>
              <tr className="border-bottom">
                <th className="h6 text-left fw-bolder">住所</th>
                <td>
                  <div>〒{user.zipcode}</div>
                  <div>{user.prefecture} {user.city} {user.address}</div>
                  <div>{user.building_name}</div>
                </td>
              </tr>
              <tr className="border-bottom">
                <th className="h6 text-left fw-bolder">電話番号</th>
                <td>{user.tel}</td>
              </tr>
              <tr className="border-bottom">
                <th className="h6 text-left fw-bolder">ご職業</th>
                <td>{user.tel}</td>
              </tr>
              <tr className="border-bottom">
                <th className="h6 text-left fw-bolder">来店回数</th>
                <td></td>
              </tr>
            </tbody>
          </Table>
          <div className="align-items-center my-3">
            <Button  variant="info" className="mt-2 liff-product-detail-button w-100">
              来店済みにする
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}