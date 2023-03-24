import React from 'react';
import { Card, Accordion } from 'react-bootstrap';

export default (props) => {
  const { eventKey, title, children } = props;

  return (
    <Accordion>
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Button variant="link" className="w-100 d-flex justify-content-between">
          {title}
        </Accordion.Button>
        <Accordion.Body>
          <Card.Body className="py-2 px-0">
          <Card.Text className="mb-0">スタッフへお見せください。</Card.Text>
            <Card.Text className="mb-0">
              {children}
            </Card.Text>
          </Card.Body>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};