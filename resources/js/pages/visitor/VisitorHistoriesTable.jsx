import React, { useState } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import { pageVisits, pageTraffic, pageRanking } from "@/data/tables";


const capitalizeFirstLetter = (string) => (
  string[0].toUpperCase() + string.slice(1)
);

const getFirstLetterOfEachWord = (text) => (
  text.match(/\b\w/g).join('')
);


export const VisitorHistoriesTable = (props) => {
  const { visitorHistories } = props;
  const totalvisitorHistories = visitorHistories.length;

  const TableRow = (props) => {
    const { visitorDate, name, sex, memo, id, image } = props;
    const sex_array = {1: '男性', 2: '女性', 3: 'その他'};
    const sexVariant = sex === 1 ? "info" : sex === 2 ? "danger" : "primary";
    const link = Paths.EditVisitorHistory.path.replace(':id', id);

    return (
      <tr className="border-bottom">
        <td>
          <Card.Link className="d-flex align-items-center" as={Link} to={link}>
            {image
              ? (
                <Image
                  src={image}
                  className="avatar rounded-circle me-3"
                />
              ) : (
                <div className="avatar d-flex align-items-center justify-content-center fw-bold rounded bg-secondary me-3">
                  <span>{getFirstLetterOfEachWord(name)}</span>
                </div>
              )}
            <div className="d-block">
              <span className="fw-bold">{name}</span>
              {/* <div className="small text-gray">{email}</div> */}
            </div>
          </Card.Link>
        </td>
        <td>
          <span className={`fw-normal text-${sexVariant}`}>
            {sex_array[sex]}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {visitorDate}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {memo}
          </span>
        </td>
        <td>
          <Link to={link}>
            <PencilAltIcon className="icon icon-xs me-2"/>
          </Link>
          <TrashIcon role="button" className="icon icon-xs text-danger me-2 " />
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
              <th className="border-gray-200">お名前</th>
              <th className="border-gray-200">性別</th>
              <th className="border-gray-200">来店日時</th>
              <th className="border-gray-200">メモ</th>
              <th className="border-gray-200">編集・削除</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {visitorHistories.map(t => <TableRow key={`visitorHistories-${t.id}`} {...t} />)}
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
            Showing <b>{totalvisitorHistories}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};