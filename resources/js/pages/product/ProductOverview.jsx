import React, { useState } from "react";
import { Col, Row, Form, Card, Image, Breadcrumb, Button, Dropdown } from 'react-bootstrap';

export default (props) => {
  const { id, title, content, deleteProductOverview } = props; 
  return (
    <>
      <Card border="1" className="shadow mb-4 pe-2">
        <Card.Header className="d-flex align-items-center justify-content-start border-0 p-0 mb-3">
          <div className="privilege-delete-button pt-5" onClick={() => deleteProductOverview(id)}>
            <Button variant="close" />
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="name">
                <Form.Label>コンテンツタイトル</Form.Label>
                <Form.Control required type="text" name="name" placeholder="" />
              </Form.Group>
            </Col>
            <Col md={12} className="mb-3">
              <Form.Group id="overview">
                <Form.Label>コンテンツ</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
