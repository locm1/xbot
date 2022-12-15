import React, { useState } from "react";
import moment from 'moment-timezone';
import CountUp from "react-countup";
import Datetime from "react-datetime";
import { ArrowDownIcon, ArrowNarrowRightIcon, SearchIcon, ChevronLeftIcon, PhoneIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, InputGroup, Image, Button, Modal, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { HamburgerMenuIcon } from "@/components/icons/Icons";
import { Paths } from "@/paths";
import messages from "@/data/templateMessages";

export default () => {
  const history = useHistory();
  const [birthday, setBirthday] = useState("");
  const [messageDetailModal, setMessageDetailModal] = useState(false);
  const handleClose = () => setMessageDetailModal(false);

  return (
    <>
    <header class="line-preview-header">
      <Row>
        <Col xs={12} md={4} xl={6} className="mb-4 mb-md-0">
          <p className="mb-0 text-center text-lg-start">
            <ChevronLeftIcon className="icon icon-md" />
            <span>6</span>
            <span className="line-preview-header-title">Xbot</span>
          </p>
        </Col>
        <Col xs={12} md={8} xl={6} className="text-center text-lg-start">
          <ul className="list-inline list-group-flush list-group-borderless text-md-end mb-0">
            <li className="list-inline-item px-0 px-sm-2">
              <SearchIcon className="icon icon-xs" />
            </li>
            <li className="list-inline-item px-0 px-sm-2">
              <PhoneIcon className="icon icon-xs" />
            </li>
            <li className="list-inline-item px-0 px-sm-2">
              <HamburgerMenuIcon className="icon icon-xs" />
            </li>
          </ul>
        </Col>
      </Row>
    </header>
    </>
  );
};