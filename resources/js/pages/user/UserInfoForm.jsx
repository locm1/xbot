
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


export const UserInfoForm = () => {
  const [birthday, setBirthday] = useState("");
  const areas = [
    '中央区', '北区', '東区', '白石区', '厚別区', '豊平区', 
    '清田区', '南区', '西区', '手稲区', '札幌市以外', '道外'
  ];
  const occupations = ['会社員', '公務員', '自営業', '会社役員', '自由業', '専業主婦(夫)', '学生', 'パート・アルバイト', '無職'];

  return (
    <Card border="0" className="shadow mb-4">
      <Card.Body>
        <h5 className="mb-4">お客様情報</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>氏名</Form.Label>
                <Form.Control required type="text" placeholder="" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>ふりがな</Form.Label>
                <Form.Control required type="text" placeholder="" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>生年月日</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <CalendarIcon className="icon icon-xs" />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={birthday ? moment(birthday).format("DD/MM/YYYY") : ""}
                        placeholder="dd/mm/yyyy"
                        onFocus={openCalendar}
                        onChange={() => { }} />
                    </InputGroup>
                  )} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>性別</Form.Label>
                <Form.Select defaultValue="0" className="mb-0">
                  <option value="1">男性</option>
                  <option value="2">女性</option>
                  <option value="3">その他</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-3">
              <Form.Group id="email">
                <Form.Label>お住まいエリア</Form.Label>
                <Form.Select defaultValue="0" className="mb-0">
                  {
                    areas.map((area, index) => <option value={index + 1}>{area}</option>)
                  }
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>電話番号</Form.Label>
                <Form.Control required type="tel" placeholder="" />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>ご職業</Form.Label>
                <Form.Select defaultValue="0" className="mb-0">
                  {
                    occupations.map((occupation, index) => <option value={index + 1}>{occupation}</option>)
                  }
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          {/* <div className="mt-3">
            <Button variant="gray-800" type="submit" className="mt-2 animate-up-2">
              Save All
            </Button>
          </div> */}
        </Form>
      </Card.Body>
    </Card>
  );
};