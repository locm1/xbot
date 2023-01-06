import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Col, Row, Form } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';

export default (props) => {
  const { visitTimes, id, products, privilegeLists, setPrivilegeLists } = props; 
  const [time, setTime] = useState(visitTimes);
  const [name, setName] = useState("");
  const [privileges, setPrivileges] = useState(products);

  const handleChange = (e, id) => {
    const changePrivileges = {
      "id": id,
      "name": e.target.value,
    };
    setPrivileges(
      privileges.map((privilege) => (privilege.id === id ? changePrivileges : privilege))
    );
  };

  const addPrivilege = () => {
    if (privileges === undefined) {
      setPrivileges([{id: 1, name: name}]);
    } else {
      const newPrivileges = {
        "id": privileges.length + 1,
        "name": name,
      };
      setPrivileges([...privileges, newPrivileges]);
    }
  };

  const deletePrivilege = (id) => {
    setPrivileges(
      privileges.filter((privilege, index) => (privilege.id !== id))
    );
  };
  
  const deleteTagsCard = (id) => {
    setPrivilegeLists(
      privilegeLists.filter((privilege, index) => (privilege.id !== id))
    );
  };

  const visitTimesChange = (e, id) => {
    const newVisitTimes = {
      "id": id,
      "visitTimes": e.target.value,
      "products": []
    }
    setPrivilegeLists(
      privilegeLists.map((privilege) => (privilege.id === id ? newVisitTimes : privilege))
    );
  };

  return (
    <>
      <Card border={1} className="p-4 privilege-card-item">
      <Card.Header className="d-flex align-items-center justify-content-start border-0 p-0 mb-3 border-bottom pb-3">
        <h5 className="mb-0">ユーザータグ</h5>
      </Card.Header>
      <Card.Body className="p-0">
        <Row className="mb-4 mb-lg-0 mt-4">
          {privileges && privileges.map((privilege, index) => (
            <Col xs={12} key={`kanban-comment-${privilege.id}`} className="mb-4">
              <div className="bg-gray-50 border border-gray-100 rounded p-3">
                <div className="d-flex align-items-center mb-2">
                  <h3 className="fs-6 mb-0 me-3">
                    タグ{index + 1}
                  </h3>
                  <div className="privilege-delete-button" onClick={() => deletePrivilege(privilege.id)}>
                    <MinusIcon className="icon icon-xs" />
                  </div>
                </div>
                <Form.Control required type="text" className="text-dark mb-1 w-50" value={privilege.name} onChange={(e) => handleChange(e, privilege.id)} />
              </div>
            </Col>
          ))}
        </Row>
        <div>
          <Button
            variant="outline-gray-500"
            onClick={addPrivilege}
            className="d-inline-flex align-items-center justify-content-center dashed-outline new-card w-100"
          >
            <PlusIcon className="icon icon-xs me-2" /> タグカード追加
          </Button>
        </div>
        <div className="mt-3 d-flex flex-row-reverse">
          <Button as={Link} variant="gray-800" className="me-2">
            更新する
          </Button>
        </div>
      </Card.Body>
    </Card>
    </>
  );
};