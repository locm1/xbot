import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, Badge, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import { pageVisits, pageTraffic, pageRanking } from "@/data/tables";


export const SendHistoriesTable = (props) => {
  const { sendHistories } = props;
  const totalSendHistories = sendHistories.length;

  const getStatus = (status) => {
    if (status == 1) {
      return <Badge bg="success" className="me-1 is-delivered">配信済</Badge>;
    }
  }

  const TableRow = (props) => {
    const { status, sendDate, targetCount, sendCount, id } = props;
    const history = useHistory();

    const handleRowClick = (id) => {
      const link = Paths.SendHistoryDetail.path.replace(':id', id);
      history.push(link);
    }

    return (
      <tr className="border-bottom table-body-tr" onClick={() => handleRowClick(id)}>
        <td>{getStatus(status)}</td>
        <td>
          <span className="fw-normal">{sendDate}</span>
        </td>
        <td>
          <span className="fw-normal">{targetCount}</span>
        </td>
        <td>
          <span className="fw-normal">{sendCount}</span>
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
              <th className="border-gray-200">ステータス</th>
              <th className="border-gray-200">配信日時</th>
              <th className="border-gray-200">該当人数</th>
              <th className="border-gray-200">配信数</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {sendHistories.map(t => <TableRow key={`sendHistories-${t.id}`} {...t} />)}
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
            Showing <b>{totalSendHistories}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};