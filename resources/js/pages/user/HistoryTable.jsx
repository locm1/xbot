
import React, { useState } from "react";
import { Card, Table } from 'react-bootstrap';
import moment from "moment-timezone";
import { Link } from "react-router-dom";


export const HistoryTable = (props) => {
  const { title, headers, histories, fromInvitedUser } = props;

  const invitedUser = () => {
    const location = () => {
      window.location.href = `/manage/user/edit/${fromInvitedUser.inviter_users.id}`;
    }
    if (typeof fromInvitedUser != 'undefined') {
      return (
        <h6>このユーザーを招待した人：
          <Link to={`/manage/user/edit/${fromInvitedUser.inviter_users.id}`} onClick={() => location()} className="text-decoration-underline pb-3">
            {fromInvitedUser.inviter_users.last_name} {fromInvitedUser.inviter_users.first_name}
          </Link>
        </h6>
      )
    } else {
      return null;
    }
  }

  return (
    <Card border="0" className="shadow">
      <Card.Header className="bg-primary text-white px-3 py-2">
        <h5 className="mb-0 fw-bolder">{title}</h5>
      </Card.Header>
      <Card.Body>
        {invitedUser()}
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
            {
              histories && histories.map((history, key) => 
                {
                  if (title === '注文履歴') {
                    return (
                      <tr key={`order-${key}`} className="border-bottom">
                        <td className="fw-bold border-0">{moment(history.createdAt).format("YYYY年MM月DD日")}</td>
                        <td className="fw-bold border-0">{history.name}</td>
                        <td className="fw-bold border-0">{history.quantity}</td>
                        <td className="fw-bold border-0">{history.price}</td>
                      </tr>
                    )
                  } else if (title === '取置履歴') {
                    return (
                      <tr key={`${key}`} className="border-bottom">
                        <td className="fw-bold border-0">{moment(history.createdAt).format("YYYY年MM月DD日")}</td>
                        <td className="fw-bold border-0">{history.name}</td>
                        <td className="fw-bold border-0">{history.quantity}</td>
                        <td className="fw-bold border-0">{moment(history.deadline).format("YYYY年MM月DD日 HH:mm:ss")}</td>
                      </tr>
                    )
                  } else if (title === '紹介履歴') {
                    return (
                      <tr key={`invite-${key}`} className="border-bottom">
                        <td className="fw-bold border-0">{moment(history.created_at).format("YYYY年MM月DD日")}</td>
                        <td className="fw-bold border-0">{history.invitee_users.last_name} {history.invitee_users.first_name}</td>
                      </tr>
                    )
                  } else if (title === '来店履歴') {
                    return (
                      <tr key={`visit-${key}`} className="border-bottom">
                        <td className="fw-bold border-0">{moment(history.created_at).format("YYYY年MM月DD日")}</td>
                        <td className="fw-bold border-0">{history.memo}</td>
                      </tr>
                    )
                  }
                }
              )
            }
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};