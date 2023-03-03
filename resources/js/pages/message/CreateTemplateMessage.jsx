import React, { useState, useEffect } from "react";
import { HomeIcon, PlusIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Col, Row, Modal, Button, Dropdown, Breadcrumb } from 'react-bootstrap';
import { useDropzone } from "react-dropzone";

// forms
import TemplateMessageForm from "@/pages/message/form/TemplateMessageForm";
import MessageEditor from "@/pages/message/MessageEditor";
import { Link, useParams, useLocation } from 'react-router-dom';
import LinePreview from "@/components/line/LinePreview";
import { Paths } from "@/paths";
import { showMessage } from "@/pages/message/api/MessageApiMethods";
import { getMessageItems } from "@/pages/message/api/MessageItemApiMethods";

export default () => {
  const { id } = useParams();
  const pathname = useLocation().pathname;
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState({
    id: 1, title: '', is_undisclosed: 0
  });
  const [messageItems, setMessageItems] = useState([
    {id: 1, text: '', image_path: '', video_path: ''}
  ]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: files => setFiles(files.map(file => ({
      ...file,
      preview: URL.createObjectURL(file)
    })))
  });

  const handleChange = (e, input) => {
    setMessage({...message, [input]: e.target.value})
  };

  const [formId, setFormId] = useState();

  const [messageDetailModal, setMessageDetailModal] = useState(false);
  const [previews, setPreviews] = useState([
    {id: 1, key: '', content: '', files:''}
  ]);

  const handlePreviewChange = (e, input, previewIndex, files) => {
    setFormId(e.target.id);

    if (input == 'text') {
      setMessageItems(
        messageItems.map((messageItem, index) => (index == previewIndex ? { ...messageItem, text: e.target.value } : messageItem))
      )
    }
  };

  const handleDelete = (previewIndex) => {
    setPreviews(
      previews.filter((preview, index) => (index !== previewIndex))
    )
  };

  useEffect(() => {
    if (pathname.includes('/edit')) {
      showMessage(id, setMessage)
      getMessageItems(id, setMessageItems)
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">メッセージ作成</h1>
        </div>
        <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
          <Button as={Link} to={Paths.Calendar.path} variant="primary" className="me-2 mt-2">
            保存する
          </Button>
          <Button href={Paths.TemplateMessages.path} variant="gray-800" className="mt-2 animate-up-2">
            テンプレートリストに戻る
          </Button>
      </div>
      </div>

      <Row>
        <Col xs={12} xl={12}>
          <TemplateMessageForm handleChange={handleChange} message={message} />
        </Col>
      </Row>
      {
        messageItems.map((messageItem, index) => 
          <div key={messageItem.id} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
            <MessageEditor
              index={index}
              message={message}
              files={files}
              previews={messageItems}
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
      <div className={`line-preview-sticky-nav ${messageDetailModal ? 'open-content' : 'close-content'}`} >
        <div className='mt-2 line-preview-button' onClick={() => setMessageDetailModal(!messageDetailModal)}>
          {
            messageDetailModal ? <ChevronDownIcon className="icon icon-xs me-2 line-preview-icon" /> : <ChevronUpIcon className="icon icon-xs me-2 line-preview-icon" />
          }
          プレビュー
        </div>
        <div className='line-preview-content'>
          <LinePreview formValue={message} files={files} formId={formId} previews={messageItems} />
        </div>
      </div>
    </>
  );
};
