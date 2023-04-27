import React, { useState } from "react";
import { Col, Row, Card, Form, Badge, Image, Button, ListGroup, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import { Paths } from "@/paths";
import { Link, useHistory } from 'react-router-dom';

export const TargetUsersWidget = (props) => {
  const { title, users } = props;

  const AuthorItem = (props) => {
    const { first_name, last_name, nickname, img_path, id } = props;
    const link = Paths.EditUser.path.replace(':id', id)

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row className="align-items-center">
          <Col xs="auto">
            <Card.Link href="#" className="avatar-md">
              <Image rounded src={img_path} className="m-0" />
            </Card.Link>
          </Col>
          <Col xs="auto" className="px-0">
            <h4 className="fs-6 text-dark mb-0">
              <Card.Link as={Link} to={link}>
                {last_name} {first_name}
              </Card.Link>
            </h4>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <Card border="0" className="shadow">
      <Card.Header className="bg-primary text-white px-3 py-2">
        <h5 className="mb-0 fw-bolder">{title}</h5>
      </Card.Header> 
      <Card.Body className="py-0">
        <ListGroup className="list-group-flush send-target-user-widget">
          {users && users.map(user => <AuthorItem key={`send-message-user-${user.id}`} {...user.user} />)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};