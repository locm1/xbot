import React, { useState } from "react";
import { Col, Row, Card, Form, Badge, Image, Button, ListGroup, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import authorEarnings from "@/data/authorEarnings";
import { Link, useHistory } from 'react-router-dom';

export const TargetUsersWidget = (props) => {
  const { title } = props;

  const AuthorItem = (props) => {
    const { name, image, jobTitle, id } = props;

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row className="align-items-center">
          <Col xs="auto">
            <Card.Link href="#" className="avatar-md">
              <Image rounded src={image} className="m-0" />
            </Card.Link>
          </Col>
          <Col xs="auto" className="px-0">
            <h4 className="fs-6 text-dark mb-0">
              <Card.Link as={Link} to={`/user/edit/${id}`}>
                {name}
              </Card.Link>
            </h4>
            <small>{jobTitle}</small>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <Card border="0" className="shadow">
      <Card.Header className="border-bottom">
        <h2 className="fs-5 fw-bold mb-0">
          {title}
        </h2>
      </Card.Header>
      <Card.Body className="py-0">
        <ListGroup className="list-group-flush">
          {authorEarnings.map(author => <AuthorItem key={`author-${author.id}`} {...author} />)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};