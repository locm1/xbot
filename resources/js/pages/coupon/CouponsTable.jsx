import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Pagination from "@/components/Pagination";

export const CouponsTable = (props) => {
  const { 
    coupons, setCoupons, deleteCoupon, openModal, setOpenModal, setId,
    links, getCoupons, setLinks, paginate, setPaginate, name
  } = props;
  const searchValue = {name: name}

  const TableRow = (props) => {
    const { id, name, upper_limit, discount_price, code } = props;
    const link = Paths.EditCoupon.path.replace(':id', id);

    const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary me-3',
        cancelButton: 'btn btn-gray-100'
      },
      buttonsStyling: false
    }));

    const showConfirmDeleteModal = async (id) => {
      const textMessage = "本当にクーポンを削除しますか？";
  
      const result = await SwalWithBootstrapButtons.fire({
        icon: "error",
        title: "削除確認",
        text: textMessage,
        showCancelButton: true,
        confirmButtonText: "削除",
        cancelButtonText: "キャンセル"
      });
  
      if (result.isConfirmed) {
        deleteCoupon(id, deleteComplete, setCoupons, coupons)
      }
    };

    const deleteComplete = async () => {
      const confirmMessage = "選択した項目は削除されました。";
      await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
    };

    const showUsers = (id) => {
      setOpenModal(!openModal);
      setId(id);
    };

    return (
      <tr className="border-bottom">
        <td>
          <span className="fw-normal">
            {name}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {discount_price}%
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {upper_limit}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {code}
          </span>
        </td>
        <td className="text-center">
          <Button as={Link} to={link} variant="info" size="sm" className="d-inline-flex align-items-center me-3">
            編集
          </Button>
          <Button onClick={() => showUsers(id)} variant="tertiary" size="sm" className="d-inline-flex align-items-center me-3">
            利用者一覧
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
              <th className="border-gray-200">割引率</th>
              <th className="border-gray-200">残数</th>
              <th className="border-gray-200">利用コード</th>
              <th className="border-gray-200 text-center">編集・利用者一覧・削除</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {coupons && coupons.map(t => <TableRow key={`coupons-${t.id}`} {...t} />)}
          </tbody>
        </Table>
        <Pagination 
          links={links}
          paginate={paginate}
          getListBypage={getCoupons} 
          setList={setCoupons}
          setLinks={setLinks}
          setPaginate={setPaginate}
          searchValue={searchValue}
        />
      </Card.Body>
    </Card>
  );
};