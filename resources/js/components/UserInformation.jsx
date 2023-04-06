import React, { useState } from "react";
import { UserIcon, GlobeIcon, HomeIcon, PhoneIcon, ShoppingBagIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, ListGroup, Dropdown, Breadcrumb } from 'react-bootstrap';
import { ProfileCardWidget } from "@/components/Widgets";
import Profile1 from "@img/img/team/profile-picture-1.jpg";
import ProfileCover from "@img/img/profile-cover.jpg";

export default (props) => {
  const { name, nameKana, details, img_path } = props;
  return (
    <>
    <div>
      <Row>
        <Col xs={12} xl={12}>
          <Card border="0" className="shadow text-center p-0">
            <div style={{ backgroundImage: `url(${ProfileCover})` }} className="profile-cover rounded-top" />
            <Card.Body className="pb-5">
              <Card.Img src={img_path} className="avatar-xl rounded-circle mx-auto mt-n7 mb-4" />
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle className="fw-normal">
                {nameKana}
              </Card.Subtitle>
              <div className="orderer-info-wrap pt-5">
                <h6 className="mb-4 fw-bolder border-bottom pb-3">ユーザー情報</h6>
                {details.map((detail, index) => 
                  <Row className="bg-transparent border-bottom py-3 px-0">
                    <Col key={index} xs="auto" xl={4} className="px-3 pb-2">
                      <h4 className="fs-6 text-dark mb-0">{detail.title}</h4>
                    </Col>
                    <Col key={index} xs="auto" xl={8} className="px-4 pb-2">
                      <span className="fs-6 fw-bolder text-dark">{detail.value}</span>
                    </Col>
                  </Row>
                  )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    </>
  );
};
