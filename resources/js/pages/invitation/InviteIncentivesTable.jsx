import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { deleteInviteIncentive } from "@/pages/invitation/api/InviteIncentiveApiMethods";
import { Paths } from "@/paths";
import Swal from "sweetalert2";
import Pagination from "@/components/Pagination";
import withReactContent from "sweetalert2-react-content";
import InviteIncentivesContentLoader from "@/pages/invitation/InviteIncentivesContentLoader";
import PaginationContentLoader from "@/components/loader/PaginationContentLoader";

export const InviteIncentivesTable = (props) => {
  const { 
    inviteIncentives, setInviteIncentives, links, getInviteIncentives, 
    setLinks, paginate, setPaginate, searchParams, isRendered, setIsRendered
  } = props;

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
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-gray-400 me-3'
      },
      buttonsStyling: false
    }));

    const showConfirmDeleteModal = async (id) => {
      const textMessage = "本当にこのインセンティブを削除しますか？";
  
      const result = await SwalWithBootstrapButtons.fire({
        icon: "error",
        title: "削除確認",
        text: textMessage,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: "削除",
        cancelButtonText: "キャンセル"
      });
  
      if (result.isConfirmed) {
        deleteInviteIncentive(id, deleteComplete)
      }
    };

    const deleteComplete = async (id) => {
      const confirmMessage = "選択した項目は削除されました。";
      await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
      const newInviteIncentives = inviteIncentives.invite_incentives.filter((inviteIncentive) => (inviteIncentive.id !== id));
      const currentPage = newInviteIncentives.length == 0 ? paginate.current_page - 1 : paginate.current_page
      const searchParams = {
        params: {page: currentPage}
      };
      getInviteIncentives(searchParams, setInviteIncentives, setLinks, setPaginate, setIsRendered);
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
      <Table hover className="align-items-center">
        <thead className="bg-primary text-white">
          <tr>
            <th className="border-gray-200">管理名称</th>
            <th className="border-gray-200">スピーカータイミング</th>
            <th className="border-gray-200">招待者タイミング</th>
            <th className="border-gray-200">スピーカー一覧・招待者一覧・編集・削除</th>
          </tr>
        </thead>
        <tbody className="border-0">
          {
            isRendered ? (
              inviteIncentives.invite_incentives.map(t => <TableRow key={`invite-incentives-${t.id}`} {...t} defaultInviteIncentive={inviteIncentives.default_invite_incentive} />)
            ) : (
              <InviteIncentivesContentLoader />
            )
          }
        </tbody>
      </Table>
      {
        isRendered ? (
          <Pagination 
            links={links}
            paginate={paginate}
            getListBypage={getInviteIncentives} 
            setList={setInviteIncentives}
            setLinks={setLinks}
            setPaginate={setPaginate}
            searchValue={searchParams}
          />
        ) : (
          <PaginationContentLoader />
        )
      }
    </Card>
  );
};