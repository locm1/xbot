import React, { useState } from "react";
import moment from 'moment-timezone';
import CountUp from "react-countup";
import Datetime from "react-datetime";
import { ArrowDownIcon, ArrowNarrowRightIcon, CalendarIcon, ClipboardListIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, InputGroup, Image, Button, Modal, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import IphoneImage from "@img/img/iphone14pro.png";
import LineHeader from "@/components/line/LineHeader";
import LineMainContents from "@/components/line/LineMainContents";
import LineFooter from "@/components/line/LineFooter";

export default () => {
  const history = useHistory();
  const [birthday, setBirthday] = useState("");
  const [messageDetailModal, setMessageDetailModal] = useState(false);
  const handleClose = () => setMessageDetailModal(false);

  return (
    <>
    <div className="line-preview">
      <LineHeader />
      <LineMainContents />
      <LineFooter />
    </div>
    </>
  );
};