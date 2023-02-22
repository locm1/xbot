import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';

import { ReservesTable } from "@/pages/reserve/ReservesTable";
import { ChangeStatusModal } from "@/pages/reserve/ChangeReserveStatusModal";

import { getReserveHistories, updateReserveHistory, deleteReserveHistory, searchReserveHistories } from "@/pages/reserve/api/ReserveHistoryApiMethods";

export default () => {
  const [reserveHistories, setReserveHistories] = useState([]);
  const [reserveId, setReserveId] = useState();
  const [searchValue, setSearchValue] = useState({
    user_name: '', product_name: '', status: 0
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e, input) => {
    setSearchValue({...searchValue, [input]: e.target.value})

    const searchParams = {
      params: {...searchValue, [input]: e.target.value}
    };
    searchReserveHistories(searchParams, setReserveHistories);
  };

  const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary me-3',
      cancelButton: 'btn btn-gray-100'
    },
    buttonsStyling: false
  }));

  const deleteReserveHistoryConfirmModal = async (id) => {
    const textMessage = "本当にこの取り置きを削除しますか？";

    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "削除確認",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル"
    });

    if (result.isConfirmed) {
      deleteReserveHistory(id, completeDelete)
    }
  };

  const completeDelete = async () => {
    const confirmMessage = "選択した取り置きは削除されました。";
    await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
    location.reload();
  };

  const changeStatusModal = (id) => {
    setModalOpen(!modalOpen);
    setReserveId(id);
  }

  useEffect(() => {
    getReserveHistories(setReserveHistories);
  }, []);

  return (
    <>
      {modalOpen && (
        <ChangeStatusModal
          show={modalOpen}
          updateReserveHistory={updateReserveHistory}
          setModalOpen={setModalOpen}
          reserveHistories={reserveHistories}
          setReserveHistories={setReserveHistories}
          reserveId={reserveId}
        />
      )}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">取置管理</h1>
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
                placeholder="ユーザー名検索"
                value={searchValue.user_name}
                onChange={(e) => handleChange(e, 'user_name')}
              />
            </InputGroup>
            <InputGroup className="me-2 me-lg-3 fmxw-400">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="商品名検索"
                value={searchValue.product_name}
                onChange={(e) => handleChange(e, 'product_name')}
              />
            </InputGroup>
            <InputGroup className="fmxw-400">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Select value={searchValue.status} className="fmxw-200 d-none d-md-inline" onChange={(e) => handleChange(e, 'status')} placeholder="ステータスを選択">
                <option value="0">ステータスを選択</option>
                <option value="1">取り置き予約中</option>
                <option value="2">受渡済み</option>
                <option value="3">取置停止</option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>
      </div>

      <ReservesTable
        reserves={reserveHistories}
        changeStatusModal={changeStatusModal}
        deleteReserveHistoryConfirmModal={deleteReserveHistoryConfirmModal}
      />
    </>
  );
};
