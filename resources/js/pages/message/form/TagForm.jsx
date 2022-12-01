
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { ShoppingCartIcon, UsersIcon, ArrowDownIcon, ArrowNarrowRightIcon, ArrowUpIcon, CalendarIcon, ChartBarIcon, ChatAltIcon, CheckCircleIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, ClipboardListIcon, ClockIcon, DocumentTextIcon, DotsHorizontalIcon, EyeIcon, FlagIcon, FolderOpenIcon, GlobeIcon, MailIcon, MailOpenIcon, PaperClipIcon, PencilAltIcon, PresentationChartBarIcon, PresentationChartLineIcon, SaveIcon, ShareIcon, StarIcon, TrashIcon, UserAddIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';
import CheckboxButton from "@/components/CheckboxButton";


export const TagForm = (props) => {
  const selectOptions = [
    { value: 1, label: '管理者' },
    { value: 2, label: '肉好き' },
    { value: 3, label: 'お得意様' },
    { value: 4, label: 'トラブル' },
    { value: 5, label: 'テスト' },
  ];
  const [birthday, setBirthday] = useState("");

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
            <h5 className="mb-4 segment-form-title">タグ</h5>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col md={12} className="mb-3">
              {
                selectOptions.map((selectOption, index) => <CheckboxButton key={index} name='tag' id={selectOption.label} title={selectOption.label} value={selectOption.value} />)
              }
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};