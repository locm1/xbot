import React from 'react';
import { Card, Accordion } from 'react-bootstrap';

export default (props) => {
  const { defaultKey, data, className = "", children, style, isShow } = props;

  const AccordionItem = (item) => {
    const { eventKey, title, children, style } = item;

    return (
      <Accordion.Item eventKey={eventKey} style={style}>
        <Accordion.Button variant="link" className="w-100 d-flex justify-content-between">
          {title}
        </Accordion.Button>
        <Accordion.Body>
          <Card.Body className="py-2 px-0">
            {children}
          </Card.Body>
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  return (
    <>
    {/* <Accordion className={className}>
      {data.map(d => <AccordionItem key={`accordion-${d.id}`} {...d} children={children} style={style} isShow={isShow} />)}
    </Accordion> */}
    {data.map(d => 
      <Accordion className={className}>
        <AccordionItem key={`accordion-${d.id}`} {...d} children={children} style={style} />
      </Accordion>
    )}
    </>
  );
};