
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon,} from "@heroicons/react/solid";
import { Col, Row, Form, Modal, Button, InputGroup, Alert,} from 'react-bootstrap';
import { CirclePicker } from 'react-color';

import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/l10n/ja.js';
import { CreateEvent, DeleteEvent, UpdateEvent } from "./EventApiMethods";


export const EventModal = (props) => {
  const startOptions = {
    locale: 'ja',
    onChange: (selectedDates, dateStr, instance) => setStart(dateStr)
  }
  const endOptions = {
    locale: 'ja',
    onChange: (selectedDates, dateStr, instance) => setEnd(dateStr)
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

  const { show = false, edit = false, id, setChange } = props;
  // const startDate = start ? moment(start).format("YYYY-MM-DD HH:mm") : moment().format("YYYY-MM-DD HH:mm");
  // const endDate = end ? moment(end).format("YYYY-MM-DD HH:mm") : moment(start).format("YYYY-MM-DD HH:mm");
  const startTime = start ? moment(start).format("HH:mm") : moment().format("HH:mm");
  const endTime = end ? moment(end).format("HH:mm") : moment(start).format("HH:mm");
  const start_date = moment(start).format("YYYY-MM-DD");
  const end_date = moment(end).format("YYYY-MM-DD");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onStartChange = (e) => setStart(e.target.value);
  const onRemainingChange = (e) => setRemaining(e.target.value);
  const onLocationChange = (e) => setLocation(e.target.value);

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
      // return props.onUpdate && props.onUpdate(payload);
    } else {
      CreateEvent(updateData, setErrors).then(response => {
        if (response.result === 'failed') {
          setErrors(response.errors);
        } else {  
          payload.id = response.res.data.event.id;
          // return props.onAdd && props.onAdd(payload);
        }
      });
    }
    setChange(prev => !prev);
    onHide();
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
  const handleUnlimited = () => {
    is_unlimited === 1 ? setUnlimited(0) : setUnlimited(1);
  }
  const handleBackgroundColorChange = (props) => {
    setBackgroundColor(props.hex);
  }

  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={onHide} enforceFocus={false}>
      <Button onClick={() => console.log(rangeStart)} />
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
                <Form.Label>開始</Form.Label>
                <Flatpickr
                  options={ startOptions }
                  value={startTime}
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
              <Form.Group id="endDate" className="mb-2">
                <Form.Label>終了</Form.Label>
                <Flatpickr
                  options={ endOptions }
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
                <Form.Control
                  type="number"
                  value={remaining}
                  onChange={onRemainingChange}
                  disabled={is_unlimited}
                />
                  <div className="d-flex">
                    <Form.Check label="無制限にする" id="checkbox1" htmlFor="checkbox1" className="" checked={is_unlimited === 1} onChange={() => handleUnlimited()} />
                  </div>
              </Form.Group>
            </Col>
            {!edit && 
            <Col xs={12} lg={12}>
              <Form.Group id="dateRange">
                <Form.Label>範囲指定</Form.Label>
                <Flatpickr
                  options={ rangeOptions }
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
            <Col xs={12} lg={6} className="mt-2">
              <Form.Label>色選択</Form.Label>
              <CirclePicker colors={['#F47373', '#37D67A', '#2CCCE4', '#ff8a65', '#ba68c8', '#697689']} onChange={handleBackgroundColorChange}  />
              <div className="category-color" style={{backgroundColor: backgroundColor}}>{backgroundColor}</div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="me-2" onClick={onConfirm}>
            {edit ? "更新" : "保存"}
          </Button>

          {edit ? (
            <Button variant="danger" onClick={onDelete}>
              削除
            </Button>
          ) : null}

          <Button variant="link" className="text-gray ms-auto" onClick={onHide}>
            閉じる
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
