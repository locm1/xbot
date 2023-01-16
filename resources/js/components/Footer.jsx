
import React from "react";
import moment from "moment-timezone";
import { CogIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import { Row, Col, Card, OverlayTrigger, Tooltip, Image, Button } from 'react-bootstrap';
import BS5Logo from "@img/img/technologies/bootstrap-5-logo.svg";
import ReactLogo from "@img/img/technologies/react-logo.svg";

import { Paths } from "@/paths";

export default (props) => {
  const { showSettings } = props;
  const currentYear = moment().get("year");

  return (
    <footer className="bg-black shadow p-3 liff-footer">
      <Row>
        <Col xs={12} md={4} xl={6} className="mb-4 mb-md-0">
          <p className="mb-0 text-lg-start">
            © Reno. inc.
          </p>
        </Col>
        <Col xs={12} md={8} xl={6} className="">
          <ul className="list-inline list-group-flush list-group-borderless text-md-end mb-0">
            <Row>
              <Col xs={12} className="mb-1">
                <li className="list-inline-item px-0 px-sm-2">
                  <Card.Link href={Paths.LiffPrivacyPolicy.path} target="_blank">
                    プライバシーポリシー
                  </Card.Link>
                </li>
              </Col>
              <Col xs={12} className="mb-1">
                <li className="list-inline-item px-0 px-sm-2">
                  <Card.Link href={Paths.LiffTermsOfService.path} target="_blank">
                  利用規約
                  </Card.Link>
                </li>
              </Col>
              <Col xs={12}>
                <li className="list-inline-item px-0 px-sm-2">
                  <Card.Link href={Paths.LiffSpecificTrades.path} target="_blank">
                  特定商法取引法に基づく表記
                  </Card.Link>
                </li>
              </Col>
            </Row>
          </ul>
        </Col>
      </Row>
    </footer>
  );
};
