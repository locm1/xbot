import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FireIcon, CheckIcon, HomeIcon, PlusIcon, ShieldCheckIcon, CloudUploadIcon, ViewGridAddIcon, ArchiveIcon, CheckCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { Col, Row, Container, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';

import SpecificTradesCard from "@/pages/setting/SpecificTradesCard";

export default () => {
  const [SpecificTrades, setSpecificTrades] = useState([
    {id: 1, title: '', content: ''}
  ]);

  const createCard = () => {
    const id = (SpecificTrades === undefined) ? 1 : SpecificTrades.length + 1;
    const newSpecificTrades = {
      "id": id,
      "title": '',
      "content": ''
    }
    setSpecificTrades([...SpecificTrades, newSpecificTrades]);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">特定商取引法に基づく表記</h1>
        </div>
      </div>

      <Container fluid className="cotainer py-4 px-0">
        <Row className="privilege-card-wrap">
          {
            SpecificTrades.map((SpecificTrade, index) => 
              <SpecificTradesCard
                key={`specific-trades-${SpecificTrade.id}`}
                {...SpecificTrade}
                index={index}
                SpecificTrades={SpecificTrades}
                setSpecificTrades={setSpecificTrades}
              />
            )
          }
        </Row>
        <div className="privilege-button">
          <Button
            variant="outline-gray-500"
            onClick={createCard}
            className="d-inline-flex align-items-center justify-content-center dashed-outline new-card w-100"
          >
            <PlusIcon className="icon icon-xs me-2" /> 項目追加
          </Button>
        </div>
      </Container>
      <div className="mt-3">
        <Button variant="gray-800" type="submit" className="mt-2 animate-up-2">
          保存する
        </Button>
      </div>
    </>
  );
};