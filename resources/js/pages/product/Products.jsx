import React, { useState, useEffect } from "react";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ProductsTable } from "@/pages/product/ProductsTable";
import { Paths } from "@/paths";

import { getProducts, deleteProduct } from "@/pages/product/api/ProductApiMethods";
import { getCategories } from "@/pages/product/api/ProductCategoryApiMethods";

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-danger',
    cancelButton: 'btn btn-gray-400 me-3'
  },
  buttonsStyling: false
}));

export default () => {
  const [products, setProducts] = useState([]);
  const [paginate, setPaginate] = useState({
    current_page: 0, per_page: 0, from: 0, to: 0, total: 0
  })
  const [timer, setTimer] = useState(null);
  const [links, setLinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState({
    name: '', category: ''
  });
  const [isRendered, setIsRendered] = useState(false);

  const handleChange = (e, input) => {
    setSearchValue({ ...searchValue, [input]: e.target.value })

    const searchParams = {
      params: { ...searchValue, [input]: e.target.value, page: 1 }
    };
    clearTimeout(timer);

    // 一定期間操作がなかったらAPI叩く
    const newTimer = setTimeout(() => {
      getProducts(searchParams, setProducts, setLinks, setPaginate, setIsRendered)
    }, 1000)

    setTimer(newTimer)
  };

  const deleteProducts = async (id) => {
    const textMessage = "本当にこの商品を削除しますか？";

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
      deleteProduct(id, completeDelete)
    }
  };

  const completeDelete = async (id) => {
    const confirmMessage = "選択した商品は削除されました。";
    await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
    const newProducts = products.filter(product => product.id !== id)

    const currentPage = newProducts.length == 0 ? paginate.current_page - 1 : paginate.current_page
    const searchParams = {
      params: { ...searchValue, page: currentPage }
    };
    getProducts(searchParams, setProducts, setLinks, setPaginate, setIsRendered)
  };

  useEffect(() => {
    const searchParams = {
      params: { name: null, category: null, page: 1 }
    };
    getProducts(searchParams, setProducts, setLinks, setPaginate, setIsRendered)
    getCategories(setCategories)
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">商品管理</h1>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button as={Link} to={Paths.CreateProduct.path} variant="gray-800" size="sm" className="d-inline-flex align-items-center">
            <PlusIcon className="icon icon-xs me-2" /> 商品追加
          </Button>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="d-flex align-items-center">
          <Col xs={3} lg={3} className="d-md-flex">
            <InputGroup className="">
              <InputGroup.Text>
                <SearchIcon className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="商品名"
                value={searchValue.name}
                onChange={(e) => handleChange(e, 'name')}
              />
            </InputGroup>
          </Col>
          <Col xs={3}>
            <Form.Select defaultValue={searchValue.category} className="mb-0" onChange={(e) => handleChange(e, 'category')}>
              <option>カテゴリー名</option>
              <option value="0">全て表示</option>
              {
                categories.map((category, index) => <option key={category.id} value={category.id}>{category.name}</option>)
              }
            </Form.Select>
          </Col>
        </Row>
      </div>

      <ProductsTable
        products={products}
        setProducts={setProducts}
        getProducts={getProducts}
        links={links}
        paginate={paginate}
        setLinks={setLinks}
        setPaginate={setPaginate}
        searchValue={searchValue}
        deleteProducts={deleteProducts}
        isRendered={isRendered}
      />
    </>
  );
};
