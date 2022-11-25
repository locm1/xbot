
import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Image, Button, Container } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { Paths } from "@/paths";
import NotFoundImage from "@img/img/illustrations/404.svg";


export default () => {
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col xs={12} className="text-center d-flex align-items-center justify-content-center">
              <div>
                <Card.Link as={Link} to={Paths.DashboardOverview.path}>
                  <Image src={NotFoundImage} className="img-fluid w-75" />
                </Card.Link>
                <h1 className="mt-5">
                  404 Page not <span className="fw-bolder">found</span>
                </h1>
                <p className="lead my-4">お探しのページは見つかりませんでした。</p>
                <p className="lead my-4">URLが正しく入力されていることをご確認ください。<br />アクセスできない場合は、ページが移動または削除された可能性があります。</p>
                <Button as={Link} variant="gray-800" className="d-inline-flex align-items-center justify-content-center mb-4" to={Paths.DashboardOverview.path}>
                  <ChevronLeftIcon className="icon icon-xs me-2" />
                  ホームに戻る
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
