
import React, { useState } from "react";
import Select from "react-select";
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


export const TagForm = () => {
  const [birthday, setBirthday] = useState("");

  const selectOptions = [
    { value: 1, label: '管理者' },
    { value: 2, label: '肉好き' },
    { value: 3, label: 'お得意様' },
    { value: 4, label: 'トラブル' },
    { value: 5, label: 'テスト' },
  ];

  return (
    <Card border="0" className="shadow mb-4">
      <Card.Body>
        <h5 className="mb-4 border-bottom pb-3">タグ</h5>
        <Form>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="firstName">
                <Select options={selectOptions} name="tags" isMulti isSearchable menuPosition={'fixed'} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};