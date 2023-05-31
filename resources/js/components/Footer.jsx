
import React from "react";
import moment from "moment-timezone";
import { CogIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import { Row, Col, Card, OverlayTrigger, Tooltip, Image, Button } from 'react-bootstrap';
import BS5Logo from "@img/img/technologies/bootstrap-5-logo.svg";
import ReactLogo from "@img/img/technologies/react-logo.svg";

import { Paths } from "@/paths";
import { Link } from "react-router-dom";

export default (props) => {
  const { showSettings } = props;
  const currentYear = moment().get("year");

  return (
    <footer className="bg-black shadow p-3 liff-footer">
      <Row>
        <Col xs={12} md={8} xl={6} className="">
          <ul className="list-inline list-group-flush list-group-borderless text-md-end mb-0">
            <Row>
              <Col xs={12} className="mb-1">
                <li className="list-inline-item px-0 px-sm-2">
                  <Link to={Paths.LiffPrivacyPolicy.path}>
                    プライバシーポリシー
                  </Link>
                </li>
              </Col>
              <Col xs={12} className="mb-1">
                <li className="list-inline-item px-0 px-sm-2">
                  <Link to={Paths.LiffTermsOfService.path}>
                  利用規約
                  </Link>
                </li>
              </Col>
              <Col xs={12}>
                <li className="list-inline-item px-0 px-sm-2">
                  <Link to={Paths.LiffSpecificTrades.path}>
                  特定商法取引法に基づく表記
                  </Link>
                </li>
              </Col>
            </Row>
          </ul>
        </Col>
      </Row>
    </footer>
  );
};
