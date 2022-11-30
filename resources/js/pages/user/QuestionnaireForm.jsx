
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';

export const DropFilesForm = () => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: files => setFiles(files.map(file => ({
      ...file,
      preview: URL.createObjectURL(file)
    })))
  });

  const DropzoneFile = (props) => {
    const { path, preview } = props;

    return (
      <Col xs={6} className="dropzone-preview">
        <Image src={preview} className="dropzone-image" />
        <Card.Text className="dropzone-filename">
          {path}
        </Card.Text>
      </Col>
    );
  };

  return (
    <>
      <Form {...getRootProps({ className: "dropzone rounded d-flex align-items-center justify-content-center mb-4" })}>
        <Form.Control {...getInputProps()} />
        <div className="dz-default dz-message text-center">
          <p className="dz-button mb-0">Drop files here to upload</p>
        </div>
      </Form>
      <Row className="dropzone-files">
        {files.map(file => <DropzoneFile key={file.path} {...file} />)}
      </Row>
    </>
  );
};


export const QuestionnaireForm = () => {
  const [birthday, setBirthday] = useState("");

  return (
    <Card border="0" className="shadow mb-4">
      <Card.Body>
        <h5 className="mb-4">アンケート</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>選択回答式でのアンケート</Form.Label>
                <Row>
                  <Col md={3} xs={6}>
                    <Form.Check type="radio" name="radio" label="項目1" id="radio1" htmlFor="radio1" />
                  </Col>
                  <Col md={3} xs={6}>
                    <Form.Check type="radio" name="radio" label="項目2" id="radio2" htmlFor="radio2" />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>選択回答式でのアンケート</Form.Label>
                <Row>
                  <Col md={3}>
                    <Form.Check label="項目1" id="checkbox1" htmlFor="checkbox1" />
                  </Col>
                  <Col md={3}>
                    <Form.Check label="項目1" id="checkbox1" htmlFor="checkbox1" />
                  </Col>
                  <Col md={3}>
                    <Form.Check label="項目1" id="checkbox1" htmlFor="checkbox1" />
                  </Col>
                  <Col md={3}>
                    <Form.Check label="項目1" id="checkbox1" htmlFor="checkbox1" />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={12} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>フリー回答式のアンケート</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};