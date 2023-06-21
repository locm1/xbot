import React, { useState, useEffect } from "react";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, ListGroup, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingCards = [...Array(3)].map((_, i) => i + 1);

  return (
    <main className="">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
      <div className="liff-product-list">
        <ContentLoader
          height={200}
          width={390}
          speed={1}
          backgroundColor={'#6e6e6e'}
          foregroundColor={'#999'}
        >
          <rect x="40%" y="10" rx="100" ry="100" width="80" height="80" />
          <rect x="20%" y="120" rx="4" ry="4" width="60%" height="40" />
        </ContentLoader>
      </div>
    </main>
  );
};