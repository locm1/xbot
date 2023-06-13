import React, { useState, useEffect } from "react";
import { HomeIcon, PlusIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Col, Row, Modal, Button, Dropdown, Breadcrumb, Form, Card } from 'react-bootstrap';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
// forms
import TemplateMessageForm from "@/pages/message/form/TemplateMessageForm";
import MessageEditor from "@/pages/message/MessageEditor";
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import LinePreview from "@/components/line/LinePreview";
import { Paths } from "@/paths";
import { showMessage, updateMessage, storeMessage } from "@/pages/message/api/MessageApiMethods";
import { getMessageItems, updateMessageItems, deleteMessageItem, storeMessageItems } from "@/pages/message/api/MessageItemApiMethods";
import MessageTemplateContentLoader from "@/pages/message/loader/MessageTemplateContentLoader";


export default () => {
  const history = useHistory();
  const { id } = useParams();
  const pathname = useLocation().pathname;
  const [message, setMessage] = useState({
    id: 1, title: '', is_undisclosed: 0
  });
  const [messageItems, setMessageItems] = useState([
    {
      display_id: 1, id: null, type: 1, text: '', image_path: null, video_path: null,
      carousel_images: [{ id: null, display_id: 1, image_path: null, label: '', uri: '', is_deleted: false }],
      carousel_products: [{ id: null, display_id: 1, image_path: null, title: '', text: '', label: '', uri: '', is_deleted: false }]
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
  const [error, setError] = useState({
    'message_items.0.carousel_images.0.uri': null,
    'message_items.0.carousel_products.0.uri': null,
  })
  const [isRendered, setIsRendered] = useState(false);

  const handleChange = (e, input) => {
    setMessage({ ...message, [input]: e.target.value })
    setError({ ...error, [input]: '' })
  };

  const [messageDetailModal, setMessageDetailModal] = useState(false);

  const deleteCarouselImages = (currentMessageItem) => {
    const newCarouselImages = [];

    currentMessageItem.carousel_images.forEach(carousel_image => {
      newCarouselImages.push({ ...carousel_image, label: '', uri: '', image_path: null })
    })
    currentMessageItem.carousel_images = newCarouselImages
  };

  const deleteCarouselProducts = (currentMessageItem) => {
    const newCarouselProducts = [];

    currentMessageItem.carousel_products.forEach(carousel_product => {
      newCarouselProducts.push({ ...carousel_product, label: '', text: '', title: '', uri: '', image_path: null })
    })
    currentMessageItem.carousel_products = newCarouselProducts
  };

  const handlePreviewChange = (e, input, display_id, carousel_display_id = null, index = null, carouselIndex = null) => {
    const currentMessageItem = messageItems.filter(messageItem => (messageItem.display_id === display_id))[0]

    if (input == 'text') {
      currentMessageItem.type = 1
      currentMessageItem.image_path = null
      currentMessageItem.video_path = null
      currentMessageItem.text = e.target.value

      deleteCarouselImages(currentMessageItem)
      deleteCarouselProducts(currentMessageItem)
      setMessageItems(messageItems.map((messageItem) => (messageItem.display_id === display_id ? currentMessageItem : messageItem)));
      if (e.target.name == 'text') setError({ ...error, [`message_items.${index}.text`]: '' });
    } else if (input == 'file') {
      currentMessageItem.type = 2
      currentMessageItem.text = ''
      currentMessageItem.video_path = null
      currentMessageItem.image_file = e.target.files[0]
      setUpdateImages([...updateImages, e.target.files[0]])
      setUpdateImageIds([...updateImageIds, currentMessageItem.display_id])

      deleteCarouselImages(currentMessageItem)
      deleteCarouselProducts(currentMessageItem)

      const reader = new FileReader()
      reader.onload = (e) => {
        currentMessageItem.image_path = e.target.result
        setMessageItems(messageItems.map((messageItem) => (messageItem.display_id === display_id ? currentMessageItem : messageItem)));
      }
      reader.readAsDataURL(e.target.files[0])
      if (e.target.name == 'image') setError({ ...error, [`message_items.${index}.image_path`]: '' });
    } else if (input == 'video') {
      currentMessageItem.type = 3
      currentMessageItem.text = ''
      currentMessageItem.image_path = null
      currentMessageItem.video_file = e.target.files[0]
      setUpdateVideos([...updateVideos, e.target.files[0]])
      setUpdateVideoIds([...updateVideoIds, currentMessageItem.display_id])

      deleteCarouselImages(currentMessageItem)
      deleteCarouselProducts(currentMessageItem)

      currentMessageItem.video_path = URL.createObjectURL(e.target.files[0])
      setMessageItems(messageItems.map((messageItem) => (messageItem.display_id === display_id ? currentMessageItem : messageItem)));
      if (e.target.name == 'video') setError({ ...error, [`message_items.${index}.video_path`]: '' });
    } else if (input == 'carousel-image') {
      currentMessageItem.image_path = null
      currentMessageItem.video_path = null
      currentMessageItem.text = ''
      setUpdateCarouselImageImages([...updateCarouselImageImages, e.target.files[0]])
      setUpdateCarouselImageImageIds([...updateCarouselImageImageIds, display_id + '-' + carousel_display_id])
      const image_path = URL.createObjectURL(e.target.files[0])
      deleteCarouselProducts(currentMessageItem)
      const data = (messageItems.map((messageItem) => (messageItem.display_id == display_id ? { ...currentMessageItem, carousel_images: (currentMessageItem.carousel_images.map(v => v.display_id == carousel_display_id ? { ...v, image_path: image_path } : { ...v })) } : { ...messageItem })));
      setMessageItems(data);

      switch (e.target.name) {
        case 'file':
          setError({ ...error, [`message_items.${index}.carousel_images.${carouselIndex}.image_path`]: '' })
          setError({ ...error, [`carousel_image_images.${carouselIndex}`]: '' })
          break;
        default:
          setError({ ...error, [`message_items.${index}.carousel_images.${carouselIndex}.${e.target.name}`]: '' })
          break;
      }

    } else if (input == 'carousel-product') {
      currentMessageItem.image_path = null
      currentMessageItem.video_path = null
      currentMessageItem.text = ''
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
      setUpdateCarouselProductImages([...updateCarouselProductImages, selectedImage])
      setUpdateCarouselProductImageIds([...updateCarouselProductImageIds, display_id + '-' + carousel_display_id])
      const image_path = URL.createObjectURL(selectedImage)
      deleteCarouselImages(currentMessageItem)
      const data = (messageItems.map((messageItem) => (messageItem.display_id == display_id ? { ...currentMessageItem, carousel_products: (messageItem.carousel_products.map(v => v.display_id == carousel_display_id ? { ...v, image_path: image_path } : { ...v })) } : { ...messageItem })));
      setMessageItems(data);

      switch (e.target.name) {
        case 'file':
          setError({ ...error, [`message_items.${index}.carousel_products.${carouselIndex}.image_path`]: '' })
          setError({ ...error, [`carousel_product_images.${carouselIndex}`]: '' })
          break;
        default:
          setError({ ...error, [`message_items.${index}.carousel_products.${carouselIndex}.${e.target.name}`]: '' })
          break;
      }
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
    setMessageItems([...messageItems, {
      display_id: lastMessageItem.display_id + 1, id: null, type: 1, text: '', image_path: null, video_path: null,
      carousel_images: [{ id: null, display_id: 1, image_path: null, label: '', uri: '', is_deleted: false }],
      carousel_products: [{ id: null, display_id: 1, image_path: null, title: '', text: '', label: '', uri: '', is_deleted: false }]
    }])
  };

  const onSaveMessage = (event) => {
    // console.log('run');
    // const form = event.currentTarget;
    // event.preventDefault();
    // event.stopPropagation();

    message.is_undisclosed = isUndisclosed ? 1 : 0

    const formData = new FormData();
    formData.append("message_items", JSON.stringify(messageItems));
    formData.append("title", message.title)
    formData.append("is_undisclosed", message.is_undisclosed)
    updateImages.forEach((updateImage) => formData.append("images[]", updateImage));
    updateImageIds.forEach((updateImageId) => formData.append("image_ids[]", updateImageId));
    updateCarouselImageImages.forEach((updateImage) => formData.append("carousel_image_images[]", updateImage));
    updateCarouselImageImageIds.forEach((updateImageId) => formData.append("carousel_image_image_ids[]", updateImageId));
    updateCarouselProductImages.forEach((updateImage) => formData.append("carousel_product_images[]", updateImage));
    updateCarouselProductImageIds.forEach((updateImageId) => formData.append("carousel_product_image_ids[]", updateImageId));
    updateVideos.forEach((updateVideo) => formData.append("videos[]", updateVideo));
    updateVideoIds.forEach((updateVideoId) => formData.append("video_ids[]", updateVideoId));

    if (pathname.includes('/edit')) {
      updateMessage(id, formData, setError, completeMessage)
      // 画像削除stateに値があればAPI発火
      if (deleteMessageItems.length > 0) {
        const params = {
          ids: deleteMessageItems.map(deleteMessageItem => deleteMessageItem.id),
        }
        deleteMessageItem(id, params)
      }
    } else {
      //saveMessage(formData, setError, completeMessage)
      storeMessage(formData, setError, completeMessage).then(message => {
        history.push(Paths.EditMessage.path.replace(':id', message.message_id));
      })
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
      reverseButtons: true,
      confirmButtonText: "複製",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-gray-400 me-3"
      },
      cancelButtonText: "キャンセル"
    });

    if (result.isConfirmed) {
      delete message.id
      delete message.created_at
      delete message.updated_at
      delete message.deleted_at

      for (var i = 0; i < messageItems.length; i++) {
        messageItems[i].carousel_images.forEach(function(image) {
          delete image.id;
        });
      }
      saveMessage()
    }
  }


  const saveMessage = () => {
    message.is_undisclosed = isUndisclosed ? 1 : 0

    const formData = new FormData();
    formData.append("message_items", JSON.stringify(messageItems));
    formData.append("title", message.title)
    formData.append("is_undisclosed", message.is_undisclosed)
    updateImages.forEach((updateImage) => formData.append("images[]", updateImage));
    updateImageIds.forEach((updateImageId) => formData.append("image_ids[]", updateImageId));
    updateCarouselImageImages.forEach((updateImage) => formData.append("carousel_image_images[]", updateImage));
    updateCarouselImageImageIds.forEach((updateImageId) => formData.append("carousel_image_image_ids[]", updateImageId));
    updateCarouselProductImages.forEach((updateImage) => formData.append("carousel_product_images[]", updateImage));
    updateCarouselProductImageIds.forEach((updateImageId) => formData.append("carousel_product_image_ids[]", updateImageId));
    updateVideos.forEach((updateVideo) => formData.append("videos[]", updateVideo));
    updateVideoIds.forEach((updateVideoId) => formData.append("video_ids[]", updateVideoId));

    storeMessage(formData, setError, completeMessage)
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
    const newMessageItems = messageItems.map(v => (v.display_id == display_id ? { ...v, carousel_products: [...v.carousel_products, { id: null, display_id: lastCarouselProductId + 1, image_path: null, title: '', text: '', label: '', uri: '', is_deleted: false }] } : { ...v }));
    setMessageItems(newMessageItems);
  }

  const handleAddCarouselImageButtonClick = (display_id) => {
    let lastCarouselImageId;
    messageItems.forEach(v => {
      if (v.display_id == display_id) {
        lastCarouselImageId = v.carousel_images[v.carousel_images.length - 1].display_id
      }
    });
    const newMessageItems = messageItems.map(v => (v.display_id == display_id ? { ...v, carousel_images: [...v.carousel_images, { id: null, display_id: lastCarouselImageId + 1, image_path: null, label: '', uri: '', is_deleted: false }] } : { ...v }));
    setMessageItems(newMessageItems);
  }

  useEffect(() => {
    if (pathname.includes('/edit')) {
      showMessage(id, setMessage, setIsUndisclosed)
      getMessageItems(id, setMessageItems).then(setIsRendered(true))
    } else {
      setIsRendered(true)
    }
  }, []);

  return (
    <div className="">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">{pathname.includes('/edit') ? 'メッセージ編集' : 'メッセージ作成'}</h1>
        </div>
      </div>
      <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center pb-4">
        <Button onClick={() => { history.push(Paths.TemplateMessages.path) }} variant="gray-500" className="me-2 me-auto">
          テンプレートリストに戻る
        </Button>
        <Button variant="success" className="btn-default-success" onClick={onSaveMessage}>
          {pathname.includes('/edit') ? '更新する' : '保存する'}
        </Button>
      </div>
      <div className="d-flex">
        <div className="col-9">
          <Row>
            <Col xs={12} xl={12}>
              <TemplateMessageForm
                handleChange={handleChange}
                message={message}
                setIsUndisclosed={setIsUndisclosed}
                isUndisclosed={isUndisclosed}
                error={error}
                isRendered={isRendered}
              />
            </Col>
          </Row>
          {
            isRendered ? (
              <>
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
                    error={error}
                    index={index}
                    setError={setError}
                    deleteCarouselImages={deleteCarouselImages}
                    deleteCarouselProducts={deleteCarouselProducts}
                    updateCarouselImageImages={updateCarouselImageImages}
                    updateCarouselImageImageIds={updateCarouselImageImageIds}
                  />
                </div>
              )
              }
              {
                messageItems.length < 5 && (
                  <div className="privilege-button mb-4">
                    <Button
                      variant="outline-gray-500"
                      onClick={addEditCard}
                      className="d-inline-flex align-items-center justify-content-center dashed-outline new-card w-100"
                    >
                      <PlusIcon className="icon icon-xs me-2" /> 追加
                    </Button>
                  </div>
                )
              }
              </>
            ) : (
              <MessageTemplateContentLoader />
            )
          }
        </div>
        <div className="col-3">
          <Card border="0" className="shadow mb-4 ms-3">
            <Card.Header className="bg-primary text-white px-3 py-2">
              <h5 className="mb-0 fw-bolder">情報</h5>
            </Card.Header>
            <Card.Body>
              {
                isRendered ? (
                  <>
                  <Form.Group id="isUndisclosed">
                    <Form.Check
                      type="switch"
                      label="非公開にする"
                      id="switch1"
                      htmlFor="switch1"
                      checked={isUndisclosed}
                      onChange={() => setIsUndisclosed(!isUndisclosed)}
                    />
                  </Form.Group>
                  <Button onClick={duplicateTemplate} variant="primary" className="me-2 mt-3">
                    複製する
                  </Button>
                  </>
                ) : (
                  <ContentLoader
                    height={150}
                    width={200}
                    speed={1}
                  >
                    <rect x="0" y="2" rx="3" ry="3" width="80%" height="30" />
                    <rect x="0" y="65" rx="3" ry="3" width="50%" height="50" />
                  </ContentLoader>
                )
              }
              {/* <Button variant="primary" className="me-2 mt-3">
                  このテンプレートで配信
                </Button> */}
            </Card.Body>
          </Card>
        </div>
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
      <div className="d-flex justify-content-between align-items-center">
      <Button href={Paths.TemplateMessages.path} variant="gray-500" className="me-2 me-auto">
        テンプレートリストに戻る
      </Button>
      <Button variant="success" className="btn-default-success" onClick={onSaveMessage}>
          {pathname.includes('/edit') ? '更新する' : '保存する'}
        </Button>
        </div>
    </div>
  );
};
