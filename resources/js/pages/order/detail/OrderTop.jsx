import React, { useState } from "react";
import { UserIcon, GlobeIcon, HomeIcon, PhoneIcon, ShoppingBagIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, Dropdown, Breadcrumb } from 'react-bootstrap';
import { ProfileCardWidget } from "@/components/Widgets";
import Profile1 from "@img/img/team/profile-picture-1.jpg";
import ProfileCover from "@img/img/profile-cover.jpg";

export default (props) => {
  const { name, nameKana, zipCode, address, tel, purchaseTimes } = props;
  return (
    <>
    <div className="mt-3">
      <Row>
        <Col xs={12} xl={12}>
          <Card border="0" className="shadow text-center p-0">
            <div style={{ backgroundImage: `url(${ProfileCover})` }} className="profile-cover rounded-top" />
            <Card.Body className="pb-5">
              <Card.Img src={Profile1} className="avatar-xl rounded-circle mx-auto mt-n7 mb-4" />
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle className="fw-normal">
                {nameKana}
              </Card.Subtitle>
              <Card.Text className="text-gray mb-4">
                {zipCode}
              </Card.Text>
              <Card.Text className="text-gray mb-4">
                {address}
              </Card.Text>
              <Card.Text className="text-gray mb-4">
                {tel}
              </Card.Text>
              <Card.Text className="text-gray mb-4">
                {purchaseTimes}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    </>
  );
};
