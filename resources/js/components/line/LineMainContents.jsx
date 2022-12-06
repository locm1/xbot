import React, { useState } from "react";
import moment from 'moment-timezone';
import CountUp from "react-countup";
import Datetime from "react-datetime";
import { ArrowDownIcon, ArrowNarrowRightIcon, CalendarIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, InputGroup, Image, Button, Modal, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import messages from "@/data/templateMessages";
import IphoneImage from "@img/img/iphone14pro.svg";
import LineIcon from "@/components/line/LineIcon";

export default () => {
  const history = useHistory();
  const [birthday, setBirthday] = useState("");
  const [messageDetailModal, setMessageDetailModal] = useState(false);
  const handleClose = () => setMessageDetailModal(false);

  return (
    <>
    <div className="line-preview-main">
      <div className="line-preview-main-content">
        <div className="">
          <Row>
            <Col xs={12} md={2} xl={2} className="mb-4 mb-md-0">
              <LineIcon />
            </Col>
            <Col xs={12} md={10} xl={10} className="text-center text-lg-start">
              <div className="line-preview-main-content-comment-wrap">
                <div className="line-preview-comment">
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                  <p>テストです。テストです。テストです。テストです。テストです。テストです。テストです。</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    </>
  );
};