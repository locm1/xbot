import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import Swal from "sweetalert2";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Image } from 'react-bootstrap';
import { SearchIcon } from "@heroicons/react/solid";
import { Link, useHistory } from 'react-router-dom';
import { RichMenusTable } from "./RichMenusTable";
import { Paths } from "@/paths";
import { LoadingContext } from "@/components/LoadingContext";

export default () => {
  const { setIsLoading } = useContext(LoadingContext);
  const [menus, setMenus] = useState([]);
  useLayoutEffect(() => {
    setIsLoading(true);
    axios.get('/api/v1/management/rich-menus')
    .then((response) => {
      response.data.sort((a, b) => a.name.localeCompare(b.name));
      setMenus(response.data);
      setIsLoading(false);
    })
    .catch(error => {
        console.error(error);
        setIsLoading(false);
    },);
  }, [])
	return (
		<>      
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-2 list-wrap">
      <div className="">
        <h1 className="page-title">リッチメニュー管理</h1>
      </div>
      <Button as={Link} to={Paths.CreateRichMenu.path}>新規作成</Button>
    </div>

    <RichMenusTable
      menus={menus}
      setMenus={setMenus}
    />
	  </>
	)
}