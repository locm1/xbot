import React, { useState, useRef } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import { first } from "lodash";

export const RichMenusTable = (props) => {
  const { menus } = props;

  const TableRow = (props) => {
    const {name, richMenuId} = props;
    const deleteStrId = richMenuId.replace("richmenu-", "");
    const link = Paths.EditRichMenu.path.replace(":id", "") + deleteStrId;
    return (
      <tr className="border-bottom">
        <td>
          {name}
        </td>
        <td>
          {richMenuId}
        </td>
        <td className="text-center">
          <Button  variant="info" as={Link} to={link} size="sm" className="d-inline-flex align-items-center me-3">
            編集
          </Button>
          <Button  variant="danger" size="sm" className="d-inline-flex align-items-center">
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