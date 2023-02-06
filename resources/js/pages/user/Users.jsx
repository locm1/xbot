
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AdjustmentsIcon, CheckIcon, CogIcon, HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';

import { UsersTable } from "@/pages/user/UsersTable";
import USERS_DATA from "@/data/users";

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary me-3',
    cancelButton: 'btn btn-gray'
  },
  buttonsStyling: false
}));

export default () => {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const selectedUsersIds = users.filter(u => u.isSelected).map(u => u.id);
  const totalUsers = users.length;
  const allSelected = selectedUsersIds.length === totalUsers;

  const changeSearchValue = (e) => {
    const newSearchValue = e.target.value;
    const newUsers = users.map(u => ({ ...u, show: u.name.toLowerCase().includes(newSearchValue.toLowerCase()) }));

    setSearchValue(newSearchValue);
    setUsers(newUsers);
  };

  const changeStatusFilter = (e) => {
    const newStatusFilter = e.target.value;
    const newUsers = users.map(u => ({ ...u, show: u.status === newStatusFilter || newStatusFilter === "all" }));
    setStatusFilter(newStatusFilter);
    setUsers(newUsers);
  };

  const selectAllUsers = () => {
    const newUsers = selectedUsersIds.length === totalUsers ?
      users.map(u => ({ ...u, isSelected: false })) :
      users.map(u => ({ ...u, isSelected: true }));

    setUsers(newUsers);
  };

  const selectUser = (id) => {
    const newUsers = users.map(u => u.id === id ? ({ ...u, isSelected: !u.isSelected }) : u);
    setUsers(newUsers);
  };

  const deleteUsers = async (ids) => {
    const usersToBeDeleted = ids ? ids : selectedUsersIds;
    const usersNr = usersToBeDeleted.length;
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
      const newUsers = users.filter(f => !usersToBeDeleted.includes(f.id));
      const confirmMessage = "選択したユーザーは削除されました。";

      setUsers(newUsers);
      await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
    }
  };

  useEffect(() => {
    axios.get('/api/v1/management/users')
    .then((response) => {
      setUsers(response.data.users.map(u => ({ ...u, isSelected: false, show: true })));
    })
    .catch(error => {
        console.error(error);
    });
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">ユーザー管理</h1>
          <div className="list-head d-flex flex-wrap mb-4 align-items-center">
            <div className="list-head__items">
              <div className="list-head__item"> <span className="u-men"> 男性 </span>：19名 </div>
              <div className="list-head__item"> <span className="u-women "> 女性 </span>：8名 </div>
              <div className="list-head__item"> <span> その他 </span>：1名 </div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={9} lg={8} className="d-md-flex">
            <InputGroup className="me-2 me-lg-3 fmxw-300">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="氏名"
                value={searchValue}
                onChange={changeSearchValue}
              />
            </InputGroup>
            <InputGroup className="me-2 me-lg-3 fmxw-300">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="電話番号"
                value={searchValue}
                onChange={changeSearchValue}
              />
            </InputGroup>
          </Col>
        </Row>
      </div>

      <UsersTable
        users={users.filter(u => u.show)}
        allSelected={allSelected}
        selectUser={selectUser}
        deleteUsers={deleteUsers}
        selectAllUsers={selectAllUsers}
      />
    </>
  );
};
