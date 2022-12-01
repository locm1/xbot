
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { GlobeAltIcon, UsersIcon, ArrowDownIcon, ArrowNarrowRightIcon, ArrowUpIcon, CalendarIcon, ChartBarIcon, ChatAltIcon, CheckCircleIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, ClipboardListIcon, ClockIcon, DocumentTextIcon, DotsHorizontalIcon, EyeIcon, FlagIcon, FolderOpenIcon, GlobeIcon, MailIcon, MailOpenIcon, PaperClipIcon, PencilAltIcon, PresentationChartBarIcon, PresentationChartLineIcon, SaveIcon, ShareIcon, StarIcon, TrashIcon, UserAddIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';
import CheckboxButton from "@/components/CheckboxButton";


export const AreaForm = (props) => {
  const areas = [
    '中央区', '北区', '東区', '白石区', '厚別区', '豊平区', 
    '清田区', '南区', '西区', '手稲区', '札幌市以外', '道外'
  ];
  const months = [...Array(12).keys()].map(i => ++i);

  return (
    <Card border="0" className="shadow mb-4">
      <Card.Body>
        <Row>
          <Col xs="auto">
            <div className={`icon-shape icon-xs icon-shape-success rounded`}>
              <GlobeAltIcon />
            </div>
          </Col>
          <Col xs="auto">
            <h5 className="mb-4 segment-form-title">お住まいエリア</h5>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col md={12} className="mb-3">
              {
                areas.map((area, index) => <CheckboxButton key={index} name='area' id={index + 1} title={area} value={index + 1} />)
              }
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};