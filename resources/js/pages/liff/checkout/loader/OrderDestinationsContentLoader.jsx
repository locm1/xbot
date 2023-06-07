import React, { useState, useEffect } from "react";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, ListGroup, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingTables = [...Array(3)].map((_, i) => i + 1);
  
  return (
    <>
      {
        loadingTables.map(v =>
          <ListGroup.Item className="bg-transparent border-bottom px-0" key={`order-destinations-loader-${v}`}>
            <Row className="">
              <Col xs="2" className="mt-5">
                <ContentLoader
                  height={87}
                  width={"100%"}
                  speed={1}
                >
                  <rect x="0" y="10%" rx="100" ry="100" width="70%" height="25%" />
                </ContentLoader>
              </Col>
              <Col xs="8" className="px-0">
                <ContentLoader
                  height={120}
                  width={"100%"}
                  speed={1}
                >
                  <rect x="0" y="15" rx="3" ry="3" width="130" height="18" />
                  <rect x="0" y="43" rx="3" ry="3" width="130" height="18" />
                  <rect x="0" y="71" rx="3" ry="3" width={"100%"} height="18" />
                  <rect x="0" y="99" rx="3" ry="3" width="140" height="18" />
                </ContentLoader>
              </Col>
            </Row>
          </ListGroup.Item>
        )
      }
    </>
  );
};