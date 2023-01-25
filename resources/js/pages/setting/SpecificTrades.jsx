import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FireIcon, CheckIcon, HomeIcon, PlusIcon, ShieldCheckIcon, CloudUploadIcon, ViewGridAddIcon, ArchiveIcon, CheckCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { Col, Row, Container, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';

import SpecificTradesCard from "@/pages/setting/SpecificTradesCard";

const SpecificTradesService = (props) => {
  const [SpecificTrades, setSpecificTrades] = useState([
    {id: '', title: '', content: ''}
  ]);

  const createCard = () => {
    const newSpecificTrades = {
      id: '', title: '', content: ''
    }
    setSpecificTrades([...SpecificTrades, newSpecificTrades]);
  };

  const savePost = async() => {
    let err = false;
    for(let i = 0; i < SpecificTrades.length; i++) {
        if(SpecificTrades[i].id == '') {
            //入力値を投げる
            await axios
            .post('/api/v1/specific-trades', {
                title:SpecificTrades[i].title,
                content:SpecificTrades[i].content
            })
            .then((res) => {
                //戻り値をtodosにセット
                setSpecificTrades(
                        SpecificTrades.map((specific, index) => (index === i ? res['specific'] : specific))
                );
            })
            .catch(error => {
                console.error(error);
                err = true;
            });
        } else {
            //入力値を投げる
            await axios
            .put(`/api/v1/specific-trades/${SpecificTrades[i].id}`, {
                id: SpecificTrades[i].id,
                title:SpecificTrades[i].title,
                content:SpecificTrades[i].content
            })
            .then((res) => {
            })
            .catch(error => {
                console.error(error);
                err = true;
            });
        }
    }
    if(!err) {
        alert('更新しました。');
    }
  }

  useEffect(() => {
    fetch(`/api/v1/specific-trades`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if(data['specific'].length > 0) {
        setSpecificTrades(data['specific']);
      }
    })
    .catch(error => {
            console.log(error)
    })
  }, []);
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
              key={`specific-trades-${index}`}
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
      <Button variant="gray-800" type="submit" className="mt-2 animate-up-2" onClick={savePost}>
        保存する
      </Button>
    </div>
  </>
      )
  };
  export default SpecificTradesService;
  