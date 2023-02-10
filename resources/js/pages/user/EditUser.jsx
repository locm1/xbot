import React, { useEffect, useState } from "react";
import { HomeIcon, UserIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Nav, Button, Tab, Breadcrumb } from 'react-bootstrap';
import { ProfileCardWidget } from "@/components/Widgets";

// forms
import { HistoryTable } from "@/pages/user/HistoryTable";
import { UserInfoForm } from "@/pages/user/UserInfoForm";
import { QuestionnaireForm } from "@/pages/user/QuestionnaireForm";
import { PurchaseTimeForm } from "@/pages/user/PurchaseTimeForm";
import { LineBlockInfoForm } from "@/pages/user/LineBlockInfoForm";
import { TagForm } from "@/pages/user/TagForm";
import { Link, useParams } from 'react-router-dom';

import { Paths } from "@/paths";


export default () => {
  const {id} = useParams();
  const orderHistoryHeaders = ['注文日時', '注文商品', '配送先住所'];
  const reserveHistoryHeaders = ['取置日時', '取置商品', '個数', '金額', '期日'];
  const inviteHistoryHeaders = ['紹介日時', '紹介者'];
  const visitorHistoryHeaders = ['来店日時', 'メモ'];
  const [occupations, setOccupations] = useState([]);

  const orders = [
    {id: 1, createdAt: '2022年11月18日 21:14', name: 'トリートメント 、 コスメセット', address: '北海道札幌市白石区菊水九条4-1-708'},
    {id: 2, createdAt: '2022年11月10日 15:33', name: 'UV美容液 、 美容液セット', address: '北海道札幌市白石区菊水九条4-1-708'},
  ];
  const reserves = [
    {id: 1, createdAt: '2022年11月10日', name: 'シャンプー&トリートメント', quantity: 1, price: 3000, deadline: '2022年12月10日まで'},
    {id: 2, createdAt: '2022年11月10日', name: 'トリートメント', quantity: 1, price: 3000, deadline: '2022年12月10日まで'},
  ];
  const inviteHistories = [
    {id: 1, createdAt: '2022年11月02日 11:44', inviteUserName: '長濱英也'},
  ];
  const visitorHistories = [
    {id: 1, createdAt: '2022年11月02日 11:44', memo: ''},
  ];

  const [birthDate, setBirthDate] = useState('');

  const handleChange = (e, input) => {
    setUser({...user, [input]: e})
  };

  const saveUser = async() => {
    await axios
    .put(`/api/v1/management/users/${id}`, user)
    .then((res) => {
      alert('更新しました');
      console.log(res);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(`/api/v1/management/users/${id}`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setUser(res.data.user);
      }
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/v1/management/occupations`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setOccupations(res.data.occupations);
      }
    });
  }, [])

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
        </div>
      </div>

      <Tab.Container defaultActiveKey="user_info" className="mb-6">
        <Row>
          <Col lg={12}>
            <Nav fill variant="pills" className="flex-column flex-sm-row">
              <Nav.Item>
                <Nav.Link eventKey="user_info" className="mb-sm-3 mb-md-0">
                  <UserIcon className="icon icon-xs me-2" /> ユーザー情報
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="questionnaire" className="mb-sm-3 mb-md-0">
                  <UserIcon className="icon icon-xs me-2" /> アンケート回答一覧
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="history" className="mb-sm-3 mb-md-0">
                  <UserIcon className="icon icon-xs me-2" /> 履歴一覧
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="user_info" className="py-4">
                <Row>
                  <Col xs={12} xl={8}>
                    <UserInfoForm 
                      handleChange={handleChange}
                      saveUser={saveUser}
                      {...user}
                      setBirthDate={setBirthDate}
                      birthDate={birthDate}
                      occupations={occupations}
                    />  
                  </Col>
                  <Col xs={12} xl={4}>
                    <Row>
                      <Col xs={12} className="mb-4">
                        <ProfileCardWidget {...user} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} xl={12}>
                    <TagForm userId={id} />
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="history" className="py-4">
                <Row>
                  <Col xs={12} className="mb-4">
                    <HistoryTable title="来店履歴" headers={visitorHistoryHeaders} histories={visitorHistories} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} className="mb-4">
                    <HistoryTable title="紹介履歴" headers={inviteHistoryHeaders} histories={inviteHistories} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} className="mb-4">
                    <HistoryTable title="注文履歴" headers={orderHistoryHeaders} histories={orders} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} className="mb-4">
                    <HistoryTable title="取置履歴" headers={reserveHistoryHeaders} histories={reserves} />
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="questionnaire" className="py-4">
                <QuestionnaireForm userId={id} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
        <Button href={Paths.Users.path} variant="gray-800" className="mt-2 animate-up-2">
          ユーザーリストに戻る
        </Button>
      </div>
    </>
  );
};
