import React, { useState, useEffect } from "react";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, ListGroup, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
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
      <Card border="0" className="shadow mb-4">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">お支払い情報</h5>
        </Card.Header>  
        <Card.Body className="py-0">
          <ListGroup className="list-group-flush pt-3">
            <ContentLoader
              height={70}
              width={"100%"}
              speed={1}
            >
              <rect x="0" y="5" rx="3" ry="3" width="130" height="18" />
              <rect x="0" y="33" rx="3" ry="3" width={"100%"} height="18" />
            </ContentLoader>
          </ListGroup>
        </Card.Body>
      </Card>
      <Card border="0" className="shadow">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">注文詳細</h5>
        </Card.Header>  
        <Card.Body className="py-0">
          <Row className="mt-3 mb-3 pb-3 border-bottom">
            <Col xs={5}>
              <ContentLoader
                height={20}
                width={115}
                speed={1}
              >
                <rect x="0" y="0" rx="4" ry="4" width="80%" height="100%" />
              </ContentLoader>
              <ContentLoader
                height={20}
                width={115}
                speed={1}
              >
                <rect x="0" y="0" rx="4" ry="4" width="80%" height="100%" />
              </ContentLoader>
              <ContentLoader
                height={20}
                width={115}
                speed={1}
              >
                <rect x="0" y="0" rx="4" ry="4" width="80%" height="100%" />
              </ContentLoader>
            </Col>
            <Col xs={7}>
              <ContentLoader
                height={20}
                width={170.8}
                speed={1}
              >
                <rect x="0" y="0" rx="4" ry="4" width="80%" height="100%" />
              </ContentLoader>
              <ContentLoader
                height={20}
                width={170.8}
                speed={1}
              >
                <rect x="0" y="0" rx="4" ry="4" width="80%" height="100%" />
              </ContentLoader>
              <ContentLoader
                height={20}
                width={170.8}
                speed={1}
              >
                <rect x="0" y="0" rx="4" ry="4" width="80%" height="100%" />
              </ContentLoader>
            </Col>
          </Row>
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
          <ListGroup className="list-group-flush">
            <ContentLoader
              height={120}
              width={'100%'}
            >
              <rect x={"0%"} y="40" rx="4" ry="4" width={'30%'} height='25' />
              <rect x={"50%"} y="40" rx="4" ry="4" width={'50%'} height='25' />
              <rect x={"0%"} y="80" rx="4" ry="4" width={'30%'} height='25' />
              <rect x={"50%"} y="80" rx="4" ry="4" width={'50%'} height='25' />
            </ContentLoader>
          </ListGroup>
          <div className="align-items-center my-4">
            <ContentLoader
              height={39}
              width={310}
              speed={1}
            >
              <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
            </ContentLoader>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};