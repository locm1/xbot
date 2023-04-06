import React, { useState, useEffect } from "react";
import { HomeIcon, PlusIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Col, Row, Modal, Button, Dropdown, Breadcrumb, Form } from 'react-bootstrap';
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
    {
      display_id: 1, id: null, type: 1, text: '', image_path: null, video_path: null, 
      carousel_images: [{id: null, display_id: 1, image_path: null, label: '', uri: '', is_deleted: false}],
      carousel_products: [{id: null, display_id: 1, image_path: null, title: '', text: '', label: '', uri: '', is_deleted: false}]
    }
  ]);
  const [updateImages, setUpdateImages] = useState([]);
  const [updateImageIds, setUpdateImageIds] = useState([]);
  const [updateVideos, setUpdateVideos] = useState([]);
  const [updateVideoIds, setUpdateVideoIds] = useState([]);
  const [updateCarouselImageImages, setUpdateCarouselImageImages] = useState([]);
  const [updateCarouselImageImageIds, setUpdateCarouselImageImageIds] = useState([]);
  const [updateCarouselProductImages, setUpdateCarouselProductImages] = useState([]);
  const [updateCarouselProductImageIds, setUpdateCarouselProductImageIds] = useState([]);
  const [deleteMessageItems, setDeleteMessageItems] = useState([]);
  const [isUndisclosed, setIsUndisclosed] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleChange = (e, input) => {
    setMessage({...message, [input]: e.target.value})
  };

  const [messageDetailModal, setMessageDetailModal] = useState(false);

  const handlePreviewChange = (e, input, display_id, carousel_display_id = null) => {
    const currentMessageItem = messageItems.filter(messageItem => (messageItem.display_id === display_id))[0]

    if (input == 'text') {
      currentMessageItem.type = 1
      currentMessageItem.image_path = null
      currentMessageItem.video_path = null
      currentMessageItem.text = e.target.value
      setMessageItems(messageItems.map((messageItem) => (messageItem.display_id === display_id ? currentMessageItem : messageItem)));
    } else if (input == 'file') {
      currentMessageItem.type = 2
      currentMessageItem.text = ''
      currentMessageItem.video_path = null
      currentMessageItem.image_file = e.target.files[0]
      setUpdateImages([...updateImages, e.target.files[0]])
      setUpdateImageIds([...updateImageIds, currentMessageItem.display_id])
      
      const reader = new FileReader()
      reader.onload = (e) => {
        currentMessageItem.image_path = e.target.result
        setMessageItems(messageItems.map((messageItem) => (messageItem.display_id === display_id ? currentMessageItem : messageItem)));
      }
      reader.readAsDataURL(e.target.files[0])
    } else if (input == 'video') {
      currentMessageItem.type = 3
      currentMessageItem.text = ''
      currentMessageItem.image_path = null
      currentMessageItem.video_file = e.target.files[0]
      setUpdateVideos([...updateVideos, e.target.files[0]])
      setUpdateVideoIds([...updateVideoIds, currentMessageItem.display_id])

      currentMessageItem.video_path = URL.createObjectURL(e.target.files[0])
      setMessageItems(messageItems.map((messageItem) => (messageItem.display_id === display_id ? currentMessageItem : messageItem)));
    } else if (input == 'carousel-image') {
      setUpdateCarouselImageImages([...updateImages, e.target.files[0]])
      setUpdateCarouselImageImageIds([...updateImageIds, display_id + '-' + carousel_display_id])
      const image_path = URL.createObjectURL(e.target.files[0])
      const data = (messageItems.map((messageItem) => (messageItem.display_id == display_id ? {...messageItem, carousel_images: (messageItem.carousel_images.map(v => v.display_id == carousel_display_id ? {...v, image_path: image_path} : {...v}))} : {...messageItem})));
      setMessageItems(data);
    } else if (input == 'carousel-product') {
      const selectedImage = e.target.files[0];
      const maxSize = 10 * 1024 * 1024;
      if (selectedImage.size > maxSize) {
        e.target.value = null;
        e.preventDefault();
        e.stopPropagation();
        Swal.fire(
          `エラー`,
          `画像サイズが上限を超えています`,
          'error'
        )
        return;
      }
      setUpdateCarouselProductImages([...updateImages, selectedImage])
      setUpdateCarouselProductImageIds([...updateImageIds, display_id + '-' + carousel_display_id])
      const image_path = URL.createObjectURL(selectedImage)
      const data = (messageItems.map((messageItem) => (messageItem.display_id == display_id ? {...messageItem, carousel_products: (messageItem.carousel_products.map(v => v.display_id == carousel_display_id ? {...v, image_path: image_path} : {...v}))} : {...messageItem})));
      setMessageItems(data);
    }
  }

  const handlePictureImageDelete = (display_id, type) => {
    const currentMessageItem = messageItems.filter(messageItem => (messageItem.display_id === display_id))[0]

    if (type == 2 || type == 4) {
      currentMessageItem.current_image_path = currentMessageItem.image_path
      currentMessageItem.image_path = null
    } else if (type == 3) {
      currentMessageItem.current_video_path = currentMessageItem.video_path
      currentMessageItem.video_path = null
    }
    setMessageItems(messageItems.map((messageItem) => (messageItem.display_id === display_id ? currentMessageItem : messageItem)));
  }

  const handleDelete = (display_id) => {
    const currentMessageItem = messageItems.filter(messageItem => (messageItem.display_id === display_id))[0]
    setMessageItems(
      messageItems.filter((messageItem) => (messageItem.display_id !== display_id))
    )
    setDeleteMessageItems([...deleteMessageItems, currentMessageItem])
  };

  const addEditCard = () => {
    const lastMessageItem = messageItems.slice(-1)[0]
    setMessageItems([...messageItems, {display_id: lastMessageItem.display_id + 1, id: null, type: 1, text: '', image_path: null, video_path: null,
    carousel_images: [{id: null, display_id: 1, image_path: null, label: '', uri: '', is_deleted: false}],
    carousel_products: [{id: null, display_id: 1, image_path: null, title: '', text: '', label: '', uri: '', is_deleted: false}]}])
  };

  const onSaveMessage = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return ;
    }
    if (pathname.includes('/edit')) {
      message.is_undisclosed = isUndisclosed ? 1 : 0
      updateMessage(id, message, completeMessage)

      const formData = new FormData();
      formData.append("message_items", JSON.stringify(messageItems));
      updateImages.forEach((updateImage) => formData.append("images[]", updateImage));
      updateImageIds.forEach((updateImageId) => formData.append("image_ids[]", updateImageId));
      updateCarouselImageImages.forEach((updateImage) => formData.append("carousel_image_images[]", updateImage));
      updateCarouselImageImageIds.forEach((updateImageId) => formData.append("carousel_image_image_ids[]", updateImageId));
      updateCarouselProductImages.forEach((updateImage) => formData.append("carousel_product_images[]", updateImage));
      updateCarouselProductImageIds.forEach((updateImageId) => formData.append("carousel_product_image_ids[]", updateImageId));
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
    // setTimeout(() => location.reload(), 1000)
  } 

  const handleAddCarouselProductButtonClick = (display_id) => {
    let lastCarouselProductId;
    messageItems.forEach(v => {
      if (v.display_id == display_id) {
        lastCarouselProductId = v.carousel_products[v.carousel_products.length - 1].display_id
      }
    });
    const newMessageItems = messageItems.map(v => (v.display_id == display_id ? {...v, carousel_products: [...v.carousel_products, {id: null, display_id: lastCarouselProductId + 1, image_path: null, title: '', text: '', label: '', uri: '', is_deleted: false}]} : {...v}));
    setMessageItems(newMessageItems);
  }

  const handleAddCarouselImageButtonClick = (display_id) => {
    let lastCarouselImageId;
    messageItems.forEach(v => {
      if (v.display_id == display_id) {
        lastCarouselImageId = v.carousel_images[v.carousel_images.length - 1].display_id
      }
    });
    const newMessageItems = messageItems.map(v => (v.display_id == display_id ? {...v, carousel_images: [...v.carousel_images, {id: null, display_id: lastCarouselImageId + 1, image_path: null, label: '', uri: '', is_deleted: false}]} : {...v}));
    setMessageItems(newMessageItems);
  }

  useEffect(() => {
    if (pathname.includes('/edit')) {
      showMessage(id, setMessage, setIsUndisclosed)
      getMessageItems(id, setMessageItems)
    }
  }, []);

  return (
    <div className="fullscreenmaxwidth">
    <Button onClick={() => console.log(messageItems)} />
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">{pathname.includes('/edit') ? 'メッセージ編集' : 'メッセージ作成'}</h1>
        </div>
      </div>
      <Form noValidate validated={validated} onSubmit={onSaveMessage}>
      <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center py-4">
        <Button type="submit" variant="primary" className="me-2">
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
        messageItems && messageItems.map((messageItem, index) => 
          <div key={messageItem.display_id} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3">
            <MessageEditor
              messageItem={messageItem}
              handleChange={handleChange}
              handlePreviewChange={handlePreviewChange}
              handlePictureImageDelete={handlePictureImageDelete}
              handleDelete={handleDelete}
              messageItems={messageItems}
              setMessageItems={setMessageItems}
              handleAddCarouselProductButtonClick={handleAddCarouselProductButtonClick}
              handleAddCarouselImageButtonClick={handleAddCarouselImageButtonClick}
            />
          </div>
        )
      }
      </Form>
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
    </div>
  );
};
