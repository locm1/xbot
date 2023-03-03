import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { getInvitationUsers, deleteInvitation } from "@/pages/invitation/api/InvitationApiMethods";
import { Paths } from "@/paths";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const InvitationsTable = (props) => {
  const { invitations, setOpenModal, openModal, setInvitationUsers, setInvitations } = props;
  const totalInvitations = invitations.length;

  const TableRow = (props) => {
    const { coupon, privilege_detail, id } = props;
    const link = Paths.EditInvitation.path.replace(':id', id);

    const showInvitationUsers = (id) => {
      getInvitationUsers(id, setInvitationUsers, setOpenModal, openModal)
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
        deleteInvitation(id, deleteComplete, setInvitations, invitations)
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
            {coupon.name}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {privilege_detail}
          </span>
        </td>
        <td>
          <Button as={Link} to={link} variant="info" size="sm" className="d-inline-flex align-items-center me-3">
            編集
          </Button>
          <Button onClick={() => showInvitationUsers(id)} variant="tertiary" size="sm" className="d-inline-flex align-items-center me-3">
            発行者一覧
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
              <th className="border-gray-200">クーポン管理名称</th>
              <th className="border-gray-200">特典内容</th>
              <th className="border-gray-200">編集・発行者一覧・削除</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {invitations.map(t => <TableRow key={`invitations-${t.id}`} {...t} />)}
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
            Showing <b>{totalInvitations}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};