import React, { useState } from "react";
import { Card, Accordion, Button, Collapse } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

export default (props) => {
  const { defaultKey, data, className = "", children, style, isShow, setIsShow } = props;
  const [activeKey, setActiveKey] = useState();

  const handleClickContent = (value) => {
    if (isShow.includes(value)) {
      const index = isShow.indexOf(value);
      isShow.splice(index, 1);
    } else {
      isShow.push(value);
    }
    setIsShow([...isShow]);
  };


  const AccordionItem = (item) => {
    const { eventKey, title, children, style, index } = item;

    return (
      <Accordion.Item eventKey={eventKey} style={style}>
        <Accordion.Button variant="link" className="w-100 d-flex justify-content-between" onClick={() => handleClickContent(index)}>
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
    {data.map(d => 
    <div key={`accordion-${d.id}`}>
      <Accordion className={className}  activeKey={isShow} className="mb-2">
        <AccordionItem {...d} children={children} style={style} index={d.id} />
      </Accordion>
    </div>
    )}
    </>
  );
};