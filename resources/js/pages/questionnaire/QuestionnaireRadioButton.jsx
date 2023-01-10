import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Col, Row, Form } from "react-bootstrap";

export default (props) => {
  const { label } = props;

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="position-absolute questionnaire-radio-button"></div>
        <Form.Check
          type="radio"
          id="radio"
          htmlFor="radio"
        />
        <div className="ps-3">
          <Form.Control required type="text" className="text-dark mb-1 w-100" placeholder="選択肢" />  
        </div>
      </div>
    </>
  );
};