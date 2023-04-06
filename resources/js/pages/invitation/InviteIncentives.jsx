import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';

import { InviteIncentivesTable } from "@/pages/invitation/InviteIncentivesTable";
import { getInviteIncentives, getInvitationUsers } from "@/pages/invitation/api/InviteIncentiveApiMethods";
import InvitationUserModal from "@/pages/invitation/InvitationUserModal";

export default () => {
  const [inviteIncentives, setInviteIncentives] = useState([]);
  const [defaultInviteIncentive, setDefaultInviteIncentive] = useState([]);
  const [invitationUsers, setInvitationUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const headers = ['取得日時', '利用者', '使用状況'];

  useEffect(() => {
    getInviteIncentives(setInviteIncentives, setDefaultInviteIncentive);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">招待管理</h1>
        </div>
      </div>

      <InviteIncentivesTable
        inviteIncentives={inviteIncentives}
        defaultInviteIncentive={defaultInviteIncentive}
      />
    </>
  );
};
