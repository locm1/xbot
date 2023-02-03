import React, { useState } from "react";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon, TrashIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

export default (props) => {
  const { categories } = props;

  const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary me-3',
      cancelButton: 'btn btn-gray'
    },
    buttonsStyling: false
  }));

  const deleteCategory = async(id) => {
    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "削除確認",
      text: "本当にこのカテゴリを削除しますか？",
      showCancelButton: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル"
    });

    if (result.isConfirmed) {
      const newCategories = categories.filter((item) => item.id !== id);
      setCategory(newCategories);
      const confirmMessage = "選択したカテゴリは削除されました。";

      await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
    }
  }

  function handleOnDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const [reorderedItem] = categories.splice(result.source.index, 1);
    categories.splice(result.destination.index, 0, reorderedItem);
  }

  return (
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Card.Body>
        <Table>
          <thead>
            <tr>
              <th className="border-gray-200"></th>
              <th className="border-gray-200">カテゴリー名</th>
              <th className="border-gray-200">商品数</th>
              <th className="border-gray-200 ">削除</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {categories.map((t, index) => {
              if (t.deleted === false) {
                return (
                  <tr className="border-bottom" key={t.id}>
                    <td style={{width: "30px"}}>
                      <FormCheckInput />
                    </td>
                    <td style={{width: "500px"}}>
                      <span className="fw-bold">
                        <Link to={Paths.EditCategory.path.replace(':id', t.id)} className="fw-bolder">
                        {t.name}
                        </Link>
                      </span>
                    </td>
                    <td style={{width: "400px"}}>
                      <span className="fw-normal">
                        {t.products_count}
                      </span>
                    </td>
                    <td style={{width: "150px"}} className="">
                      <TrashIcon role="button" onClick={() => deleteCategory(t.id)} className="icon icon-xs text-danger me-2" />
                    </td>
                  </tr>
                );
              } else if (t.deleted === true) {
                return;
              } else {
                return <div>error</div>;
              }
            })}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
        </Card.Footer>
      </Card.Body>
    </Card>
  )
}