
import React, { useState, useEffect } from "react";
import { ArchiveIcon, ArrowDownIcon, ArrowNarrowRightIcon, ArrowUpIcon, CalendarIcon, ChartBarIcon, ChatAltIcon, CheckCircleIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, ClipboardListIcon, ClockIcon, DocumentTextIcon, DotsHorizontalIcon, EyeIcon, FlagIcon, FolderOpenIcon, GlobeIcon, MailIcon, MailOpenIcon, PaperClipIcon, PencilAltIcon, PresentationChartBarIcon, PresentationChartLineIcon, SaveIcon, ShareIcon, StarIcon, TrashIcon, UserAddIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Badge, Image, Button, ListGroup, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import ApexChart from "react-apexcharts";
import JapanFlag from '@img/img/flags/japan.svg';

export default (props) => {
  const { prefectures } = props;

  const Country = (props) => {
    const { name, count, percent, color = "primary" } = props;

    return (
      <Row className="align-items-center mb-4">
        {/* <Col xs="auto">
          <Image roundedCircle src={JapanFlag} className="image-xs" />
        </Col> */}
        <Col>
          <div className="progress-wrapper">
            <div className="progress-info">
              <h6 className="mb-0">{name} <span className="text-gray-500 font-small">({count})</span></h6>
              <small className="fw-bold"><span>{percent} %</span></small>
            </div>
            <ProgressBar variant={color} now={percent} min={0} max={100} className="mb-0" />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Card border="0" className="shadow">
      <Card.Header className="">
        <h2 className="fs-5 fw-bold mb-1">
          都道府県別
        </h2>
      </Card.Header>
      <Card.Body className="py-4">
        {prefectures.map(c => <Country key={`prefecture-${c.name}`} {...c} />)}
      </Card.Body>
      {/* <Card.Footer as={Link} to={Paths.Calendar.path} className="bg-gray-50 border-top text-center">
        <div className="d-flex align-items-center justify-content-center fw-bold">
          <EyeIcon className="icon icon-xs me-2" />
          See all
        </div>
      </Card.Footer> */}
    </Card>
    </>
  );
};