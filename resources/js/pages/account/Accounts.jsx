
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AdjustmentsIcon, CheckIcon, CogIcon, HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import { AccountsTable } from "@/pages/account/AccountsTable";

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary me-3',
    cancelButton: 'btn btn-gray'
  },
  buttonsStyling: false
}));

export default () => {
  const [accounts, setAccounts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get('/api/v1/management/admins').then((response) => {
        setAccounts(response.data.admins)
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  const showConfirmDeleteModal = async (e, id) => {
    const textMessage = "本当にこのユーザーを削除しますか？";

    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "削除確認",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル"
    });

    if (result.isConfirmed) {
      await axios.delete(`/api/v1/management/admins/${id}`)
      .then((response) => {
        deleteAdmin()
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  const deleteAdmin = async () => {
    const confirmMessage = "選択したアカウントは削除されました。";
    await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
    setTimeout(() => {
      location.reload();
    }, 1000);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 mb-5 list-wrap">
        <div className="d-block">
          <h1 className="page-title">アカウント管理</h1>
        </div>
        <div className="btn-toolbar">
          <Button as={Link} to={Paths.RegisterAccount.path} variant="gray-800" size="sm" className="d-inline-flex align-items-center">
            <PlusIcon className="icon icon-xs me-2" /> 新規アカウント登録
          </Button>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={3} lg={8}></Col>
          <Col xs={3} lg={4} className="d-flex justify-content-end">
            <ButtonGroup>
              <Dropdown className="me-1">
                <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-1">
                  <AdjustmentsIcon className="icon icon-sm" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end pb-0">
                  <span className="small ps-3 fw-bold text-dark">
                    Show
                  </span>
                  <Dropdown.Item className="d-flex align-items-center fw-bold">
                    10 <CheckIcon className="icon icon-xxs ms-auto" />
                  </Dropdown.Item>
                  <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                  <Dropdown.Item className="fw-bold rounded-bottom">30</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-1">
                  <CogIcon className="icon icon-sm" />
                  <span className="visually-hidden">Toggle Dropdown</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-end pb-0">
                  <span className="small ps-3 fw-bold text-dark">
                    Show
                  </span>
                  <Dropdown.Item className="d-flex align-items-center fw-bold">
                    10 <CheckIcon className="icon icon-xxs ms-auto" />
                  </Dropdown.Item>
                  <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                  <Dropdown.Item className="fw-bold rounded-bottom">30</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ButtonGroup>
          </Col>
        </Row>
      </div>

      <AccountsTable
        accounts={accounts}
        showConfirmDeleteModal={showConfirmDeleteModal}
      />
    </>
  );
};
