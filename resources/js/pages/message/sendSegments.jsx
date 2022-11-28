import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArchiveIcon, CalendarIcon, ChatIcon, ChevronDownIcon, ClipboardListIcon, CloudUploadIcon, DocumentTextIcon, FireIcon, PlusIcon, PresentationChartBarIcon, ShoppingBagIcon, UsersIcon, HomeIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, Dropdown, Breadcrumb } from 'react-bootstrap';
import { ChoosePhotoWidget, ProfileCardWidget, NotificationsWidget } from "@/components/Widgets";
import { GeneralInfoForm } from "@/components/Forms";
import { Link } from 'react-router-dom';

import { Paths } from "@/paths";
import Profile1 from "@img/img/team/profile-picture-1.jpg";
import Profile3 from "@img/img/team/profile-picture-3.jpg";
import ProfileCover from "@img/img/profile-cover.jpg";


export default () => {
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
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><HomeIcon className="icon icon-xs" /></Breadcrumb.Item>
            <Breadcrumb.Item>メッセージ管理</Breadcrumb.Item>
            <Breadcrumb.Item active>セグメント配信</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-title">セグメント配信</h1>
        </div>
      </div>

      <Row>
        <Col xs={12} xl={12}>
        <div className="btn-group target-count-wrap" role="group" aria-label="Basic radio toggle button group">
          <div className="btn btn-primary d-flex pe-none align-items-center">キーワード選択</div>
            <div className="btn btn-outline-primary pe-none bg-white">該当人数
            <div className="fs-4 people-wrap d-inline"> <span className="people text-primary" id="people">28</span> </div>人 
          </div>
        </div>
        </Col>
        <Col xs={12} xl={8}>
          <GeneralInfoForm />
          <NotificationsWidget />
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12} className="mb-4">
              <ProfileCardWidget
                fullName="Neil Sims"
                picture={Profile1}
                jobTitle="Senior Software Engineer"
                location="New York, USA"
              />
            </Col>
            <Col xs={12}>
              <ChoosePhotoWidget
                title="Select profile photo"
                photo={Profile3}
              />
            </Col>
            <Col xs={12} sm={6} xl={12}>
              <Form {...getRootProps({ className: "dropzone rounded d-flex align-items-center justify-content-center mb-4" })}>
                <Form.Control {...getInputProps()} />
                <div className="dz-default dz-message text-center">
                  <p className="dz-button mb-0">Drop files here to upload</p>
                </div>
              </Form>
              <Row className="dropzone-files">
                {files.map(file => <DropzoneFile key={file.path} {...file} />)}
              </Row>
            </Col>
            <Col xs={12} sm={6} xl={12}>
              <ChoosePhotoWidget
                title="Select cover photo"
                photo={ProfileCover}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
