import React, { useState, useEffect } from "react";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, ListGroup, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingCards = [...Array(3)].map((_, i) => i + 1);
  const loadingContents = [...Array(3)].map((_, i) => i + 1);

  const EventItem = () => {
    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <Row className="align-items-center">
          <Col xs="12" className="px-0">
            <ContentLoader
              height={20.8}
              width={"100%"}
              speed={1}
              className="mb-1"
            >
              <rect x="0" y="10%" rx="3" ry="3" width="30%" height="100%" />
            </ContentLoader>
          </Col>
          <Col xs="6" className="px-0">
            <ContentLoader
              height={17}
              width={"100%"}
              speed={1}
            >
              <rect x="0" y="10%" rx="3" ry="3" width="100%" height="100%" />
            </ContentLoader>
          </Col>
          <Col xs="6" className="text-end">
            <ContentLoader
              height={17}
              width={167}
              speed={1}
            >
              <rect x="40" y="10%" rx="3" ry="3" width="60%" height="100%" />
            </ContentLoader>
          </Col>
          <Col xs="12" className="px-0">
            <div className="d-frex mt-1">
              <ContentLoader
                height={17}
                width={"100%"}
                speed={1}
              >
                <rect x="0" y="10%" rx="3" ry="3" width="50%" height="100%" />
              </ContentLoader>
            </div>
          </Col>
          <Col xs="12" className="text-end">
            <div className="align-items-center mt-3">
              <ContentLoader
                height={39}
                width={"100%"}
                speed={1}
              >
                <rect x="0" y="10%" rx="3" ry="3" width="100%" height="100%" />
              </ContentLoader>
            </div>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <>
      {
        loadingCards.map(v =>
          <Card border="0" className="my-4" key={`event-reservations-loader-${v}`}>
            <Card.Header className="border-bottom">
              <div className="d-flex">
                <div>
                  <ContentLoader
                    height={56.7}
                    width={50}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                </div>
                <ContentLoader
                  height={40.7}
                  width={151}
                  speed={1}
                >
                  <rect x="15" y="15" rx="3" ry="3" width="100%" height="100%" />
                </ContentLoader>
              </div>
            </Card.Header>
            <Card.Body className="py-0">
              <ListGroup className="list-group-flush">
                {loadingContents.map(loadingContent => (<EventItem key={`event-item-loader-${loadingContent}`} />))}
              </ListGroup>
            </Card.Body>
          </Card>
        )
      }
    </>
  );
};