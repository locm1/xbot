import React, { useState, useRef, useEffect, useContext } from "react";
import Swal from 'sweetalert2';
import moment from "moment-timezone";
import withReactContent from 'sweetalert2-react-content';
import { Row, Col, Table, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Link, useParams } from 'react-router-dom';
import { Paths } from "@/paths";
import liff from '@line/liff';
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { showEvent, eventReservation } from "@/pages/liff/api/EventApiMethods";
import { MapPinIcon } from "@/components/icons/Icons";
import EventReservationConfirmContentLoader from "@/pages/liff/event/loader/EventReservationConfirmContentLoader";

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary me-3',
    cancelButton: 'btn btn-gray'
  },
  buttonsStyling: false
}));

export default () => {
  const { id } = useParams();
  const idToken = liff.getIDToken();
  const [event, setEvent] = useState({
    title: '', start_date: '', end_date: '', location: ''
  });
  const [user, setUser] = useState({
    is_registered: 0
  });
  const [isRendered, setIsRendered] = useState(false);
  const [isReservation, setIsReservation] = useState(false);
  const sex_array = {1: '男性', 2: '女性', 3: 'その他'};

  const completeReservations = async (id) => {
    try {
      await eventReservation(id, user.id, idToken)
      setIsReservation(true);
      completeReservation();

    } catch (error) {
      failedReservation(error.response.data.message)
    }
  };

  const completeReservation = async () => {
    const message = `<p>予約が完了しました。</p>
      <p>担当よりご連絡させていただきますので、今しばらくお待ちください。</p>
      `;
    await SwalWithBootstrapButtons.fire('予約完了！', message, 'success');
  };

  const failedReservation = (message) => {
    Swal.fire(
      `エラー`,
      message,
      'error'
    ).then((result) => {
      //LIFF閉じる
      liff.closeWindow()
    })
  }

  useEffect(() => {
    const dataFetch = async () => {
      try {
        await showEvent(id, setEvent)
        await getUser(idToken, setUser)
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

  return isRendered ? (
    <div className="mx-3 mt-3">
      <Card border="0" className="shadow my-3">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">予約情報</h5>
        </Card.Header>  
        <Card.Body className="p-0">
          <Table className="mb-0">
            <tbody className="border-0">
              <tr className="border-bottom">
                <th className="h6 text-left fw-bolder">題名</th>
                <td>{event.title}</td>
              </tr>
              <tr className="border-bottom">
                <th className="h6 text-left fw-bolder">予約時間</th>
                <td>{moment(event.start_date).format("YYYY年MM月DD日 hh:mm")} 〜 {moment(event.end_date).format("hh:mm")}</td>
              </tr>
              <tr className="border-bottom">
                <th className="h6 text-left fw-bolder">場所</th>
                <td>{event.location}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Card border="0" className="shadow my-3">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">お客様情報</h5>
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
            </tbody>
          </Table>
        </Card.Body>
        <div className="align-items-center m-4">
          {
            isReservation ? (
              <Button disabled variant="gray-800" className="w-100">
                予約確定済み
              </Button>
            ) : (
              <Button onClick={() => completeReservations(id)} variant="success" className="w-100 p-3">
                予約を確定する
              </Button>
            )
          }
        </div>
      </Card>
    </div>
  ) : <EventReservationConfirmContentLoader />
};