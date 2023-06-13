import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import Pagination from "@/components/Pagination";
import VisitorHistoriesContentLoader from "@/pages/visitor/VisitorHistoriesContentLoader";
import PaginationContentLoader from "@/components/loader/PaginationContentLoader";

export const VisitorHistoriesTable = (props) => {
  const { 
    visitorHistories, deleteVisitorHistoryConfirmModal, links, getVisitorHistories, 
    setLinks, setVisitorHistories, paginate, setPaginate, searchValue, isRendered
  } = props;
  const history = useHistory();

  const TableRow = (props) => {
    const { created_at, memo, user, id, user_id } = props;
    console.log(user);
    const sex_array = {1: '男性', 2: '女性', 3: 'その他'};
    const sexVariant = user ? user.gender === 1 ? "u-men" : user.gender === 2 ? "u-women" : "" : '';
    const link = Paths.EditVisitorHistory.path.replace(':id', id);
    const userlink = Paths.EditUser.path.replace(':id', user_id);
    const date = new Date(created_at)

    const handleClick = () => {
      history.push(link, user_id)
    }

    return (
      <tr className="border-bottom">
        <td>
          {
            user ? (
              <Card.Link className="d-flex align-items-center" as={Link} to={userlink}>
                <div className="d-flex align-items-center">
                  {user.img_path ? (<Image src={user.img_path} className="avatar rounded-circle me-3"/>) : (<Image src="/images/default_user_icon.png" className="avatar rounded-circle me-3"/>)}
                  <div className="d-block">
                    {user.first_name && user.first_name_kana && user.last_name && user.last_name_kana ? 
                      <>
                        <div className="text-gray small">{user.last_name_kana} {user.first_name_kana}</div>
                        <span className="fw-bold text-decoration-underline">{user.last_name} {user.first_name}</span> 
                      </>
                    :
                      <span className="fw-bold text-decoration-underline">{user.nickname}</span> 
                    }
                  </div>
                </div>
              </Card.Link>
            ) : (
              <Card.Link className="d-flex align-items-center" as={Link} to={userlink}>
                <div className="d-flex align-items-center">
                  <Image src="/images/default_user_icon.png" className="avatar rounded-circle me-3"/>
                  <div className="d-block">
                    <span className="fw-normal text-danger">削除済みユーザー</span>
                  </div>
                </div>
              </Card.Link>
            )
          }
        </td>
        <td>
          {
            user && (
              <span className={`fw-normal ${sexVariant}`}>
                {sex_array[user.gender]}
              </span>
            )
          }
        </td>
        <td>
          <span className="fw-normal">
            {date.toLocaleString()}
          </span>
        </td>
        <td>
          <div className="product-name">
            <span className="fw-normal">
              {memo}
            </span>
          </div>
        </td>
        <td>
          <Button onClick={handleClick} variant="info" size="sm" className="d-inline-flex align-items-center me-3">
            編集
          </Button>
          <Button variant="danger" onClick={() => deleteVisitorHistoryConfirmModal(id)} size="sm" className="d-inline-flex align-items-center">
            削除
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Table hover className="user-table align-items-center">
        <thead className="bg-primary text-white">
          <tr>
            <th className="border-gray-200">お名前</th>
            <th className="border-gray-200">性別</th>
            <th className="border-gray-200">来店日時</th>
            <th className="border-gray-200">メモ</th>
            <th className="border-gray-200">編集・削除</th>
          </tr>
        </thead>
        <tbody className="border-0">
          {
            isRendered ? (
              visitorHistories.map(t => <TableRow key={`visitorHistories-${t.id}`} {...t} />)
            ) : (
              <VisitorHistoriesContentLoader />
            )
          }
        </tbody>
      </Table>
      {
        isRendered ? (
          <Pagination 
            links={links}
            paginate={paginate}
            getListBypage={getVisitorHistories} 
            setList={setVisitorHistories}
            setLinks={setLinks}
            setPaginate={setPaginate}
            searchValue={searchValue}
          />
        ) : (
          <PaginationContentLoader />
        )
      }
    </Card>
  );
};