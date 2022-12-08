import React, { useState } from "react";
import moment from 'moment-timezone';
import CountUp from "react-countup";
import Datetime from "react-datetime";
import { ArrowDownIcon, ArrowNarrowRightIcon, CalendarIcon, ChevronLeftIcon, XIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, InputGroup, Image, Button, Modal, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import messages from "@/data/templateMessages";
import Logo from "@img/img/line-icon.png"
import LineIcon from "@/components/line/LineIcon";

export default (props) => {
  const { formValue, files, formId, previews } = props;
  const history = useHistory();
  const [birthday, setBirthday] = useState("");
  const [messageDetailModal, setMessageDetailModal] = useState(false);
  const handleClose = () => setMessageDetailModal(false);

  const DropzoneFile = (props) => {
    const { preview } = props;

    return (
      <div className="line-preview-comment-image">
        <Image src={preview} />
      </div>
    );
  };


  const ShowText = (props) => {
      if (props.preview.content) {
        return (
          <>
          <Col xs={12} md={2} xl={2} className="mb-4 mb-md-0">
            <LineIcon />
          </Col>
          <Col xs={12} md={10} xl={10} className="text-center text-lg-start">
            <div className="line-preview-main-content-comment-wrap">
              <div className="line-preview-comment">
                <p className="d-flex flex-wrap">{props.preview.content}</p>
              </div>
            </div>
          </Col>
          </>
        );
      } else {
        return '';
      }
    } 

  const ShowPicture = (props) => {
    if (files.length > 0) {
      return (
        <>
        <Col xs={12} md={2} xl={2} className="mb-4 mb-md-0">
          <LineIcon />
        </Col>
        <Col xs={12} md={10} xl={10} className="text-center text-lg-start">
          {files.map(file => <DropzoneFile key={file.path} {...file} />)}
        </Col>
        </>
      );
    } else {
      return '';
    }
  };


  const ShowPreview = (props) => {
    switch (formId) {
      case 'preview-text':
        return <ShowText preview={props.preview} />
      case 'preview-picture':
        return <ShowPicture preview={props.preview} />
      default:
        return <ShowText preview={props.preview} />
    }
  }

  return (
    <>
    <div className="line-preview-main">
      <div className="line-preview-main-content">
        {
          previews.map((preview, index) => 
            <div className="line-preview-main-content-item-wrap">
              <Row>
                <ShowPreview key={index} preview={preview} />
              </Row>
            </div>
          )
        }
      </div>
    </div>
    </>
  );
};