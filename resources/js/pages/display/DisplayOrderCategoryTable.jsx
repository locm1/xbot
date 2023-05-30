import React, { useState } from "react";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon, TrashIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import products from "@/data/products";
import { Paths } from "@/paths";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import { handleOnDragEnd } from "@/components/common/Sort";

export default (props) => {
  const { categories, sortCategory, deleteCategory } = props;

  const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-gray-400 me-3'
    },
    buttonsStyling: false
  }));

  const confirmDeleteCategory = async(id) => {
    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "削除確認",
      text: "本当にこのカテゴリを削除しますか？",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル"
    });

    if (result.isConfirmed) {
      deleteCategory(id, completeDelete);
    }
  }

  const getIsUndisclosed = (isUndisclosed) => {
    if (isUndisclosed == 1) {
      return <Badge bg="gray-600" className="me-2">非公開</Badge>
    } else {
      return <Badge bg="danger" className="me-2">公開</Badge>
    }
  }

  const onDragEnd = (result) => {
    handleOnDragEnd(result, categories, sortCategory)
  }

  return (
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Table className=" align-items-center">
        <thead className="bg-primary text-white">
          <tr>
            <th className="border-gray-200"></th>
            <th className="border-gray-200">カテゴリー名</th>
            <th className="border-gray-200">商品数</th>
            <th className="border-gray-200">公開ステータス</th>
            <th className="border-gray-200 ">編集・削除</th>
          </tr>
        </thead>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="categories">
            {(provided) => (
              <tbody className="border-0" {...provided.droppableProps} ref={provided.innerRef}>
                {categories.map((t, index) => {
                  if (t.deleted === false) {
                    return (
                      <Draggable key={t.id} draggableId={"q-" + t.id} index={index}>                    
                        {(provided) => (
                          <tr className={`border-bottom ${t.is_undisclosed == 1 ? "bg-gray-200" : ""}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <td style={{width: "30px"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon-xs icon">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            </td>
                            <td style={{width: "500px"}}>
                              <span className="fw-bold">
                                <Link to={Paths.EditCategory.path.replace(':id', t.id)} className="fw-bolder text-decoration-underline">
                                {t.name}
                                </Link>
                              </span>
                            </td>
                            <td style={{width: "400px"}}>
                              <span className="fw-normal">
                                {t.products_count}
                              </span>
                            </td>
                            <td style={{width: "400px"}}>
                              <span className="fw-normal">
                                {getIsUndisclosed(t.is_undisclosed)}
                              </span>
                            </td>
                            <td style={{width: "200px"}} className="">
                              <Button as={Link} to={Paths.EditCategory.path.replace(':id', t.id)} variant="info" size="sm" className="d-inline-flex align-items-center me-3">
                                編集
                              </Button>
                              <Button onClick={() => confirmDeleteCategory(t.id)} variant="danger" size="sm" className="d-inline-flex align-items-center">
                                削除
                              </Button>
                            </td>
                            {provided.placeholder}
                          </tr>
                        )}
                      </Draggable>
                    );
                  } else if (t.deleted === true) {
                    return;
                  } else {
                    return <div>error</div>;
                  }
                })}
              {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </Table>
    </Card>
  )
}