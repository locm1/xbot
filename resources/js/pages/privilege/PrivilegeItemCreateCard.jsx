import React, { useState } from "react";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";

export default (props) => {
  const { id, isCreate, setIsCreate, storePrivilegeItem, privilegeItems, setPrivilegeItems } = props;
  const [name, setName] = useState("");

  const handleKeyDown = (e) => {
    e.preventDefault();
    storePrivilegeItem(id, name, privilegeItems, setPrivilegeItems, setIsCreate,);
  };

  return (
    <Form onSubmit={handleKeyDown}>
      <InputGroup className="my-3">
        <Form.Control
          required
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="特典名を入力してください"
          autoFocus={true}
        />
        <Button type="submit" variant="success" id="button-addon2">
          保存する
        </Button>
      </InputGroup>
    </Form>
  );
};