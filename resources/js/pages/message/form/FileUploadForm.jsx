import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon, XIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';

export default (props) => {
  const DropzoneFile = (props) => {
    const { preview, setFiles } = props;

    return (
      <Col xs={6} className="dropzone-preview line-preview-image-wrap">
        <div className="line-preview-image d-flex">
          <Image src={preview} className="dropzone-image" />
          <Button variant="gray-800" className="line-preview-image-button" onClick={() => setFiles([])}>
            <XIcon className="icon icon-sm line-preview-image-icon" />
          </Button>  
        </div>
      </Col>
    );
  };
  return (
    <>
      {props.files.length == 0 ? (
        <Form {...props.getRootProps({ className: "dropzone rounded d-flex align-items-center justify-content-center mb-4" })}>
          <Form.Control {...props.getInputProps()} />
            <div className="dz-default dz-message text-center">
              <p className="dz-button mb-0">画像をアップロード</p>
            </div>
        </Form>
      ) : (
        ''
      )} 
      <Row className="dropzone-files">
        {props.files.map(file => <DropzoneFile key={file.path} {...file} />)}
      </Row>
    </>
  );
};