import React, { useState } from "react";
import { Col, Row, Form, Button, Tooltip, Dropdown, InputGroup, ButtonGroup, OverlayTrigger, Breadcrumb } from 'react-bootstrap';
import { ArchiveIcon, CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, CloudUploadIcon, FireIcon, PlusIcon, ShieldCheckIcon, TrashIcon, ViewGridAddIcon, HomeIcon } from "@heroicons/react/solid";

import EventWidget from "@/components/EventWidget";
import eventGuidances from "@/data/eventGuidances";


export default () => {
  return (
    <>
      <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <h1 className="page-title">イベント案内リスト</h1>
        </div>
      </div>
      <div className="task-wrapper border bg-white border-light shadow-sm py-1 rounded">
      <EventWidget events={eventGuidances} />

        <Row className="d-flex align-items-center p-4">
          <Col xs={7} className="mt-1">
            Showing 1 - {eventGuidances.length} of 289
          </Col>
          <Col xs={5}>
            <ButtonGroup className="float-end">
              <Button variant="light">
                <ChevronLeftIcon className="icon icon-xs" />
              </Button>
              <Button variant="primary">
                <ChevronRightIcon className="icon icon-xs" />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    </>
  );
};
