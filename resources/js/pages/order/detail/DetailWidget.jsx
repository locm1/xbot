
import React, { useState } from "react";
import { Col, Row, Card, Form } from 'react-bootstrap';

export const DetailWidget = (props) => {
  const { details, title } = props;

  return (
    <Card border="0" className="shadow mb-4">
      <Card.Body>
        <h5 className="mb-4 border-bottom pb-3">{title}</h5>
        <Form>
          <Row>
            {details.map((detail, index) => 
              <Col key={`order-detail-${index}`} md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="border-bottom pb-2 pt-3">{detail.title}</Form.Label>
                  {(() => {
                    if (detail.title == '注文日時') {
                      const date = new Date(detail.value)
                      return <div>{date.toLocaleString()}</div>
                    } else {
                      return <div>{detail.value}</div>
                    }
                  })()}
                </Form.Group>
              </Col>
            )}
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};