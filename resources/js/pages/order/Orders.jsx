import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';

import { OrdersTable } from "@/pages/order/OrdersTable";
import { ChangeStatusModal } from "@/pages/order/ChangeStatusModal";

import { getOrders, updateOrder, getPrefectures } from "@/pages/order/api/OrderApiMethods";

export default () => {
  const [orders, setOrders] = useState([]);
  const [paginate, setPaginate] = useState({ 
    current_page: 0, per_page: 0, from: 0, to: 0, total: 0 
  })
  const [links, setLinks] = useState([]);
  const [prefectures, setPrefectures] = useState([]);
  const [orderId, setOrderId] = useState();
  const [searchValue, setSearchValue] = useState({
    name: '', status: 0, id: '', prefecture: ''
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleChange = (e, input) => {
    setSearchValue({...searchValue, [input]: e.target.value})

    const searchParams = {
      params: {...searchValue, [input]: e.target.value, page: 1}
    };
    clearTimeout(timer);

    // 一定期間操作がなかったらAPI叩く
    const newTimer = setTimeout(() => {
      getOrders(searchParams, setOrders, setLinks, setPaginate);
    }, 1000)

    setTimer(newTimer)
  };

  const changeStatusModal = (id) => {
    setModalOpen(!modalOpen);
    setOrderId(id);
  }

  useEffect(() => {
    const searchParams = {
      params: {name: null, status: null, id: null, prefecture: null, page: 1}
    };
    getOrders(searchParams, setOrders, setLinks, setPaginate);
    getPrefectures(setPrefectures)
  }, []);

  return (
    <>
      {modalOpen && (
        <ChangeStatusModal
          show={modalOpen}
          setModalOpen={setModalOpen}
          updateOrder={updateOrder}
          orders={orders}
          setOrders={setOrders}
          orderId={orderId}
        />
      )}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">注文リスト</h1>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="d-flex justify-content-between align-items-center">
          <Col xs={3} lg={3} className="">
            <InputGroup className="me-2 me-lg-3 fmxw-400">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="氏名"
                value={searchValue.name}
                onChange={(e) => handleChange(e, 'name')}
              />
            </InputGroup>
          </Col>
          <Col xs={3} lg={3} className="">
            <InputGroup className="fmxw-400">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Select value={searchValue.status} className=" d-none d-md-inline" onChange={(e) => handleChange(e, 'status')} placeholder="ステータスを選択">
                <option value="0">ステータスを選択</option>
                <option value="1">注文内容確認中</option>
                <option value="2">配送準備中</option>
                <option value="3">当店より発送済み</option>
                <option value="4">キャンセル</option>
              </Form.Select>
            </InputGroup>
          </Col>
          <Col xs={3} lg={3} className="">
            <InputGroup className="fmxw-400">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="注文番号"
                value={searchValue.id}
                onChange={(e) => handleChange(e, 'id')}
              />
            </InputGroup>
          </Col>
          <Col xs={3} lg={3} className="">
            <InputGroup className="me-2 me-lg-3 fmxw-400">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Select value={searchValue.prefecture} onChange={(e) => handleChange(e, 'prefecture')} className=" d-none d-md-inline"  placeholder="都道府県を選択">
                <option value="0">都道府県を選択</option>
                {
                  prefectures.map((prefecture, index) => <option key={prefecture.id} value={prefecture.name}>{prefecture.name}</option>)
                }
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>
      </div>

      <OrdersTable
        orders={orders}
        setOrders={setOrders}
        changeStatusModal={changeStatusModal}
        getOrders={getOrders}
        links={links}
        paginate={paginate}
        setLinks={setLinks}
        setPaginate={setPaginate}
        searchValue={searchValue}
      />
    </>
  );
};
