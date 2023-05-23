import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { CalendarIcon, CreditCardIcon, HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import { EditVisitorHistoryForm } from "@/pages/visitor/EditVisitorHistoryForm";
import UserInformation from "@/components/UserInformation.jsx";

import { showVisitorHistory, showUserByVisitorHistory, updateVisitorHistory } from "@/pages/visitor/api/VisitorHistoryApiMethods";
import { getUserVisitorHistoryCount } from "@/pages/user/api/UserHistoryApiMethods";

export default () => {
  const history = useHistory();
  const { id } = useParams();
  const { state } = useLocation();
  const [createdAt, setCreatedAt] = useState();
  const [memo, setMemo] = useState();
  const [user, setUser] = useState({
    id: 1, first_name: '', last_name: '', first_name_kana: '', last_name_kana: '', nickname: '', 
    zipcode: '', prefecture: '', city: '', address: '', building_name: '', tel: '', img_path: '' 
  });
  const [visitCount, setVisitCount] = useState(0);

  const userInformations = {
    name: `${user.last_name} ${user.first_name}`,
    nameKana: `${user.last_name_kana} ${user.first_name_kana}`,
  };
  const details = [
    {id: 1, title: '郵便番号', value: user.zipcode},
    {id: 2, title: '住所', value: `${user.prefecture}${user.city}${user.address}  ${user.building_name}`},
    {id: 3, title: '電話番号', value: user.tel},
    {id: 4, title: '来店回数', value: `${visitCount}回`},
  ];

  const update = () => {
    const visitorHistory = {
      created_at: createdAt, memo: memo
    }
    updateVisitorHistory(id, visitorHistory, updateComplete);
  }

  const updateComplete = () => {
    Swal.fire(
      '更新完了',
      '来店情報の更新に成功しました',
      'success'
    )
  } 


  useEffect(() => {
    showVisitorHistory(id, setMemo, setCreatedAt);
    showUserByVisitorHistory(id, setUser);
    getUserVisitorHistoryCount(state, setVisitCount)
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">来店履歴詳細</h1>
        </div>
      </div>

      <Row>
        <Col xs={12} xl={8}>
          <EditVisitorHistoryForm 
            memo={memo}
            setMemo={setMemo}
            createdAt={createdAt}
            setCreatedAt={setCreatedAt}
            update={update}
          />
        </Col>
        <Col xs={12} xl={4}>
          <UserInformation {...userInformations} details={details} img_path={user.img_path} />
        </Col>
      </Row>
        <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
        <Button onClick={() => {history.push(Paths.VisitorHistories.path)}} variant="tertiary" className="mt-2 animate-up-2">
          来店履歴に戻る
        </Button>
        </div>
    </>
  );
};
