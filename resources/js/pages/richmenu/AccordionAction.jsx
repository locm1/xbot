import React, { useState, useEffect, useLayoutEffect, useContext, useRef } from "react";
import { Col, Row, Form, Button, ListGroup, Card, Badge, Image } from 'react-bootstrap';

export default (props) => {
  const { 
    richMenu, formValue, handleChangeAsNumber, pages, checklLinks, externalLinks,
    actionLinks, handleLinkChange, error, handleCheckChange, ailias
  } = props;
  const actions = [...Array(richMenu.size)].map((v, i) => {
    return {
      id: i + 1,
      eventKey: `action-${i + 1}`,
      title: String.fromCodePoint(i + 65),
    }
  });

  const options = ['リンク', '送信テキスト', 'リッチメニュー切替']

  return (
    <Row className="w-100">
      {actions.map((v, i) => (
        <div className="d-flex mb-3 justify-content-between" key={`actions-${i}`}>
          <Col md={1}>
            {v.title}
          </Col>
          <Col md={10} className="pb-3">
            <Form.Select className="mb-0" value={formValue[v.title + '-type']} name={`${v.title}-type`} onChange={(e) => handleChangeAsNumber(e, v.title)}>
              <option value={0}>選択する</option>
              {
                options.map((option, index) => (<option key={`option-${index}`} value={index + 1}>{option}</option>))
              }
            </Form.Select>
            {(() => {
              const typeValue = formValue[v.title + '-type']
              const title = v.title

              switch (typeValue) {
                case 1:
                  return (
                    <>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {pages.map((v, k) => 
                          <Button 
                            key={`page-${k}`}
                            variant={checklLinks[`${title}-value`] === k + 1 ? "primary" : "outline-primary"} 
                            size="sm" 
                            className="description" 
                            name={`${title}-value`} 
                            value={v.is_external ? externalLinks[`${title}-value`] : v.path} 
                            onClick={(e) => handleCheckChange(e, v.is_external, title, typeValue, k + 1)}
                          >
                            {v.name}
                          </Button>
                        )}
                      </div>
                      {
                        checklLinks[`${title}-value`] === 8 && (
                          <>
                          <Form.Control
                            className="mb-1 mt-2"
                            name={`${title}-value`}
                            defaultValue={actionLinks[`${title}-value`].linkValue} 
                            onChange={(e) => handleLinkChange(e, title, typeValue)} 
                            placeholder="https://sample.com"
                            isInvalid={!!error[`${title}-value`]}
                          />
                          {
                            error[`${title}-value`] &&
                            <Form.Control.Feedback type="invalid">{error[`${title}-value`][0]}</Form.Control.Feedback>
                          }
                          </>
                        )
                      }
                    </>
                  )
                case 2:
                  return (
                    <>
                    <Form.Control
                      as="textarea"
                      className="mb-3 mt-2"
                      name={`${title}-value`}
                      value={actionLinks[`${title}-value`].textValue}
                      onChange={(e) => handleLinkChange(e, title, typeValue)}
                      isInvalid={!!error[`${title}-value`]}
                    />
                    {
                      error[`${title}-value`] &&
                      <Form.Control.Feedback type="invalid">{error[`${title}-value`][0]}</Form.Control.Feedback>
                    }
                    </>
                  )
                case 3:
                  return (
                    <>
                    <Form.Select 
                      className="mb-3 mt-2"
                      name={`${title}-value`}
                      value={actionLinks[`${title}-value`].richmenuValue}
                      onChange={(e) => handleLinkChange(e, title, typeValue)}
                      isInvalid={!!error[`${title}-value`]}
                    >
                      <option>リッチメニューを選択する</option>
                      {
                        ailias.map((v, k) => <option key={`option-${k}`} value={v.richMenuAliasId}>{v.name}</option>)
                      }
                    </Form.Select>
                    {
                      error[`${title}-value`] &&
                      <Form.Control.Feedback type="invalid">{error[`${title}-value`][0]}</Form.Control.Feedback>
                    }
                    </>
                  )
                default:
                  return <div className="" />
              }
            })()}
          </Col>
        </div>
      ))}
    </Row>
  );
}