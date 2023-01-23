import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Col, Row, Form, Button, ListGroup, Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";
import AccordionComponent from "@/components/AccordionComponent";

export default (props) => {
  const { files, setFiles, templateModal, setTemplateModal } = props;
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: files => setFiles(files.map(file => ({
      ...file,
      preview: URL.createObjectURL(file)
    })))
  });

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

  const DropzoneFile = (props) => {
    const { path, preview } = props;

    return (
      <Col xs={3} className="dropzone-preview line-preview-image-wrap">
        <div className="line-preview-image d-flex">
          <Image src={preview} className="dropzone-image" />
          <Button variant="gray-800" className="product-image-button" onClick={() => setFiles([])}>
            <XIcon className="icon icon-sm line-preview-image-icon" />
          </Button>
        </div>
      </Col>
    );
  };

  const AccordionAction = (props) => {
    const { path, preview } = props;
    
    const actions = [...Array(6)].map((v, i) => {
      return {
        id: i + 1,
        eventKey: `panel-${i + 1}`,
        title: String.fromCodePoint(i + 65)
      }
    });

    const options = ['選択', 'リンク', 'テキスト', 'エイリアス']


    return (
      <AccordionComponent
        data={actions}
        style={{width: '500px'}}
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

  const MenuBarSetting = (props) => {
    const { title, preview } = props;

    return (
      <Row style={{width: '400px'}}>
        <Col md={9} className="my-2 pb-1">
          <Card.Text className="h6">{title}</Card.Text>
        </Col>
        <Col md={3} className="py-2">
          <Form.Check className="form-switch">
            <Form.Check.Input defaultChecked={false} type="checkbox" id={`user-notification`} />
          </Form.Check>
        </Col>
      </Row>
    );
  };

	return (
		<>
      <Card border="0" className="shadow mb-4">
        <Card.Body>
          <h5 className="mb-4 border-bottom pb-3">コンテンツ設定</h5>
          <ListGroup className="list-group-flush">
            <SettingsItem
              id={1}
              title="テンプレート"
            >
              <Button variant="gray-800" className="me-2 mb-3" onClick={() => setTemplateModal(!templateModal)}>選択する</Button>
            </SettingsItem>
            <SettingsItem
              id={2}
              title="画像"
              className='mt-3'
            >
              <div style={{width: '400px'}}>
                <Form {...getRootProps({ className: "dropzone rounded d-flex align-items-center justify-content-center mb-4" })}>
                  <Form.Control {...getInputProps()} />
                  <div className="dz-default dz-message text-center">
                    <p className="dz-button mb-0">画像をアップロード、もしくはドラッグアンドドロップをしてください。</p>
                  </div>
                </Form>
              </div>
              <Row className="dropzone-files">
                {files.map(file => <DropzoneFile key={file.path} {...file} />)}
              </Row>
            </SettingsItem>
            <SettingsItem
              id={3}
              title="アクション"
              className='py-4'
            >
              <AccordionAction></AccordionAction>
            </SettingsItem>
            <SettingsItem
              id={3}
              title="メニューバー設定"
              className='py-4'
            >
              <MenuBarSetting title='メニューのデフォルト表示 ' />
              <MenuBarSetting title='テンプレートの枠線を表示' />
            </SettingsItem>
          </ListGroup>
        </Card.Body>
      </Card>
		</>
	)
}