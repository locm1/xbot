
import React, { useState, useEffect } from "react";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import { Row, Col, Badge, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingTables = [_, _, _, _, _, _, _, _, _, _,];
  return (
    <>
      <main className="">
        <div className="px-3 py-3">
          <Card border="0" className="shadow mt-2">
            <Card.Header className="bg-primary text-white px-3 py-2">
              <ContentLoader
                height={26}
                width={358}
                speed={1}
                className="mb-2"
              >
                <rect x="0" y="40%" rx="3" ry="3" width="40%" height="100%" />
              </ContentLoader>
            </Card.Header>
            <Card.Body className="py-0">
              <Row className="mt-3">
                <div className="mb-4">
                  <ContentLoader
                    height={24}
                    width={80}
                    speed={1}
                    className="mb-2"
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                  <ContentLoader
                    height={39}
                    width={310}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="40%" height="100%" />
                    <rect x="180" y="0" rx="3" ry="3" width="40%" height="100%" />
                  </ContentLoader>
                </div>
                <div className="mb-4">
                  <ContentLoader
                    height={24}
                    width={80}
                    speed={1}
                    className="mb-2"
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                  <ContentLoader
                    height={39}
                    width={310}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="40%" height="100%" />
                    <rect x="180" y="0" rx="3" ry="3" width="40%" height="100%" />
                  </ContentLoader>
                </div>
                <div className="mb-4">
                  <ContentLoader
                    height={24}
                    width={76.78}
                    speed={1}
                    className="mb-2"
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                  <ContentLoader
                    height={39}
                    width={310}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                </div>
                <div className="mb-4">
                  <ContentLoader
                    height={24}
                    width={76.78}
                    speed={1}
                    className="mb-2"
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                  <ContentLoader
                    height={66}
                    width={310}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="50%" height="30%" />
                    <rect x="0" y="50%" rx="3" ry="3" width="50%" height="30%" />
                  </ContentLoader>
                </div>
                <div className="mb-4">
                  <ContentLoader
                    height={24}
                    width={76.78}
                    speed={1}
                    className="mb-2"
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                  <ContentLoader
                    height={39}
                    width={310}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                </div>
                <div className="mb-4">
                  <ContentLoader
                    height={24}
                    width={76.78}
                    speed={1}
                    className="mb-2"
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                  <ContentLoader
                    height={39}
                    width={310}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                </div>
                <div className="mb-4">
                  <ContentLoader
                    height={24}
                    width={76.78}
                    speed={1}
                    className="mb-2"
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                  <ContentLoader
                    height={39}
                    width={310}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                </div>
                <div className="mb-4">
                  <ContentLoader
                    height={24}
                    width={76.78}
                    speed={1}
                    className="mb-2"
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                  <ContentLoader
                    height={39}
                    width={310}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                </div>
                <div className="mb-4">
                  <ContentLoader
                    height={24}
                    width={76.78}
                    speed={1}
                    className="mb-2"
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                  <ContentLoader
                    height={39}
                    width={310}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                </div>
                <div className="mb-4">
                  <ContentLoader
                    height={24}
                    width={76.78}
                    speed={1}
                    className="mb-2"
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                  <ContentLoader
                    height={39}
                    width={310}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                </div>
                <div className="mb-4">
                  <ContentLoader
                    height={24}
                    width={76.78}
                    speed={1}
                    className="mb-2"
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                  <ContentLoader
                    height={39}
                    width={310}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                </div>
                <div className="mb-4">
                  <ContentLoader
                    height={24}
                    width={76.78}
                    speed={1}
                    className="mb-2"
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                  <ContentLoader
                    height={39}
                    width={310}
                    speed={1}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                  </ContentLoader>
                </div>
              </Row>
            </Card.Body>
          </Card>
              {/* <LiffQuestionnaireForm
                questionnaires={questionnaires}
                answerSurvey={answerSurvey}
                questionnaireErrors={errors}
                answers={answers}
              /> */}

          <Card border="0" className="shadow mt-4">
            <Card.Header className="bg-primary text-white px-3 py-2">
              <h5 className="mb-0 fw-bolder">個人情報の取り扱いについて</h5>
            </Card.Header>
            <Card.Body className="py-0">
              <Row className="mt-3">
                <Col xs={12} className="mb-5">
                  <p>
                    記載していただいた個人情報は、お客様により良いサービスをご提供する目的で使用し、ご本人の同意がなければ第三者に個人情報を提供することはございません。
                  </p>
                  <p>
                    取得した個人情報は管理責任者を定め、紛失や漏洩などが発生しないよう積極的な安全対策を実施いたします。
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </main>
    </>
  );
};
