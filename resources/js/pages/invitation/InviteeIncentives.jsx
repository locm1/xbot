import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Paths } from "@/paths";
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { getInviteeIncentiveUsers } from "@/pages/invitation/api/InviteIncentiveUserApiMethods";

export default () => {
  const { id } = useParams();
  const [inviteeIncentiveUsers, setInviteeIncentiveUsers] = useState([]);
  const totalInviteeIncentiveUsers = inviteeIncentiveUsers.length;

  const TableRow = (props) => {
    const { user_id, user, issued_at, usage_status, invite_incentive, usage_date } = props;
    const link = Paths.EditUser.path.replace(':id', user_id);

    const getUsageStatus = () => {
      switch (usage_status) {
        case 1:
          return '未使用'
        case 2:
          return '使用済み'
      }
    };

    return (
      <tr className="border-bottom">
        <td>
          <Link to={link}>
          <div className="d-flex align-items-center">
            {user.img_path ? (<Image src={user.img_path} className="avatar rounded-circle me-3"/>) : (<Image src="/images/default_user_icon.png" className="avatar rounded-circle me-3"/>)}
            <div className="d-block">
              {user.first_name && user.first_name_kana && user.last_name && user.last_name_kana ? 
                <>
                  <div className="text-gray small">{user.last_name_kana} {user.first_name_kana}</div>
                  <span className="fw-bold text-decoration-underline">{user.name}</span> 
                </>
              :
                <span className="fw-bold text-decoration-underline">{user.nickname}</span> 
              }
            </div>
          </div>
          </Link>
        </td>
        <td>
          <span className="fw-normal">
            {moment(issued_at).format("YYYY-MM-DD HH:mm:ss")}
          </span>
        </td>
        <td>
          <span className="fw-normal">
          {getUsageStatus()}
          </span>
        </td>
        <td>
          <span className="fw-normal">
          {moment(usage_date).format("YYYY-MM-DD HH:mm:ss")}
          </span>
        </td>
        <td>
          <span className="fw-normal">
          {invite_incentive.name}
          </span>
        </td>
      </tr>
    );
  };

  useEffect(() => {
    getInviteeIncentiveUsers(id, setInviteeIncentiveUsers);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">招待者一覧</h1>
        </div>
      </div>

      <Card border="0" className="table-wrapper table-responsive shadow">
      <Card.Body>
        <Table hover>
          <thead>
            <tr>
              <th className="border-gray-200">利用者</th>
              <th className="border-gray-200">取得日時</th>
              <th className="border-gray-200">使用状況</th>
              <th className="border-gray-200">使用日</th>
              <th className="border-gray-200">対象インセンティブ</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {inviteeIncentiveUsers && inviteeIncentiveUsers.map(t => <TableRow key={`inviter-incentive-user-${t.id}`} {...t} />)}
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
            Showing <b>{totalInviteeIncentiveUsers}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
    </>
  );
};
