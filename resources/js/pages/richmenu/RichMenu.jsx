import React, { useState, useEffect, useLayoutEffect, useContext, useRef } from "react";
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useDropzone } from "react-dropzone";
import { Col, Row, Form, Button, ListGroup, Card, Badge, Image } from 'react-bootstrap';
import { XIcon } from "@heroicons/react/solid";
import LinePreview from "@/components/line/LinePreview";
import ChangeTemplateModal from "@/pages/richmenu/ChangeTemplateModal";
import AccordionComponent from "@/components/AccordionComponent";
import { showRichMenu, getImage, storeRichMenu, updateRichMenu, setDefaultRichMenu } from "./RichMenuApiMethods";
import Swal from "sweetalert2";
import squares1 from "@img/img/richmenu/squares1.jpg"
import squares1_1 from "@img/img/richmenu/squares1_1.jpg"
import squares1_2 from "@img/img/richmenu/squares1_2.jpg"
import squares1_3 from "@img/img/richmenu/squares1_3.jpg"
import squares2_2 from "@img/img/richmenu/squares2_2.jpg"
import squares4 from "@img/img/richmenu/squares4.jpg"
import squares6 from "@img/img/richmenu/squares6.jpg"
import squares_half_1 from "@img/img/richmenu/squares_half_1.jpg"
import squares_half_1_1 from "@img/img/richmenu/squares_half_1_1.jpg"
import squares_half_1_2 from "@img/img/richmenu/squares_half_1_2.jpg"
import squares_half_2_1 from "@img/img/richmenu/squares_half_2_1.jpg"
import squares_half_3 from "@img/img/richmenu/squares_half_3.jpg"
import { pages } from "./PageURLConsts"
import { Paths } from "@/paths";
import { LoadingContext } from "@/components/LoadingContext";
import RichMenuContentLoader from "@/pages/richmenu/loader/RichMenuContentLoader.jsx"
import { validationCheck } from "@/pages/richmenu/Validation";
import AccordionAction from "@/pages/richmenu/AccordionAction";

