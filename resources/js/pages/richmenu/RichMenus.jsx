import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { SearchIcon } from "@heroicons/react/solid";
import { Link, useHistory } from 'react-router-dom';
import { RichMenusTable } from "./RichMenusTable";
import { Paths } from "@/paths";

export default () => {
  const menus = [{}];
	return (
		<>      
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 list-wrap">
      <div className="d-flex mb-4 mb-md-0">
        <h1 className="page-title">ユーザー管理</h1>
      </div>
      <Button as={Link} to={Paths.CreateRichMenu.path}>新規作成</Button>
    </div>

    <RichMenusTable
      menus={menus}
    />
	  </>
	)
}