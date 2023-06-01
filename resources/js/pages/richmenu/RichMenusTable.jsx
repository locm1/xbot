import React, { useState, useRef } from "react";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import { first } from "lodash";
import { deleteRichMenu } from "./RichMenuApiMethods";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import RichMenusContentLoader from "@/pages/richmenu/RichMenusContentLoader.jsx"

export const RichMenusTable = (props) => {
  const { menus, setMenus, isRendered } = props;

  const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-gray-400 me-3'
    },
    buttonsStyling: false
  }));

  const showSwalDelete = (richMenuId, name) => {
    SwalWithBootstrapButtons.fire({
      icon: 'warning',
      title: '削除確認',
      text: `「${name}」を削除しますか？`,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRichMenu(richMenuId, setMenus, name);
      }
    })
  }

  const TableRow = (props) => {
    const {name, richMenuId, isDefault} = props;
    const deleteStrId = richMenuId.replace("richmenu-", "");
    const link = Paths.EditRichMenu.path.replace(":id", "") + deleteStrId;
    return (
      <tr className="border-bottom">
        <td>
          <p className="mb-0">
            {name}
            &nbsp; {isDefault ? <BadgeCheckIcon className="icon-sm" /> : ''}
          </p>
        </td>
        <td>
          {richMenuId}
        </td>
        <td className="text-center">
          <Button  variant="info" as={Link} to={link} size="sm" className="d-inline-flex align-items-center me-3">
            編集
          </Button>
          <Button  variant="danger" size="sm" className="d-inline-flex align-items-center" onClick={() => showSwalDelete(richMenuId, name)}>
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
            <th className="border-bottom">タイトル</th>
            <th className="border-bottom">リッチメニューID</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-0">
          {
            isRendered ? (
              menus.map((v, k) => <TableRow key={`menu-${k}`} {...v} />)
            ) : (
              <RichMenusContentLoader />
            )
          }
        </tbody>
      </Table>
    </Card>
  );
};