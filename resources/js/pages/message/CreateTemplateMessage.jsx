import React, { useState, useEffect } from "react";
import { HomeIcon, PlusIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Col, Row, Modal, Button, Dropdown, Breadcrumb } from 'react-bootstrap';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

// forms
import TemplateMessageForm from "@/pages/message/form/TemplateMessageForm";
import MessageEditor from "@/pages/message/MessageEditor";
import { Link, useParams, useLocation } from 'react-router-dom';
import LinePreview from "@/components/line/LinePreview";
import { Paths } from "@/paths";
import { showMessage, updateMessage, storeMessage } from "@/pages/message/api/MessageApiMethods";
import { getMessageItems, updateMessageItems, deleteMessageItem, storeMessageItems } from "@/pages/message/api/MessageItemApiMethods";

export default () => {
  const { id } = useParams();
  const pathname = useLocation().pathname;
  const [message, setMessage] = useState({
    id: 1, title: '', is_undisclosed: 0
  });
  const [messageItems, setMessageItems] = useState([
    {id: 1, type: 1, text: '', image_path: null, video_path: null}
  ]);
  const [updateImages, setUpdateImages] = useState([]);
  const [updateImageIds, setUpdateImageIds] = useState([]);
  const [updateVideos, setUpdateVideos] = useState([]);
  const [updateVideoIds, setUpdateVideoIds] = useState([]);
  const [deleteMessageItems, setDeleteMessageItems] = useState([]);
  const [isUndisclosed, setIsUndisclosed] = useState(false);

  const handleChange = (e, input) => {
    setMessage({...message, [input]: e.target.value})
  };

  const [messageDetailModal, setMessageDetailModal] = useState(false);

  const handlePreviewChange = (e, input, id) => {
    const currentMessageItem = messageItems.filter(messageItem => (messageItem.id === id))[0]

    if (input == 'text') {
      currentMessageItem.type = 1
      currentMessageItem.image_path = null
      currentMessageItem.video_path = null
      currentMessageItem.text = e.target.value
      setMessageItems(messageItems.map((messageItem) => (messageItem.id === id ? currentMessageItem : messageItem)));
    } else if (input == 'file') {
      currentMessageItem.type = 2
      currentMessageItem.text = ''
      currentMessageItem.video_path = null
      currentMessageItem.image_file = e.target.files[0]
      setUpdateImages([...updateImages, e.target.files[0]])
      setUpdateImageIds([...updateImageIds, currentMessageItem.id])
      
      const reader = new FileReader()
      reader.onload = (e) => {
        currentMessageItem.image_path = e.target.result
        setMessageItems(messageItems.map((messageItem) => (messageItem.id === id ? currentMessageItem : messageItem)));
      }
      reader.readAsDataURL(e.target.files[0])
    } else if (input == 'video') {
      currentMessageItem.type = 3
      currentMessageItem.text = ''
      currentMessageItem.image_path = null
      currentMessageItem.video_file = e.target.files[0]
      setUpdateVideos([...updateVideos, e.target.files[0]])
      setUpdateVideoIds([...updateVideoIds, currentMessageItem.id])

      currentMessageItem.video_path = URL.createObjectURL(e.target.files[0])
      setMessageItems(messageItems.map((messageItem) => (messageItem.id === id ? currentMessageItem : messageItem)));
    }
  }

  const handlePictureImageDelete = (id, type) => {
    const currentMessageItem = messageItems.filter(messageItem => (messageItem.id === id))[0]

    if (type == 2) {
      currentMessageItem.current_image_path = currentMessageItem.image_path
      currentMessageItem.image_path = null
    } else if (type == 3) {
      currentMessageItem.current_video_path = currentMessageItem.video_path
      currentMessageItem.video_path = null
    }
    setMessageItems(messageItems.map((messageItem) => (messageItem.id === id ? currentMessageItem : messageItem)));
  }

  const handleDelete = (id) => {
    const currentMessageItem = messageItems.filter(messageItem => (messageItem.id === id))[0]
    setMessageItems(
      messageItems.filter((messageItem) => (messageItem.id !== id))
    )
    setDeleteMessageItems([...deleteMessageItems, currentMessageItem])
  };

  const addEditCard = () => {
    const lastMessageItem = messageItems.slice(-1)[0]
    setMessageItems([...messageItems, {id: lastMessageItem.id + 1, type: 1, text: '', image_path: null, video_path: null}])
  };

  const onSaveMessage = () => {
    if (pathname.includes('/edit')) {
      message.is_undisclosed = isUndisclosed ? 1 : 0
      updateMessage(id, message, completeMessage)

      const formData = new FormData();
      formData.append("message_items", JSON.stringify(messageItems));
      updateImages.forEach((updateImage) => formData.append("images[]", updateImage));
      updateImageIds.forEach((updateImageId) => formData.append("image_ids[]", updateImageId));
      updateVideos.forEach((updateVideo) => formData.append("videos[]", updateVideo));
      updateVideoIds.forEach((updateVideoId) => formData.append("video_ids[]", updateVideoId));
      updateMessageItems(id, formData)

      // 画像削除stateに値があればAPI発火
      if (deleteMessageItems.length > 0) {
        const params = {
          ids: deleteMessageItems.map(deleteMessageItem => deleteMessageItem.id),
        }
        deleteMessageItem(id, params)
      }
    } else {
      saveMessage()
    }
  };

  const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary me-3',
      cancelButton: 'btn btn-gray'
    },
    buttonsStyling: false
  }));

  const duplicateTemplate = async () => {
    const textMessage = "このテンプレートを複製しますか？";

    const result = await SwalWithBootstrapButtons.fire({
      icon: "question",
      title: "複製確認",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "OK!",
      cancelButtonText: "キャンセル"
    });

    if (result.isConfirmed) {
      delete message.id
      delete message.created_at
      delete message.updated_at
      delete message.deleted_at
      saveMessage()
    }
  }


  const saveMessage = () => {
    message.is_undisclosed = isUndisclosed ? 1 : 0

    const formData = new FormData();
    formData.append("message_items", JSON.stringify(messageItems));
    updateImages.forEach((updateImage) => formData.append("images[]", updateImage));
    updateImageIds.forEach((updateImageId) => formData.append("image_ids[]", updateImageId));
    updateVideos.forEach((updateVideo) => formData.append("videos[]", updateVideo));
    updateVideoIds.forEach((updateVideoId) => formData.append("video_ids[]", updateVideoId));
    storeMessage(message, formData, storeMessageItems, completeMessage)
  } 

  const completeMessage = (message) => {
    Swal.fire(
      `${message}完了`,
      `メッセージテンプレート情報の${message}に成功しました`,
      'success'
    )
    setTimeout(() => location.reload(), 1000)
  } 

  useEffect(() => {
    if (pathname.includes('/edit')) {
      showMessage(id, setMessage, setIsUndisclosed)
      getMessageItems(id, setMessageItems)
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">{pathname.includes('/edit') ? 'メッセージ編集' : 'メッセージ作成'}</h1>
        </div>
      </div>
      <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center py-4">
        <Button onClick={onSaveMessage} variant="primary" className="me-2">
          {pathname.includes('/edit') ? '更新する' : '保存する'}
        </Button>
        <Button onClick={duplicateTemplate} variant="primary" className="me-2 animate-up-2">
          複製する
        </Button>
        <Button variant="primary" className="me-2 animate-up-2">
          このテンプレートで配信
        </Button>
        <Button href={Paths.TemplateMessages.path} variant="primary" className="me-2 animate-up-2">
          テンプレートリストに戻る
        </Button>
      </div>

      <Row>
        <Col xs={12} xl={12}>
          <TemplateMessageForm
            handleChange={handleChange} 
            message={message} 
            setIsUndisclosed={setIsUndisclosed}
            isUndisclosed={isUndisclosed}
          />
        </Col>
      </Row>
      {
        messageItems.map((messageItem, index) => 
          <div key={messageItem.id} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3">
            <MessageEditor
              messageItem={messageItem}
              handleChange={handleChange}
              handlePreviewChange={handlePreviewChange}
              handlePictureImageDelete={handlePictureImageDelete}
              handleDelete={handleDelete}
            />
          </div>
        )
      }
      <div className="d-flex justify-content-flex-end flex-wrap flex-md-nowrap align-items-center py-3">
        <Button onClick={addEditCard} variant="gray-800" className="mt-2 animate-up-2">
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
          <LinePreview previews={messageItems} />
        </div>
      </div>
    </>
  );
};
