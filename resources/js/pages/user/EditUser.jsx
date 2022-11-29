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
import { Link } from 'react-router-dom';

import { Paths } from "@/paths";
import Profile1 from "@img/img/team/profile-picture-1.jpg";
import Profile3 from "@img/img/team/profile-picture-3.jpg";
import ProfileCover from "@img/img/profile-cover.jpg";


export default () => {
  const orderHistoryHeaders = ['注文日時', '注文商品', '配送先住所'];
  const reserveHistoryHeaders = ['取置日時', '取置商品', '個数', '金額', '期日'];
  const orders = [
    {id: 1, createdAt: '2022年11月18日 21:14', name: 'トリートメント 、 コスメセット', address: '北海道札幌市白石区菊水九条4-1-708'},
    {id: 2, createdAt: '2022年11月10日 15:33', name: 'UV美容液 、 美容液セット', address: '北海道札幌市白石区菊水九条4-1-708'},
  ];
  const reserves = [
    {id: 1, createdAt: '2022年11月10日', name: 'シャンプー&トリートメント', quantity: 1, price: 3000, deadline: '2022年12月10日まで'},
    {id: 2, createdAt: '2022年11月10日', name: 'トリートメント', quantity: 1, price: 3000, deadline: '2022年12月10日まで'},
  ];
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: files => setFiles(files.map(file => ({
      ...file,
      preview: URL.createObjectURL(file)
    })))
  });

  const DropzoneFile = (props) => {
    const { path, preview } = props;

    return (
      <Col xs={6} className="dropzone-preview">
        <Image src={preview} className="dropzone-image" />
        <Card.Text className="dropzone-filename">
          {path}
        </Card.Text>
      </Col>
    );
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
      </div>

      <Row>
        <Col xs={12} xl={8}>
          <UserInfoForm />
          <QuestionnaireForm />
          {/* <NotificationsWidget /> */}
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
            <Col xs={12}>
              <ChoosePhotoWidget
                title="Select profile photo"
                photo={Profile3}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} xl={12}>
          <PurchaseTimeForm />
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="mb-4">
          <Card border="0" className="shadow mb-4">
            <Card.Body>
              <h5 className="mb-4">来店履歴</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="mb-4">
          <HistoryTable title="注文履歴" headers={orderHistoryHeaders} histories={orders} category="order" />
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="mb-4">
          <HistoryTable title="取置履歴" headers={reserveHistoryHeaders} histories={reserves} category="reserve" />
        </Col>
      </Row>
    </>
  );
};
