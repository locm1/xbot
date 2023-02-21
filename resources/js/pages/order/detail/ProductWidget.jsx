
import React, { useState } from "react";
import { Col, Row, Card, Form, Badge, Image, Button, ListGroup, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";


export const ProductWidget = (props) => {
  const {title, details } = props;

  const ProductWidgetItem = (props) => {
    const { product_id, quantity, name, product_image } = props;
    const link = Paths.EditProduct.path.replace(':id', product_id);

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row className="align-items-center">
          {product_image && (
            <Col xs="auto">
              <div className="avatar-md">
                <Image rounded src={product_image[0].image_path} className="m-0" />
              </div>
            </Col>
          )}
          <Col xs="auto" className="px-0">
            <Link to={link} className="fw-bolder">
                <span className="text-decoration-underline">{name}</span>
            </Link>
          </Col>
          <Col className="text-end">
            <span className="fs-6 fw-bolder text-dark">{quantity}</span>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <Card border="0" className="shadow">
      <Card.Header className="">
        <h2 className="fs-5 fw-bold mb-0">{title}</h2>
      </Card.Header>
      <Card.Body className="py-0">
        <ListGroup className="list-group-flush">
          {details.map(detail => <ProductWidgetItem key={`order-product-${detail.id}`} {...detail} />)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};