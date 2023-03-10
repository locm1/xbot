import React, { useState, useRef } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Badge, ProgressBar, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";

export const LiffAppsTable = (props) => {
  const { apps } = props;

  const TableRow = (props) => {
    const { id, liffId, description, view } = props;
    const link = Paths.EditAccount.path.replace(':id', id);

    return (
      <tr className="border-bottom">
        <td>
          <span className="fw-normal">{description}</span>
        </td>
        <td>
          <span className="fw-normal">{liffId}</span>
        </td>
        <td>
          <span className="fw-normal">{view.url}</span>
        </td>
        <td>
          <span className="fw-normal">{view.type}</span>
        </td>
        <td className="text-center">
          <Button as={Link} to={link} variant="info" size="sm" className="d-inline-flex align-items-center me-3">
            編集
          </Button>
          <Button variant="danger" size="sm" className="d-inline-flex align-items-center">
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
              <th className="border-bottom">LIFFアプリ名</th>
              <th className="border-bottom">LIFFアプリID</th>
              <th className="border-bottom">エンドポイントURL</th>
              <th className="border-bottom">画面サイズ</th>
              <th className="border-bottom text-center">編集・削除</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {apps.map(u => <TableRow key={`liff-app-${u.id}`} {...u} />)}
          </tbody>
        </Table>
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
            Showing <b>{apps.length}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};