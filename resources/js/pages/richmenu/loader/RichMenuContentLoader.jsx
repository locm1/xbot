import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useDropzone } from "react-dropzone";
import { Col, Row, Form, Button, ListGroup, Card, Modal, Image } from 'react-bootstrap';
import LinePreview from "@/components/line/LinePreview";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";

export default () => {
  const loadingTables = [_, _, _, _, _, _,];

  return (
    <>
      <Card border="0" className="shadow mb-4 rich-menu-content-wrap">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">コンテンツ設定</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={12} className="mb-5">
              <ContentLoader
                height={71}
                width={1430}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="100%" height="100%" />
              </ContentLoader>
            </Col>
          </Row>
          <div className="d-flex justify-content-between">
            <div className='line-rich-menu-preview me-2'>
              <ContentLoader
                height={600}
                width={340}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="100%" height="100%" />
              </ContentLoader>
            </div>
            <div className="rich-menu-content">
              <ListGroup className="list-group-flush">
                <ContentLoader
                  height={53}
                  width={890}
                  speed={1}
                >
                  <rect x="0" y="10" rx="3" ry="3" width="100%" height="100%" />
                </ContentLoader>
                <div className="mt-3">
                  <ContentLoader
                    height={183.4}
                    width={890}
                    speed={1}
                  >
                    <rect x="0" y="10" rx="3" ry="3" width="100%" height="25%" />
                    <rect x="0" y="80" rx="3" ry="3" width="20%" height="60%" />
                  </ContentLoader>
                </div>
                <ListGroup.Item className="d-flex justify-content-between px-0 py-3 border-bottom">
                  <ContentLoader
                    height={183.4}
                    width={773.5}
                    speed={1}
                  >
                    <rect x="0" y="10" rx="3" ry="3" width="30%" height="20%" />
                  </ContentLoader>
                  <Row className="w-100">
                    {
                      loadingTables.map(v =>
                        <div className="mb-3">
                          <ContentLoader
                            height={140.8}
                            width={586.1}
                            speed={1}
                          >
                            <rect x="0" y="10" rx="3" ry="3" width="100%" height="100%" />
                          </ContentLoader>
                        </div>
                      )
                    }
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className={`px-0 py-4`}>
                  <ContentLoader
                    height={39}
                    width={890}
                    speed={1}
                  >
                    <rect x="0" y="10" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}