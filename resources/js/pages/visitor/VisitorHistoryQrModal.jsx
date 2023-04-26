
import React, { useState, useLayoutEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { CalendarIcon,} from "@heroicons/react/solid";
import { Col, Row, Form, Modal, Button, InputGroup, Alert,} from 'react-bootstrap';
import { CirclePicker } from 'react-color';
import QRCode from "qrcode.react";
import "flatpickr/dist/flatpickr.css";
import 'flatpickr/dist/l10n/ja.js';

export default (props) => {
  const { show, onHide } = props
  const [liffId, setLiffId] = useState('');

  const downloadQrCode = () => {
    const qrCode = document.getElementById('visitor-history-qr-code');
    qrCode.toBlob((blob) => {
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      downloadLink.download = 'visitor_qr_code.png';
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.click()
    }, 'image/png')
  }

  useLayoutEffect(() => {
    axios.get('/api/v1/get-liff-id')
    .then((response) => {
      setLiffId(response.data)
    })
    .catch((error) => {
      console.error(error);
    })
  }, []);

  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={onHide} enforceFocus={false}>
      <Form className="modal-content">
        <Modal.Header className="pb-0 border-0">
          <h5 className="fw-normal">設置用QRコード</h5>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <QRCode
              id="visitor-history-qr-code"
              value={`https://liff.line.me/${liffId}/liff/?path=visitor-histories/add`}
              size={300}
              level={"L"}
              includeMargin={false}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="me-2" onClick={downloadQrCode}>
            ダウンロード
          </Button>
          <Button onClick={onHide} variant="link" className="text-gray ms-auto">
            閉じる
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
