import React, { useState } from "react";
import Datetime from "react-datetime";
import { ArrowDownIcon, ArrowNarrowRightIcon, CalendarIcon, ClipboardListIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, InputGroup, Image, Button, Modal, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/l10n/ja.js';

import { Paths } from "@/paths";
import LinePreview from "@/components/line/LinePreview";

export default (props) => {
  const {templates, timing, setTiming, sendDate, setSendDate, selectTemplate, setSelectTemplate} = props;
  const [birthday, setBirthday] = useState("");
  const [messageDetailModal, setMessageDetailModal] = useState(false);
  const handleClose = () => setMessageDetailModal(false);
  const handleRadioChange = (e) => {
    setTiming(+e.target.value);
  }
  const handleDateChange = (e) => {
    setSendDate(e.target.value);
  }  
  const flatpickerOptions = {
    locale: 'ja',
    enableTime: true,
  }

  return (
    <>
      <Modal as={Modal.Dialog} centered show={messageDetailModal} onHide={handleClose}>
        <LinePreview />
      </Modal>
      <Card border="0" className="shadow message-detail-wrap mt-4">
        <Card.Header className="border-bottom d-flex align-items-center justify-content-between">
          <h2 className="fs-5 fw-bold mb-0">メッセージ内容</h2>
          <Button variant="primary" size="sm" onClick={() => setMessageDetailModal(true)}>メッセージを確認</Button>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={5} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>メッセージを選択</Form.Label>
                <Form.Select value={selectTemplate} className="mb-0" onChange={e => setSelectTemplate(e.target.value)}>
                <option>選択してください</option>
                  {
                    templates.map((message, index) => <option key={index} value={message.id}>{message.title}</option>)
                  }
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={7} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>配信タイミング</Form.Label>
                <div className="message-detail-wrap">
                  <div className="message-detail">
                    <Form.Check
                      checked={timing === 0}
                      value={0}
                      type="radio"
                      label="即時配信"
                      name="segment"
                      id="radio1"
                      htmlFor="radio1"
                      onChange={handleRadioChange}
                    />
                  </div>
                  <div className="message-detail">
                    <Form.Check
                      checked={timing === 1}
                      value={1}
                      type="radio"
                      label="予約配信"
                      name="segment"
                      id="radio2"
                      htmlFor="radio2"
                      onChange={handleRadioChange}
                      />
                  </div>
                  <Datetime
                    timeFormat={false}
                    onChange={setBirthday}
                    renderInput={(props, openCalendar) => (
                      <InputGroup>
                        <InputGroup.Text>
                          <CalendarIcon className="icon icon-xs" />
                        </InputGroup.Text>
                        <Flatpickr
                          options={ flatpickerOptions }
                          onChange={(_, __, instance) => setSendDate(instance.element.value)}
                          value={sendDate}
                          render={(props, ref) => {
                            return (
                              <>
                                <Form.Control
                                  disabled={timing == 1 ? false : true}
                                  required
                                  type="text"
                                  placeholder="YYYY-MM-DD h:i"
                                  value={sendDate}
                                  name='sendDate'
                                  ref={ref}
                                />
                              </>
                            );
                          }}
                        />
                      </InputGroup>
                  )} />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};