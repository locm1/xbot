import React, { useState, useEffect } from "react";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, ListGroup, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingCards = [...Array(3)].map((_, i) => i + 1);

  return (
    <main className="liff-product-detail">
      <div className="p-3">
        <div className="m-3">
          <ContentLoader
            height={268.81}
            width={326}
            speed={1}
            backgroundColor={'#6e6e6e'}
            foregroundColor={'#999'}
          >
            <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
          </ContentLoader>
        </div>
        <Card border="0" className="my-4 rounded-0">
          <Card.Header className="pb-0 border-0">
            <div className="">
              <h5 className="text-center fw-bolder fs-1 text-primary">来店QRコード</h5>
            </div>
          </Card.Header>
          <Card.Body className="py-0">
            <Row className="">
              <Col xs="12" className="mt-3 mb-3">
                <p className="text-center">来店されましたら<br />QRコードをスタッフにお見せください。</p>
                <div className="text-center text-md-center mt-md-0">
                <ContentLoader
                  height={150}
                  width={150}
                  speed={1}
                >
                  <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
                </ContentLoader>
                </div>
              </Col>
            </Row>
            <div className="px-3">
              <h5 className="text-center fw-bolder fs-1 text-primary text-decoration-underline mt-3">特典一覧</h5>
              {
                loadingCards.map((v, index) => 
                  <ContentLoader
                    height={264}
                    width={"100%"}
                    speed={1}
                    className="mb-4"
                  >
                    <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
                  </ContentLoader>
                )
              }
            </div>
          </Card.Body>
        </Card>
      </div>
    </main>
  );
};