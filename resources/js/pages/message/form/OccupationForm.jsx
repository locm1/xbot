
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { OfficeBuildingIcon, UsersIcon, ArrowDownIcon, ArrowNarrowRightIcon, ArrowUpIcon, CalendarIcon, ChartBarIcon, ChatAltIcon, CheckCircleIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, ClipboardListIcon, ClockIcon, DocumentTextIcon, DotsHorizontalIcon, EyeIcon, FlagIcon, FolderOpenIcon, GlobeIcon, MailIcon, MailOpenIcon, PaperClipIcon, PencilAltIcon, PresentationChartBarIcon, PresentationChartLineIcon, SaveIcon, ShareIcon, StarIcon, TrashIcon, UserAddIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';
import CheckboxButton from "@/components/CheckboxButton";


export const OccupationForm = (props) => {
  const occupations = ['会社員', '公務員', '自営業', '会社役員', '自由業', '専業主婦(夫)', '学生', 'パート・アルバイト', '無職'];
  const months = [...Array(12).keys()].map(i => ++i);

  return (
    <Card border="0" className="shadow mb-4">
      <Card.Body>
        <Row>
          <Col xs="auto">
            <div className={`icon-shape icon-xs icon-shape-success rounded`}>
              <OfficeBuildingIcon />
            </div>
          </Col>
          <Col xs="auto">
            <h5 className="mb-4 segment-form-title">ご職業</h5>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col md={12} className="mb-3">
              {
                occupations.map((occupation, index) => <CheckboxButton key={index} name='occupation' id={index + 1} title={occupation} value={index + 1} />)
              }
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};