
import React, { useState, useEffect } from "react";
import { Card, ListGroup, Image, Col, Row, Badge } from "react-bootstrap";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingTables = [_, _, _, _, _,];
  return (
    <>
      <Card border="0" className="shadow">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">配信情報</h5>
        </Card.Header> 
        <Card.Body className="py-0">
          <ListGroup className="list-group-flush">
            {
              loadingTables.map(v =>
                <ListGroup.Item className="bg-transparent border-bottom py-3 px-0">
                  <ContentLoader
                    height={60}
                    width={724}
                    speed={1}
                  >
                    <rect x="0" y="15" rx="3" ry="3" width="700" height="30" />
                  </ContentLoader>
                </ListGroup.Item>
              )
            }
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};
