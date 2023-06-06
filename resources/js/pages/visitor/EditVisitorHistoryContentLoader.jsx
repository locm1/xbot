

import React, { useState } from "react";
import { Col, Row, Card, Form, Badge, Image, Button, ListGroup, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import ProfileCover from "@img/img/profile-cover.jpg";

import { PurchaseTimeForm } from "@/pages/user/PurchaseTimeForm";
import { LineBlockInfoForm } from "@/pages/user/LineBlockInfoForm";
import { QuestionnaireAnswerForm } from "@/pages/user/QuestionnaireAnswerForm";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
const loadingContents = [_, _, _, _,];

export default () => {
  return (
    <div>
      <Row>
        <Col xs={12} xl={12}>
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
            <Card.Body className="pb-5">
              <div className="orderer-info-wrap pt-5">
                <ContentLoader
                  height={70}
                  width="100%"
                  speed={1}
                > 
                  <rect x="0" y="0" rx="3" ry="3" width="100%" height="30" />
                </ContentLoader>
                {
                  loadingContents.map((v, index) =>
                    <div className="bg-transparent border-bottom py-3 px-0" key={`detail-${index}`}>
                      <ContentLoader
                        height={65}
                        width="100%"
                        speed={1}
                      > 
                        <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                      </ContentLoader>
                    </div>
                  )
                }
                {/* {details.map((detail, index) => 
                  <Row className="bg-transparent border-bottom py-3 px-0" key={`detail-${index}`}>
                    <Col xs="auto" xl={4} className="px-3 pb-2">
                      <h4 className="fs-6 text-dark mb-0">{detail.title}</h4>
                    </Col>
                    <Col xs="auto" xl={8} className="px-4 pb-2">
                      <span className="fs-6 fw-bolder text-dark">{detail.value}</span>
                    </Col>
                  </Row>
                  )} */}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};