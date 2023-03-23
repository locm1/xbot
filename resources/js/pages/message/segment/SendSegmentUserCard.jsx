import React, { useState, useRef } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import { first } from "lodash";

export const SendSegmentUserCard = (props) => {
  const { users = [], allSelected, setUsers } = props;
  const [bulkOption, setBulkOption] = useState(0);

  const deleteUsers = (id) => {
    props.deleteUsers && props.deleteUsers(id)
  }

  const allSelectClick = () => {   
    let i = 0; 
    users.forEach(user => user.isSelected == true && i++);
    users.length === i ? 
      setUsers(users.map(user => ({...user, isSelected: false}))) :
      setUsers(users.map(user => ({...user, isSelected: true})))
  }

  const TableRow = (props) => {
    const sex_array = {1: '男性', 2: '女性', 3: 'その他'};
    const { id, last_name, first_name, last_name_kana, first_name_kana, img_path, nickname, tel, gender, birth_date, prefecture, isSelected } = props;
    const name = last_name + ' ' + first_name;
    const sexVariant = gender === 1 ? "info" : gender === 2 ? "danger" : "primary";
    const link = Paths.EditUser.path.replace(':id', id);
    const handleCheckboxChange = (event) => {
      setUsers(
        users.map(user => user.id == id ? {...user, isSelected: event.target.checked} : user)
      );
    };

    return (
      <tr className="border-bottom">
        <td>
          <Form.Check className="text-center" checked={isSelected} onChange={handleCheckboxChange} />
        </td>
        <td>
          <Link to={link}>
          <div className="d-flex align-items-center">
            {img_path ? (<Image src={img_path} className="avatar rounded-circle me-3"/>) : (<Image src="/images/default_user_icon.png" className="avatar rounded-circle me-3"/>)}
            <div className="d-block">
              {first_name && first_name_kana && last_name && last_name_kana ? 
                <>
                  <div className="text-gray small">{last_name_kana} {first_name_kana}</div>
                  <span className="fw-bold text-decoration-underline">{name}</span> 
                </>
              :
                <span className="fw-bold text-decoration-underline">{nickname}</span> 
              }
            </div>
          </div>
          </Link>
        </td>
        <td><span className="fw-normal">{tel}</span></td>
        <td>
          <span className={`fw-normal text-${sexVariant}`}>
            {sex_array[gender]}
          </span>
        </td>
        <td><span className="fw-normal">{birth_date}</span></td>
        <td><span className="fw-normal">{prefecture}</span></td>
      </tr>
    );
  };

  return (
    <Card border="0" className="table-wrapper shadow vh-50 overflow-scroll">
      <Card.Body className="">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom sticky-top bg-white w-0">
                <Button variant="secondary" size="sm" onClick={allSelectClick}>全選択</Button>
              </th>
              <th className="border-bottom sticky-top bg-white">氏名</th>
              <th className="border-bottom sticky-top bg-white">電話番号</th>
              <th className="border-bottom sticky-top bg-white">性別</th>
              <th className="border-bottom sticky-top bg-white">生年月日</th>
              <th className="border-bottom sticky-top bg-white">都道府県</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {users.map(u => <TableRow key={`user-${u.id}`} {...u} />)}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer className="px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
      </Card.Footer>
    </Card>
  );
};