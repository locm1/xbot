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
      confirmButton: 'btn btn-primary me-3',
      cancelButton: 'btn btn-gray'
    },
    buttonsStyling: false
  }));

  const confirmDeleteCategory = async(id) => {
    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "削除確認",
      text: "本当にこのカテゴリを削除しますか？",
      showCancelButton: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル"
    });

    if (result.isConfirmed) {
      deleteCategory(id, completeDelete);
    }
  }

  const getIsUndisclosed = (isUndisclosed) => {
    switch (isUndisclosed) {
      case 1:
        return '非公開'
      case 0:
        return '公開'
    }
  }

  const onDragEnd = (result) => {
    handleOnDragEnd(result, categories, sortCategory)
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
              <th className="border-gray-200">公開ステータス</th>
              <th className="border-gray-200 ">削除</th>
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
                              <td style={{width: "150px"}} className="">
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
        <Card.Footer className="px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
        </Card.Footer>
      </Card.Body>
    </Card>
  )
}