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
      <Row className="">
        <Col xs={12} xl={12}>
          <Card border="0" className="shadow p-5">
            <div className="d-sm-flex justify-content-between border-bottom border-light pb-4">
              <div>
                <ContentLoader
                  height={39.375}
                  width={411}
                  speed={1}
                >
                  <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                </ContentLoader>
                <div className="mt-3">
                  <ContentLoader
                    height={24}
                    width={411}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                </div>
              </div>
            </div>

            <Row>
              <ListGroup className="list-group-flush">
                {
                  loadingTables.map(v =>
                    <ListGroup.Item className="bg-transparent border-bottom py-4">
                      <Row className="align-items-center">
                        <Col xs="2" className="pe-0">
                          <ContentLoader
                            height={167}
                            width={165.3}
                            speed={1}
                          >
                            <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                          </ContentLoader>
                        </Col>
                        <Col xs="10" className="px-0">
                          <ContentLoader
                            height={80}
                            width={886}
                            speed={1}
                          >
                            <rect x="80" y="15" rx="3" ry="3" width="30%" height="30%" />
                            <rect x="80" y="55" rx="3" ry="3" width="30%" height="30%" />
                          </ContentLoader>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                }
              </ListGroup>
            </Row>

            <Row>
              <Col xs={12}>
                <div className="d-flex justify-content-end text-end mb-4 py-4">
                  <div className="mt-2">
                    <Table className="table-clear">
                      <tbody>
                        <tr>
                          <ContentLoader
                            height={45}
                            width={210}
                            speed={1}
                          >
                            <rect x="10" y="0" rx="3" ry="3" width="100%" height="100%" />
                          </ContentLoader>
                        </tr>
                        <tr>
                          <ContentLoader
                            height={45}
                            width={210}
                            speed={1}
                          >
                            <rect x="10" y="0" rx="3" ry="3" width="100%" height="100%" />
                          </ContentLoader>
                        </tr>
                        <tr>
                          <ContentLoader
                            height={45}
                            width={210}
                            speed={1}
                          >
                            <rect x="10" y="0" rx="3" ry="3" width="100%" height="100%" />
                          </ContentLoader>
                        </tr>
                        <tr>
                          <ContentLoader
                            height={45}
                            width={210}
                            speed={1}
                          >
                            <rect x="10" y="0" rx="3" ry="3" width="100%" height="100%" />
                          </ContentLoader>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <div className="d-sm-flex justify-content-between border-bottom border-light pb-4">
                  <h4>配送情報</h4>
                </div>
                <Table responsive className="mb-0">
                  <tbody className="border-0">
                    <tr className="border-bottom">
                      <ContentLoader
                        height={50.69}
                        width={900}
                        speed={1}
                      >
                        <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                      </ContentLoader>
                    </tr>
                    <tr className="border-bottom">
                      <ContentLoader
                        height={50.69}
                        width={900}
                        speed={1}
                      >
                        <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                      </ContentLoader>
                    </tr>
                    <tr className="border-bottom">
                      <ContentLoader
                        height={50.69}
                        width={900}
                        speed={1}
                      >
                        <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                      </ContentLoader>
                    </tr>
                    <tr className="border-bottom">
                      <ContentLoader
                        height={50.69}
                        width={900}
                        speed={1}
                      >
                        <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                      </ContentLoader>
                    </tr>
                    <tr className="border-bottom">
                      <ContentLoader
                        height={50.69}
                        width={900}
                        speed={1}
                      >
                        <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                      </ContentLoader>
                    </tr>
                    <tr className="border-bottom">
                      <ContentLoader
                        height={50.69}
                        width={900}
                        speed={1}
                      >
                        <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                      </ContentLoader>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};
