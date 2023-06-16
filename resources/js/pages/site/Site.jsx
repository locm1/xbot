import { useState, useEffect } from "react";
import { Col, Row, Form, Button, InputGroup, Card, Badge, Nav, Pagination, Image } from 'react-bootstrap';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Paths } from "@/paths";
import Swal from "sweetalert2";
import { getSiteSettings, storeSiteSetting, updateSiteSetting } from "@/pages/site/api/SiteApiMethods";


export default () => {
  const [loginLogoImage, setLoginLogoImage] = useState();
  const [sidebarLogoImage, setSidebarLogoImage] = useState();
  const [setting, setSetting] = useState({
    logo_login_path: '', logo_sidebar_path: ''
  });

  const dataFetch = async () => {
    try {
      await getSiteSettings(setSetting)
      //setIsRendered(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    const { name } = e.target;
    if (name === 'logo_login_path') {
      setLoginLogoImage(e.target.files[0])
    } else {
      setSidebarLogoImage(e.target.files[0])
    }

    const reader = new FileReader()
      reader.onload = (e) => {
        setSetting({ ...setting, [name]: e.target.result })
      }
    reader.readAsDataURL(e.target.files[0])
  }

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("logo_login_image", loginLogoImage);
    formData.append("logo_sidebar_image", sidebarLogoImage);

    try {
      if (setting.id) {
        await updateSiteSetting(formData)
      } else {
        await storeSiteSetting(formData)
      }
      Swal.fire('保存成功', `サイト設定の保存に成功しました`, 'success').then((result) => {
        dataFetch()
      });

    } catch (error) {
      console.log(error);
    }
  }

	useEffect(() => {
    dataFetch()
	}, [])

	return (
		<>
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-2 list-wrap">
				<div className="">
					<h1 className="page-title">サイト管理</h1>
				</div>
			</div>
      <Card border="0" className="shadow mb-4">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">ログイン画面ロゴ設定</h5>
        </Card.Header> 
        <Card.Body>
          <Row>
            <Col md={6} className="mb-4">
              <Form.Group id="logo_login_path">
                <Form.Label><Badge bg="danger" className="me-2">必須</Badge>画像</Form.Label>
                <Form.Control
                  type="file"
                  name="logo_login_path"
                  accept="image/png"
                  className="w-100"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-4">
              <Form.Group>
                <Form.Label>プレビュー</Form.Label>
                <div className="site-logo-preview">
                  <Image src={setting.logo_login_path} className="" />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card border="0" className="shadow mb-4">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">マイページ・サイドバーロゴ設定</h5>
        </Card.Header> 
        <Card.Body>
          <Row>
            <Col md={6} className="mb-4">
              <Form.Group id="logo_sidebar_path">
                <Form.Label><Badge bg="danger" className="me-2">必須</Badge>画像</Form.Label>
                <Form.Control
                  type="file"
                  name="logo_sidebar_path"
                  accept="image/png"
                  className="w-100"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-4">
              <Form.Group>
                <Form.Label>プレビュー</Form.Label>
                <div className="site-logo-preview">
                  <Image src={setting.logo_sidebar_path} className="" />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center pt-2">
        <Button
          variant="success"
          className="btn-default-success"
          onClick={handleClick}
        >
          保存する
        </Button>
      </div>
    </>
	)
}