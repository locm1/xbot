import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import Swal from "sweetalert2";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Image } from 'react-bootstrap';
import { SearchIcon } from "@heroicons/react/solid";
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import { LoadingContext } from "@/components/LoadingContext";
import { InflowRouteTable } from "@/pages/inflow_route/InflowRouteTable";
import { getInflowRoutes } from "@/pages/inflow_route/api/InflowRouteApiMethods";
import axios from "axios";

export default () => {
    const [newInflows, setNewInflows] = useState("");
    const [inflows, setInflows] = useState([]);
    const [paginate, setPaginate] = useState({ 
      current_page: 1, per_page: 1, from: 1, to: 1,total: 1 
    })
    const [links, setLinks] = useState([]);

    useLayoutEffect(() => {
      const searchParams = {
        params: {page: 1}
      };
      getInflowRoutes(searchParams, setInflows, setLinks, setPaginate)
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
      setInflows={setInflows}
      getInflowRoutes={getInflowRoutes}
      links={links}
      paginate={paginate}
      setLinks={setLinks}
      setPaginate={setPaginate}
    />
    </>
	)
}