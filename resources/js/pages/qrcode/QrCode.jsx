import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Col, Row, Card, Form, Image, Button, Dropdown, Breadcrumb } from 'react-bootstrap';
import { ChoosePhotoWidget } from "@/components/Widgets";
import { PaperClipIcon, CheckIcon, HomeIcon, PlusIcon, DownloadIcon, CloudDownloadIcon } from "@heroicons/react/solid";
import { getApiKeys, storeApiKey } from "@/pages/api_key/api/ApiKeyApiMethods";
import { getBasicId } from "@/pages/qrcode/api/BasicIdApiMethods";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import QRCode from "qrcode.react";


export default () => {
  const [basicId, setBasicId] = useState();
  const [uri, setUri] = useState('');
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    getBasicId(setBasicId).then(response => {
      setUri('https://line.me/R/ti/p/' + response);
      setIsRendered(true)
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
                {
                  isRendered ? (
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
                          <Button onClick={() => downloadQR(`add-friend-qr`)} variant="gray-800" className="liff-product-detail-button mt-2">
                            <CloudDownloadIcon className="icon icon-xs me-2" />
                            Download QR
                          </Button>
                        </>
                      }
                    </div>
                  ) : (
                    <ContentLoader
                      height={300}
                      width={352.3}
                      speed={1}
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="60%" height="60%" />
                      <rect x="0" y="200" rx="3" ry="3" width="50%" height="15%" />
                    </ContentLoader>
                  )
                }
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
