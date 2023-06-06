
import React, { useState, useEffect } from "react";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingTables = [...Array(47)].map((_, i) => i + 1);
  
  return (
    <>
      {
        loadingTables.map(v =>
          <Col className="mb-2" key={`postage-${v}`}>
            <ContentLoader
              height={60}
              width="100%"
              speed={1}
            >
              <rect x="0" y="10" rx="3" ry="3" width="100%" height="100%" />
            </ContentLoader>
          </Col>
        )
      }
    </>
  );
};
