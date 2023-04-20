import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CalendarIcon, CreditCardIcon, HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/l10n/ja.js';
import QRCode from "qrcode.react";
import { VisitorHistoriesTable } from "@/pages/visitor/VisitorHistoriesTable";
import { getVisitorHistories, deleteVisitorHistory } from "@/pages/visitor/api/VisitorHistoryApiMethods";
import VisitorHistoryQrModal from "@/pages/visitor/VisitorHistoryQrModal";

export default () => {
  const [visitorHistories, setVisitorHistories] = useState([]);
  const [links, setLinks] = useState([]);
  const [timer, setTimer] = useState(null);
  const [searchValue, setSearchValue] = useState({
    name: '', start_created_at: '', end_created_at: ''
  });
  const [paginate, setPaginate] = useState({ 
    current_page: 1, per_page: 1, from: 1, to: 1,total: 1 
  })
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e, input) => {
    const value = (input == 'start_created_at' || input == 'end_created_at') ? e : e.target.value;

    setSearchValue({...searchValue, [input]: value})
    const searchParams = {
      params: {...searchValue, [input]: value, page: 1}
    };
    clearTimeout(timer);

    // 一定期間操作がなかったらAPI叩く
    const newTimer = setTimeout(() => {
      getVisitorHistories(searchParams, setVisitorHistories, setLinks, setPaginate);
    }, 1000)

    setTimer(newTimer)
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

  const completeDelete = async (id) => {
    const confirmMessage = "選択した来店履歴は削除されました。";
    await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
    const newVisitorHistories = visitorHistories.filter(user => user.id !== id)

    const currentPage = newVisitorHistories.length == 0 ? paginate.current_page - 1 : paginate.current_page
    const searchParams = {
      params: {...searchValue, page: currentPage}
    };
    getVisitorHistories(searchParams, setVisitorHistories, setLinks, setPaginate)
  };

  const onHide = () => {
    setOpenModal(!openModal);
  }

  useEffect(() => {
    const searchParams = {
      params: {name: null, start_created_at: null, end_created_at: null, page: 1}
    };
    getVisitorHistories(searchParams, setVisitorHistories, setLinks, setPaginate);
  }, []);

  return (
    <>
      {openModal && (
        <VisitorHistoryQrModal
          show={true}
          onHide={onHide}
        />
      )}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">来店履歴</h1>
        </div>
        <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
        <Button onClick={() => setOpenModal(!openModal)} variant="gray-800" className="mt-2">
          設置用QRコード
        </Button>
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
                      placeholder="来店日（FROM）"
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
                      placeholder="来店日（TO）"
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
        links={links}
        paginate={paginate}
        setPaginate={setPaginate}
        getVisitorHistories={getVisitorHistories}
        setLinks={setLinks}
        setVisitorHistories={setVisitorHistories}
        searchValue={searchValue}
      />
    </>
  );
};
