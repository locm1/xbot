import React, { useState, useEffect } from "react";
import { Col, Row, Form, Modal, Button, Table, Image, Badge, FloatingLabel } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import moment from "moment-timezone";

export default (props) => {
  const { show = false, title, headers, users } = props;

  const onHide = () => {
    props.onHide && props.onHide();
  };

  const TableRow = (props) => {
    const { id, user_id, user, created_at, usage_status } = props;
    const link = Paths.EditUser.path.replace(':id', user_id);

    const getStatusClass = (status) => {
      switch (status) {
        case 1:
          return {
            class: 'tertiary',
            name: '未使用'
          }
        case 2:
          return {
            class: 'info',
            name: '使用済'
          }
      }
    }

    return (
      <tr className="border-bottom">
        <td className="fw-bold border-0 pt-3">{moment(created_at).format("YYYY年MM月DD日")}</td>
        <td className="fw-bold border-0">
          <Link to={link}>
            <div className="d-flex align-items-center">
              {user.img_path ? (<Image src={user.img_path} className="avatar rounded-circle me-3"/>) : (<Image src="/images/default_user_icon.png" className="avatar rounded-circle me-3"/>)}
              <div className="d-block">
                {user.first_name && user.last_name ? 
                  <>
                    <span className="fw-bold text-decoration-underline">{user.last_name} {user.first_name}</span> 
                  </>
                :
                  <span className="fw-bold text-decoration-underline">{user.nickname}</span> 
                }
              </div>
            </div>
          </Link>
        </td>
        <td className="fw-bold border-0">
          <Badge bg={getStatusClass(usage_status).class} className="me-1 order-status-badge fw-normal">
            {getStatusClass(usage_status).name}
          </Badge>
        </td>
      </tr>
    );
  };

  return (
    <Modal as={Modal.Dialog} centered scrollable show={show} onHide={onHide}>
      <Form className="modal-content p-3">
        <Modal.Header className="border-0 px-3 pb-0">
          <Modal.Title className="fw-normal">{title}</Modal.Title>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>

        <Modal.Body className="px-3 pb-0">
          <div className="px-3">
            <Table responsive className="table-centered table-nowrap rounded mb-0">
              <thead className="thead-light">
                <tr>
                  {headers.map((header, index) => (
                    <th key={index} className={`border-0 ${(index === 0) ? "rounded-start" : ''}${(headers.length - 1 === index) ? "rounded-end" : ''}`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="border-0">
                {users.map(t => <TableRow key={`invitation-user-${t.id}`} {...t} />)}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};