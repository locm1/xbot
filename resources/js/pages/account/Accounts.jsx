
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AdjustmentsIcon, CheckIcon, CogIcon, HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import { AccountsTable } from "@/pages/account/AccountsTable";
import { getAccounts } from "@/pages/account/api/AdminApiMethods";

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary me-3',
    cancelButton: 'btn btn-gray'
  },
  buttonsStyling: false
}));

export default () => {
  const [accounts, setAccounts] = useState([]);
  const [paginate, setPaginate] = useState({ 
    current_page: 0, per_page: 0, from: 0, to: 0,total: 0 
  })
  const [links, setLinks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const searchParams = {
      params: {page: 1}
    };
    getAccounts(searchParams, setAccounts, setLinks, setPaginate)
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
        deleteAdmin(id)
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  const deleteAdmin = async (id) => {
    const confirmMessage = "選択したアカウントは削除されました。";
    await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
    const newAccounts = accounts.filter((account) => (account.id !== id));
    const currentPage = newAccounts.length == 0 ? paginate.current_page - 1 : paginate.current_page
    const searchParams = {
      params: {page: currentPage}
    };
    getAccounts(searchParams, setAccounts, setLinks, setPaginate);
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

      <AccountsTable
        accounts={accounts}
        setAccounts={setAccounts}
        showConfirmDeleteModal={showConfirmDeleteModal}
        getAccounts={getAccounts}
        links={links}
        paginate={paginate}
        setLinks={setLinks}
        setPaginate={setPaginate}
      />
    </>
  );
};
