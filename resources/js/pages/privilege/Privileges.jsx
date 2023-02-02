import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { Col, Row, Button, Container, Card, Form, InputGroup } from "react-bootstrap";
import { ArchiveIcon, PlusIcon, HomeIcon } from "@heroicons/react/solid";
import { Link, useHistory } from 'react-router-dom';

import PrivilegeCard from "@/pages/privilege/PrivilegeCard";
import { storePrivileges, getPrivileges, updatePrivileges } from "@/pages/privilege/api/PrivilegeApiMethods";
import { Paths } from "@/paths";

export default () => {
  const [privileges, setPrivileges] = useState([]);
  const [cardToEdit, setCardToEdit] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [time, setTime] = useState('');

  const handleKeyDown = (e) => {
    e.preventDefault();
    storePrivileges(time, privileges, setPrivileges, setIsCreate)
  };

  useEffect(() => {
    getPrivileges(setPrivileges)
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-md-0">
          <h1 className="page-title">特典設定</h1>
        </div>
      </div>

      <Container fluid className="cotainer px-0">
        <Row className="privilege-card-wrap">
          {
            privileges && privileges.map(privilege => 
              <PrivilegeCard 
                key={`privilege-${privilege.id}`}
                {...privilege}
                setCardToEdit={setCardToEdit}
                privileges={privileges}
                setPrivileges={setPrivileges}
                getPrivileges={getPrivileges}
                updatePrivileges={updatePrivileges}
              />
            )
          }
        </Row>
        {
          isCreate ? (
            <Card border={1} className="p-4 privilege-card-item">
              <div className="d-flex align-items-center m-0 privilege-create-wrap">
                <p className="fw-bold p-2 m-0">来店回数</p>
                <Form onSubmit={(e) => handleKeyDown(e)}>
                  <Form.Control
                    autoFocus
                    value={time}
                    className="fs-6 fw-bold p-2 m-0 lh-1 border-0"
                    onChange={(e) => setTime(e.target.value)}
                  />
                </Form>
                </div>
                <div className="privilege-delete-button">
                  <Button variant="close" onClick={() => setIsCreate(!isCreate)} />
                </div>
            </Card>
          ) : (
            <div className="privilege-button">
              <Button
                variant="outline-gray-500"
                onClick={() => setIsCreate(!isCreate)}
                className="d-inline-flex align-items-center justify-content-center dashed-outline new-card w-100"
              >
                <PlusIcon className="icon icon-xs me-2" /> 特典カード追加
              </Button>
            </div>
          )
        }
      </Container>
    </>
  );
};
