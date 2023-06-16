import React, { useState, useEffect } from "react";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, ListGroup, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingCards = [...Array(3)].map((_, i) => i + 1);
  const loadingContents = [...Array(1)].map((_, i) => i + 1);

  const EventItem = () => {
    return (
      <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
        <ContentLoader
          height={20.8}
          width={"100%"}
          speed={1}
          className="mb-1"
        >
          <rect x="0" y="0" rx="3" ry="3" width="30%" height="100%" />
        </ContentLoader>
        <div className="d-flex justify-content-between mt-1">
          <ContentLoader
            height={17}
            width={"100%"}
            speed={1}
          >
            <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
          </ContentLoader>
          <ContentLoader
            height={17}
            width={167}
            speed={1}
          >
            <rect x="40" y="0" rx="3" ry="3" width="60%" height="100%" />
          </ContentLoader>
        </div>
        <div className="mt-1">
          <ContentLoader
            height={17}
            width={"100%"}
            speed={1}
          >
            <rect x="0" y="0" rx="3" ry="3" width="50%" height="100%" />
          </ContentLoader>
        </div>
        <div className="align-items-center mt-3">
          <ContentLoader
            height={39}
            width={"100%"}
            speed={1}
          >
            <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
          </ContentLoader>
        </div>
      </ListGroup.Item>
    );
  }

  return (
    <main className="p-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <ContentLoader
          height={40}
          width={70}
          speed={1}      
          backgroundColor={'#6e6e6e'}
          foregroundColor={'#999'}
        >
          <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
        </ContentLoader>
        <ContentLoader
          height={30}
          width={100}
          speed={1}
          backgroundColor={'#6e6e6e'}
          foregroundColor={'#999'}
        >
          <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
        </ContentLoader>
        <ContentLoader
          height={40}
          width={70}
          speed={1}
          backgroundColor={'#6e6e6e'}
          foregroundColor={'#999'}
        >
          <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
        </ContentLoader>
      </div>
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
                    <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
                  </ContentLoader>
                </div>
                <ContentLoader
                  height={40.7}
                  width={151}
                  speed={1}
                >
                  <rect x="15" y="15" rx="4" ry="4" width="100%" height="100%" />
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
    </main>
  );
};