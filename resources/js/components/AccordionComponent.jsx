import React, { useState } from "react";
import { Card, Accordion, Button, Collapse, Row, Col, Form } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

export default (props) => {
  const { defaultKey, data, className = "", style, isShow, setIsShow, options, handleChange, formValue} = props;
  const [activeKey, setActiveKey] = useState();


  const AccordionItem = (item) => {
    const { eventKey, title, children, style, index, options } = item;

    return (
      <Accordion.Item eventKey={eventKey} style={style}>
        <Accordion.Button variant="link" className="w-100 d-flex justify-content-between">
          {title}
        </Accordion.Button>
        <Accordion.Body>
          <Card.Body className="py-2 px-0">
            <Row>
              <Col md={4}>
                <div>タイプ</div>
              </Col>
              <Col md={8}>
                <Form.Select className="mb-0" value={formValue[title + '-type']} name={`${title}-type`} onChange={handleChange}>
                <option>選択する</option>
                  {
                    options.map((option, index) => <option key={index} value={index + 1}>{option}</option>)
                  }
                </Form.Select>
                <TypeForm typeValue={formValue[title + '-type']} title={title} />
              </Col>
            </Row>
          </Card.Body>
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  const TypeForm = (props) => {
    const { typeValue, title } = props;
    let form;
    console.log(typeValue);
    switch (typeValue) {
      case '1':
        console.log('case 1');
        return <Form.Control name={`${title}-link`} value={formValue[`${title}-link`]} onBlur={handleChange} />
      case '2':
        break;
      case '3':
        return <Form />
    }
  }
  return (
    <Accordion className={className} alwaysOpen>
      {data.map(d => <AccordionItem key={`accordion-${d.id}`} {...d} options={options} />)}
    </Accordion>
  );
};