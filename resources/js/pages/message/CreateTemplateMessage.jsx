import React, { useState, useEffect } from "react";
import { HomeIcon, PlusIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Col, Row, Modal, Button, Dropdown, Breadcrumb } from 'react-bootstrap';
import { useDropzone } from "react-dropzone";

// forms
import TemplateMessageForm from "@/pages/message/form/TemplateMessageForm";
import MessageEditor from "@/pages/message/MessageEditor";
import { Link } from 'react-router-dom';
import LinePreview from "@/components/line/LinePreview";
import AccordionComponent from "@/components/AccordionComponent";

import { Paths } from "@/paths";

export default () => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: files => setFiles(files.map(file => ({
      ...file,
      preview: URL.createObjectURL(file)
    })))
  });

  const [formValue, setFormValue] = useState(
    {title: ''}
  );

  const [formId, setFormId] = useState();

  const [messageDetailModal, setMessageDetailModal] = useState(false);
  const [previews, setPreviews] = useState([
    {id: 1, key: '', content: '', files:''}
  ]);

  const handlePreviewChange = (e, input, previewIndex, files) => {
    setFormId(e.target.id);

    if (input == 'content') {
      setPreviews(
        previews.map((preview, index) => (index == previewIndex ? { ...preview, content: e.target.value } : preview))
      )
    }
  };

  const handleDelete = (previewIndex) => {
    setPreviews(
      previews.filter((preview, index) => (index !== previewIndex))
    )
  };

  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">メッセージ作成</h1>
        </div>
        <div className="d-flex">
          <Button as={Link} to={Paths.Calendar.path} variant="gray-800" className="me-2">
            保存する
          </Button>
        </div>
      </div>

      <Row>
        <Col xs={12} xl={12}>
          <TemplateMessageForm handleChange={handleChange} formValue={formValue} />
        </Col>
      </Row>
        {
          previews.map((preview, index) => 
            <div key={preview.id} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
              <MessageEditor
                index={index}
                formValue={formValue}
                files={files}
                previews={previews}
                setPreviews={setPreviews}
                setFiles={setFiles} 
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                handleChange={handleChange}
                handlePreviewChange={handlePreviewChange}
                setFormId={setFormId}
                handleDelete={handleDelete}
              />
            </div>
          )
        }
      <div className="d-flex justify-content-flex-end flex-wrap flex-md-nowrap align-items-center">
        <Button onClick={() => setPreviews([...previews, {id: previews.length + 1, key: '', content: '', files: ''}])} variant="gray-800" className="mt-2 animate-up-2">
          <PlusIcon className="icon icon-xs me-2" /> 追加
        </Button>
      </div>
      <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
        <Button href={Paths.TemplateMessages.path} variant="gray-800" className="mt-2 animate-up-2">
          テンプレートリストに戻る
        </Button>
      </div>
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
  );
};