export default () => {
  const inputRef = useRef(null);
  const { setIsLoading } = useContext(LoadingContext);
  const [liffId, setLiffId] = useState();
  const { id } = useParams();
  const richMenuId = 'richmenu-' + id;
  const pathname = useLocation().pathname;
  const history = useHistory();
  const [fileSize, setFileSize] = useState(null);
  const richmenu_1 = [
    { id: 1, img: squares6, size: 6, type: 1 },
    { id: 2, img: squares4, size: 4, type: 2 },
    { id: 3, img: squares1_3, size: 4, type: 3 },
    { id: 4, img: squares1_2, size: 3, type: 4 },
    { id: 5, img: squares1_1, size: 2, type: 5 },
    { id: 6, img: squares2_2, size: 2, type: 6 },
    { id: 7, img: squares1, size: 1, type: 7 },
    { id: 8, img: squares_half_3, size: 3, type: 8 },
    { id: 9, img: squares_half_1_2, size: 2, type: 9 },
    { id: 10, img: squares_half_2_1, size: 2, type: 10 },
    { id: 11, img: squares_half_1_1, size: 2, type: 11 },
    { id: 12, img: squares_half_1, size: 1, type: 12 },
  ];
  const [ailias, setAilias] = useState([]);
  const [actionLinks, setActionLinks] = useState({
    'A-value': { isExternal: false, linkValue: '', textValue: '', richmenuValue: '', type: 1 },
    'B-value': { isExternal: false, linkValue: '', textValue: '', richmenuValue: '', type: 1 },
    'C-value': { isExternal: false, linkValue: '', textValue: '', richmenuValue: '', type: 1 },
    'D-value': { isExternal: false, linkValue: '', textValue: '', richmenuValue: '', type: 1 },
    'E-value': { isExternal: false, linkValue: '', textValue: '', richmenuValue: '', type: 1 },
    'F-value': { isExternal: false, linkValue: '', textValue: '', richmenuValue: '', type: 1 },
  });
  const [externalLinks, setExternalLinks] = useState({})
  const [checklLinks, setCheckLinks] = useState({})
  const [sendTexts, setSendTexts] = useState({})
  const [isRendered, setIsRendered] = useState(false);
  const [error, setError] = useState({
    menuBarText: '', title: ''
  })

  useLayoutEffect(() => {
    axios.get('/api/v1/management/rich-menu-ailias')
      .then((response) => {
        const responseAlias = response.data.filter(v => v.richMenuId !== richMenuId);
        setAilias(responseAlias);
        if (pathname.includes('/create')) {
          setIsRendered(true)
        }
      })
      .catch(error => {
        console.error(error);
      },);
    axios.get('/api/v1/get-liff-id')
      .then((response) => {
        setLiffId(response.data);
      })
      .catch(error => {
        console.error(error);
      },);
  }, [])

  const checkUrl = (response, value, type) => {
    const checkValue = response[value];
    if (checkValue.startsWith("https://liff.line.me/")) {
      const params = new URLSearchParams(checkValue.substring(checkValue.indexOf('?')));
      const pathValue = params.get('path');
      const isExternal = pathValue.startsWith("https") || pathValue.startsWith("http")

      if (isExternal) {
        setExternalLinks(prevExternalLinks => ({ ...prevExternalLinks, [value]: pathValue }))
      }

      if (response[type] == 1) {
        const checkIndex = isExternal ? 8 : pages.findIndex(page => page.path == pathValue) + 1
        setCheckLinks(prev => ({ ...prev, [value]: checkIndex }))
      }

      return {
        isExternal: isExternal,
        linkValue: pathValue,
        textValue: '',
        richmenuValue: '',
        type: response[type],
        isSelect: true
      }
    }

    const result = {
      isExternal: false,
      linkValue: response[type] === 1 ? checkValue : '',
      textValue: response[type] === 2 ? checkValue : '',
      richmenuValue: response[type] === 3 ? checkValue : '',
      type: response[type],
    };

    const isSelect = result.linkValue || result.textValue || result.richmenuValue;

    return {
      ...result,
      isSelect: isSelect,
    }
  };

  useEffect(() => {
    if (pathname.includes('/edit')) {
      showRichMenu(richMenuId, setFormValue, setActionLinks).then((response) => {
        const defaultValue = { isExternal: false, linkValue: '', textValue: '', richmenuValue: '', type: 1, isSelect: false }
        setActionLinks({
          'A-value': response['A-value'] ? checkUrl(response, 'A-value', 'A-type') : defaultValue,
          'B-value': response['B-value'] ? checkUrl(response, 'B-value', 'B-type') : defaultValue,
          'C-value': response['C-value'] ? checkUrl(response, 'C-value', 'C-type') : defaultValue,
          'D-value': response['D-value'] ? checkUrl(response, 'D-value', 'D-type') : defaultValue,
          'E-value': response['E-value'] ? checkUrl(response, 'E-value', 'E-type') : defaultValue,
          'F-value': response['F-value'] ? checkUrl(response, 'F-value', 'F-type') : defaultValue,
        })
        setRichMenu(richmenu_1.filter(v => v.type == response.menuType)[0] ?? { id: 1, img: '', size: 6, type: 1 })
        getImage(richMenuId, setImage, setImagePath).finally(() => {
          setIsRendered(true)
        }).catch(error => {
          setIsRendered(true)
        })
      })
    }
  }, []);

  const [formValue, setFormValue] = useState(
    {
      title: '', menuBarText: '', registAilias: false, menuType: 1,
    }
  );
  const [previews, setPreviews] = useState([
    { id: 1, key: '', content: '', files: '' }
  ]);
  const [imagePath, setImagePath] = useState();
  const [image, setImage] = useState();

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
    setError({ ...error, [e.target.name]: '' })
  };

  const handleCheckChange = (e, isExternal, title, type, checkNumber = 0) => {
    const { value } = e.target;

    if (type === 1) {
      setCheckLinks({ ...checklLinks, [`${title}-value`]: checkNumber })
    }

    setActionLinks((prevActionLinks) => ({
      ...prevActionLinks,
      [`${title}-value`]: {
        ...prevActionLinks[`${title}-value`],
        isExternal: isExternal,
        linkValue: isExternal ? externalLinks[`${title}-value`] : value,
        isSelect: true
      },
    }));
  };

  const handleLinkChange = (e, title, type) => {
    const { value } = e.target;

    if (type === 1 && actionLinks[`${title}-value`].isExternal) {
      setExternalLinks({ ...externalLinks, [`${title}-value`]: value })
    }

    const message = validationCheck(value, type, actionLinks[`${title}-value`].isExternal)
    setError({ ...message, [`${title}-value`]: message })

    setActionLinks((prevActionLinks) => ({
      ...prevActionLinks,
      [`${title}-value`]: {
        ...prevActionLinks[`${title}-value`],
        linkValue: type === 1 ? value : prevActionLinks[`${title}-value`].linkValue,
        textValue: type === 2 ? value : prevActionLinks[`${title}-value`].textValue,
        richmenuValue: type === 3 ? value : prevActionLinks[`${title}-value`].richmenuValue,
        isSelect: true
      },
    }));
  };

  const handleChangeAsNumber = (e, title) => {
    const value = +e.target.value
    setFormValue({ ...formValue, [e.target.name]: value })

    setActionLinks((prevActionLinks) => ({
      ...prevActionLinks,
      [`${title}-value`]: {
        ...prevActionLinks[`${title}-value`],
        type: value,
        isSelect: true
      },
    }));

    setError({ ...error, [`${title}-type`]: '' })
  }

  const [formId, setFormId] = useState();
  const [templateModal, setTemplateModal] = useState(false);
  const [richMenu, setRichMenu] = useState({ id: 1, img: '', size: 6, type: 1 });
  const [active, setActive] = useState();
  const [templateActive, setTemplateActive] = useState([]);
  const [templateFrame, setTemplateFrame] = useState(true);
  // const richMenu = richmenu_1.filter(v => v.type === formValue.menuType) ?? {id: 1, img: '', size: 6, type: 1};

  const SettingsItem = (props) => {
    const { id, title, children, last = false, className } = props;
    const borderBottomClass = !last ? "border-bottom" : "";

    return (
      <Row className={`${className} ${borderBottomClass} align-items-center pb-3`}>
        <Col md={4}>
          <Card.Text className="h6 mb-1"><Badge bg="danger" className="me-2">必須</Badge>{title}</Card.Text>
        </Col>
        <Col md={8}>
          {children}
        </Col>
      </Row>
    );
  };

  const RichMenuImage = (props) => {
    const { files, setImagePath } = props;

    const validation = (width, height) => {
      const aspectRatio = width / height;
      const errors = [];
      if (width < 800 || width > 2500) {
        errors.push('横幅は800px以上、2500px以下にしてください');
      }
      if (height < 250) {
        errors.push('高さが250px未満です');
      }
      if (aspectRatio < 1.45) {
        errors.push('画像のアスペクト比が1.45未満です');
      }
      if (fileSize > 1000000) {
        errors.push('ファイルサイズが1MBを超過しています');
      }

      return errors;
    }

    const handleImageLoad = (event) => {
      const { naturalWidth, naturalHeight } = event.target;
      const errors = validation(naturalWidth, naturalHeight);

      if (errors.length > 0) {
        Swal.fire({
          title: 'エラー',
          icon: 'error',
          html: errors.join('<br>')
        })
        setImagePath(null);
        setFileSize(null);
      }
    };

    const onFileInputChange = (e) => {
      const fileObject = e.target.files[0];
      setImagePath(URL.createObjectURL(fileObject));
      setImage(fileObject);
    }

    const DropzoneFile = (props) => {
      const { files } = props;

      return (
        <Col xs={3} className="dropzone-preview line-preview-image-wrap pb-2">
          <div className="line-preview-image d-flex">
            <Image src={files} onLoad={handleImageLoad} className="dropzone-image" />
            <Button variant="gray-800" className="product-image-button" onClick={() => setImagePath()}>
              <XIcon className="icon icon-sm line-preview-image-icon" />
            </Button>
          </div>
        </Col>
      );
    };

    return (
      <ListGroup.Item className={`px-0 mt-3 border-bottom`}>
        <Row>
          <Col md={4} className="h6 mb-1">画像</Col>
          <Col md={8}>
            <Form className="pb-4">
              <Form.Control type="file" accept="image/*" onChange={onFileInputChange} />
            </Form>
          </Col>
        </Row>
        {
          files && (
            <Row className="dropzone-files">
              <DropzoneFile files={files} setImagePath={setImagePath} />
            </Row>
          )
        }
      </ListGroup.Item>
    );
  };

  const addFormData = (formData) => {
    const newData = {};

    Object.keys(actionLinks).forEach((key) => {
      if (actionLinks[key].isSelect) {
        newData[key] = actionLinks[key];
      }
    });

    console.log(newData);

    Object.keys(newData).forEach(key => {
      switch (newData[key].type) {
        case 1:
          const value = newData[key].linkValue
          const liffUrl = `https://liff.line.me/${liffId}?path=`
          const externalLink = '&external=1'
          const link = newData[key].isExternal ? liffUrl + value + externalLink : liffUrl + value
          formData.append(key, link);
          break;
        case 2:
          formData.append(key, newData[key].textValue);
          break;
        case 3:
          formData.append(key, newData[key].richmenuValue);
          break;
        default:
          formData.append(key, newData[key].linkValue);
          break;
      }
    })
  };

  const saveMenu = (shouldSetDefault) => {
    setIsLoading(true);
    const formData = new FormData();
    for (const key in formValue) {
      formData.append(key, formValue[key]);
    }

    addFormData(formData);

    formData.append('image', image);
    formData.append('shouldSetDefault', shouldSetDefault);
    if (pathname.includes('/edit')) {
      updateRichMenu(richMenuId, formData, setError).then(response => {
        setIsLoading(false)
        if (response === 'failed') {
          Swal.fire({
            icon: 'error',
            title: 'エラー',
            text: `テンプレート名「${formValue.title}」を保存できませんでした`,
          })
        } else {
          if (shouldSetDefault) {
            setDefaultRichMenu(response).then(response => {
              setIsLoading(false)
              if (response === 'failed') {
                Swal.fire({
                  icon: 'error',
                  title: 'エラー',
                  text: `テンプレート名「${formValue.title}」をデフォルトに設定できませんでした`,
                })
              } else {
                Swal.fire({
                  icon: 'success',
                  title: '保存完了',
                  text: `「${formValue.title}」をデフォルトに保存しました`,
                }).then((result) => {
                  if (result.isDismissed || result.isConfirmed) {
                    let responseRichMenuId = response.replace('richmenu-', '');
                    history.push(`/manage/account/richmenu/edit/${responseRichMenuId}`)
                  }
                })
              }
            })
          } else {
            setIsLoading(false)
            Swal.fire({
              icon: 'success',
              title: '保存完了',
              text: `「${formValue.title}」を保存しました`,
            }).then((result) => {
              if (result.isDismissed || result.isConfirmed) {
                let responseRichMenuId = response.replace('richmenu-', '');
                history.push(`/manage/account/richmenu/edit/${responseRichMenuId}`)
              }
            })
          }
        }
      })
    } else {
      storeRichMenu(formData, setError).then(response => {
        if (response === 'failed') {
          setIsLoading(false)
          Swal.fire({
            icon: 'error',
            title: 'エラー',
            text: `テンプレート名「${formValue.title}」を保存できませんでした`,
          })
        } else {
          setIsLoading(false)
          Swal.fire({
            icon: 'success',
            title: '保存完了',
            text: `「${formValue.title}」を保存しました`,
          }).then((result) => {
            if (result.isConfirmed) {
              console.log(response);
              let responseRichMenuId = response.replace('richmenu-', '');
              history.push(`/manage/account/richmenu/edit/${responseRichMenuId}`)
            }
          }).finally(res => setIsLoading(false))
        }
      })
    }
  }

  const MenuBarSetting = (props) => {
    const { title, preview, handleClick, id, value, name } = props;

    return (
      <Form.Check
        defaultChecked={value}
        type="switch"
        label={title}
        name={name}
        id={`switch-${id}`}
        htmlFor={`switch-${id}`}
        onClick={handleClick}
      />
    );
  };

  return (
    <>
      {
        templateModal && (
          <ChangeTemplateModal
            setRichMenu={setRichMenu}
            setFormValue={setFormValue}
            formValue={formValue}
            show={templateModal}
            templateModal={templateModal}
            setTemplateModal={setTemplateModal}
            active={active}
            setActive={setActive}
          />
        )
      }
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <h1 className="page-title">リッチメニュー設定</h1>
        <Button onClick={() => { history.push(Paths.RichMenus.path) }} className="mt-2 animate-up-2">一覧へ戻る</Button>
      </div>
      {
        isRendered ? (
          <Card border="0" className="shadow mb-4 rich-menu-content-wrap">
            <Card.Header className="bg-primary text-white px-3 py-2">
              <h5 className="mb-0 fw-bolder">コンテンツ設定</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12} className="mb-5">
                  <Form.Group id="title">
                    <Form.Label><Badge bg="danger" className="me-2">必須</Badge>タイトル</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="title"
                      value={formValue.title}
                      onChange={handleChange}
                      placeholder=""
                      isInvalid={!!error.title}
                    />
                    {
                      error.title &&
                      <Form.Control.Feedback type="invalid">{error.title[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-between">
                <div className='line-rich-menu-preview me-2'>
                  <LinePreview
                    formValue={formValue}
                    files={imagePath}
                    formId={formId}
                    previews={previews}
                    page='richmenu'
                    richMenu={richMenu}
                    templateFrame={templateFrame}
                    templateActive={templateActive}
                    setTemplateActive={setTemplateActive}
                  />
                </div>
                <div className="rich-menu-content">
                  <ListGroup className="list-group-flush">
                    <SettingsItem
                      id={1}
                      title="テンプレート"
                    >
                      <Button size="sm" className="" onClick={() => setTemplateModal(!templateModal)}>選択する</Button>
                    </SettingsItem>
                    <RichMenuImage
                      files={imagePath}
                      setImagePath={setImagePath}
                    />
                    <ListGroup.Item className="d-flex justify-content-between px-0 py-3 border-bottom">
                      <Col md={3} className="h6 mb-1">アクション</Col>
                      <AccordionAction
                        richMenu={richMenu}
                        formValue={formValue}
                        handleChangeAsNumber={handleChangeAsNumber}
                        pages={pages}
                        checklLinks={checklLinks}
                        externalLinks={externalLinks}
                        actionLinks={actionLinks}
                        handleLinkChange={handleLinkChange}
                        error={error}
                        handleCheckChange={handleCheckChange}
                        ailias={ailias}
                      />
                    </ListGroup.Item>
                    {/* <SettingsItem
                      id={3}
                      title="テンプレートの枠線を表示"
                      className='py-4'
                    >
                      <MenuBarSetting 
                        title=''
                        handleClick={handleClickTemplate}
                        id="template-check" 
                        name="template-check" 
                        value={templateFrame}
                      />
                    </SettingsItem> */}
                    <ListGroup.Item className={`px-0 py-4`}>
                      <Row className="align-items-center">
                        <Col md={4} className="h6 align-middle"><Badge bg="danger" className="me-2">必須</Badge>メニューバーテキスト</Col>
                        <Col md={8} className="">
                          <Form.Group id="menu_bar_text">
                            <Form.Control
                              type="text"
                              name="menuBarText"
                              value={formValue.menuBarText}
                              onChange={handleChange}
                              placeholder="テキストを入力"
                              isInvalid={!!error.menuBarText}
                            />
                            {
                              error.menuBarText &&
                              <Form.Control.Feedback type="invalid">{error.menuBarText[0]}</Form.Control.Feedback>
                            }
                          </Form.Group>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-end gap-2 mt-2">
                <Button variant="success" className="btn-default-success" onClick={() => saveMenu(true)}>
                  保存&デフォルト設定
                </Button>
                <Button variant="success" className="btn-default-success" onClick={() => saveMenu(false)}>
                  保存する
                </Button>
              </div>
            </Card.Footer>
          </Card>
        ) : (
          <RichMenuContentLoader />
        )
      }

    </>
  )
}