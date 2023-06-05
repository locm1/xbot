import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Image } from 'react-bootstrap';
import { SearchIcon } from "@heroicons/react/solid";
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import { LoadingContext } from "@/components/LoadingContext";
import { InflowRouteTable } from "@/pages/inflow_route/InflowRouteTable";
import { getInflowRoutes, deleteInflowRoutes } from "@/pages/inflow_route/api/InflowRouteApiMethods";
import axios from "axios";

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-danger',
    cancelButton: 'btn btn-gray-400 me-3'
  },
  buttonsStyling: false
}));

export default () => {
    const [newInflows, setNewInflows] = useState("");
    const [inflows, setInflows] = useState([]);
    const [paginate, setPaginate] = useState({ 
      current_page: 0, per_page: 0, from: 0, to: 0,total: 0 
    })
    const [links, setLinks] = useState([]);
    const [liffId, setLiffId] = useState('');
    const [isRendered, setIsRendered] = useState(false);

    const showConfirmDeleteModal = async (id) => {
      const textMessage = "本当にこの流入経路を削除しますか？";
  
      const result = await SwalWithBootstrapButtons.fire({
        icon: "error",
        title: "削除確認",
        text: textMessage,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: "削除",
        cancelButtonText: "キャンセル"
      });
  
      if (result.isConfirmed) {
        deleteInflowRoutes(id, deleteComplete)
      }
    };

    const deleteComplete = async (id) => {
      const confirmMessage = "選択した項目は削除されました。";
      await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
      const newInflows = inflows.filter(inflow => inflow.id !== id)

      const currentPage = newInflows.length == 0 ? paginate.current_page - 1 : paginate.current_page
      const searchParams = {
        params: {page: currentPage}
      };
      getInflowRoutes(searchParams, setInflows, setLinks, setPaginate, liffId, setIsRendered)
    };

    useLayoutEffect(() => {
      axios.get('/api/v1/get-liff-id')
      .then(async (response) => {
        setLiffId(response.data);
        const searchParams = {
          params: {page: 1}
        };
        await getInflowRoutes(searchParams, setInflows, setLinks, setPaginate, response.data)
        setIsRendered(true);
        
      }).catch((error) => {
        console.error(error);
      })
    }, [])

    const handleChange = (e) => {
      setNewInflows(e.target.value);
    }

    const submit = () => {
      axios.post('/api/v1/management/inflow-routes', {name: newInflows})
      .then((response) => {
        console.log(response.data);
        setInflows([...inflows, {
          id: response.data.id,
          name: response.data.name,
          uri: "https://liff.line.me/" + liffId + "?path=inflow-route/" + response.data.key,
          count: response.data.count
        }]);
        setNewInflows("");
        storeComplete();
        const searchParams = {
          params: {page: 1}
        };
        getInflowRoutes(searchParams, setInflows, setLinks, setPaginate, liffId)
      })
      .catch(error => {
          console.error(error);
      });
    }

    const storeComplete = () => {
      Swal.fire(
        '作成完了',
        '流入経路の作成に成功しました',
        'success'
      )
    } 

	return (
		<>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 ">
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
      showConfirmDeleteModal={showConfirmDeleteModal}
      isRendered={isRendered}
    />
    </>
	)
}