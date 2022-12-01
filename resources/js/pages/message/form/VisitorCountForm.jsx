
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { ShoppingCartIcon, UsersIcon, ArrowDownIcon, ArrowNarrowRightIcon, ArrowUpIcon, CalendarIcon, ChartBarIcon, ChatAltIcon, CheckCircleIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, ClipboardListIcon, ClockIcon, DocumentTextIcon, DotsHorizontalIcon, EyeIcon, FlagIcon, FolderOpenIcon, GlobeIcon, MailIcon, MailOpenIcon, PaperClipIcon, PencilAltIcon, PresentationChartBarIcon, PresentationChartLineIcon, SaveIcon, ShareIcon, StarIcon, TrashIcon, UserAddIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';


export const VisitorCountForm = (props) => {
  const [birthday, setBirthday] = useState("");
  const months = [...Array(12).keys()].map(i => ++i);

  return (
    <Card border="0" className="shadow mb-4">
      <Card.Body>
        <Row>
          <Col xs="auto">
            <div className={`icon-shape icon-xs icon-shape-success rounded`}>
              <ShoppingCartIcon className="send-segment-icon" />
            </div>
          </Col>
          <Col xs="auto">
            <h5 className="mb-4 segment-form-title">来店回数</h5>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <InputGroup>
                <Form.Control required type="text" name="last_name" placeholder="回" />
                <InputGroup.Text><span>〜</span></InputGroup.Text>
                <Form.Control required type="text" name="last_name" placeholder="回" />
              </InputGroup>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};