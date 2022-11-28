import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import { pageVisits, pageTraffic, pageRanking } from "@/data/tables";


export const ReservesTable = (props) => {
  const { reserves } = props;
  const totalReserves = reserves.length;

  const TableRow = (props) => {
    const { userName, name, quantity, price, deadline, status } = props;

    return (
      <tr className="border-bottom">
        <td>
          <span className="fw-normal">
            {userName}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {name}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {quantity}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {price}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {deadline}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {status}
          </span>
        </td>
        <td className="text-center">
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <DotsHorizontalIcon className="icon icon-xs icon-dark" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="py-0">
              <Dropdown.Item as={Link} to={Paths.Invoice.path}>
                <EyeIcon className="icon icon-xs me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item as={Link} to={Paths.Invoice.path}>
                <PencilAltIcon className="icon icon-xs me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item>
                <TrashIcon className="icon icon-xs text-danger me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
              <th className="border-gray-200">ユーザー名</th>
              <th className="border-gray-200">商品名</th>
              <th className="border-gray-200">個数</th>
              <th className="border-gray-200">金額</th>
              <th className="border-gray-200">期日</th>
              <th className="border-gray-200">ステータス</th>
              <th className="border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {reserves.map(t => <TableRow key={`reserves-${t.id}`} {...t} />)}
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
            Showing <b>{totalReserves}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};