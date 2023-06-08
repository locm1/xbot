import { useState, useEffect } from "react";
import { Button, Card, Col, ListGroup, Nav, Row } from "react-bootstrap"
import { MapPinIcon } from "@/components/icons/Icons";
import liff from '@line/liff';
import Swal from 'sweetalert2';
import { getUser } from "@/pages/liff/api/UserApiMethods";
import EventCard from "./organisms/EventCard";
import { getEventHistoriesByUserId } from "@/pages/liff/api/EventHistoryApiMethods";
import { deleteEventReservation } from "@/pages/liff/api/EventApiMethods";


export default () => {
  const [user, setUser] = useState({
    is_registered: 0
  });
  const [liffToken, setLiffToken] = useState();
  const [navSelected, setNavSelected] = useState('future')
  const [histories, setHistories] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
  const sortedDates = Object.keys(histories).sort();
  const currentDate = new Date();
  const pastDates = [];
  const futureDates = [];

  sortedDates.forEach(date => {
    if (new Date(date) < currentDate) {
      pastDates.push(date);
    } else {
      futureDates.push(date);
    }
  });

  const handleClick = (val) => {
    setNavSelected(val)
  }

  const deleteSuccess = async () => {
    await Swal.fire(
      `キャンセル成功`,
      '予約のキャンセルに成功しました',
      'success'
    ).then((result) => {
      getEventHistoriesByUserId(user.id, liffToken, setHistories)
    })
  }

  const deleteReservation = async (id) => {
    try {
      await deleteEventReservation(id, user.id, liffToken)
      await deleteSuccess()
    } catch (error) {
      console.error(error)
        Swal.fire(
          `データ取得エラー`,
          'データが正常に取得できませんでした',
          'error'
        ).then((result) => {
          //LIFF閉じる
          liff.closeWindow()
        })
    }
  }

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const idToken = liff.getIDToken();
        setLiffToken(idToken)
        const user = await getUser(idToken, setUser)
        await getEventHistoriesByUserId(user.id, idToken, setHistories)
        //setIsRendered(true)
      } catch (error) {
        console.error(error)
        Swal.fire(
          `データ取得エラー`,
          'データが正常に取得できませんでした',
          'error'
        ).then((result) => {
          //LIFF閉じる
          liff.closeWindow()
        })
      }
    }

    dataFetch()
  }, []);

  return (
    <main className="p-3">
      <Nav fill defaultActiveKey="future" variant="pills" className="gap-3">
        <Nav.Item className="w-25">
          <Nav.Link eventKey="future" href="#" onClick={() => handleClick('future')}>
            予約一覧
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="w-25">
          <Nav.Link eventKey="past" href="#" onClick={() => handleClick('past')}>
            過去の予約一覧
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {navSelected === 'future' ? futureDates.map((v, k) =>
        <EventCard
          key={`event-${k}`}
          histories={histories[v]}
          date={v}
          deleteReservation={deleteReservation}
        />
      ) : pastDates.map((v, k) =>
        <EventCard
          key={`event-${k}`}
          histories={histories[v]}
          date={v}
        />
      )}
    </main>
  )
}