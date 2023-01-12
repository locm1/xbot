import React, { useState, useRef, useEffect, createRef } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Col, Row, Form } from "react-bootstrap";

export default (props) => {
  const { label } = props;
  const [name, setName] = useState("");
  const [choiceNames, setChoiceName] = useState([
    {
      "id": 1,
      "name": name,
    },
  ]);

  const addChoiceName = () => {
    const id = (choiceNames.length === 0) ? 1 : choiceNames.slice(-1)[0].id + 1;
    const newChoiceName = {
      "id": id,
      "name": '',
    }
    setChoiceName([...choiceNames, newChoiceName]);
  }

  const deleteChoiceName = (id) => {
    setChoiceName(choiceNames.filter((choiceName) => (choiceName.id !== id)));
  }

  return (
    <>
      {choiceNames && choiceNames.map((choiceName, index) => (
        <div key={`choice-name-${choiceName.id}`}>
          <div className="privilege-delete-button" onClick={() => (deleteChoiceName(choiceName.id))}>
            <MinusIcon className="icon icon-xs" />
          </div>
          <div className="d-flex align-items-center mb-2">
            <div className="position-absolute questionnaire-radio-button"></div>
            <Form.Check
              type="radio"
              id="radio"
              htmlFor="radio"
            />
            <div className="ps-3">
              <Form.Control required type="text" className="text-dark mb-1 w-100" placeholder="選択肢" autoFocus />  
            </div>
          </div>
        </div>
      ))}
      <div className="d-flex align-items-center questionnaire-add">
        <div className="position-absolute questionnaire-radio-button"></div>
        <Form.Check
          type="radio"
          id="radio"
          htmlFor="radio"
        />
        <div className="ps-3">
          <div className="questionnaire-add-button position-absolute" onClick={addChoiceName}></div>
          <div className="text-black-50">項目を追加</div>
        </div>
      </div>
    </>
  );
};