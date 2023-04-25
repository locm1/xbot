
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';

import { UsersTable } from "@/pages/user/UsersTable";
import { getUsers, getDemographic, deleteUser } from "@/pages/user/api/UserApiMethods";

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary me-3',
    cancelButton: 'btn btn-gray-100'
  },
  buttonsStyling: false
}));

export default () => {
  const [isRendered, setIsRendered] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState({
    name: '', tel: ''
  });
  const [demographic, setDemographic] = useState({
    friend: '', registered: '', man: '', women: '', others: ''
  })
  const [paginate, setPaginate] = useState({ 
    current_page: 0, per_page: 0, from: 0, to: 0, total: 0 
  })
  const [links, setLinks] = useState([]);
  const [timer, setTimer] = useState(null);

  const handleChange = (e, input) => {
    setSearchValue({...searchValue, [input]: e.target.value})

    const searchParams = {
      params: {...searchValue, [input]: e.target.value, page: 1}
    };
    clearTimeout(timer);

    // 一定期間操作がなかったらAPI叩く
    const newTimer = setTimeout(() => {
      getUsers(searchParams, setUsers, setLinks, setPaginate)
    }, 1000)

    setTimer(newTimer)
  };

  const deleteUsers = async (id) => {
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
      deleteUser(id, completeDelete)
    }
  };

  const completeDelete = async (id) => {
    const confirmMessage = "選択したユーザーは削除されました。";
    await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
    const newUsers = users.filter(user => user.id !== id)

    const currentPage = newUsers.length == 0 ? paginate.current_page - 1 : paginate.current_page
    const searchParams = {
      params: {...searchValue, page: currentPage}
    };
    getUsers(searchParams, setUsers, setLinks, setPaginate)
  };

  useEffect(() => {
    const searchParams = {
      params: {name: null, tel: null, page: 1}
    };
    getUsers(searchParams, setUsers, setLinks, setPaginate,setIsRendered)
    getDemographic(setDemographic)
  }, []);

  return isRendered ? (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">ユーザー管理</h1>
          <div className="list-head d-flex flex-wrap mb-4 align-items-center">
            <div className="list-head__items">
              <div className="list-head__item"> <span>お友達総数</span>：{demographic.friend}名</div>
              <div className="list-head__item"> <span className="">利用者登録済み</span>：{demographic.registered}名</div>
              <div className="list-head__item"> <span className="">|</span></div>
              <div className="list-head__item"> <span className="u-men"> 男性 </span>：{demographic.man}名 </div>
              <div className="list-head__item"> <span className="u-women "> 女性 </span>：{demographic.women}名 </div>
              {/* <div className="list-head__item"> <span> その他 </span>：{demographic.others}名 </div> */}
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
                value={searchValue.name}
                onChange={(e) => handleChange(e, 'name')}
              />
            </InputGroup>
            <InputGroup className="me-2 me-lg-3 fmxw-300">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control
                type="tel"
                placeholder="電話番号"
                value={searchValue.tel}
                onChange={(e) => handleChange(e, 'tel')}
              />
            </InputGroup>
          </Col>
        </Row>
      </div>

      <UsersTable
        users={users}
        setUsers={setUsers}
        deleteUsers={deleteUsers}
        getUsers={getUsers}
        links={links}
        paginate={paginate}
        setLinks={setLinks}
        setPaginate={setPaginate}
        searchValue={searchValue}
      />
    </>
  ) :  (
    <></>
  );
};
