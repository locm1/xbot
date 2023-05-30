import moment from "moment-timezone";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from '@fullcalendar/core/locales-all';
import { Card, Button, Breadcrumb } from "react-bootstrap";
import React, { useRef, useState, useEffect } from "react";

import { Paths } from "@/paths";
import { EventModal } from "./EventModal";
import { DeleteEvent, GetAllEvents } from "./EventApiMethods"

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: "btn btn-primary",
    cancelButton: "btn btn-gray-400 me-3"
  },
  buttonsStyling: false
}));

export default () => {
  const defaultModalProps = { id: "", title: "", start: null, end: null, location: "", remaining: 0, is_unlimited: 0, color: "", startTime: "", endTime: "" };
  const history = useHistory();
  const [events, setEvents] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalProps, setModalProps] = useState(defaultModalProps);
  const [change, setChange] = useState(false);
  const calendarRef = useRef();

  const currentDate = moment().format("YYYY-MM-DD");
  
  useEffect(() => GetAllEvents(events, setEvents), [change]);

  const onDateClick = (props) => {
    // const id = events.length + 1;
    const date = new Date(props.date);
    const endDate = moment(date).add(1, 'h').format("YYYY-MM-DD HH:mm");

    setModalProps({ ...defaultModalProps, start: date, end: endDate  });
    setShowAddModal(true);
  };

  const onEventClick = (props) => {
    console.log(props)
    const { event: { id, title, start, end, backgroundColor, extendedProps: {location, remaining, is_unlimited} } } = props;
    setModalProps({ id, title, start, end, location, remaining, backgroundColor, is_unlimited });
    setShowEditModal(true);
  };

  const onEventUpdate = (props) => {
    const { id, title, start, end, sameDay, location, color, remaining, is_unlimited } = props;
    const calendarApi = calendarRef.current.getApi();
    const calendarElem = calendarApi.getEventById(id);

    if (calendarElem) {
      calendarElem.setProp("title", title);
      calendarElem.setDates(start, end, { allDay: sameDay });
    }

    const newEvents = events.map((v, k) => {
      if (v.id === Number(id)) {
        return (
          v = {
            id: Number(id),
            title: title,
            start: start,
            end: end,
            location: location,
            color: color,
            remaining: remaining,
            is_unlimited: is_unlimited,
          }
        )
      } else {
        return v;
      }
    })
    setEvents(newEvents);
    setShowEditModal(false);
    Swal.fire(
      '更新完了',
      'イベントの情報を更新しました',
      'success'
    )
  };

  const onEventAdd = (props) => {
    const newEvent = { ...props, dragable: true, className: "bg-blue", allDay: props.sameDay };
    setShowAddModal(false);
    setEvents([...events, newEvent]);
    setModalProps(defaultModalProps);
  };

  const onEventDelete = async (id) => {
    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "削除の確認",
      text: "本当にこのイベントを削除してもよろしいですか？",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "OK",
      cancelButtonText: "キャンセル"
    });

    setShowEditModal(false);
    setModalProps(defaultModalProps);

    if (result.isConfirmed) {     
      DeleteEvent(id); 
      const newEvents = events.filter(e => e.id != id);
      setEvents(newEvents);

      await SwalWithBootstrapButtons.fire("削除完了", "このイベントは削除されました", "success");
    }
  };

  const handleClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const goToCalendarDocs = () => {
    history.push(Paths.PluginCalendar.path);
  };

  return (
    <>
      {showEditModal ? (
        <EventModal
          {...modalProps}
          edit={true}
          show={showEditModal}
          onUpdate={onEventUpdate}
          onDelete={onEventDelete}
          onHide={handleClose}
          setChange={setChange}
        />
      ) : null}

      {showAddModal ? (
        <EventModal
          {...modalProps}
          show={showAddModal}
          onAdd={onEventAdd}
          onHide={handleClose}
          setChange={setChange}
        />
      ) : null}

      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <h1 className="page-title">予約枠作成</h1>
        </div>
      </div>

      <Card className="border-0 shadow">
        <Card.Body>
          <FullCalendar
            eventDisplay="block"
            editable
            selectable
            ref={calendarRef}
            events={events}
            displayEventTime={true}
            displayEventEnd={true}
            themeSystem="bootstrap"
            plugins={[dayGridPlugin, timeGridPlugin, bootstrapPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            buttonText={{
              prev: "<",
              next: ">",
              month: "Month",
              week: "Week",
              day: "Day",
              today: "今日",
            }}
            bootstrapFontAwesome={false}
            initialDate={currentDate}
            eventClick={onEventClick}
            dateClick={onDateClick}
            locales={allLocales}
            locale="ja"
          />
        </Card.Body>
      </Card>
    </>
  );
};
