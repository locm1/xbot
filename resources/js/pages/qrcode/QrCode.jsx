import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Col, Row, Card, Form, Image, Button, Dropdown, Breadcrumb } from 'react-bootstrap';
import { ChoosePhotoWidget } from "@/components/Widgets";
import { PaperClipIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";

import QrCode from "@img/img/add_friend_qr.png";


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
        </div>
      </div>
      <Row>
        <Col xs={12} sm={6} xl={12}>
          <Card border="0" className="shadow mb-4">
            <Card.Header className="bg-primary text-white px-3 py-2">
              <h5 className="mb-0 fw-bolder">お友達追加用QRコード</h5>
            </Card.Header> 
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <Image fluid rounded src={QrCode} />
                </div>
                <div className="file-field">
                  <div className="d-flex justify-content-xl-center ms-xl-3">
                    <div className="d-flex">
                      <PaperClipIcon className="icon text-gray-500 me-2" />
                      <input type="file" />
                      <div className="d-md-block text-left">
                        <div className="fw-normal text-dark mb-1">Choose Image</div>
                        <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
