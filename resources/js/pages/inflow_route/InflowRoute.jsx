import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import Swal from "sweetalert2";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Image } from 'react-bootstrap';
import { SearchIcon } from "@heroicons/react/solid";
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import { LoadingContext } from "@/components/LoadingContext";
import { InflowRouteTable } from "./InflowRouteTable";

export default () => {
    const [newInflows, setNewInflows] = useState([]);
    const [inflows, setInflows] = useState([]);
    useLayoutEffect(() => {
      axios.get('/api/v1/management/inflow-routes')
      .then((response) => {
        const newInflows = response.data.map(v => ({
          id: v.id,
          name: v.name,
          uri: v.key,
        }))
        setInflows(newInflows);
      })
      .catch(error => {
          console.error(error);
      },);
    }, [])
	return (
		<>      
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-2 list-wrap">
      <div className="">
        <h1 className="page-title">流入経路管理</h1>
      </div>
      <div className="w-50 d-flex justify-content-end">
        <Form.Control className="w-50" placeholder="管理名称" />
        <Button as={Link} to={Paths.CreateRichMenu.path}>新規追加</Button>
      </div>
    </div>

    <InflowRouteTable
     inflows={inflows}
    />
	  </>
	)
}