import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";


export const VisitorHistoriesTable = (props) => {
  const { visitorHistories, deleteVisitorHistoryConfirmModal } = props;
  const totalvisitorHistories = visitorHistories.length;
  const history = useHistory();

  const TableRow = (props) => {
    const { created_at, memo, user, id, user_id } = props;
    const sex_array = {1: '男性', 2: '女性', 3: 'その他'};
    const sexVariant = user.gender === 1 ? "info" : user.gender === 2 ? "danger" : "primary";
    const link = Paths.EditVisitorHistory.path.replace(':id', id);
    const userlink = Paths.EditUser.path.replace(':id', user_id);
    const date = new Date(created_at)

    const handleClick = () => {
      history.push(link, user_id)
    }

    return (
      <tr className="border-bottom">
        <td>
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
        </td>
        <td>
          <span className={`fw-normal text-${sexVariant}`}>
            {sex_array[user.gender]}
          </span>
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
      <Card.Body>
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-gray-200">お名前</th>
              <th className="border-gray-200">性別</th>
              <th className="border-gray-200">来店日時</th>
              <th className="border-gray-200">メモ</th>
              <th className="border-gray-200">編集・削除</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {visitorHistories.map(t => <TableRow key={`visitorHistories-${t.id}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-normal mt-4 mt-lg-0">
            {totalvisitorHistories} 件中 1〜{totalvisitorHistories} 件表示
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};