import React, { useEffect, useRef } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/solid";
import { Card, Button, Form, Col, Row, Badge } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';

export default (props) => {
  const { name, setName, storeTag, setIsCreate } = props; 

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    storeTag(e);
  };

  const handleCansel = () => {
    setIsCreate(false);
  };

  return (
    <>
      <Card border="bottom" className="hover-state rounded-0 rounded-top py-3" style={{height:'88px'}}>
        <Card.Body className="d-sm-flex align-items-center flex-wrap flex-lg-nowrap py-0">
          <Col xs={12} lg={12} className="px-0 mb-4 mb-md-0">
            <div className="mb-2 d-flex flex-wrap flex-md-nowrap align-items-center">
              <div className="w-50">
                <Form>
                  <Form.Control 
                    required 
                    type="text" 
                    name="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    onKeyDown={(e) => handleKeyDown(e)} 
                    placeholder="タグ名を入力してください" 
                    autoFocus
                  />
                </Form>
              </div>
              <div className="ms-3">
                <Button
                  variant="success"
                  size="sm"
                  className="d-inline-flex align-items-center"
                  onClick={(e) => storeTag(e)}
                >
                  保存する
                </Button>
              </div>
              <div className="ms-2">
                <Button
                  variant="gray-800"
                  size="sm"
                  className="d-inline-flex align-items-center"
                  onClick={handleCansel}
                >
                  キャンセル
                </Button>
              </div>
            </div>
          </Col>
        </Card.Body>
      </Card>
    </>
  );
};