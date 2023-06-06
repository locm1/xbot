
import React, { useState, useEffect } from "react";
import { Card, Button, Form, Col, Row, Badge } from "react-bootstrap";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingTables = [_, _, _, _, _, _, _, _, _, _,];
  return (
    <>
      {
        loadingTables.map(v =>
          <Card className="my-4">
            <Card.Body>
              <ContentLoader
                height={137}
                width={600}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="30%" height="18" />
                <rect x="0" y="50" rx="3" ry="3" width="70%" height="200" />
              </ContentLoader>
            </Card.Body>
          </Card>
        )
      }
    </>
  );
};
