
import React, { useState, useEffect } from "react";
import { ArchiveIcon, ArrowDownIcon, ArrowNarrowRightIcon, ArrowUpIcon, CalendarIcon, ChartBarIcon, ChatAltIcon, CheckCircleIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, ClipboardListIcon, ClockIcon, DocumentTextIcon, DotsHorizontalIcon, EyeIcon, FlagIcon, FolderOpenIcon, GlobeIcon, MailIcon, MailOpenIcon, PaperClipIcon, PencilAltIcon, PresentationChartBarIcon, PresentationChartLineIcon, SaveIcon, ShareIcon, StarIcon, TrashIcon, UserAddIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Badge, Image, Button, ListGroup, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import { BarChartHorizontal, BarChart, PieChart, DognutChart, LineGraphChart, SalesValueChart, CustomersChart, RevenueChart, UsersChart, WeeklyReportChart } from "@/components/Charts";
import ApexChart from "react-apexcharts";
import JapanFlag from '@img/img/flags/japan.svg';

export default (props) => {
  const { title, data } = props;

  return (
    <>
      <Card border="0" className="shadow">
      <Card.Body className="d-flex flex-row align-items-center flex-0 border-bottom">
        <div className="d-block">
          <div className="mb-3">
            <h2 className="fs-3 fw-extrabold">
              {title}
            </h2>
          </div>
          <div className="d-flex">
            {data.map(d => (
              <div key={`bar-chart-${d.id}`} className="d-flex align-items-center me-3 lh-130">
                <span style={{ backgroundColor: d.color }} className="dot rounded-circle me-2" />
                <small className="fw-normal">{d.label}</small>
              </div>
            ))}
          </div>
        </div>
      </Card.Body>
      <Card.Body className="p-2">
        <BarChart data={data} />
      </Card.Body>
    </Card>
    </>
  );
};