import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, Badge, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import moment from "moment-timezone";
import { Paths } from "@/paths";
import Pagination from "@/components/Pagination";


export const SendHistoriesTable = (props) => {
  const { 
    sendHistories, setSendMessages, getSendMessages, links,
    paginate, setLinks, setPaginate
  } = props;

  const getStatus = (status) => {
    if (status == 0) {
      return <Badge bg="success" className="me-1">配信済</Badge>;
    } else if (status == 1) {
      return <Badge bg="info" className="me-1">予約済</Badge>;
    }
  }

  const TableRow = (props) => {
    const { status, templateName, sendDate, targetCount, id } = props;
    const link = Paths.SendHistoryDetail.path.replace(':id', id);

    return (
      <tr className="border-bottom">
        <td>{getStatus(status)}</td>
        <td>
          <span className="fw-normal">{templateName}</span>
        </td>
        <td>
          <span className="fw-normal">{moment(sendDate).format("YYYY-MM-DD HH:mm:ss")}</span>
        </td>
        <td>
          <span className="fw-normal">{targetCount}</span>
        </td>
        <td>
          <Button as={Link} to={link} variant="info" size="sm" className="d-inline-flex align-items-center me-3">
            編集
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
              <th className="border-gray-200">ステータス</th>
              <th className="border-gray-200">テンプレート名</th>
              <th className="border-gray-200">配信日時</th>
              <th className="border-gray-200">配信人数</th>
              <th className="border-gray-200">編集</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {sendHistories && sendHistories.map(t => <TableRow key={`sendHistories-${t.id}`} {...t} />)}
          </tbody>
        </Table>
        <Pagination 
          links={links}
          paginate={paginate}
          getListBypage={getSendMessages} 
          setList={setSendMessages}
          setLinks={setLinks}
          setPaginate={setPaginate}
        />
    </Card>
  );
};