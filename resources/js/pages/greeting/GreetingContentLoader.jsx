
import React, { useState, useEffect } from "react";
import { Card, Button, Form, Col, Row, Badge } from "react-bootstrap";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingTables = [_, _, _,];
  return (
    <>
      {
        loadingTables.map((v, index) =>
          <Card className="my-4" key={`greeting-content-loader-${index}`}>
            <Card.Body>
              <ContentLoader
                height={60}
                width={600}
                speed={1}
              >
                <rect x="15" y="2" rx="3" ry="3" width="50" height="35" />
                <rect x="80" y="2" rx="3" ry="3" width="50" height="35" />
                <rect x="145" y="2" rx="3" ry="3" width="50" height="35" />
              </ContentLoader>
              <ContentLoader
                height={150}
                width={800}
                speed={1}
              >
                <rect x="15" y="2" rx="3" ry="3" width="100%" height="100%" />
              </ContentLoader>
            </Card.Body>
          </Card>
        )
      }
    </>
  );
};
