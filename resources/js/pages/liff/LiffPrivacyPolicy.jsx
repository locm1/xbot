import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';

import { getPrivacyPolicy } from "@/pages/liff/api/SettingApiMethods";

export default () => {
  const [privacyPolicy, setPrivacyPolicy] = useState({
    content: ''
  });

  useEffect(() => {
    getPrivacyPolicy(setPrivacyPolicy)
  }, []);

  return (
    <>
      <main className="liff-product-detail">
        <div className="p-3">
          <Card border="0" className="shadow">
            <Card.Header className="border-bottom">
              <h5 className="liff-product-detail-name mb-0">プライバシーポリシー</h5>
            </Card.Header>
            <Card.Body className="py-0">
              <Row className="">
                <Col xs="12" className="mt-3 mb-3">
                  <div className="liff-specific-trade-content">
                    {privacyPolicy.content}
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