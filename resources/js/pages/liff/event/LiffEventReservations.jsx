import React, { useState, useRef, useEffect } from "react";
import Swal from 'sweetalert2';
import moment from "moment-timezone";
import withReactContent from 'sweetalert2-react-content';
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import liff from '@line/liff';
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import { getUser } from "@/pages/liff/api/UserApiMethods";
import { getEvents, eventReservation, getEventsByUserId } from "@/pages/liff/api/EventApiMethods";
import { MapPinIcon } from "@/components/icons/Icons";
import EventReservationsContentLoader from "@/pages/liff/event/loader/EventReservationsContentLoader";

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary me-3',
    cancelButton: 'btn btn-gray'
  },
  buttonsStyling: false
}));

export default () => {
  const [events, setEvents] = useState({
    '2023-01-01': [
      { id: 1, start_date: '2023-01-01 12:00:00', end_date: '2023-01-01 13:00:00' }
    ]
  });
  const [userEvents, setUserEvents] = useState([]);
  const [user, setUser] = useState({
    is_registered: 0
  });
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const currentDate = new Date();
  const targetDate = new Date(year + "-" + month);
  const [liffToken, setLiffToken] = useState('');
  const [isRendered, setIsRendered] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const idToken = liff.getIDToken();
        const user = await getUser(idToken, setUser)
        setLiffToken(idToken);
        await getEventsByUserId(user.id, idToken, setUserEvents)

        const searchParams = {
          params: { year: year, month: month }
        };
        await getEvents(searchParams, setEvents);
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


  // const completeReservations = async (id, startDate, endDate) => {
  //   const textMessage = `${startDate}〜${endDate}に予約しますか？`;

  //   const result = await SwalWithBootstrapButtons.fire({
  //     icon: "question",
  //     title: "予約確認",
  //     text: textMessage,
  //     showCancelButton: true,
  //     confirmButtonText: "予約",
  //     cancelButtonText: "キャンセル"
  //   });

  //   if (result.isConfirmed) {
  //     try {
  //       const event = await eventReservation(id, user.id, liffToken)
  //       setEvents(updateEvents(event, id))
  //       setUserEvents([...userEvents, event])
  //       completeReservation();

  //     } catch (error) {
  //       failedReservation(error.response.data.message)
  //     }
  //   }
  // };

  const reservationConfirm = async (id) => {
    const link = Paths.LiffEventReservationConfirm.path.replace(':id', id);
    history.push(link);
  };

  const failedReservation = (message) => {
    const searchParams = {
      params: { year: year, month: month }
    };
    Swal.fire(
      `エラー`,
      message,
      'error'
    ).then((result) => {
      result.isConfirmed && getEvents(searchParams, setEvents);
    })
  }

  const updateEvents = (resultEvent, id) => {
    const targetDate = Object.keys(events).find(date => {
      return events[date].some(event => event.id == id)
    })

    if (targetDate) {
      const updateEvents = events[targetDate].map(event => {
        if (event.id == id) {
          return resultEvent
        } else {
          return event
        }
      })

      return { ...events, [targetDate]: updateEvents }
    } else {
      return events
    }
  };

  const showPreviousMonth = () => {
    const prevMonth = new Date(year, month - 2, 1);
    setYear(prevMonth.getFullYear());
    setMonth(prevMonth.getMonth() + 1);
    const searchParams = {
      params: { year: prevMonth.getFullYear(), month: prevMonth.getMonth() + 1 }
    };
    getEvents(searchParams, setEvents);
  };

  const showNextMonth = () => {
    const nextMonth = new Date(year, month, 1);
    setYear(nextMonth.getFullYear());
    setMonth(nextMonth.getMonth() + 1);
    const searchParams = {
      params: { year: nextMonth.getFullYear(), month: nextMonth.getMonth() + 1 }
    };
    getEvents(searchParams, setEvents);
  };

  const LiffVisitorPrivilegeCard = (props) => {
    const { event } = props;
    const eventItems = events[event];
    const dateSplit = event.split('-');
    const eventDate = moment(event)
    const weeks = ['日', '月', '火', '水', '木', '金', '土'];

    const EventItem = (props) => {
      const { id, title, start_date, end_date, location, remaining, is_unlimited } = props;
      const startDateSplit = start_date.split(' ')[1].split(':');
      const endDateSplit = end_date.split(' ')[1].split(':');
      const startDate = `${startDateSplit[0]}:${startDateSplit[1]}`;
      const endDate = `${endDateSplit[0]}:${endDateSplit[1]}`;

      // 既にユーザーが予約しているかどうか
      const targetEvent = userEvents.find(userEvent => userEvent.id == id)

      return (
        remaining == 0 && !targetEvent ? null :
          <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
            <h4 className="fs-6 mb-1 liff-event-venue-title">{title}</h4>
            <div className="d-flex justify-content-between align-items-baseline">
              <small>時間：{startDate}〜{endDate}</small>
              <small>
                残枠数：<span className="fs-5 fw-bolder text-dark">{is_unlimited == 1 ? '無制限' : remaining}</span>
              </small>
            </div>
            {location &&
              <div className="mt-1">
                <MapPinIcon className="icon icon-xs liff-event-icon" />
                <small className="liff-event-place">{location}</small>
              </div>
            }
            <div className="align-items-center mt-3">
              {
                (() => {
                  if (targetEvent) {
                    return (
                      <Button disabled variant="gray-800" className="w-100">
                        予約済み
                      </Button>
                    )
                  } else if (remaining == 0) {
                    return (
                      <Button disabled variant="gray-800" className="w-100">
                        予約不可
                      </Button>
                    )
                  } else {
                    return (
                      <Button onClick={() => reservationConfirm(id)} variant="tertiary" className="w-100">
                        予約確認へ
                      </Button>
                    )
                  }
                })()
              }
            </div>
          </ListGroup.Item>
      );
    }

    return (
      <Card border="0" className="my-4">
        <Card.Header className="border-bottom">
          <div className="d-flex">
            <div className="calendar d-flex">
              <span className="calendar-month">{Number(dateSplit[1])}</span>
              <span className="calendar-day">{dateSplit[2]}</span>
            </div>
            <h2 className="fs-5 fw-bold mb-0 ms-3 mt-3">
              {eventDate.format("MM月DD日")}（{weeks[eventDate.day()]}）
            </h2>
          </div>
        </Card.Header>
        <Card.Body className="py-0">
          <ListGroup className="list-group-flush">
            {eventItems.map(eventItem => (<EventItem key={`event-item-${eventItem.id}`} {...eventItem} />))}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }

  const EventNotFoundCard = () => {
    return (
      <Card border="0" className="my-4 py-4">
        <Card.Body className="py-0">
          <div>予約可能なイベントはありません。</div>
        </Card.Body>
      </Card>
    );
  };

  return isRendered ? (
    <main className="p-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <Button variant="primary" size="sm" onClick={showPreviousMonth} className={targetDate < currentDate && 'invisible disabled'}>
          <ChevronLeftIcon className="icon icon-xs" />
          <span className="me-2 ms-1">{month === 1 ? '12' : month - 1}月</span>
        </Button>
        <h2 className="fs-5 fw-bold mb-0">
          {year}年{month}月
        </h2>
        <Button variant="primary" size="sm" onClick={showNextMonth}>
          <span className="me-2 ms-1">{month === 12 ? '1' : month + 1}月</span>
          <ChevronRightIcon className="icon icon-xs" />
        </Button>
      </div>
      <div className="liff-product-list">
        {
          Object.keys(events).length > 0 ? (
            Object.keys(events).sort().map((event, index) => <LiffVisitorPrivilegeCard key={`event-month-${index}`} event={event} />)
          ) : (
            <EventNotFoundCard />
          )
        }
      </div>
    </main>
  ) : <EventReservationsContentLoader />
};