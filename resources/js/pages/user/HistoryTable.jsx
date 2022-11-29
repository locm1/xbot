
import React, { useState } from "react";
import { Card, Table } from 'react-bootstrap';


export const HistoryTable = (props) => {
  const { title, headers, histories, category } = props;

  return (
    <Card border="0" className="shadow">
      <Card.Body>
        <h5 className="mb-4">{title}</h5>
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              {headers.map((header, index) => (
                <th className={`border-0 ${(index === 0) ? "rounded-start" : ''}${(headers.length - 1 === index) ? "rounded-end" : ''}`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="border-0">
            {
              histories.map((history) => 
                {
                  if (category === 'order') {
                    return (
                      <tr key={history.id}>
                        <td className="fw-bold border-0">{history.createdAt}</td>
                        <td className="fw-bold border-0">{history.name}</td>
                        <td className="fw-bold border-0">{history.address}</td>
                      </tr>
                    )
                  } else if (category === 'reserve') {
                    return (
                      <tr key={history.id}>
                        <td className="fw-bold border-0">{history.createdAt}</td>
                        <td className="fw-bold border-0">{history.name}</td>
                        <td className="fw-bold border-0">{history.quantity}</td>
                        <td className="fw-bold border-0">{history.price}</td>
                        <td className="fw-bold border-0">{history.deadline}</td>
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