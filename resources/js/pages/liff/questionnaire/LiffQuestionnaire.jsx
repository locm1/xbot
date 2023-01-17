import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ListGroup, Button, Card, Image, InputGroup, Form } from 'react-bootstrap';
import { ChevronRightIcon } from '@heroicons/react/solid';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

import CheckboxButton from "@/components/CheckboxButton";
import LiffQuestionnaireBirthdateForm from "@/pages/liff/questionnaire/LiffQuestionnaireBirthdateForm";
import LiffQuestionnaireForm from "@/pages/liff/questionnaire/LiffQuestionnaireForm";

export default () => {
  const areas = [
    '中央区', '北区', '東区', '白石区', '厚別区', '豊平区', 
    '清田区', '南区', '西区', '手稲区', '札幌市以外', '道外'
  ];

  const occupations = [
    '会社員', '公務員', '自営業', '会社役員', '自由業', 
    '専業主婦（夫）', '学生', 'パート・アルバイト', '無職', 
  ];

  const genders = ['男性', '女性', 'その他'];
  
  return (
    <>
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap"></div>
        <div className="liff-product-list">
          <div className="d-flex align-items-center">
            <h2 className="fs-5 liff-product-detail-name mb-3 ms-3">アンケートにお答えください</h2>
          </div>
          <Card border="0" className="shadow mt-2">
            <Card.Header className="border-bottom">
              <h2 className="fs-6 fw-bold mb-0">お客様の情報</h2>
            </Card.Header>
            <Card.Body className="py-0">
              <Row className="mt-3">
                <Col xs={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>氏名（姓）</Form.Label>
                    <Form.Control required type="text" name="last_name_kana" placeholder="山田" />
                  </Form.Group>
                </Col>
                <Col xs={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>氏名（名）</Form.Label>
                    <Form.Control required type="text" name="first_name_kana" placeholder="太郎" />
                  </Form.Group>
                </Col>
                <Col xs={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>フリガナ（姓）</Form.Label>
                    <Form.Control required type="text" name="last_name_kana" placeholder="ヤマダ" />
                  </Form.Group>
                </Col>
                <Col xs={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>フリガナ（名）</Form.Label>
                    <Form.Control required type="text" name="first_name_kana" placeholder="タロウ" />
                  </Form.Group>
                </Col>
              </Row>

              <LiffQuestionnaireBirthdateForm />

              <Row className="">
                <Col xs={12} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>お住まいエリア</Form.Label>
                    <Form.Select defaultValue="0" className="mb-0 w-100">
                      {
                        areas.map((area, index) => <option key={index} value={index + 1}>{area}</option>)
                      }
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>性別</Form.Label>
                      <div>
                        {
                          genders.map((gender, index) => 
                            <CheckboxButton key={index} id={index + 1} name='gender' title={gender} value={index + 1} />
                          )
                        }
                      </div>
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>電話番号</Form.Label>
                    <Form.Control required type="tel" name="tel" placeholder="08000000000" />
                  </Form.Group>
                </Col>
                <Col xs={12} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>ご職業</Form.Label>
                    <Form.Select defaultValue="0" className="mb-0 w-100">
                      {
                        occupations.map((occupation, index) => <option key={index} value={index + 1}>{occupation}</option>)
                      }
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <LiffQuestionnaireForm />
          <Card border="0" className="shadow mt-4">
            <Card.Header className="border-bottom">
              <h2 className="fs-6 fw-bold mb-0">個人情報の取り扱いについて</h2>
            </Card.Header>
            <Card.Body className="py-0">
              <Row className="mt-3">
                <Col xs={12} className="mb-3">
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
          <div className="align-items-center m-2 mt-4">
            <Button as={Link} to={Paths.LiffQuestionnaireComplete.path} variant="tertiary" className="w-100 p-3">
              上記内容に同意して送信する
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};