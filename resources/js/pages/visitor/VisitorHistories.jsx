import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CalendarIcon, CreditCardIcon, HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/l10n/ja.js';
import { VisitorHistoriesTable } from "@/pages/visitor/VisitorHistoriesTable";

import { getVisitorHistories, deleteVisitorHistory } from "@/pages/visitor/api/VisitorHistoryApiMethods";

export default () => {
  const [visitorHistories, setVisitorHistories] = useState([]);
  const [searchValue, setSearchValue] = useState({
    name: '', start_created_at: '', end_created_at: ''
  });

  const handleChange = (e, input) => {
    if (input == 'start_created_at' || input == 'end_created_at') {
      setSearchValue({...searchValue, [input]: e})
    } else {
      setSearchValue({...searchValue, [input]: e.target.value})
    }

    const searchParams = {
      params: {...searchValue, [input]: e.target.value}
    };
    // searchProducts(searchParams, setProducts);
  };

  const startOptions = {
    locale: 'ja',
    onChange: (selectedDates, dateStr, instance) => handleChange(dateStr, 'start_created_at')
  }

  const endOptions = {
    locale: 'ja',
    onChange: (selectedDates, dateStr, instance) => handleChange(dateStr, 'end_created_at')
  }

  const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary me-3',
      cancelButton: 'btn btn-gray-100'
    },
    buttonsStyling: false
  }));

  const deleteVisitorHistoryConfirmModal = async (id) => {
    const textMessage = "本当にこの来店履歴を削除しますか？";

    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "削除確認",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル"
    });

    if (result.isConfirmed) {
      deleteVisitorHistory(id, completeDelete)
    }
  };

  const completeDelete = async () => {
    const confirmMessage = "選択した来店履歴は削除されました。";
    await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
    location.reload();
  };

  useEffect(() => {
    getVisitorHistories(setVisitorHistories);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">来店履歴</h1>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="d-flex justify-content-between align-items-center">
          <Col xs={6} lg={7} className="d-md-flex">
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
          <Col xs={6} lg={5} className="d-flex justify-content-end">
            <InputGroup className="me-3 fmxw-500">
              <InputGroup.Text>
                <CalendarIcon className="icon icon-xs" />
                </InputGroup.Text>
              <Flatpickr
                options={ startOptions }
                render={(props, ref) => {
                  return (
                    <Form.Control
                      data-time_24hr
                      required
                      type="text"
                      placeholder="YYYY-MM-DD"
                      ref={ref}
                    />
                  );
                }}
              />
              <InputGroup.Text><span>〜</span></InputGroup.Text>
              <Flatpickr
                options={ endOptions }
                render={(props, ref) => {
                  return (
                    <Form.Control
                      data-time_24hr
                      required
                      type="text"
                      placeholder="YYYY-MM-DD"
                      ref={ref}
                    />
                  );
                }}
              />
            </InputGroup>
          </Col>
        </Row>
      </div>

      <VisitorHistoriesTable
        visitorHistories={visitorHistories}
        deleteVisitorHistoryConfirmModal={deleteVisitorHistoryConfirmModal}
      />
    </>
  );
};
