
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import { SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Card, Table, Pagination } from 'react-bootstrap';

import { UsersTable } from "@/pages/user/UsersTable";
import { getUsers, getDemographic, deleteUser, getTags } from "@/pages/user/api/UserApiMethods";
import PaginationContentLoader from "@/components/loader/PaginationContentLoader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-danger',
    cancelButton: 'btn btn-gray-400 me-3'
  },
  buttonsStyling: false
}));

export default () => {
  const loadingTables = [_, _, _, _, _, _, _, _, _, _,];
  const [isRendered, setIsRendered] = useState(false);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState({
    name: '', tel: '', tag_id: ''
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
    setSearchValue({ ...searchValue, [input]: e.target.value })

    const searchParams = {
      params: { ...searchValue, [input]: e.target.value, page: 1 }
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
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル",
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
      params: { ...searchValue, page: currentPage }
    };
    getUsers(searchParams, setUsers, setLinks, setPaginate)
  };

  useEffect(() => {
    const searchParams = {
      params: { name: null, tel: null, page: 1 }
    };
    getUsers(searchParams, setUsers, setLinks, setPaginate, setIsRendered)
    getDemographic(setDemographic)
    getTags(setTags)
  }, []);

  return isRendered ? (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">ユーザーリスト</h1>
          <div className="list-head d-flex flex-wrap mb-4 align-items-center">
            <div className="list-head__items">
              <div className="list-head__item"> <span>お友達総数</span>：{demographic.friend}名</div>
              <div className="list-head__item"> <span>（ブロック</span>：{demographic.blocked}名） /</div>
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
        <Row className="align-items-center">
          <Col xs={3} lg={3} className="">
            <InputGroup className="">
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
            <InputGroup className="">
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
          <Col xs={3} lg={3} className="">
            <InputGroup className="">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Select defaultValue={searchValue.tag_id} className="mb-0" onChange={(e) => handleChange(e, 'tag_id')}>
                <option>タグ名</option>
                <option value="0">全て表示</option>
                {
                  tags.map((tag, index) => <option key={tag.id} value={tag.id}>{tag.name}</option>)
                }
              </Form.Select>
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
  ) : (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">ユーザーリスト</h1>
          <div className="list-head d-flex flex-wrap mb-4 align-items-center">
            <div className="list-head__items">
              <div className="list-head__item"> <span>お友達総数</span>：{demographic.friend}名</div>
              <div className="list-head__item"> <span>（ブロック</span>：{demographic.blocked}名） /</div>
              <div className="list-head__item"> <span className="">利用者登録済み</span>：{demographic.registered}名</div>
              <div className="list-head__item"> <span className="">|</span></div>
              <div className="list-head__item"> <span className="u-men"> 男性 </span>：{demographic.man}名 </div>
              <div className="list-head__item"> <span className="u-women "> 女性 </span>：{demographic.women}名 </div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="align-items-center">
          <Col xs={3} lg={3} className="">
            <InputGroup className="">
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
            <InputGroup className="">
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
          <Col xs={3} lg={3} className="">
            <InputGroup className="">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Select defaultValue={searchValue.tag_id} className="mb-0" onChange={(e) => handleChange(e, 'tag_id')}>
                <option>タグ名</option>
                <option value="0">全て表示</option>
                {
                  tags.map((tag, index) => <option key={tag.id} value={tag.id}>{tag.name}</option>)
                }
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>
      </div>
      <Card border="0" className="table-wrapper table-responsive shadow mb-3">
        <Table hover className="user-table align-items-center">
          <thead className="bg-primary text-white">
            <tr>
              <th className="border-bottom">氏名</th>
              <th className="border-bottom">電話番号</th>
              <th className="border-bottom">性別</th>
              <th className="border-bottom">生年月日</th>
              <th className="border-bottom">都道府県</th>
              <th className="border-bottom text-center">編集・削除</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {loadingTables.map(v =>
              <tr className="border-bottom">
                <td>
                  <ContentLoader
                    height={39.375}
                    width={230.48}
                    speed={1}
                  >
                    <rect x="0" y="4" rx="100" ry="100" width="32" height="32" />
                    <rect x="70" y="3" rx="4" ry="4" width="120" height="10" />
                    <rect x="70" y="22" rx="3" ry="3" width="100" height="13" />
                  </ContentLoader>
                </td>
                <td>
                  <ContentLoader
                    height={39.375}
                    width={150}
                    speed={1}
                  >
                    <rect x="0" y="10" rx="3" ry="3" width="130" height="18" />
                  </ContentLoader>
                </td>
                <td>
                  <ContentLoader
                    height={39.375}
                    width={150}
                    speed={1}
                  >
                    <rect x="0" y="10" rx="3" ry="3" width="130" height="18" />
                  </ContentLoader>
                </td>
                <td>
                  <ContentLoader
                    height={39.375}
                    width={150}
                    speed={1}
                  >
                    <rect x="0" y="10" rx="3" ry="3" width="130" height="18" />
                  </ContentLoader>
                </td>
                <td>
                  <ContentLoader
                    height={39.375}
                    width={150}
                    speed={1}
                  >
                    <rect x="0" y="10" rx="3" ry="3" width="130" height="18" />
                  </ContentLoader>
                </td>
                <TableButtonContentLoader />
              </tr>
            )}
          </tbody>
        </Table>
        <PaginationContentLoader />
      </Card>
    </>
  );
};
