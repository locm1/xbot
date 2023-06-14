import React, { useState } from "react";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";

export default (props) => {
  const { id, isCreate, setIsCreate, storePrivilegeItem, privilegeItems, setPrivilegeItems } = props;
  const [name, setName] = useState("");
  const [error, setError] = useState({
    name: ''
  });

  const handleKeyDown = (e) => {
    e.preventDefault();
    storePrivilegeItem(id, name, privilegeItems, setPrivilegeItems, setIsCreate, setError);
  };

  const handleChange = (e) => {
    setName(e.target.value);
    setError({ ...error, name: '' })
  };

  return (
    <Card border="bottom" className="hover-state rounded-0 py-3" style={{height:'88px'}}>
      <Card.Body className="d-sm-flex align-items-center flex-wrap flex-lg-nowrap py-0">
        <Col xs={12} lg={12} className="px-0 mb-4 mb-md-0">
          <div className="mb-2 d-flex flex-wrap flex-md-nowrap align-items-center">
            <div className="w-50">
              <Form.Control 
                required 
                type="text" 
                name="name" 
                value={name} 
                onChange={(e) => handleChange(e)} 
                placeholder="特典名を入力してください" 
                autoFocus
                isInvalid={!!error.name}
              />
              {
                error.name && 
                  <Form.Control.Feedback type="invalid">{error.name[0]}</Form.Control.Feedback>
              }
            </div>
            {
              error.name ? (
                <div className="pb-4 d-inline-flex align-items-center">
                <div className="ms-3">
                  <Button
                    variant="success"
                    size="sm"
                    className="d-inline-flex align-items-center"
                    onClick={(e) => handleKeyDown(e)}
                  >
                    保存する
                  </Button>
                </div>
                <div className="ms-2">
                  <Button
                    variant="gray-800"
                    size="sm"
                    className="d-inline-flex align-items-center"
                    onClick={() => setIsCreate(!isCreate)}
                  >
                    キャンセル
                  </Button>
                </div>
                </div>
              ) : (
                <>
                <div className="ms-3">
                  <Button
                    variant="success"
                    size="sm"
                    className="d-inline-flex align-items-center"
                    onClick={(e) => handleKeyDown(e)}
                  >
                    保存する
                  </Button>
                </div>
                <div className="ms-2">
                  <Button
                    variant="gray-800"
                    size="sm"
                    className="d-inline-flex align-items-center"
                    onClick={() => setIsCreate(!isCreate)}
                  >
                    キャンセル
                  </Button>
                </div>
                </>
              )
            }
          </div>
        </Col>
      </Card.Body>
    </Card>
  );
};