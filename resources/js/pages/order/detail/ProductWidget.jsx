
import React, { useState } from "react";
import { Col, Row, Card, Form, Badge, Image, Button, ListGroup, ProgressBar, Tooltip, Dropdown, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";


export const ProductWidget = (props) => {
  const { orderProducts } = props;

  const ProductWidgetItem = (props) => {
    const { product_id, quantity, name, product_image, price } = props;
    const link = Paths.EditProduct.path.replace(':id', product_id);

    return (
      <ListGroup.Item className="bg-transparent border-bottom py-4">
        <Row className="align-items-center">
          {product_image && (
            <Col xs="2" className="pe-0">
              <div className="order-product-img">
                <Image rounded src={product_image[0].image_path} className="m-0" />
              </div>
            </Col>
          )}
          <Col xs="10" className="px-0">
            <div>{name}</div>
            <div className="d-flex align-items-center pt-2">
              <div>数量：{quantity}</div>
              <div className="ps-3">￥{price.toLocaleString()}</div>
            </div>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <ListGroup className="list-group-flush">
      {orderProducts.map(orderProduct => <ProductWidgetItem key={`order-product-${orderProduct.id}`} {...orderProduct} />)}
    </ListGroup>
  );
};