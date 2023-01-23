import React, { useState } from "react";
import { Col, Row, Form, Button, Breadcrumb, Card, Modal } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import MessageEditor from "@/pages/message/MessageEditor";
import { useDropzone } from "react-dropzone";
import TemplateMessageForm from "@/pages/message/form/TemplateMessageForm";
import { HomeIcon, PlusIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import LinePreview from "@/components/line/LinePreview";
import RichMenuContentCard from "@/pages/richmenu/RichMenuContentCard";
import ChangeTemplateModal from "@/pages/richmenu/ChangeTemplateModal";

export default () => {
  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
  };
  const [formValue, setFormValue] = useState(
    {title: ''}
  );
  const [previews, setPreviews] = useState([
    {id: 1, key: '', content: '', files:''}
  ]);
  const [files, setFiles] = useState([]);

  const handlePreviewChange = (e, input, previewIndex, files) => {
    setFormId(e.target.id);
    if (input == 'content') {
      setPreviews(
        previews.map((preview, index) => (index == previewIndex ? { ...preview, content: e.target.value } : preview))
      )
    }
  };
  const [formId, setFormId] = useState();
  const handleDelete = (previewIndex) => {
    setPreviews(
      previews.filter((preview, index) => (index !== previewIndex))
    )
  };
  const [messageDetailModal, setMessageDetailModal] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);

	return (
		<>
    {
      templateModal && (
        <ChangeTemplateModal 
        show={templateModal}
        templateModal={templateModal}
        setTemplateModal={setTemplateModal}
      />
      )
    }
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">リッチメニュー設定</h1>
        </div>
      </div>
      <Card border="0" className="shadow mb-4">
        <Card.Body>
          <h5 className="mb-4 border-bottom pb-3">基本設定</h5>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>タイトル</Form.Label>
                <Form.Control required type="text" name="titler" value={formValue.title} onChange={(e) => handleChange(e, 'title')} placeholder="" />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <RichMenuContentCard setFiles={setFiles} files={files} templateModal={templateModal} setTemplateModal={setTemplateModal} />
      <div className={`line-preview-sticky-nav ${messageDetailModal ? 'open-content' : 'close-content'}`} >
        <div className='mt-2 line-preview-button' onClick={() => setMessageDetailModal(!messageDetailModal)}>
          {
            messageDetailModal ? <ChevronDownIcon className="icon icon-xs me-2 line-preview-icon" /> : <ChevronUpIcon className="icon icon-xs me-2 line-preview-icon" />
          }
          プレビュー
        </div>
        <div className='line-preview-content'>
          <LinePreview formValue={formValue} files={files} formId={formId} previews={previews} />
        </div>
      </div>
		</>
	)
}