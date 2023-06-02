
import React, { useState } from "react";
import moment from "moment-timezone";
import { CalendarIcon, } from "@heroicons/react/solid";
import { Col, Row, Form, Modal, Button, InputGroup, Alert, } from 'react-bootstrap';
import { CirclePicker } from 'react-color';

import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import { CreateEvent, DeleteEvent, UpdateEvent } from "./EventApiMethods";


export const EventModal = (props) => {
  const startOptions = {
    locale: 'ja',
    onChange: (selectedDates, dateStr, instance) => setStartTime(dateStr)
  }
  const endOptions = {
    locale: 'ja',
    onChange: (selectedDates, dateStr, instance) => setEndTime(dateStr)
  }
  const rangeOptions = {
    locale: 'ja',
    mode: "range",
    onChange: (selectedDates, dateStr, instance) => {
      setRangeStart(formatDate(selectedDates[0]));
      setRangeEnd(formatDate(selectedDates[1]));
    }
  }
  const formatDate = (date) => {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }
  const [title, setTitle] = useState(props.title);
  const [start, setStart] = useState(props.start);
  const [end, setEnd] = useState(props.end);
  const [remaining, setRemaining] = useState(props.remaining);
  const [is_unlimited, setUnlimited] = useState(props.is_unlimited);
  const [location, setLocation] = useState(props.location);
  const [backgroundColor, setBackgroundColor] = useState(props.backgroundColor);
  const [rangeStart, setRangeStart] = useState(moment(start).format("YYYY-MM-DD"));
  const [rangeEnd, setRangeEnd] = useState();
  const [errors, setErrors] = useState(null);
  const [startTime, setStartTime] = useState(props.start ? moment(props.start).format("HH:mm") : '07:00');
  const [endTime, setEndTime] = useState(props.end ? moment(props.end).format("HH:mm") : '08:00');

  const { show = false, edit = false, id, setChange } = props;
  // const startDate = start ? moment(start).format("YYYY-MM-DD HH:mm") : moment().format("YYYY-MM-DD HH:mm");
  // const endDate = end ? moment(end).format("YYYY-MM-DD HH:mm") : moment(start).format("YYYY-MM-DD HH:mm");
  // const startTime = start ? start : moment().format("HH:mm");
  // const endTime = end ? end : moment().format("HH:mm");
  const start_date = start;
  const end_date = end;

  const onTitleChange = (e) => setTitle(e.target.value);
  const onStartChange = (e) => setStart(e.target.value);
  const onRemainingChange = (e) => setRemaining(e.target.value);
  const onLocationChange = (e) => setLocation(e.target.value);
  const [isChecked, setIsChecked] = useState(false);

  const onConfirm = () => {
    const payload = { id, title, start: start_date, end: end_date, is_unlimited: is_unlimited, location: location, remaining: remaining, color: backgroundColor };
    const updateData = {
      title: title, start_date: rangeStart, end_date: rangeEnd, remaining: remaining,
      is_unlimited: is_unlimited, location: location, color: backgroundColor,
      start_time: startTime, end_time: endTime,
    }
    console.log(updateData);
    if (edit) {
      UpdateEvent(id, updateData);
      onHide();
      // return props.onUpdate && props.onUpdate(payload);
    } else {
      CreateEvent(updateData, setErrors).then(response => {
        if (response.result === 'failed') {
          setErrors(response.errors);
        } else {
          payload.id = response.res.data.event.id;
          onHide();
          // return props.onAdd && props.onAdd(payload);
        }
      });
    }
    setChange(prev => !prev);
  }
  const onDelete = () => {
    edit && props.onDelete && props.onDelete(id);
  }
  const onHide = () => props.onHide && props.onHide();
  var focused = document.activeElement;
  const Errors = () => {
    if (errors) {
      return (
        <Alert variant="danger">
          <ul>
            {Object.values(errors).map(v => <li key={v}>{v}</li>)}
          </ul>
        </Alert>
      )
    }
  }
  const handleUnlimited = (e) => {
    e.target.checked ? setUnlimited(1) : setUnlimited(0);
    setIsChecked(e.target.checked);
    setRemaining(99999);
  }
  const handleBackgroundColorChange = (props) => {
    setBackgroundColor(props.hex);
  }

  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={onHide} enforceFocus={false}>
      <Form className="modal-content">
        <Modal.Body>
          <Errors />
          <Form.Group id="title" className="mb-4">
            <Form.Label>題名</Form.Label>
            <Form.Control
              required
              autoFocus
              type="text"
              value={title}
              onChange={onTitleChange} />
          </Form.Group>
          <Row>
            <Col xs={12} lg={6}>
              <Form.Group id="startDate">
                <Form.Label>開始時刻</Form.Label>
                <Flatpickr
                  options={startOptions}
                  render={(props, ref) => {
                    return (
                      <InputGroup>
                        <InputGroup.Text>
                          <CalendarIcon className="icon icon-xs" />
                        </InputGroup.Text>
                        <Form.Control
                          value={startTime}
                          data-enable-time
                          data-time_24hr
                          data-no-calendar
                          required
                          type="text"
                          placeholder="MM:DD"
                          onChange={() => { }}
                          ref={ref}
                        />
                      </InputGroup>
                    );
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={12} lg={6}>
              <Form.Group id="endDate" className="mb-2">
                <Form.Label>終了時刻</Form.Label>
                <Flatpickr
                  options={endOptions}
                  value={endTime}
                  render={(props, ref) => {
                    return (
                      <InputGroup>
                        <InputGroup.Text>
                          <CalendarIcon className="icon icon-xs" />
                        </InputGroup.Text>
                        <Form.Control
                          data-enable-time
                          data-time_24hr
                          data-no-calendar
                          required
                          type="text"
                          placeholder="YYYY-MM-DD"
                          ref={ref}
                        />
                      </InputGroup>
                    );
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={12} lg={6}>
              <Form.Group id="location">
                <Form.Label>場所</Form.Label>
                <Form.Control
                  type="text"
                  value={location}
                  onChange={onLocationChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} lg={6}>
              <Form.Group id="remaining">
                <Form.Label>残数</Form.Label>
                <InputGroup className="">
                  <InputGroup.Text className="d-flex">
                    <Form.Check id="checkbox1" htmlFor="checkbox1" className="" checked={is_unlimited == 1 ? true : false} onChange={handleUnlimited} />
                    <Form.Label htmlFor="checkbox1" className="mb-0">無制限</Form.Label>
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={remaining}
                    onChange={onRemainingChange}
                    disabled={is_unlimited == 1 ? true : false}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            {!edit &&
              <Col xs={12} lg={12}>
                <Form.Group id="dateRange">
                  <Form.Label className="mt-2">範囲指定</Form.Label>
                  <Flatpickr
                    options={rangeOptions}
                    render={(props, ref) => {
                      return (
                        <InputGroup>
                          <InputGroup.Text>
                            <CalendarIcon className="icon icon-xs" />
                          </InputGroup.Text>
                          <Form.Control
                            defaultValue={rangeStart}
                            required
                            type="text"
                            placeholder="YYYY-MM-DD"
                            ref={ref}
                          />
                        </InputGroup>
                      );
                    }}
                  />
                </Form.Group>
              </Col>}
            {/* <Col xs={12} lg={6} className="mt-2">
              <Form.Label>色選択</Form.Label>
              <CirclePicker colors={['#F47373', '#37D67A', '#2CCCE4', '#ff8a65', '#ba68c8', '#697689']} onChange={handleBackgroundColorChange}  />
              <div className="category-color" style={{backgroundColor: backgroundColor}}>{backgroundColor}</div>
            </Col> */}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="link" className="text-gray me-auto" onClick={onHide}>
            閉じる
          </Button>
          {edit ? (
            <Button variant="danger" className="me-2" onClick={onDelete}>
              削除
            </Button>
          ) : null}
          <Button variant="success" className="" onClick={onConfirm}>
            {edit ? "更新" : "保存"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
