import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import Swal from "sweetalert2";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Image } from 'react-bootstrap';
import { SearchIcon } from "@heroicons/react/solid";
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import { LoadingContext } from "@/components/LoadingContext";
import { InflowRouteTable } from "./InflowRouteTable";
import axios from "axios";

export default () => {
    const [newInflows, setNewInflows] = useState("");
    const [inflows, setInflows] = useState([]);
    useLayoutEffect(() => {
      axios.get('/api/v1/management/inflow-routes')
      .then((response) => {
        const newData = response.data.map(v => ({
          id: v.id,
          name: v.name,
          uri: "https://liff.line.me/1660723896-RmovvEYY?path=inflow-route/" + v.key,
          count: v.count
        }))
        setInflows(newData);
      })
      .catch(error => {
          console.error(error);
      },);
    }, [])

    const handleChange = (e) => {
      setNewInflows(e.target.value);
    }

    const submit = () => {
      axios.post('/api/v1/management/inflow-routes', {name: newInflows})
      .then((response) => {
        setInflows([...inflows, {
          id: response.data.id,
          name: response.data.name,
          uri: "https://liff.line.me/1660723896-RmovvEYY?path=inflow-route/" + response.data.key,
          count: v.count
        }]);
        setNewInflows("");
      })
      .catch(error => {
          console.error(error);
      });
    }

	return (
		<>      
    <Button onClick={() => console.log(inflows)} />
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-2 list-wrap">
      <div className="">
        <h1 className="page-title">流入経路管理</h1>
      </div>
      <div className="w-50 d-flex justify-content-end">
        <Form.Control value={newInflows} onChange={handleChange} className="w-50" placeholder="管理名称" />
        <Button onClick={submit}>新規追加</Button>
      </div>
    </div>

    <InflowRouteTable
     inflows={inflows}
    />
	  </>
	)
}