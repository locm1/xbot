import React, { useEffect, useLayoutEffect, useState } from "react";
import { HomeIcon, UserIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Nav, Button, Tab, Breadcrumb } from 'react-bootstrap';
import { ProfileCardWidget } from "@/components/Widgets";

// forms
import { HistoryTable } from "@/pages/user/HistoryTable";
import { UserInfoForm } from "@/pages/user/UserInfoForm";
import { QuestionnaireForm } from "@/pages/user/QuestionnaireForm";
import { Link, useHistory, useParams } from 'react-router-dom';
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import { showUser, getOccupations, getUserTag, getUserPurchase, getQuestionnaireAnswer } from "@/pages/user/api/UserApiMethods";
import { getUserVisitorHistories, getUserVisitorHistoryCount, getUserOrders, getUserInviteHistories, getUserReserveHistories } from "@/pages/user/api/UserHistoryApiMethods";
import EditUserContentLoader from "@/pages/user/loader/EditUserContentLoader";
import UserProfileContentLoader from "@/pages/user/loader/UserProfileContentLoader";
import { Paths } from "@/paths";
import Swal from "sweetalert2";

export default () => {
  const history = useHistory();
  const [isRendered, setIsRendered] = useState(false);
  const { id } = useParams();
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
    setUser({ ...user, [input]: e })
  };

  const saveUser = async () => {
    await axios
      .put(`/api/v1/management/users/${id}`, { ...user, "tags": selectedTags })
      .then((res) => {
        confirmSave();
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      })
  }

  const [user, setUser] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  const [questionnaireAnswers, setQuestionnaireAnswers] = useState([
    { created_at: '', questionnaire: { title: '' }, questionnaire_answer_items: [] }
  ]);

  useLayoutEffect(() => {
    getUserVisitorHistories(id, setVisitorHistory)
    getUserVisitorHistoryCount(id, setVisitCount)
    getOccupations(setOccupations)
    getUserOrders(id, setOrders)
    getUserTag(id, setSelectedTags, setTags)
    getUserInviteHistories(id, setInviteHistories, setFromInvitedUser)
    getUserPurchase(id, setPurchaseTime)
    getUserReserveHistories(id, setReserves)
    getQuestionnaireAnswer(id, setQuestionnaireAnswers)
    showUser(id, setUser, setIsRendered)
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
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3">
        <div className="d-block mb-4 mb-md-0">
        </div>
      </div>
      <Tab.Container defaultActiveKey="user_info" className="mb-6">
        <Nav justify variant="pills">
          <Nav.Item>
            <Nav.Link eventKey="user_info">
              <UserIcon className="icon icon-xs me-2" /> ユーザー情報
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="questionnaire">
              <UserIcon className="icon icon-xs me-2" /> アンケート回答一覧
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="history">
              <UserIcon className="icon icon-xs me-2" /> 履歴一覧
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="user_info" className="pt-4">
            <Row>
              <Col xs={12} xl={8}>
                {
                  isRendered ? (
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
                      getUserTag={getUserTag}
                      setTags={setTags}
                    />
                  ) : (
                    <EditUserContentLoader />
                  )
                }
              </Col>
              <Col xs={12} xl={4}>
                <Row>
                  <Col xs={12} className="mb-4">
                    {
                      isRendered ? (
                        <ProfileCardWidget {...user} visitCount={visitCount} purchaseTime={purchaseTime} questionnaireAnswers={questionnaireAnswers} />
                      ) : (
                        <UserProfileContentLoader />
                      )
                    }
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
            <QuestionnaireForm userId={id} questionnaireAnswers={questionnaireAnswers} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center">
        <Button onClick={() => { history.push(Paths.Users.path) }} variant='tertiary' className="mt-2">
          ユーザーリストに戻る
        </Button>
      </div>
    </>
  )
};
