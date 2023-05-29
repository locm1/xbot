import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, InputGroup, Image, Button, Modal, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import LineIcon from "@/components/line/LineIcon";
import { KeyboardIcon } from "@/components/icons/Icons";
import LineHeader from "@/components/line/LineHeader";
import ReactPlayer from 'react-player'

import QuestionnairePreview from "@/components/liff/QuestionnairePreview";

export default (props) => {
  const { page, questionnaire, questionnaireItems } = props;
  const history = useHistory();
  const [messageDetailModal, setMessageDetailModal] = useState(false);
  const handleClose = () => setMessageDetailModal(false);


  const ShowText = (props) => {
    const { preview } = props;
    //const newText = preview.text.replace('%friend_name%', '<span className="message-replace-content">友だちの表示名</span>').replace('%account_name%', '<span className="message-replace-content">アカウント名</span>')
    
    if (preview.text) {
      return (
        <>
        <Col xs={12} md={2} xl={2} className="mb-4 mb-md-0">
          <LineIcon />
        </Col>
        <Col xs={12} md={10} xl={10} className="text-center text-lg-start">
          <div className="line-preview-main-content-comment-wrap">
            <div className="line-preview-comment">
              <p className="d-flex flex-wrap">{preview.text}</p>
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


  const ShowCarouselImage = (props) => {
    return (
      <div className="overflow-x-scroll d-flex">
        <div className="d-flex">
          {(props.preview.carousel_images.map((v, k) => 
              <div key={`carousel-image-${k}`} className="for-img me-3">
                <Image src={v.image_path} width="330" height="330" className="rounded" />
                <div className="line-label">
                  {v.label}
                </div>  
              </div>
            ))}
        </div>
      </div>
    )
  };

  const ShowCarouselProduct = (props) => {
    return (
      <div className="overflow-x-scroll d-flex">
        <div className="d-flex">
          {(props.preview.carousel_products.map((v, k) => 
              <div key={`carousel-product-${k}`}  className="product-card me-3 rounded">
                <Image src={v.image_path} width="300" height="195" className="" />
                <div className="product-labels">
                  <div className="product-label-title">{v.title}</div>
                  <div className="product-label-label">{v.text}</div>
                </div>  
                <div className="product-buttons">
                  <div className="product-button">{v.label}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    )
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


  const ShowPreview = () => {
    switch (page) {
      case 'questionnaire':
        return <QuestionnairePreview questionnaire={questionnaire} questionnaireItems={questionnaireItems} />
    }
  }

  return (
    <>
    <div className="liff-preview bg-body">
      <div className="line-preview-main-content-item-wrap">
        <ShowPreview />
      </div>
    </div>
    </>
  );
};