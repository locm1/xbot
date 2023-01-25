import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Col, Row, Form, Button, ListGroup, Card, Modal, Image } from 'react-bootstrap';
import { XIcon } from "@heroicons/react/solid";
import LinePreview from "@/components/line/LinePreview";
import ChangeTemplateModal from "@/pages/richmenu/ChangeTemplateModal";
import AccordionComponent from "@/components/AccordionComponent";

export default () => {
  const [formValue, setFormValue] = useState(
    {title: '', menuBarText: ''}
  );
  const [previews, setPreviews] = useState([
    {id: 1, key: '', content: '', files:''}
  ]);
  const [files, setFiles] = useState();

  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
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
  const [templateActive, setTemplateActive] = useState();
  const [templateFrame, setTemplateFrame] = useState(true);

  const handleClickTemplate = () => {
    setTemplateFrame(!templateFrame);
  };

  const SettingsItem = (props) => {
    const { id, title, children, last = false, className } = props;
    const borderBottomClass = !last ? "border-bottom" : "";

    return (
      <ListGroup.Item className={`d-flex align-items-center justify-content-between px-0 ${className} ${borderBottomClass}`}>
        <div>
          <Card.Text className="h6 mb-1">{title}</Card.Text>
        </div>
        <div>
          {children}
        </div>
      </ListGroup.Item>
    );
  };

  const AccordionAction = (props) => {
    const { richMenu } = props;
    
    const actions = [...Array(richMenu.size)].map((v, i) => {
      return {
        id: i + 1,
        eventKey: i + 1,
        title: String.fromCodePoint(i + 65)
      }
    });

    const options = ['選択', 'リンク', 'テキスト', 'エイリアス']

    return (
      <AccordionComponent
        data={actions}
        style={{width: '400px'}}
      >
        <Row>
          <Col md={4}>
            <div>タイプ</div>
          </Col>
          <Col md={8}>
            <Form.Select defaultValue="1" className="mb-0" name="">
              {
                options.map((option, index) => <option key={index} value={index + 1}>{option}</option>)
              }
            </Form.Select>
          </Col>
        </Row>
      </AccordionComponent>
    );
  };

  const RichMenuImage = (props) => {
    const { files, setFiles } = props;
    

    const onFileInputChange = (e) => {
      const fileObject = e.target.files[0];
      setFiles(URL.createObjectURL(fileObject))
    }

    const DropzoneFile = (props) => {
      const { files } = props;
  
      return (
        <Col xs={3} className="dropzone-preview line-preview-image-wrap pb-2">
          <div className="line-preview-image d-flex">
            <Image src={files} className="dropzone-image" />
            <Button variant="gray-800" className="product-image-button" onClick={() => setFiles()}>
              <XIcon className="icon icon-sm line-preview-image-icon" />
            </Button>
          </div>
        </Col>
      );
    };
    
    return (
      <ListGroup.Item className={`px-0 mt-3 border-bottom`}>
        <div>
          <Card.Text className="h6 mb-1">画像</Card.Text>
        </div>
        <Form className="pb-4">
          <Form.Control type="file" accept="image/*" onChange={(e) => onFileInputChange(e)} />
        </Form>
        {
          files && (
            <Row className="dropzone-files">
              <DropzoneFile files={files} setFiles={setFiles} />
            </Row>
          )
        }
      </ListGroup.Item>
    );
  };

  const MenuBarSetting = (props) => {
    const { title, preview, handleClick, id, value } = props;

    return (
      <Row style={{width: '400px'}}>
        <Col md={12} className="py-2">
          <Form.Check
              defaultChecked={value}
              type="switch"
              label={title}
              id={`switch-${id}`}
              htmlFor={`switch-${id}`}
              onClick={handleClick}
          />
        </Col>
      </Row>
    );
  };

	return (
		<>
    {
      templateModal && (
        <ChangeTemplateModal 
        setRichMenu={setRichMenu}
        show={templateModal}
        templateModal={templateModal}
        setTemplateModal={setTemplateModal}
        active={active}
        setActive={setActive}
      />
      )
    }
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">リッチメニュー設定</h1>
        </div>
      </div>
      <Card border="0" className="shadow mb-4">
        <Card.Body>
          <h5 className="mb-4 border-bottom pb-3">基本設定</h5>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="title">
                <Form.Label>タイトル</Form.Label>
                <Form.Control required type="text" name="title" value={formValue.title} onChange={(e) => handleChange(e, 'title')} placeholder="" />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card border="0" className="shadow mb-4 rich-menu-content-wrap">
        <Card.Body>
          <h5 className="mb-4 border-bottom pb-3">コンテンツ設定</h5>
          <div className="d-flex justify-content-between">
            <div className='line-rich-menu-preview'>
              <LinePreview 
                formValue={formValue}
                files={files}
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
                  <Button variant="gray-800" className="me-2 mb-3" onClick={() => setTemplateModal(!templateModal)}>選択する</Button>
                </SettingsItem>
                <RichMenuImage 
                  files={files}
                  setFiles={setFiles}
                />
                <SettingsItem
                  id={3}
                  title="アクション"
                  className='py-4'
                >
                  <AccordionAction richMenu={richMenu}></AccordionAction>
                </SettingsItem>
                <SettingsItem
                  id={3}
                  title="メニューバー設定"
                  className='py-4'
                >
                  <MenuBarSetting 
                    title='テンプレートの枠線を表示'
                    handleClick={handleClickTemplate}
                    id="template-check" 
                    value={templateFrame}
                  />
                </SettingsItem>
                <ListGroup.Item className={`px-0 mt-3 border-bottom`}>
                  <div>
                    <Card.Text className="h6 mb-1">メニューバーテキスト設定</Card.Text>
                  </div>
                  <Row style={{width: '400px'}}>
                    <Col md={12} className="py-2">
                      <Form.Group id="menu_bar_text">
                        <Form.Control
                          type="text"
                          name="menuBarText"
                          value={formValue.menuBarText}
                          onChange={(e) => handleChange(e, 'menuBarText')}
                          placeholder="テキストを入力"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </Card.Body>
      </Card>
		</>
	)
}