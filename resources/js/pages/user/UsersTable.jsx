import React, { useState, useRef } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import Pagination from "@/components/Pagination";
import moment from "moment-timezone";

export const UsersTable = (props) => {
  const { users, setUsers, links, getUsers, setLinks, paginate, setPaginate, searchValue } = props;

  const deleteUsers = (id) => {
    props.deleteUsers && props.deleteUsers(id)
  }

  const TableRow = (props) => {
    const sex_array = {1: '男性', 2: '女性', 3: 'その他'};
    const { id, last_name, first_name, last_name_kana, first_name_kana, img_path, nickname, tel, gender, birth_date, prefecture, isSelected } = props;
    const name = last_name + ' ' + first_name;
    const sexVariant = gender === 1 ? "u-men" : gender === 2 ? "u-women" : "primary";
    const link = Paths.EditUser.path.replace(':id', id);

    return (
      <tr className="border-bottom">
        <td>
          <Link to={link}>
            <div className="d-flex align-items-center">
              {img_path ? (<Image src={img_path} className="avatar rounded-circle me-3"/>) : (<Image src="/images/default_user_icon.png" className="avatar rounded-circle me-3"/>)}
              <div className="d-block">
                {first_name && first_name_kana && last_name && last_name_kana ? 
                  <>
                    <div className="text-gray small">{last_name_kana} {first_name_kana}</div>
                    <span className="fw-bold text-decoration-underline">{name}</span> 
                  </>
                :
                  <span className="fw-bold text-decoration-underline">({nickname})</span> 
                }
              </div>
            </div>
          </Link>
        </td>
        <td><span className="fw-normal">{tel}</span></td>
        <td>
          <span className={`fw-normal ${sexVariant}`}>
            {sex_array[gender]}
          </span>
        </td>
        <td><span className="fw-normal">{birth_date ? moment(birth_date).format('YYYY-MM-DD') : ""}</span></td>
        <td><span className="fw-normal">{prefecture}</span></td>
        <td className="text-center">
          <Button as={Link} to={link} variant="info" size="sm" className="d-inline-flex align-items-center me-3">
            編集
          </Button>
          <Button onClick={() => deleteUsers(id)} variant="danger" size="sm" className="d-inline-flex align-items-center">
            削除
          </Button>
        </td>
      </tr>
    );
  };

  return (
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
          {users.map(u => <TableRow key={`user-${u.id}`} {...u} />)}
        </tbody>
      </Table>
      <Pagination 
        links={links}
        paginate={paginate}
        getListBypage={getUsers} 
        setList={setUsers}
        setLinks={setLinks}
        setPaginate={setPaginate}
        searchValue={searchValue}
      />
    </Card>
  );
};