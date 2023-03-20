import React, { useState, useRef } from "react";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import { first } from "lodash";
import { deleteRichMenu } from "./RichMenuApiMethods";
import Swal from "sweetalert2";

export const RichMenusTable = (props) => {
  const { menus, setMenus } = props;

  const showSwalDelete = (richMenuId, name) => {
    Swal.fire({
      icon: 'warning',
      title: '削除確認',
      text: `「${name}」を削除しますか？`,
      confirmButtonColor: '#d33',
      confirmButtonText: '削除する',
      showCancelButton: true,
      cancelButtonText:
        'キャンセル',
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
      <Card.Body>
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">タイトル</th>
              <th className="border-bottom">リッチメニューID</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="border-0">
            {menus.map((v, k) => <TableRow key={`menu-${k}`} {...v} />)}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer className="px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-0">
              <Pagination.Prev>
                前
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                次
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-normal small mt-4 mt-lg-0">
            Showing <b>{menus.length}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
    </Card>
  );
};