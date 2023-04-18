import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button, Badge , Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import { showInviteIncentive, updateInviteIncentive, storeInviteIncentive } from "@/pages/invitation/api/InviteIncentiveApiMethods";

export default () => {
  const { id } = useParams();
  const pathname = useLocation().pathname;
  const [inviteIncentive, setInviteIncentive] = useState({
    name: '', invitee_content: '', invitee_timing: 1, invitee_format: 1, invitee_title: '',
    inviter_content: '', inviter_timing: 1, inviter_format: 1, inviter_title: ''
  });
  const [isDefault, setIsDefault] = useState(false);
  const timings = ['友達登録', '利用者登録', '初来店', '初購入'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    return setInviteIncentive({...inviteIncentive, [name]: value})
  };

  const storeComplete = (message) => {
    Swal.fire(
      `${message}完了`, `招待情報の${message}に成功しました`, 'success'
    )
  } 

  const handleClick = () => {
    inviteIncentive.is_default = isDefault ? 1 : 0 
    if (pathname.includes('/edit')) {
      updateInviteIncentive(id, inviteIncentive, storeComplete)
    } else {
      console.log(inviteIncentive);
      storeInviteIncentive(inviteIncentive, storeComplete)
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
      showInviteIncentive(id, setInviteIncentive)
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">{pathname.includes('/edit') ? 'インセンティブ編集' : 'インセンティブ登録'}</h1>
        </div>
      </div>
      <Card border="0" className="shadow mb-4">
        <Card.Header className="bg-primary text-white px-3 py-2">
          <h5 className="mb-0 fw-bolder">招待情報</h5>
        </Card.Header> 
        <Card.Body>
          <div>
            <div className="d-flex justify-content-between flex-row-reverse">
              <Form.Group id="category">
                <Form.Check
                type="switch"
                label="デフォルトにする"
                id="is-default-switch"
                htmlFor="is-default-switch"
                checked={isDefault}
                onClick={() => setIsDefault(!isDefault)}
                />
              </Form.Group>
            </div>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="name">
                  <Form.Label>管理名称</Form.Label>
                  <Form.Control required type="text" name="name" value={inviteIncentive.name} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div className="mt-4">
            <h5 className="mb-4 border-bottom pb-3">スピーカー情報</h5>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="inviter_timing">
                  <Form.Label>付与タイミング</Form.Label>
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
                  <Form.Label>インセンティブ名</Form.Label>
                  <Form.Control required type="text" name="inviter_title" value={inviteIncentive.inviter_title} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="inviter_content">
                  <Form.Label>インセンティブ説明</Form.Label>
                  <Form.Control as="textarea" rows="3" name="inviter_content" value={inviteIncentive.inviter_content} onChange={handleChange} placeholder="商品の概要を入力してください" />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div className="mt-4">
            <h5 className="mb-4 border-bottom pb-3">招待者情報</h5>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="invitee_timing">
                  <Form.Label>付与タイミング</Form.Label>
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
                  <Form.Label>インセンティブ名</Form.Label>
                  <Form.Control required type="text" name="invitee_title" value={inviteIncentive.invitee_title} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="invitee_content">
                  <Form.Label>インセンティブ説明</Form.Label>
                  <Form.Control as="textarea" rows="3" name="invitee_content" value={inviteIncentive.invitee_content} onChange={handleChange} placeholder="商品の概要を入力してください" />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="success"
              className="d-inline-flex align-items-center"
              onClick={handleClick}
            >
              {pathname.includes('/edit') ? '更新する' : '保存する'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
