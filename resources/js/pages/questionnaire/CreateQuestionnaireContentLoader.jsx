import React, { useState, useEffect } from "react";
import { Row, Col, Nav, Button, Card, ListGroup, Image, Table } from 'react-bootstrap';
import moment from "moment-timezone";
import { ProductWidget } from "@/pages/order/detail/ProductWidget";
import DeliveryWidget from "@/pages/order/detail/DeliveryWidget";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";

export default () => {
  const loadingTables = [_, _, _, _, _, _,];

  return (
    <>
      <Row>
				<Col xs={8}>
					<Card className="mb-3">
						<Card.Header className="bg-primary text-white px-3 py-2">
							<h5 className="mb-0 fw-bolder">質問内容</h5>
						</Card.Header>
						<Card.Body>
              <ContentLoader
                height={81}
                width={700}
                speed={1}
              >
                <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
              </ContentLoader>
						</Card.Body>
					</Card>
          <Card className="mb-3">
						<Card.Header className="bg-primary text-white px-3 py-2">
							<h5 className="mb-0 fw-bolder">回答形式</h5>
						</Card.Header>
						<Card.Body>
              <ContentLoader
                height={200}
                width={700}
                speed={1}
              >
                <rect x="0" y="0" rx="3" ry="3" width="50%" height="10%" />
                <rect x="0" y="40" rx="3" ry="3" width="50%" height="10%" />
                <rect x="0" y="80" rx="3" ry="3" width="50%" height="10%" />
                <rect x="0" y="120" rx="3" ry="3" width="50%" height="10%" />
                <rect x="0" y="160" rx="3" ry="3" width="50%" height="10%" />
              </ContentLoader>
						</Card.Body>
					</Card>
					<Card className="mb-3">
						<Card.Header className="bg-primary text-white px-3 py-2">
							<h5 className="mb-0 fw-bolder">回答項目</h5>
						</Card.Header>
						<Card.Body>
              <ContentLoader
                height={248}
                width={760.6}
                speed={1}
              >
                <rect x="0" y="0" rx="3" ry="3" width="90%" height="18%" />
                <rect x="0" y="60" rx="3" ry="3" width="90%" height="18%" />
                <rect x="0" y="120" rx="3" ry="3" width="90%" height="18%" />
                <rect x="0" y="180" rx="3" ry="3" width="90%" height="18%" />
              </ContentLoader>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card className="mb-3">
						<Card.Header className="bg-primary text-white px-3 py-2">
							<h5 className="mb-0 fw-bolder">詳細設定</h5>
						</Card.Header>
						<Card.Body>
              <ContentLoader
                height={118}
                width={300}
                speed={1}
              >
                <rect x="0" y="0" rx="3" ry="3" width="90%" height="30%" />
                <rect x="0" y="50" rx="3" ry="3" width="90%" height="30%" />
              </ContentLoader>
						</Card.Body>
					</Card>
				</Col>
			</Row>
    </>
  );
};
