import React, { useState, useEffect } from "react";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, ListGroup, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingCards = [...Array(3)].map((_, i) => i + 1);
  const loadingContents = [...Array(2)].map((_, i) => i + 1);

  const OrderCard = () => {
    return (
      <Card border="0" className="shadow p-0 mb-4">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <ContentLoader
            height={26}
            width={326}
            speed={1}
          >
            <rect x="0" y="0" rx="4" ry="4" width="50%" height="100%" />
          </ContentLoader>
        </Card.Header>  
        <Card.Body>
          <div className="d-flex align-items-center pb-3 justify-content-between">
            <ContentLoader
              height={21}
              width={138.45}
              speed={1}
            >
              <rect x="0" y="10%" rx="4" ry="4" width="100%" height="100%" />
            </ContentLoader>
            <ContentLoader
              height={21}
              width={93.73}
              speed={1}
            >
              <rect x="0" y="10%" rx="4" ry="4" width="100%" height="100%" />
            </ContentLoader>
          </div>
          <ListGroup className="list-group-flush">
            {
              loadingContents.map(loadingContent =>
                <ContentLoader
                  height={150}
                  width={'100%'}
                  key={`order-product-${loadingContent}`}
                >
                  <rect x="0" y="20" rx="4" ry="4" width='130' height='130' />
                  <rect x={"50%"} y="20" rx="4" ry="4" width={'50%'} height='25' />
                  <rect x={"50%"} y="65" rx="4" ry="4" width={'50%'} height='25' />
                  <rect x={"50%"} y="115" rx="4" ry="4" width={'40%'} height='25' />
                </ContentLoader>
              )
            }
          </ListGroup>
          <div className="align-items-center my-3">
            <ContentLoader
              height={39}
              width={310}
              speed={1}
              className="mt-2"
            >
              <rect x="0" y="10%" rx="4" ry="4" width="100%" height="100%" />
            </ContentLoader>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card border="0" className="shadow p-0 mt-3">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">注文日でフィルタリング</h5>
        </Card.Header>
        <Card.Body className="pb-3 rounded-bottompt-3">
          <Row>
            <Col xs={12} className="my-1">
              <ContentLoader
                height={39}
                width={310}
                speed={1}
              >
                <rect x="0" y="10%" rx="4" ry="4" width="100%" height="100%" />
              </ContentLoader>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <div className="d-flex align-items-center">
        <ContentLoader
          height={25.59}
          width={73.69}
          speed={1}
          backgroundColor={'#6e6e6e'}
          foregroundColor={'#999'}
          className="my-4"
        >
          <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
        </ContentLoader>
      </div>
      {loadingCards.map(loadingCard => <OrderCard key={`order-loading-${loadingCard}`} />)}
    </>
  );
};