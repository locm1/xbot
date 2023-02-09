
import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';

import QuestionnaireFormItem from "./QuestionnaireFormItem";

export const DropFilesForm = (props) => {
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


export const QuestionnaireForm = (props) => {
  const [birthday, setBirthday] = useState("");
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState([]);
  useEffect(() => {
    axios.get(`/api/v1/management/users/${props.userId}/questionnaire`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        setQuestionnaireAnswers(res.data.questionnaireAnswers);
      }
    });
  }, []);

  return (
    <Card border="0" className="shadow mb-4">
      <Card.Body>
        <h5 className="mb-4 border-bottom pb-3">アンケート</h5>
        <Form>
          <Row>
            {questionnaireAnswers.map((v, k) => (
              <QuestionnaireFormItem key={`questionnaireFormItem-${k}`} {...v} />
            ))}
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};