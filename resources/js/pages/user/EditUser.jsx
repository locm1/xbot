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
import Swal from "sweetalert2";


export default () => {
  const {id} = useParams();
  const orderHistoryHeaders = ['注文日時', '注文商品', '個数', '値段'];
  const reserveHistoryHeaders = ['取置日時', '取置商品', '個数', '期日'];
  const inviteHistoryHeaders = ['紹介日時', '紹介者'];
  const visitorHistoryHeaders = ['来店日時', 'メモ'];
  const [occupations, setOccupations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reserves, setReserves] = useState([]);
  const [inviteHistories, setInviteHistories] = useState([]);
  const [fromInvitedUser, setFromInvitedUser] = useState(undefined);
  const [visitorHistories, setVisitorHistory] = useState([]);

  const [birthDate, setBirthDate] = useState('');

  const [visitCount, setVisitCount] = useState(0);

  const [purchaseTime, setPurchaseTime] = useState(0);

  const handleChange = (e, input) => {
    setUser({...user, [input]: e})
  };

  const saveUser = async() => {
    await axios
    .put(`/api/v1/management/users/${id}`, {...user, "tags": selectedTags})
    .then((res) => {
      confirmSave();
      console.log(res);
    })
    .catch(error => {
      console.error(error);
    })
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



  useEffect(() => {
    axios.get(`/api/v1/management/users/${id}/visitor-history`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setVisitCount(res.data.visit_count);
        setVisitorHistory(res.data.visit_history);
      }
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/v1/management/users/${id}/purchase`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setPurchaseTime(res.data.purchase_time);
      }
    });
  }, []);

  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    axios.get(`/api/v1/management/users/${id}/user_tag`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        const selectedOptions = res.data.user_tags.map(v => ({ value: v.id, label: v.name }));
        setSelectedTags(selectedOptions);
      }
    });
    axios.get(`/api/v1/management/user_tags`)
    .then((data) => {
      setTags(data.data.tags);
    })
    .catch(error => {
        console.error(error);
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/v1/management/users/${id}/invite-history`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setInviteHistories(res.data.invite_histories);
        setFromInvitedUser(res.data.from_invited_user);
      }
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/v1/management/users/${id}/orders`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        const order = [];
          res.data.orders.forEach(history => {
            history.order_products.forEach(product => {
              order.push({
                "createdAt": product.created_at,
                "name": product.product.name,
                "price": product.product.price,
                "quantity": product.quantity,
              })
            })
          })
        setOrders(order);
      }
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/v1/management/users/${id}/reserve-history`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setReserves(res.data.reserve_histories.map(v => (
          {
            createdAt: v.created_at,
            name: v.product.name,
            quantity: v.quantity,
            deadline: v.deadline,
          }
        )));
      }
    });
  }, []);

  const confirmSave = () => {
    Swal.fire(
      '保存完了',
      'ユーザー情報の保存に成功しました',
      'success'
    )
  }

  
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
                      selectedTags={selectedTags}
                      tags={tags}
                      setSelectedTags={setSelectedTags}
                    />  
                  </Col>
                  <Col xs={12} xl={4}>
                    <Row>
                      <Col xs={12} className="mb-4">
                        <ProfileCardWidget {...user} visitCount={visitCount} purchaseTime={purchaseTime} />
                      </Col>
                    </Row>
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
                    <HistoryTable title="紹介履歴" headers={inviteHistoryHeaders} histories={inviteHistories} fromInvitedUser={fromInvitedUser} />
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
