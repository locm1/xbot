import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Paths } from "@/paths";
import { CouponsTable } from "@/pages/coupon/CouponsTable";
import ParticipantsModal from "@/components/ParticipantsModal";

import { getCoupons, deleteCoupon, getCouponUsers } from "@/pages/coupon/api/CouponApiMethods";

export default () => {
  const [coupons, setCoupons] = useState([]);
  const [paginate, setPaginate] = useState({ 
    current_page: 1, per_page: 1, from: 1, to: 1,total: 1 
  })
  const [links, setLinks] = useState([]);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleChange = (e) => {
    setName(e.target.value)

    const searchParams = {
      params: { name: name, page: 1 }
    };
    clearTimeout(timer);

    // 一定期間操作がなかったらAPI叩く
    const newTimer = setTimeout(() => {
      getCoupons(searchParams, setCoupons, setLinks, setPaginate);
    }, 1000)

    setTimer(newTimer)
  };

  const onHide = () => {
    setOpenModal(!openModal);
  }

  useEffect(() => {
    const searchParams = {
      params: { name: null, page: 1 }
    };
    getCoupons(searchParams, setCoupons, setLinks, setPaginate);
  }, []);

  return (
    <>
      {openModal && (
        <ParticipantsModal
          show={true}
          onHide={onHide}
          title="クーポン利用者一覧"
          getUsers={getCouponUsers}
          id={id}
        />
      )}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">クーポン管理</h1>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to={Paths.CreateCoupon.path}>
            <Button variant="gray-800" size="sm" className="d-inline-flex align-items-center">
              <PlusIcon className="icon icon-xs me-2" /> 新規作成
            </Button>
          </Link>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="d-flex justify-content-between align-items-center">
          <Col xs={9} lg={8} className="d-md-flex">
            <InputGroup className="me-2 me-lg-3 fmxw-400">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="管理名称検索"
                value={name}
                onChange={(e) => handleChange(e)}
              />
            </InputGroup>
          </Col>
        </Row>
      </div>

      <CouponsTable
        coupons={coupons}
        setCoupons={setCoupons}
        deleteCoupon={deleteCoupon}
        setOpenModal={setOpenModal}
        openModal={openModal}
        setId={setId}
        getCoupons={getCoupons}
        links={links}
        paginate={paginate}
        setLinks={setLinks}
        setPaginate={setPaginate}
        name={name}
      />
    </>
  );
};
