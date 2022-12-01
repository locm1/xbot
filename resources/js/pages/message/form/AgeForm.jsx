
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { ShoppingCartIcon, UsersIcon, ArrowDownIcon, ArrowNarrowRightIcon, ArrowUpIcon, CalendarIcon, ChartBarIcon, ChatAltIcon, CheckCircleIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, ClipboardListIcon, ClockIcon, DocumentTextIcon, DotsHorizontalIcon, EyeIcon, FlagIcon, FolderOpenIcon, GlobeIcon, MailIcon, MailOpenIcon, PaperClipIcon, PencilAltIcon, PresentationChartBarIcon, PresentationChartLineIcon, SaveIcon, ShareIcon, StarIcon, TrashIcon, UserAddIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';
import CheckboxButton from "@/components/CheckboxButton";


export const AgeForm = () => {
  const [birthday, setBirthday] = useState("");
  const areas = [
    '中央区', '北区', '東区', '白石区', '厚別区', '豊平区', 
    '清田区', '南区', '西区', '手稲区', '札幌市以外', '道外'
  ];
  const occupations = ['会社員', '公務員', '自営業', '会社役員', '自由業', '専業主婦(夫)', '学生', 'パート・アルバイト', '無職'];

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
            <h5 className="mb-4 segment-form-title">年齢</h5>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <InputGroup>
                <Form.Control required type="text" name="last_name" placeholder="歳" />
                <InputGroup.Text><span>〜</span></InputGroup.Text>
                <Form.Control required type="text" name="last_name" placeholder="歳" />
              </InputGroup>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};