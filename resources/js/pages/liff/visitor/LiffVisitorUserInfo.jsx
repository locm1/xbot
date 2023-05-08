import axios from "axios";
import { useEffect, useState } from "react"
import { Row, Col, Nav, Button, Card, ListGroup, Image, Table } from 'react-bootstrap';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import liff from '@line/liff';
import { getUser } from "@/pages/liff/api/UserApiMethods";

export default (props) => {
  const { user } = props;
  const sex_array = {1: '男性', 2: '女性', 3: 'その他'};

  return (
    <Card border="0" className="shadow my-3">
      <Card.Header className="border-bottom">
        <h5 className="liff-product-detail-name mb-0">お客様の情報</h5>
      </Card.Header>
      <Card.Body className="p-0">
        <Table className="mb-0">
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
              <td>{sex_array[user.gender]}</td>
            </tr>
            <tr className="border-bottom">
              <th className="h6 text-left fw-bolder">住所</th>
              <td className="text-wrap">
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
      </Card.Body>
    </Card>
  )
}