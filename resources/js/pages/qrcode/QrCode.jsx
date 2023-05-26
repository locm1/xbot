import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Col, Row, Card, Form, Image, Button, Dropdown, Breadcrumb } from 'react-bootstrap';
import { ChoosePhotoWidget } from "@/components/Widgets";
import { PaperClipIcon, CheckIcon, HomeIcon, PlusIcon, DownloadIcon, CogIcon } from "@heroicons/react/solid";
import { getApiKeys, storeApiKey } from "@/pages/api_key/api/ApiKeyApiMethods";

import QRCode from "qrcode.react";


export default () => {
  const [files, setFiles] = useState([]);
  const [uri, setUri] = useState('');
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: files => setFiles(files.map(file => ({
      ...file,
      preview: URL.createObjectURL(file)
    })))
  });

  useEffect(() => {
    getApiKeys().then((response) => {
      if (response.data.LIFF_CHANNEL_ID) {
        setUri('https://line.me/R/ti/p/' + response.data.LIFF_CHANNEL_ID);
      } else {
        setUri('');
      }
    })
  }, [])
  const downloadQR = (id) => {
    const canvas = document.getElementById(id);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${id}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
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
                  {uri &&
                    <>
                      <QRCode
                        id={`add-friend-qr`}
                        value={uri}
                        size={200}
                        level={"L"}
                        includeMargin={false}
                      />
                      <a className="d-block" onClick={() => downloadQR(`add-friend-qr`)}>
                        <DownloadIcon className="icon icon-xs me-2" />
                        <span>Download QR</span>
                      </a>
                    </>
                  }
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
