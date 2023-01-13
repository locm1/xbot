import React, { useState, useEffect } from "react";
import { HomeIcon, PlusIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Col, Row, Modal, Button, Dropdown, Breadcrumb } from 'react-bootstrap';
import { CustomersWidget, RevenueWidget, UsersWidget, WeeklyReportWidget, TopAuthorsWidget, TeamMembersWidget, ProgressTrackWidget, EventsWidget, RankingWidget, VisitsMapWidget, SalesValueWidget, AcquisitionWidget, TimelineWidget } from "@/components/Widgets";
import { useDropzone } from "react-dropzone";

// forms
import TemplateMessageForm from "@/pages/message/form/TemplateMessageForm";
import MessageEditor from "@/pages/message/MessageEditor";
import { Link, useHistory } from 'react-router-dom';
import LinePreview from "@/components/line/LinePreview";
import { TargetUsersWidget } from "@/pages/message/detail/TargetUsersWidget";
import { SendHistoryInfoWidget } from "@/pages/message/detail/SendHistoryInfoWidget";

import { Paths } from "@/paths";

export default (props) => {
  const [files, setFiles] = useState([]);
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
          <h1 className="page-title">配信情報詳細</h1>
        </div>
        <div className="d-flex">
          <Button as={Link} to={Paths.SendHistories.path} variant="gray-800" className="me-2">
            配信管理に戻る
          </Button>
        </div>
      </div>

      <Row>
        <Col xs={12} md={6} xxl={6} className="mb-4">
          <SendHistoryInfoWidget title="配信情報" />
        </Col>
        <Col xs={12} md={6} xxl={6} className="mb-4">
          <TargetUsersWidget title="対象ユーザー" />
        </Col>
      </Row>
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
