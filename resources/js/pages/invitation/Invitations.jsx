import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';

import { InvitationsTable } from "@/pages/invitation/InvitationsTable";
import { getInvitations, getInvitationUsers } from "@/pages/invitation/api/InvitationApiMethods";
import InvitationUserModal from "@/pages/invitation/InvitationUserModal";

export default () => {
  const [invitations, setInvitations] = useState([]);
  const [invitationUsers, setInvitationUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const headers = ['取得日時', '利用者', '使用状況'];

  useEffect(() => {
    getInvitations(setInvitations);
  }, []);

  const onHide = () => {
    setOpenModal(!openModal);
  }

  return (
    <>
      {openModal && (
        <InvitationUserModal
          show={true}
          title="クーポン利用者一覧"
          onHide={onHide}
          users={invitationUsers}
          headers={headers}
        />
      )}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">招待管理</h1>
        </div>
      </div>

      <InvitationsTable
        invitations={invitations}
        setOpenModal={setOpenModal}
        openModal={openModal}
        setInvitationUsers={setInvitationUsers}
        setInvitations={setInvitations}
      />
    </>
  );
};
