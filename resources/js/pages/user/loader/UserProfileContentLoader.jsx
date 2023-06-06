

import React, { useState } from "react";
import { Col, Row, Card, Form, Badge, Image, Button, ListGroup, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import ProfileCover from "@img/img/profile-cover.jpg";

import { PurchaseTimeForm } from "@/pages/user/PurchaseTimeForm";
import { LineBlockInfoForm } from "@/pages/user/LineBlockInfoForm";
import { QuestionnaireAnswerForm } from "@/pages/user/QuestionnaireAnswerForm";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";

export default () => {
  return (
    <Card border="0" className="shadow text-center p-0">
      <Card.Img src={ProfileCover} className="position-absolute top-0 profile-cover" style={{height: '200px', width: '100%'}} />
      <ContentLoader
        height={280}
        width="100%"
        speed={1}
        style={{zIndex: '10'}}
      >
        <circle cx="50%" cy="170" r="75" className="mb-4" /> 
      </ContentLoader>
      <ContentLoader
        height={80}
        width="100%"
        speed={1}
      >
        <rect x="20" y="0" rx="3" ry="3" width="90%" height="20" />
        <rect x="20" y="40" rx="3" ry="3" width="90%" height="20" />
      </ContentLoader>
      <div className="py-3">
        <h2 className="fs-5 fw-bold mb-0">来店 / 購入回数</h2>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="bg-transparen py-3 px-0">
          <ContentLoader
            height={70}
            width="100%"
            speed={1}
          >
            <rect x="20" y="0" rx="3" ry="3" width="90%" height="20" />
            <rect x="20" y="40" rx="3" ry="3" width="90%" height="20" />
          </ContentLoader>
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className="py-3">
        <h2 className="fs-5 fw-bold mb-0">ブロック情報</h2>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="bg-transparent py-3 px-0">
          <ContentLoader
            height={70}
            width="100%"
            speed={1}
          >
            <rect x="20" y="0" rx="3" ry="3" width="90%" height="20" />
            <rect x="20" y="40" rx="3" ry="3" width="90%" height="20" />
          </ContentLoader>
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className="py-3">
        <h2 className="fs-5 fw-bold mb-0">アンケート情報</h2>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="bg-transparent py-3 px-0">
          <ContentLoader
            height={50}
            width="100%"
            speed={1}
          >
            <rect x="20" y="0" rx="3" ry="3" width="90%" height="20" />
          </ContentLoader>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Card>
  );
};