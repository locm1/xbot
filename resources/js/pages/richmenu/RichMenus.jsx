import React, { useState, useEffect, useLayoutEffect } from "react";
import Swal from "sweetalert2";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { SearchIcon } from "@heroicons/react/solid";
import { Link, useHistory } from 'react-router-dom';
import { RichMenusTable } from "./RichMenusTable";
import { Paths } from "@/paths";

export default () => {
  const [menus, setMenus] = useState([]);
  useLayoutEffect(() => {
    axios.get('/api/v1/management/rich-menus')
    .then((response) => {
      setMenus(response.data);
    })
    .catch(error => {
        console.error(error);
    },);
  }, [])
	return (
		<>      
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap">
      <div className="d-flex mb-4 mb-md-0">
        <h1 className="page-title">リッチメニュー管理</h1>
        <Button onClick={() => console.log(menus)} />
      </div>
      <Button as={Link} to={Paths.CreateRichMenu.path}>新規作成</Button>
    </div>

    <RichMenusTable
      menus={menus}
    />
	  </>
	)
}