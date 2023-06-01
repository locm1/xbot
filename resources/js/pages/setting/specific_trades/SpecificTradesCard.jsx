import React, { useEffect } from "react";
import { ClockIcon, MinusIcon, PencilAltIcon, CheckCircleIcon, DotsHorizontalIcon, TrashIcon, UserIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Modal, Button, InputGroup, Image, Badge, FloatingLabel } from 'react-bootstrap';

import { Link } from "react-router-dom";
import { Paths } from "@/paths";

export default (props) => {
  const { 
    display_id, title, content, handleChange, deleteSpecificTrades, 
    textAreaRef, invisibleTextAreaRef, height, setHeight 
  } = props;

  const textRowCount = content ? content.split('\n').length : 0;
  const rows = textRowCount + 1;

  return (
    <>
    <div className="border-bottom py-4">
      <div className="wrapper d-flex flex-wrap flex-md-nowrap align-items-center">
        <div className="cell-left">
          <Form.Control
            required
            autoFocus
            type="text"
            value={title}
            onChange={(e) => handleChange(e, 'title', display_id)}
          />
        </div>
        <div className="ms-4 cell-center">
          <Form.Control
            required
            autoFocus
            multiple
            as="textarea"
            rows={rows}
            value={content}
            onChange={(e) => handleChange(e, 'content', display_id)}
          />
        </div>
        <div className="ms-4 cell-right">
          <Button onClick={() => deleteSpecificTrades(display_id)} variant="danger" size="sm" className="d-inline-flex align-items-center">
            削除する
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};