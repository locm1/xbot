import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';

import { getTermsOfService } from "@/pages/liff/api/SettingApiMethods";

export default () => {
  const [termsOfService, setTermsOfService] = useState({
    content: ''
  });

  useEffect(() => {
    getTermsOfService(setTermsOfService)
  }, []);
  return (
    <>
      <main className="liff-product-detail">
        <div className="p-3">
          <Card border="0" className="shadow">
      <Card.Header className="bg-primary text-white px-3 py-2">
        <h5 className="mb-0 fw-bolder">利用規約</h5>
      </Card.Header>  
            <Card.Body className="py-0">
              <Row className="">
                <Col xs="12" className="mt-3 mb-3">
                  <div className="liff-specific-trade-content">
                    {termsOfService.content}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </main>
    </>
  );
};