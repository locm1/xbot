import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArchiveIcon, CalendarIcon, ChatIcon, ChevronDownIcon, ClipboardListIcon, CloudUploadIcon, DocumentTextIcon, FireIcon, PlusIcon, PresentationChartBarIcon, ShoppingBagIcon, UsersIcon, HomeIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, Dropdown, Breadcrumb } from 'react-bootstrap';
import { ChoosePhotoWidget, ProfileCardWidget, NotificationsWidget } from "@/components/Widgets";

// forms
import { HistoryTable } from "@/pages/user/HistoryTable";
import { UserInfoForm } from "@/pages/user/UserInfoForm";
import { QuestionnaireForm } from "@/pages/user/QuestionnaireForm";
import { PurchaseTimeForm } from "@/pages/user/PurchaseTimeForm";
import { TagForm } from "@/pages/user/TagForm";
import { Link } from 'react-router-dom';

import { Paths } from "@/paths";
import Profile1 from "@img/img/team/profile-picture-1.jpg";
import Profile3 from "@img/img/team/profile-picture-3.jpg";
import ProfileCover from "@img/img/profile-cover.jpg";


export default () => {
  const orderHistoryHeaders = ['注文日時', '注文商品', '配送先住所'];
  const reserveHistoryHeaders = ['取置日時', '取置商品', '個数', '金額', '期日'];
  const inviteHistoryHeaders = ['紹介日時', '紹介者'];
  const visitorHistoryHeaders = ['来店日時', 'メモ'];

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

  const [formValue, setFormValue] = useState(
    {firstName: '', lastName: '', firstNameKana: '', lastNameKana: '', birthDate: '', sex: 1, area: 1, tel: '', occupation: 1}
  );
  const [files, setFiles] = useState([]);

  const handleChange = (e, input) => {
    return setFormValue({...formValue, [input]: e.target.value})
};

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><HomeIcon className="icon icon-xs" /></Breadcrumb.Item>
            <Breadcrumb.Item active>ユーザーリスト</Breadcrumb.Item>
            <Breadcrumb.Item active>ユーザー管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="d-flex">
          <Button as={Link} to={Paths.Calendar.path} variant="gray-800" className="me-2">
            保存する
          </Button>
        </div>
      </div>

      <Row>
        <Col xs={12} xl={8}>
          <UserInfoForm handleChange={handleChange} formValue={formValue} />
          <QuestionnaireForm />
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12} className="mb-4">
              <ProfileCardWidget
                fullName="Neil Sims"
                picture={Profile1}
                jobTitle="Senior Software Engineer"
                location="New York, USA"
              />
            </Col>
            <Col xs={12} className="mb-4">
              <PurchaseTimeForm title="来店 / ポイント / 購入回数" />
            </Col>
          </Row>
        </Col>
      </Row>
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
      <Row>
        <Col xs={12} xl={12}>
          <TagForm />
        </Col>
      </Row>
      <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
        <Button href={Paths.Users.path} variant="gray-800" className="mt-2 animate-up-2">
          ユーザーリストに戻る
        </Button>
      </div>
    </>
  );
};
