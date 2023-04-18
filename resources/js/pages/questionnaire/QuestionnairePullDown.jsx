import React, { useState, useRef, useEffect, createRef } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Col, Row, Form } from "react-bootstrap";

export default (props) => {
  const { items, addItem, editItem, deleteItem } = props;

  return (
    <>
      {items && items.map((item, index) => (
        <div key={`choice-name-${item.id}`}>
          <div className="privilege-delete-button" onClick={() => (deleteItem(item.id))}>
            <MinusIcon className="icon icon-xs" />
          </div>
          <div className="d-flex align-items-center mb-2">
            <div className="position-absolute questionnaire-radio-button"></div>
            <div>{index + 1}</div>
            <div className="ps-3">
              <Form.Control required type="text" value={item.name} onChange={(e) => editItem(e, item.id)} className="text-dark mb-1 w-100" placeholder="選択肢" />  
            </div>
          </div>
        </div>
      ))}
      <div className="d-flex align-items-center questionnaire-add">
        <div className="position-absolute questionnaire-radio-button"></div>
        <div>{items.length + 1}</div>
        <div className="ps-3">
          <div className="questionnaire-add-button position-absolute" onClick={addItem}></div>
          <div className="text-black-50">項目を追加</div>
        </div>
      </div>
    </>
  );
};