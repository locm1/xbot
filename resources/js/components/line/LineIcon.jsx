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
import LineIcon from "@img/img/line-icon.png";

export default () => {
  const history = useHistory();
  const [birthday, setBirthday] = useState("");
  const [messageDetailModal, setMessageDetailModal] = useState(false);
  const handleClose = () => setMessageDetailModal(false);

  return (
    <>
    <div className="">
    <Image src={LineIcon} className="line-icon" />
    </div>
    </>
  );
};