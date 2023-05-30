import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { Paths } from "@/paths";
import { Link } from 'react-router-dom';
import { InviteIncentivesTable } from "@/pages/invitation/InviteIncentivesTable";
import { getInviteIncentives, getInvitationUsers } from "@/pages/invitation/api/InviteIncentiveApiMethods";

export default () => {
  const [inviteIncentives, setInviteIncentives] = useState({
    invite_incentives: [], default_invite_incentive: {}
  });
  const [paginate, setPaginate] = useState({ 
    current_page: 0, per_page: 0, from: 0, to: 0,total: 0 
  })
  const searchParams = {
    params: {}
  };
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const searchParams = {
      params: {page: 1}
    };
    getInviteIncentives(searchParams, setInviteIncentives, setLinks, setPaginate);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">友達紹介管理</h1>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button as={Link} to={Paths.CreateInviteIncentive.path} variant="gray-800" size="sm" className="d-inline-flex align-items-center">
            <PlusIcon className="icon icon-xs me-2" /> インセンティブ追加
          </Button>
        </div>
      </div>

      <InviteIncentivesTable
        inviteIncentives={inviteIncentives}
        setInviteIncentives={setInviteIncentives}
        getInviteIncentives={getInviteIncentives}
        links={links}
        paginate={paginate}
        setLinks={setLinks}
        setPaginate={setPaginate}
        searchParams={searchParams}
      />
    </>
  );
};
