
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { BarChartWidget, RatingsWidget, CardWidget, ListChartWidget } from "@/components/Widgets";
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


export const PurchaseTimeForm = () => {

  return (
    <Card border="0" className="shadow mb-4">
      <Card.Body>
        <h5 className="mb-4">来店 / ポイント / 購入回数</h5>
        <Form>
          <Row>
            <Col md={4} className="mb-3">
              <CardWidget title="来店回数" value="0"/>
            </Col>
            <Col md={4} className="mb-3">
              <CardWidget title="ポイント" value="0"/>
            </Col>
            <Col md={4} className="mb-3">
              <CardWidget title="購入回数" value="0"/>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};