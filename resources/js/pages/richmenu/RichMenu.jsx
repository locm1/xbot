import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useDropzone } from "react-dropzone";
import { Col, Row, Form, Button, ListGroup, Card, Modal, Image } from 'react-bootstrap';
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

export default () => {
  const { setIsLoading } = useContext(LoadingContext);
  const [liffId, setLiffId] = useState();
  const { id } =  useParams();
  const richMenuId = 'richmenu-' + id;
  const pathname = useLocation().pathname;  
  const history = useHistory();
  const [fileSize, setFileSize] = useState(null);
  const richmenu_1 = [
    {id: 1, img: squares6, size: 6, type: 1},
    {id: 2, img: squares4, size: 4, type: 2},
    {id: 3, img: squares1_3, size: 4, type: 3},
    {id: 4, img: squares1_2, size: 3, type: 4},
    {id: 5, img: squares1_1, size: 2, type: 5},
    {id: 6, img: squares2_2, size: 2, type: 6},
    {id: 7, img: squares1, size: 1, type: 7},
    {id: 8, img: squares_half_3, size: 3, type: 8},
    {id: 9, img: squares_half_1_2, size: 2, type: 9},
    {id: 10, img: squares_half_2_1, size: 2, type: 10},
    {id: 11, img: squares_half_1_1, size: 2, type: 11},
    {id: 12, img: squares_half_1, size: 1, type: 12},
  ];
  const [ailias, setAilias] = useState([]);
  useLayoutEffect(() => {
    axios.get('/api/v1/management/rich-menu-ailias')
    .then((response) => {
      const responseAlias = response.data.filter(v => v.richMenuId !== richMenuId);
      setAilias(responseAlias);
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
  useEffect(() => {
    if (pathname.includes('/edit')) {
      setIsLoading(true);
      showRichMenu(richMenuId, setFormValue).then((response) => {
        setRichMenu(richmenu_1.filter(v => v.type == response.menuType)[0] ?? {id: 1, img: '', size: 6, type: 1})
        getImage(richMenuId, setImage, setImagePath).finally(() => {
          setIsLoading(false);
        }).catch(error => {
          setIsLoading(false);
        })
      })
    }
  }, []);
  const [formValue, setFormValue] = useState(
    {
      title: '', menuBarText: '', registAilias: false, menuType: 1,
    }
  );
  const [action, setAction] = useState();
  const [previews, setPreviews] = useState([
    {id: 1, key: '', content: '', files:''}
  ]);
  const [imagePath, setImagePath] = useState();
  const [image, setImage] = useState();

  const handleChange = (e) => {
    setFormValue({...formValue, [e.target.name]: e.target.value})
  };

  const handleChangeAsNumber = (e) => {
    const value = +e.target.value
    setFormValue({...formValue, [e.target.name]: value})
  }

  const handleClick = (e) => {
    setFormValue({...formValue, [e.target.name]: !formValue[e.target.name]});
  };

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
  const [templateModal, setTemplateModal] = useState(false);
  const [richMenu, setRichMenu] = useState({id: 1, img: '', size: 6, type: 1});
  const [active, setActive] = useState();
  const [templateActive, setTemplateActive] = useState([]);
  const [templateFrame, setTemplateFrame] = useState(true);

  const handleClickTemplate = () => {
    setTemplateFrame(!templateFrame);
  };
  // const richMenu = richmenu_1.filter(v => v.type === formValue.menuType) ?? {id: 1, img: '', size: 6, type: 1};

  const SettingsItem = (props) => {
    const { id, title, children, last = false, className } = props;
    const borderBottomClass = !last ? "border-bottom" : "";

    return (
      <Row className={`${className} ${borderBottomClass} align-items-center pb-3`}>
        <Col md={4}>
          <Card.Text className="h6 mb-1">{title}</Card.Text>
        </Col>
        <Col md={8}>
          {children}
        </Col>
      </Row>
    );
  };  
  
  const TypeForm = (props) => {
    const { typeValue, title } = props;
    switch (typeValue) {
      case 1:
        return (<>
        <div className="d-flex flex-wrap gap-2 mt-2">
          {pages.map((v, k) => 
            <Button key={`page-${k}`} variant={`https://liff.line.me/${liffId}?path=${v.path}` === formValue[`${title}-value`] ? "primary" : "outline-primary"} size="sm" className="description" name={`${title}-value`} value={`https://liff.line.me/${liffId}?path=${v.path}`} onClick={handleChange}>{v.name}</Button>
          )}
        </div>
          <Form.Control className="mb-3 mt-2" name={`${title}-value`} defaultValue={formValue[`${title}-value`]} onBlur={handleChange} />
        </>)
      case 2:
        return <Form.Control as="textarea" className="mb-3 mt-2" name={`${title}-value`} defaultValue={formValue[`${title}-value`]} onBlur={handleChange} />
        break;
      case 3:
        return (
          <Form.Select className="mb-3 mt-2" name={`${title}-value`} value={formValue[`${title}-value`]} onChange={handleChange}>
            <option>リッチメニューを選択する</option>
              {
                ailias.map((v, k) => <option key={`option-${k}`} value={v.richMenuAliasId}>{v.name}</option>)
              }
          </Form.Select>
        )
      default :
        return <div className="" />
    }
  }

  const AccordionAction = (props) => {
    const {formValue} = props;
    const actions = [...Array(richMenu.size)].map((v, i) => {
      return {
        id: i + 1,
        eventKey: `action-${i + 1}`,
        title: String.fromCodePoint(i + 65),
      }
    });

    const options = ['リンク', '送信テキスト', 'リッチメニュー切替']

    return (
      <Row className="w-100"> 
      {/* <Form.Control className="mb-3" name={`A-value`} value={formValue[`A-value`]} onBlur={props.handleChange} /> */}
        {actions.map((v, i) => (
          <div className="d-flex mb-3 justify-content-between" key={`actions-${i}`}>
            <Col md={1}>
              {v.title}
            </Col>
            <Col md={10}>
              <Form.Select className="mb-0" value={formValue[v.title + '-type']} name={`${v.title}-type`} onChange={handleChangeAsNumber}>
              <option value={0}>選択する</option>
                {
                  options.map((option, index) => (<option key={`option-${index}`} value={index + 1}>{option}</option>))
                }
              </Form.Select>
              <TypeForm typeValue={formValue[v.title + '-type']} title={v.title} />
            </Col>
          </div>
        ))}
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

  const saveMenu = (shouldSetDefault) => {
    const formData = new FormData();
    setIsLoading(true);
    for (const key in formValue) {
      formData.append(key, formValue[key]);
    }
    formData.append('image', image);
    formData.append('shouldSetDefault', shouldSetDefault);
    if (pathname.includes('/edit')) {
      updateRichMenu(richMenuId, formData).then(response => {
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
      storeRichMenu(formData).then(response => {
        if (response === 'failed') {
          Swal.fire({
            icon: 'error',
            title: 'エラー',
            text: `テンプレート名「${formValue.title}」を保存できませんでした`,
          })
        } else {
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
        <Button onClick={() => {history.push(Paths.RichMenus.path)}} className="mt-2 animate-up-2">一覧へ戻る</Button>
      </div>
      <Card border="0" className="shadow mb-4 rich-menu-content-wrap">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">コンテンツ設定</h5>
        </Card.Header> 
        <Card.Body>
          <Row>
            <Col md={12} className="mb-5">
              <Form.Group id="title">
                <Form.Label>タイトル</Form.Label>
                <Form.Control required type="text" name="title" value={formValue.title} onChange={handleChange} placeholder="" />
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
                  <AccordionAction formValue={formValue} handleChange={handleChange}></AccordionAction>
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
                    <Col md={4} className="h6 align-middle">メニューバーテキスト設定</Col>
                    <Col md={8} className="">
                      <Form.Group id="menu_bar_text">
                        <Form.Control
                          type="text"
                          name="menuBarText"
                          value={formValue.menuBarText}
                          onChange={handleChange}
                          placeholder="テキストを入力"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-2">
            <Button variant="success" onClick={() => saveMenu(true)}>保存&デフォルト設定</Button>
            <Button variant="success" onClick={() => saveMenu(false)}>保存する</Button>
          </div>
        </Card.Body>
      </Card>
		</>
	)
}