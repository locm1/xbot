import React, { useState, useEffect } from "react";
import { HomeIcon, PlusIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Col, Row, Modal, Button, Dropdown, Breadcrumb } from 'react-bootstrap';
import { useDropzone } from "react-dropzone";

import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import LinePreview from "@/components/line/LinePreview";
import { TargetUsersWidget } from "@/pages/message/detail/TargetUsersWidget";
import { SendHistoryInfoWidget } from "@/pages/message/detail/SendHistoryInfoWidget";
import { showSendMessage } from "@/pages/message/api/SendMessageApiMethods";
import { getSegmentTemplates } from "@/pages/message/api/SegmentTemplateApiMethods";

import { Paths } from "@/paths";

export default (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [sendMessage, setSendMessage] = useState({
    message: {title: ''}, send_message_users: [], search_json: {}
  });
  const [segmentTemplate, setSegmentTemplate] = useState([]);

  const searchSegment = () => {
    history.push({
      pathname: Paths.SendSegments.path,
      state: {segmentTemplate: segmentTemplate}
    });
  }

  useEffect(() => {
    showSendMessage(id, setSendMessage).then(response => {
      console.log(JSON.parse(response.search_json));
      setSegmentTemplate(JSON.parse(response.search_json))
    })
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">配信情報詳細</h1>
        </div>
        <div className="d-flex">
          <Button as={Link} to={Paths.SendHistories.path} variant="gray-800" className="me-2">
            配信履歴に戻る
          </Button>
          <Button onClick={searchSegment} variant="info" className="me-2">
            同じセグメント条件で検索する
          </Button>
        </div>
      </div>

      <Row>
        <Col xs={12} md={8} className="mb-4">
          <SendHistoryInfoWidget title="配信情報" {...sendMessage} />
        </Col>
        <Col xs={12} md={4} className="mb-4">
          <TargetUsersWidget title="対象ユーザー" users={sendMessage.send_message_users} />
        </Col>
      </Row>
      {/* <div className={`line-preview-sticky-nav ${messageDetailModal ? 'open-content' : 'close-content'}`} >
        <div className='mt-2 line-preview-button' onClick={() => setMessageDetailModal(!messageDetailModal)}>
          {
            messageDetailModal ? <ChevronDownIcon className="icon icon-xs me-2 line-preview-icon" /> : <ChevronUpIcon className="icon icon-xs me-2 line-preview-icon" />
          }
          プレビュー
        </div>
        <div className='line-preview-content'>
          <LinePreview formValue={formValue} files={files} formId={formId} previews={previews} />
        </div>
      </div> */}
    </>
  );
};
