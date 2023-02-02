




import React, { useState } from "react";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";

export default (props) => {
  const { id, isCreate, setIsCreate, storePrivilegeItem, privilegeItems, setPrivilegeItems } = props; 
  const [name, setName] = useState("");

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    e.preventDefault();
    storePrivilegeItem(id, name, privilegeItems, setPrivilegeItems, setIsCreate, );
  };

  return (
    <>
      <Card.Body className="d-sm-flex align-items-center flex-wrap flex-lg-nowrap py-0">
        <Col xs={1} className="text-left text-sm-center mb-2 mb-sm-0">
          <div className="d-block d-sm-flex">
            <div className="ms-sm-3">
              <Badge bg="tertiary" className="super-badge">特典</Badge>
            </div>
          </div>
        </Col>
        <Col xs={11} lg={12} className="px-0 mb-4 mb-md-0">
          <div className="mb-2 w-50">
            <Form>
              <Form.Control 
                required 
                type="text" 
                name="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                onKeyDown={(e) => handleKeyDown(e)} 
                onBlur={() => setIsCreate(!isCreate)}
                placeholder="特典名を入力してください" 
                autoFocus={true} 
              />
            </Form>
          </div>
        </Col>
      </Card.Body>
    </>
  );
};