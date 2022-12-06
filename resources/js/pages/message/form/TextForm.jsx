import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';

export default (props) => {
  return (
    <Form.Group className="mb-3">
      <Form.Control as="textarea" rows="5" placeholder="テキストを入力" />
    </Form.Group>
  );
};