import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button, Badge , Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import { Paths } from "@/paths";
import { showInviteIncentive, updateInviteIncentive, storeInviteIncentive } from "@/pages/invitation/api/InviteIncentiveApiMethods";

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const pathname = useLocation().pathname;
  const [inviteIncentive, setInviteIncentive] = useState({
    name: '', invitee_content: '', invitee_timing: 1, invitee_format: 1, invitee_title: '',
    inviter_content: '', inviter_timing: 1, inviter_format: 1, inviter_title: ''
  });
  const [error, setError] = useState({
    name: '', invitee_content: '', invitee_timing: '', invitee_title: '',
    inviter_content: '', inviter_timing: '', inviter_title: ''
  });
  const [isDefault, setIsDefault] = useState(false);
  const timings = ['友達登録', '利用者登録', '初来店', '初購入'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError({...error, [name]: ''})
    return setInviteIncentive({...inviteIncentive, [name]: value})
  };

  const storeComplete = (message, id) => {
    Swal.fire(
      `${message}完了`, `招待情報の${message}に成功しました`, 'success'
    ).then(result => {
      if (result.isConfirmed) {
        history.push(Paths.EditInviteIncentive.path.replace(':id', id))
      }
    })
  } 

  const handleClick = () => {
    inviteIncentive.is_default = isDefault ? 1 : 0 
    if (pathname.includes('/edit')) {
      updateInviteIncentive(id, inviteIncentive, storeComplete, setError)
    } else {
      console.log(inviteIncentive);
      storeInviteIncentive(inviteIncentive, storeComplete, setError)
    }
  };

  const getFormat = (format) => {
    switch (format) {
      case 1:
        return 'オフライン'
    }
  }

  useEffect(() => {
    if (pathname.includes('/edit')) {
      showInviteIncentive(id, setInviteIncentive, setIsDefault)
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">{pathname.includes('/edit') ? 'インセンティブ編集' : 'インセンティブ登録'}</h1>
        </div>
        <Button
          variant="success"
          className="btn-default-success"
          onClick={() => handleClick()}
        >
          保存する
        </Button>
      </div>
      <Row>
        <Col xs={8}>
          <Card border="0" className="shadow mb-4">
            <Card.Header className="bg-primary text-white px-3 py-2">
              <h5 className="mb-0 fw-bolder">招待情報</h5>
            </Card.Header> 
            <Card.Body>
              <Form.Group id="name">
                <Form.Label><Badge bg="danger" className="me-2">必須</Badge>管理名称</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={inviteIncentive.name}
                  onChange={handleChange} 
                  isInvalid={!!error.name}
                />
                {
                  error.name && 
                  <Form.Control.Feedback type="invalid">{error.name[0]}</Form.Control.Feedback>
                }
              </Form.Group>
            </Card.Body>
          </Card>
          <Card className="mb-3">
						<Card.Header className="bg-primary text-white px-3 py-2">
							<h5 className="mb-0 fw-bolder">スピーカー情報</h5>
						</Card.Header>
						<Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="inviter_timing">
                    <Form.Label><Badge bg="danger" className="me-2">必須</Badge>付与タイミング</Form.Label>
                    <Form.Select className="mb-3 mt-2" name="inviter_timing" value={inviteIncentive.inviter_timing} onChange={handleChange}>
                      {
                        timings.map((timing, index) => <option key={`inviter-timing-option-${index}`} value={index + 1}>{timing}</option>)
                      }
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="inviter_format">
                    <Form.Label>形式</Form.Label>
                    <div>{getFormat(inviteIncentive.inviter_format)}</div>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="inviter_title">
                    <Form.Label><Badge bg="danger" className="me-2">必須</Badge>インセンティブ名</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="inviter_title"
                      value={inviteIncentive.inviter_title}
                      onChange={handleChange} 
                      isInvalid={!!error.inviter_title}
                    />
                    {
                      error.inviter_title && 
                      <Form.Control.Feedback type="invalid">{error.inviter_title[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="inviter_content">
                    <Form.Label><Badge bg="danger" className="me-2">必須</Badge>インセンティブ説明</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      name="inviter_content"
                      value={inviteIncentive.inviter_content}
                      onChange={handleChange}
                      placeholder="商品の概要を入力してください"
                      isInvalid={!!error.inviter_content}
                    />
                    {
                      error.inviter_content && 
                      <Form.Control.Feedback type="invalid">{error.inviter_content[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
              </Row>
						</Card.Body>
					</Card>
          <Card className="mb-3">
						<Card.Header className="bg-primary text-white px-3 py-2">
							<h5 className="mb-0 fw-bolder">招待者情報</h5>
						</Card.Header>
						<Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="invitee_timing">
                    <Form.Label><Badge bg="danger" className="me-2">必須</Badge>付与タイミング</Form.Label>
                    <Form.Select className="mb-3 mt-2" name="invitee_timing" value={inviteIncentive.invitee_timing} onChange={handleChange}>
                      {
                        timings.map((timing, index) => <option key={`invitee-timing-option-${index}`} value={index + 1}>{timing}</option>)
                      }
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="invitee_format">
                    <Form.Label>形式</Form.Label>
                    <div>{getFormat(inviteIncentive.inviter_format)}</div>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="invitee_title">
                    <Form.Label><Badge bg="danger" className="me-2">必須</Badge>インセンティブ名</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="invitee_title"
                      value={inviteIncentive.invitee_title}
                      onChange={handleChange}
                      isInvalid={!!error.invitee_title}
                    />
                    {
                      error.invitee_title && 
                      <Form.Control.Feedback type="invalid">{error.invitee_title[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="invitee_content">
                    <Form.Label><Badge bg="danger" className="me-2">必須</Badge>インセンティブ説明</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      name="invitee_content"
                      value={inviteIncentive.invitee_content} 
                      onChange={handleChange}
                      placeholder="商品の概要を入力してください"
                      isInvalid={!!error.invitee_content}
                    />
                    {
                      error.invitee_content && 
                      <Form.Control.Feedback type="invalid">{error.invitee_content[0]}</Form.Control.Feedback>
                    }
                  </Form.Group>
                </Col>
              </Row>
						</Card.Body>
					</Card>
        </Col>
        <Col>
					<Card className="mb-3">
						<Card.Header className="bg-primary text-white px-3 py-2">
							<h5 className="mb-0 fw-bolder">詳細設定</h5>
						</Card.Header>
						<Card.Body>
              <Form.Group id="category">
                <Form.Check
                type="switch"
                label="デフォルトにする"
                id="is-default-switch"
                htmlFor="is-default-switch"
                checked={isDefault}
                onChange={() => setIsDefault(!isDefault)}
                />
              </Form.Group>
						</Card.Body>
					</Card>
				</Col>
      </Row>
      <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
        <Button onClick={() => {history.push(Paths.InviteIncentives.path)}} variant='tertiary' className="mt-2 animate-up-2">
          友達紹介管理に戻る
        </Button>
      </div>
    </>
  );
};
