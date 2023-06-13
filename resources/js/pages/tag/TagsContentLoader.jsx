
import React, { useState, useEffect } from "react";
import { Card, Button, Form, Col, Row, Badge } from "react-bootstrap";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingTables = [_, _, _, _, _, _, _, _, _, _,];
  return (
    <>
      {
        loadingTables.map((v, index) =>
          <Card border="bottom" className="hover-state rounded-0 rounded-top py-3" style={{height:'88px'}} key={`tag-loader-${index}`}>
            <Card.Body className="d-sm-flex align-items-center flex-wrap flex-lg-nowrap py-0">
              <ContentLoader
                height={39.375}
                width={100}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="50" height="18" />
              </ContentLoader>
              <ContentLoader
                height={39.375}
                width={857}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="850" height="18" />
              </ContentLoader>
              <ContentLoader
                height={39.375}
                width={300}
                speed={1}
              >
                <rect x="70" y="2" rx="3" ry="3" width="50" height="35" />
                <rect x="145" y="2" rx="3" ry="3" width="50" height="35" />
              </ContentLoader>
            </Card.Body>
          </Card>
        )
      }
    </>
  );
};
