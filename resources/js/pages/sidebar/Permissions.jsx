import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Col, Row, Form, Button, ListGroup, Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { getPages, updatePages } from "@/pages/sidebar/api/PermissionApiMethods";

export default () => {
	const roles = [
    {role: 1, name: '管理者'},
    {role: 2, name: '編集者'},
    {role: 3, name: '一般'},
  ]
  const [pages, setPages] = useState([]);

  const handleChange = (e, id) => {
    const currentItem = pages.filter(page => (page.id === id))[0]
    currentItem.role = e.target.value
    setPages(
      pages.map((page) => (page.id === id ? currentItem : page))
    );
  };

  const handleClick = () => {
    updatePages(pages, updateComplete)
  };

  const updateComplete = () => {
    Swal.fire(
      '更新完了',
      '権限の更新に成功しました',
      'success'
    )
  } 

  const SettingsItem = (props) => {
    const { id, name, role, last } = props;
    const borderBottomClass = !last ? "border-bottom" : "";

    return (
      <ListGroup.Item className={`d-flex align-items-center justify-content-between px-0 ${borderBottomClass}`}>
        <div>
          <Card.Text className="h6 py-3">{name}</Card.Text>
        </div>
        <div className="w-50">
          <Form.Select defaultValue={role} className="mb-0" onChange={(e) => handleChange(e, id)}>
            {
              roles.map((role, index) => <option key={index} value={role.role}>{role.name}以上</option>)
            }
          </Form.Select>
        </div>
      </ListGroup.Item>
    );
  };

  useEffect(() => {
    getPages(setPages)
  }, []);

	return (
		<>
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">権限設定</h1>
        </div>
      </div>
			<Card border="0" className="shadow mb-4 mb-xl-0">
      <Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="d-flex align-items-center justify-content-between px-0 mb-">
            <div><h5>ページ名</h5></div>
            <div className="w-50"><h5>閲覧権限</h5></div>
          </ListGroup.Item>
          {
            pages && pages.map((page, index) => <SettingsItem key={`page-setting-${page.id}`} {...page} last={(pages.length - 1 == index) ? true : false} />)
          }
        </ListGroup>
      </Card.Body>
      </Card>
			<div className="d-flex flex-row-reverse py-3">
        <Button onClick={handleClick} variant="gray-800" className="me-2">
          保存する
        </Button>
      </div>
		</>
	)
}