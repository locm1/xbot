import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, InputGroup, Image, Button, Modal, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import LineIcon from "@/components/line/LineIcon";
import { KeyboardIcon } from "@/components/icons/Icons";
import LineHeader from "@/components/line/LineHeader";
import ReactPlayer from 'react-player'

import RichMenuTemplate from "@/pages/richmenu/RichMenuTemplate";

export default (props) => {
  const history = useHistory();
  const [messageDetailModal, setMessageDetailModal] = useState(false);
  const { formValue, files, previews, page, richMenu, templateFrame, templateActive, setTemplateActive } = props;
  const handleClose = () => setMessageDetailModal(false);


  const ShowText = (props) => {
    if (props.preview.text) {
      return (
        <>
        <Col xs={12} md={2} xl={2} className="mb-4 mb-md-0">
          <LineIcon />
        </Col>
        <Col xs={12} md={10} xl={10} className="text-center text-lg-start">
          <div className="line-preview-main-content-comment-wrap">
            <div className="line-preview-comment">
              <p className="d-flex flex-wrap">{props.preview.text}</p>
            </div>
          </div>
        </Col>
        </>
      );
    } else {
      return '';
    }
  }

  const ShowVideo = (props) => {
    if (props.preview.video_path) {
      return (
        <>
        <Col xs={12} md={2} xl={2} className="mb-4 mb-md-0">
          <LineIcon />
        </Col>
        <Col xs={12} md={10} xl={10} className="text-center text-lg-start">
          <div className="line-preview-comment-image">
            <ReactPlayer url={props.preview.video_path} controls width="100%" />
          </div>
        </Col>
        </>
      );
    } else {
      return '';
    }
  };

  const ShowPicture = (props) => {
    if (props.preview.image_path) {
      return (
        <>
        <Col xs={12} md={2} xl={2} className="mb-4 mb-md-0">
          <LineIcon />
        </Col>
        <Col xs={12} md={10} xl={10} className="text-center text-lg-start">
          <div className="line-preview-comment-image">
            <Image src={props.preview.image_path} />
          </div>
        </Col>
        </>
      );
    } else {
      return '';
    }
  };


  const ShowPreview = (props) => {
    const { preview } = props;
    switch (preview.type) {
      case 1:
        return <ShowText preview={preview} />
      case 2:
        return <ShowPicture preview={preview} />
      case 3:
        return <ShowVideo preview={preview} />
      default:
        return <ShowText preview={preview} />
    }
  }

  const RichMenuBar = (props) => {
    const { formValue } = props;
    return (
      <>
      <div className="line-rich-menu-bar-wrap">
        <div className="d-flex justify-content-between line-rich-menu-bar">
          <KeyboardIcon className="icon icon-xs me-2" />
          <div className="d-flex line-rich-menu-bar-item">
            <small className="text-center">{formValue.menuBarText}</small>
            <ChevronDownIcon className="icon icon-xs me-2" />
          </div>
        </div>
      </div>
      </>
    );
  }

  const RichMenu = (props) => {
    const { files, page, richMenu } = props;

    return (
      <>
      {
        (() => {
          if (files) {
            return(
              <>
              <div className={richMenu.type > 7 ? 'line-rich-menu2-wrap' : 'line-rich-menu-img-wrap'}>
                <Image src={files} className={`w-100 h-100 ${page ? 'line-rich-menu-img' : ''}`} />
                {templateFrame && 
                  <RichMenuTemplate
                  richMenu={richMenu}
                  templateActive={templateActive}
                  setTemplateActive={setTemplateActive}
                />
                }
              </div>
              </>
            );
          } else {
            return (
              <>
              <div className={richMenu.type > 7 ? 'line-rich-menu2-wrap' : 'line-rich-menu-wrap'}>
                <small>テンプレートを選択して、背景画像をアップロードしてください。</small>
                {templateFrame && 
                  <RichMenuTemplate
                  richMenu={richMenu}
                  templateActive={templateActive}
                  setTemplateActive={setTemplateActive}
                  />
                }
              </div>
              </>
            );
          }
        })()
      }
      </>
    );
  }

  return (
    <>
    <div className={page ? 'line-rich-menu-preview' : 'line-preview'}>
      <LineHeader />
      <div className="line-preview-main">
        <div className="line-preview-main-content">
          {
            previews.map((preview, index) => 
              <div className="line-preview-main-content-item-wrap" key={index}>
                <Row>
                  <ShowPreview preview={preview} />
                </Row>
              </div>
            )
          }
        </div>
        {
          page && (
            <>
              <RichMenu files={files} page="richmenu" richMenu={richMenu} templateFrame={templateFrame} />
              <RichMenuBar formValue={formValue} />
            </>
          )
        }
      </div>
    </div>
    </>
  );
};