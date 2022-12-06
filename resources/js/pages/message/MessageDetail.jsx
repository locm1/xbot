import React, { useState } from "react";
import moment from 'moment-timezone';
import CountUp from "react-countup";
import Datetime from "react-datetime";
import { ArrowDownIcon, ArrowNarrowRightIcon, CalendarIcon, ClipboardListIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, InputGroup, Image, Button, Modal, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import messages from "@/data/templateMessages";
import LinePreview from "@/components/line/LinePreview";

export default () => {
  const history = useHistory();
  const [birthday, setBirthday] = useState("");
  const [messageDetailModal, setMessageDetailModal] = useState(false);
  const handleClose = () => setMessageDetailModal(false);

  return (
    <>
      <Modal as={Modal.Dialog} centered show={messageDetailModal} onHide={handleClose}>
        <LinePreview />
      </Modal>
      <Card border="0" className="shadow message-detail-wrap">
        <Card.Header className="border-bottom d-flex align-items-center justify-content-between">
          <h2 className="fs-5 fw-bold mb-0">メッセージ内容</h2>
          <Button variant="primary" size="sm" onClick={() => setMessageDetailModal(true)}>メッセージを確認</Button>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={5} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>メッセージを選択</Form.Label>
                <Form.Select defaultValue="0" className="mb-0">
                  {
                    messages.map((message) => <option value={message.id}>{message.title}</option>)
                  }
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={7} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>配信タイミング</Form.Label>
                <div className="message-detail-wrap">
                  <div className="message-detail">
                    <Form.Check label="即時配信" id="checkbox1" htmlFor="checkbox1" />
                  </div>
                  <div className="message-detail">
                    <Form.Check label="予約配信" id="checkbox1" htmlFor="checkbox1" />
                  </div>
                  <Datetime
                    timeFormat={false}
                    onChange={setBirthday}
                    renderInput={(props, openCalendar) => (
                      <InputGroup>
                        <InputGroup.Text>
                          <CalendarIcon className="icon icon-xs" />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="text"
                          value={birthday ? moment(birthday).format("DD/MM/YYYY") : ""}
                          placeholder="dd/mm/yyyy"
                          onFocus={openCalendar}
                          onChange={() => { }} />
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