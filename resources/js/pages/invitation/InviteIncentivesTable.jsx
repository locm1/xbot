import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { deleteInviteIncentive } from "@/pages/invitation/api/InviteIncentiveApiMethods";
import { Paths } from "@/paths";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const InviteIncentivesTable = (props) => {
  const { inviteIncentives, defaultInviteIncentive, setInviteIncentives } = props;
  const totalInviteIncentives = inviteIncentives.length;

  const TableRow = (props) => {
    const { name, id, inviter_timing, invitee_timing, defaultInviteIncentive } = props;
    const link = Paths.EditInviteIncentive.path.replace(':id', id);
    const inviterIncentiveLink = Paths.InviterIncentives.path.replace(':id', id);
    const inviteeIncentiveLink = Paths.InviteeIncentives.path.replace(':id', id);

    const getTiming = (timing) => {
      switch (timing) {
        case 1:
          return '友達登録'
        case 2:
          return '利用者登録'
        case 3:
          return '初来店'
        case 4:
          return '初購入'
      }
    };

    const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary me-3',
        cancelButton: 'btn btn-gray-100'
      },
      buttonsStyling: false
    }));

    const showConfirmDeleteModal = async (id) => {
      const textMessage = "本当に招待を削除しますか？";
  
      const result = await SwalWithBootstrapButtons.fire({
        icon: "error",
        title: "削除確認",
        text: textMessage,
        showCancelButton: true,
        confirmButtonText: "削除",
        cancelButtonText: "キャンセル"
      });
  
      if (result.isConfirmed) {
        deleteInviteIncentive(id, deleteComplete, setInviteIncentives, inviteIncentives)
      }
    };

    const deleteComplete = async () => {
      const confirmMessage = "選択した項目は削除されました。";
      await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
    };

    return (
      <tr className="border-bottom">
        <td>
          <span className="fw-normal">
            {name}
            &nbsp; {defaultInviteIncentive.invite_incentive_id == id && <BadgeCheckIcon className="icon-sm" />}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {getTiming(inviter_timing)}
          </span>
        </td>
        <td>
          <span className="fw-normal">
          {getTiming(invitee_timing)}
          </span>
        </td>
        <td>
          <Button as={Link} to={inviterIncentiveLink} target="_blank" variant="tertiary" size="sm" className="d-inline-flex align-items-center me-3">
            スピーカー一覧
          </Button>
          <Button as={Link} to={inviteeIncentiveLink} variant="tertiary" target="_blank" size="sm" className="d-inline-flex align-items-center me-3">
            招待者一覧
          </Button>
          <Button as={Link} to={link} variant="info" size="sm" className="d-inline-flex align-items-center me-3">
            編集
          </Button>
          <Button onClick={() => showConfirmDeleteModal(id)} variant="danger" size="sm" className="d-inline-flex align-items-center">
            削除
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Card.Body>
        <Table hover>
          <thead>
            <tr>
              <th className="border-gray-200">管理名称</th>
              <th className="border-gray-200">スピーカータイミング</th>
              <th className="border-gray-200">招待者タイミング</th>
              <th className="border-gray-200">スピーカー一覧・招待者一覧・編集・削除</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {inviteIncentives.map(t => <TableRow key={`invite-incentives-${t.id}`} {...t} defaultInviteIncentive={defaultInviteIncentive} />)}
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
            Showing <b>{totalInviteIncentives}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};