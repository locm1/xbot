
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { ShoppingCartIcon, UsersIcon, ArrowDownIcon, ArrowNarrowRightIcon, ArrowUpIcon, CalendarIcon, ChartBarIcon, ChatAltIcon, CheckCircleIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, ClipboardListIcon, ClockIcon, DocumentTextIcon, DotsHorizontalIcon, EyeIcon, FlagIcon, FolderOpenIcon, GlobeIcon, MailIcon, MailOpenIcon, PaperClipIcon, PencilAltIcon, PresentationChartBarIcon, PresentationChartLineIcon, SaveIcon, ShareIcon, StarIcon, TrashIcon, UserAddIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';
import CheckboxButton from "@/components/CheckboxButton";


export const QuestionnaireForm2 = (props) => {

  return (
    <Card border="0" className="shadow mb-4">
      <Card.Body>
        <Row>
          <Col xs="auto">
            <div className={`icon-shape icon-xs icon-shape-success rounded`}>
              <UsersIcon />
            </div>
          </Col>
          <Col xs="auto">
            <h5 className="mb-4 segment-form-title">複数回答式でのアンケート</h5>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col md={12} className="mb-3">
              <CheckboxButton name='question2' id='question2_1' title='項目1' value="1" />
              <CheckboxButton name='question2' id='question2_2' title='項目2' value="2" />
              <CheckboxButton name='question2' id='question2_2' title='項目3' value="3" />
              <CheckboxButton name='question2' id='question2_2' title='項目4' value="4" />
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};