
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { ShoppingCartIcon, UsersIcon, ArrowDownIcon, ArrowNarrowRightIcon, ArrowUpIcon, CalendarIcon, ChartBarIcon, ChatAltIcon, CheckCircleIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, ClipboardListIcon, ClockIcon, DocumentTextIcon, DotsHorizontalIcon, EyeIcon, FlagIcon, FolderOpenIcon, GlobeIcon, MailIcon, MailOpenIcon, PaperClipIcon, PencilAltIcon, PresentationChartBarIcon, PresentationChartLineIcon, SaveIcon, ShareIcon, StarIcon, TrashIcon, UserAddIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';
import CheckboxButton from "@/components/CheckboxButton";


export const LastVisitorDateForm = (props) => {
  const [birthday, setBirthday] = useState("");

  return (
    <Card border="0" className="shadow mb-4">
      <Card.Body>
        <Row>
          <Col xs="auto">
            <div className={`icon-shape icon-xs icon-shape-success rounded`}>
              <ShoppingCartIcon />
            </div>
          </Col>
          <Col xs="auto">
            <h5 className="mb-4 segment-form-title">最終来店日</h5>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col md={12} className="mb-3">
            <InputGroup className="me-3 me-lg-3 fmxw-500">
              <Datetime
                timeFormat={false}
                renderInput={(props, openCalendar) => (
                  <InputGroup>
                    <Form.Control
                      required
                      type="text"
                      value={birthday ? moment(birthday).format("DD/MM/YYYY") : ""}
                      placeholder="来店日（FROM）"
                      onFocus={openCalendar}
                      onChange={() => { }} />
                      <InputGroup.Text><span>〜</span></InputGroup.Text>
                      <Form.Control
                      required
                      type="text"
                      value={birthday ? moment(birthday).format("DD/MM/YYYY") : ""}
                      placeholder="来店日（TO）"
                      onFocus={openCalendar}
                      onChange={() => { }} />
                      <InputGroup.Text>
                      <CalendarIcon className="icon icon-xs" />
                    </InputGroup.Text>
                  </InputGroup>
                )} 
              />
            </InputGroup>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};