
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon,} from "@heroicons/react/solid";
import { Col, Row, Form, Modal, Button, InputGroup,} from 'react-bootstrap';

import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/l10n/ja.js';


export const EventModal = (props) => {
  const options = {
    locale: 'ja',
    onChange: (selectedDates, dateStr, instance) => setStart(dateStr)
  }
  const [title, setTitle] = useState(props.title);
  const [start, setStart] = useState(props.start);
  const [end, setEnd] = useState(props.end);
  const [remaining, setRemaining] = useState(0);
  const [unlimited, setUnlimited] = useState(false);
  const [place, setPlace] = useState(props.place);

  const { show = false, edit = false, id } = props;
  const startDate = start ? moment(start).format("YYYY-MM-DD HH:mm") : moment().format("YYYY-MM-DD HH:mm");
  const endDate = end ? moment(end).format("YYYY-MM-DD HH:mm") : moment(start).format("YYYY-MM-DD HH:mm");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onStartChange = (e) => setStart(e.target.value);
  const onRemainingChange = (e) => setRemaining(e.target.value);
  const onPlaceChange = (e) => setPlace(e.target.value);

  const onConfirm = () => {
    const sameDay = startDate === endDate;
    const finalStart = sameDay ? moment(startDate).toDate() : moment(startDate).startOf('day').toDate();
    const finalEnd = sameDay ? null : moment(endDate).endOf('day').toDate();
    const payload = { id, title, sameDay, start: finalStart, end: finalEnd };

    if (edit) {
      return props.onUpdate && props.onUpdate(payload);
    }

    return props.onAdd && props.onAdd(payload);
  }
  const onDelete = () => edit && props.onDelete && props.onDelete(id);
  const onHide = () => props.onHide && props.onHide();
  var focused = document.activeElement;

  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={onHide} enforceFocus={false}>
      <Form className="modal-content">
        <Modal.Body>
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
                  options={ options }
                  value={startDate}
                  render={(props, ref) => {
                    return (
                      <InputGroup>
                      <InputGroup.Text>
                        <CalendarIcon className="icon icon-xs" />
                      </InputGroup.Text>
                      <Form.Control
                        data-enable-time
                        data-time_24hr
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
                  options={ options }
                  render={(props, ref) => {
                    return (
                      <InputGroup>
                      <InputGroup.Text>
                        <CalendarIcon className="icon icon-xs" />
                      </InputGroup.Text>
                      <Form.Control
                        data-enable-time
                        data-time_24hr
                        required
                        type="text"
                        placeholder="YYYY-MM-DD"
                        value={endDate}
                        onChange={setEnd} 
                        ref={ref}
                        />
                      </InputGroup>
                    );
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={12} lg={6}>
              <Form.Group id="place">
                <Form.Label>場所</Form.Label>
                <Form.Control
                  type="text"
                  value={place}
                  onChange={onPlaceChange}
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
                  disabled={unlimited}
                   />
                  <div className="d-flex">
                    <Form.Check label="無制限にする" id="checkbox1" htmlFor="checkbox1" className="" onClick={() => setUnlimited(!unlimited)} />
                  </div>
              </Form.Group>
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
