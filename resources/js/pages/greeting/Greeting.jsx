import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button, Breadcrumb, Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import MessageEditor from "@/pages/message/MessageEditor";
import { HomeIcon, PlusIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import Swal from "sweetalert2";
import LinePreview from "@/components/line/LinePreview";
import { getGreetingMessages, updateGreetingMessages, storeGreetingMessages, deleteGreetingMessages } from "@/pages/greeting/api/GreetingApiMethods";
import { getGreetingMessageWithQuestionnaires, storeGreetingMessageWithQuestionnaires, updateGreetingMessageWithQuestionnaires } from "@/pages/greeting/api/GreetingWithQuestionnaireApiMethods";

export default () => {
  const [messages, setMessages] = useState([
    {id: 1, type: 1, text: '', image_path: null, video_path: null}
  ]);
  const [isQuestionnaireAnswerButton, setIsQuestionnaireAnswerButton] = useState(false);
  const [greetingMessageWithQuestionnaire, setQreetingMessageWithQuestionnaire] = useState({});
  const [messageDetailModal, setMessageDetailModal] = useState(false);
  const [updateImages, setUpdateImages] = useState([]);
  const [updateImageIds, setUpdateImageIds] = useState([]);
  const [updateVideos, setUpdateVideos] = useState([]);
  const [updateVideoIds, setUpdateVideoIds] = useState([]);
  const [deleteMessages, setDeleteMessages] = useState([]);
  const [messageCount, setMessageCount] = useState();

  const handlePreviewChange = (e, input, id) => {
    const currentMessage = messages.filter(message => (message.id === id))[0]

    if (input == 'text') {
      currentMessage.type = 1
      currentMessage.image_path = null
      currentMessage.video_path = null
      currentMessage.text = e.target.value
      setMessages(messages.map((message) => (message.id === id ? currentMessage : message)));

    } else if (input == 'file') {
      currentMessage.type = 2
      currentMessage.text = null
      currentMessage.video_path = null
      setUpdateImages([...updateImages, e.target.files[0]])
      setUpdateImageIds([...updateImageIds, currentMessage.id])
      
      const reader = new FileReader()
      reader.onload = (e) => {
        currentMessage.image_path = e.target.result
        setMessages(messages.map((message) => (message.id === id ? currentMessage : message)));
      }
      reader.readAsDataURL(e.target.files[0])
    } else if (input == 'video') {
      currentMessage.type = 3
      currentMessage.text = ''
      currentMessage.image_path = null
      setUpdateVideos([...updateVideos, e.target.files[0]])
      setUpdateVideoIds([...updateVideoIds, currentMessage.id])

      currentMessage.video_path = URL.createObjectURL(e.target.files[0])
      setMessages(messages.map((message) => (message.id === id ? currentMessage : message)));
    }

  }

  const handlePictureVideoDelete = (id, type) => {
    const currentMessage = messages.filter(message => (message.id === id))[0]

    if (type == 2) {
      currentMessage.current_image_path = currentMessage.image_path
      currentMessage.image_path = null
    } else if (type == 3) {
      currentMessage.current_video_path = currentMessage.video_path
      currentMessage.video_path = null
    }

    setMessages(messages.map((message) => (message.id === id ? currentMessage : message)));
  }

  const handleDelete = (id) => {
    const currentMessage = messages.filter(message => (message.id === id))[0]

    setMessages(
      messages.filter((message) => (message.id !== id))
    )
    setDeleteMessages([...deleteMessages, currentMessage])
  };

  const addEditCard = () => {
    const lastMessage = messages.slice(-1)[0]
    setMessages([...messages, {id: lastMessage.id + 1, type: 1, text: null, image_path: null, video_path: null}])
  };

  const onSaveMessage = () => {
    const formData = new FormData();
    formData.append("messages", JSON.stringify(messages));
    updateImages.forEach((updateImage) => formData.append("images[]", updateImage));
    updateImageIds.forEach((updateImageId) => formData.append("image_ids[]", updateImageId));
    updateVideos.forEach((updateVideo) => formData.append("videos[]", updateVideo));
    updateVideoIds.forEach((updateVideoId) => formData.append("video_ids[]", updateVideoId));
    const formValue = {is_questionnaire: isQuestionnaireAnswerButton ? 1 : 0}

    // 画像削除stateに値があればAPI発火
    if (deleteMessages.length > 0) {
      const params = {
        ids: deleteMessages.map(deleteMessage => deleteMessage.id),
      }
      deleteGreetingMessages(params, completeMessage)
    }

    if (messages[0].created_at) {
      updateGreetingMessages(formData, completeMessage)
    } else {
      storeGreetingMessages(formData, completeMessage)
    }

    if (greetingMessageWithQuestionnaire) {
      updateGreetingMessageWithQuestionnaires(greetingMessageWithQuestionnaire.id, formValue)
    } else {
      storeGreetingMessageWithQuestionnaires(formValue)
    }
  };

  const completeMessage = (message) => {
    Swal.fire(
      `${message}完了`,
      `あいさつメッセージの${message}に成功しました`,
      'success'
    )
    setTimeout(() => location.reload(), 1000)
  } 

  useEffect(() => {
    getGreetingMessages(setMessages)
    getGreetingMessageWithQuestionnaires(setQreetingMessageWithQuestionnaire, setIsQuestionnaireAnswerButton)
  }, []);

  useEffect(() => {
    const count = isQuestionnaireAnswerButton ? 4 : 5
    setMessageCount(count)
  }, [isQuestionnaireAnswerButton]);

	return (
		<>
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">あいさつメッセージ設定</h1>
        </div>
      </div>
      <div className="d-flex flex-row-reverse mt-3">
        <Form.Group id="questionnaire">
          <Form.Check
          type="switch"
          label="アンケート回答ボタンをつける"
          id="questionnaire"
          htmlFor="questionnaire"
          checked={isQuestionnaireAnswerButton}
          onClick={() => setIsQuestionnaireAnswerButton(!isQuestionnaireAnswerButton)}
          />
        </Form.Group>
      </div>
        {
          messages && messages.map((message, index) => 
            <div key={message.id} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
              <MessageEditor
                messageItem={message}
                handlePreviewChange={handlePreviewChange}
                handlePictureImageDelete={handlePictureVideoDelete}
                handleDelete={handleDelete}
                messageItems={messages}
                setMessageItems={setMessages}
              />
            </div>
          )
        }
      <div className="d-flex justify-content-flex-end flex-wrap flex-md-nowrap align-items-center my-4">
        {
          messages.length < messageCount && (
            <Button onClick={addEditCard} variant="gray-800" className="animate-up-2">
              <PlusIcon className="icon icon-xs me-2" /> 追加
            </Button>
          )
        }
        <Button onClick={onSaveMessage} variant="gray-800" className="ms-7">
          保存する
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
          <LinePreview previews={messages} />
        </div>
      </div>
		</>
	)
}