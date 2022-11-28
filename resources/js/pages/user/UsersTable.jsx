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


export const UsersTable = (props) => {
  const { users = [], allSelected } = props;
  const [bulkOption, setBulkOption] = useState(0);
  const disabledBulkMenu = users.filter(u => u.isSelected).length === 0;

  const selectUser = (id) => {
    props.selectUser && props.selectUser(id);
  };

  const selectAllUsers = () => {
    props.selectAllUsers && props.selectAllUsers();
  };

  const bulkActionChange = (e) => {
    const newOption = e.target.value;
    setBulkOption(newOption);
  }

  const applyBulkAction = () => {
    if (bulkOption === "delete_user") deleteUsers();
  }

  const deleteUsers = (ids) => {
    props.deleteUsers && props.deleteUsers(ids)
  }

  const TableRow = (props) => {
    const { id, verified, status, image, name, email, dateCreated, isSelected } = props;
    const VerifiedIcon = verified ? CheckCircleIcon : InformationCircleIcon;
    const statusVariant = status === "active" ? "success"
      : status === "inactive" ? "warning"
        : status === "pending" ? "purple"
          : status === "suspended" ? "danger" : "primary";

    return (
      <tr className="border-bottom">
        <td>
          <FormCheck type="checkbox" className="dashboard-check">
            <FormCheck.Input id={`user-${id}`} checked={isSelected} onChange={() => selectUser(id)} />
            <FormCheck.Label htmlFor={`user-${id}`} />
          </FormCheck>
        </td>
        <td>
          <Card.Link className="d-flex align-items-center">
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
              <div className="small text-gray">{email}</div>
            </div>
          </Card.Link>
        </td>
        <td><span className="fw-normal">{dateCreated}</span></td>
        <td>
          <span className="fw-normal d-flex align-items-center">
            <VerifiedIcon className={`icon icon-xxs text-${statusVariant} me-1`} />
            Email
          </span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {capitalizeFirstLetter(status)}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <DotsHorizontalIcon className="icon icon-xs" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dashboard-dropdown dropdown-menu-start mt-2 py-1">
              <Dropdown.Item className="d-flex align-items-center">
                <ShieldExclamationIcon className="dropdown-icon text-gray-400 me-2" />
                Reset Pass
              </Dropdown.Item>
              <Dropdown.Item className="d-flex align-items-center">
                <EyeIcon className="dropdown-icon text-gray-400 me-2" />
                View Details
              </Dropdown.Item>
              <Dropdown.Item className="d-flex align-items-center">
                <UserRemoveIcon className="dropdown-icon text-danger me-2" />
                Suspend
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <OverlayTrigger placement="top" overlay={<Tooltip className="m-0">Delete</Tooltip>}>
            <Card.Link className="ms-2" onClick={() => deleteUsers([id])}>
              <XCircleIcon className="icon icon-xs text-danger" />
            </Card.Link>
          </OverlayTrigger>
        </td>
      </tr>
    );
  };

  return (
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Card.Body>
        <div className="d-flex mb-3">
          <Form.Select className="fmxw-200" disabled={disabledBulkMenu} value={bulkOption} onChange={bulkActionChange}>
            <option value="bulk_action">Bulk Action</option>
            <option value="send_email">Send Email</option>
            <option value="change_group">Change Group</option>
            <option value="delete_user">Delete User</option>
          </Form.Select>
          <Button variant="secondary" size="sm" className="ms-3" disabled={disabledBulkMenu} onClick={applyBulkAction}>
            Apply
          </Button>
        </div>
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">
                <FormCheck type="checkbox" className="dashboard-check">
                  <FormCheck.Input id="userCheckAll" checked={allSelected} onChange={selectAllUsers} />
                  <FormCheck.Label htmlFor="userCheckAll" />
                </FormCheck>
              </th>
              <th className="border-bottom">氏名</th>
              <th className="border-bottom">電話番号</th>
              <th className="border-bottom">性別</th>
              <th className="border-bottom">生年月日</th>
              <th className="border-bottom">お住まいエリア</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {users.map(u => <TableRow key={`user-${u.id}`} {...u} />)}
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
          <small className="fw-normal small mt-4 mt-lg-0">
            Showing <b>{users.length}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};