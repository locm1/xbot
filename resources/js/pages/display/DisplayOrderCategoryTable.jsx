import React, { useState } from "react";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon, TrashIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import products from "@/data/products";
import { Paths } from "@/paths";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

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

  function handleOnDragEnd(result) {
    if (!result.destination) {
      return;
    }
    console.log(result);
    //reorderedItemがドラッグ&ドロップしたようそ
    const [reorderedItem] = categories.splice(result.source.index, 1);
    categories.splice(result.destination.index, 0, reorderedItem);
    sortCategories(reorderedItem);
  }

  const getIsUndisclosed = (isUndisclosed) => {
    switch (isUndisclosed) {
      case 1:
        return '非公開'
      case 0:
        return '公開'
    }
  }


  const sortCategories = async (reorderedItem) => {

    const getAroundCategory = () => {
      let prevItem = null;
      let nextItem = null;
      // 要素を先頭にドラッグ&ドロップした場合
      if (reorderedItemIndex == 0) {
        //先頭にした場合は、後ろの値だけ取ってくる
        nextItem = categories[reorderedItemIndex + 1];
      } else if (categories.slice(-1)[0].id == categories[reorderedItemIndex].id) {
        // 配列の最後の要素とドラッグ&ドロップの要素が同じな場合（要素を最後にドラッグ&ドロップした場合）
        //最後の場合は、前の値のみ取ってくる
        prevItem = categories[reorderedItemIndex - 1];
      } else {
        prevItem = categories[reorderedItemIndex - 1];
        nextItem = categories[reorderedItemIndex + 1];
      }
      return [prevItem, nextItem];
    }

    const reorderedItemIndex = categories.findIndex(({id}) => id === reorderedItem.id);
    const [prevItem, nextItem] = getAroundCategory();
    console.log(prevItem);
    console.log(nextItem);
    const displayOrder = {
      begin_item: prevItem, end_item: nextItem
    };
    sortCategory(reorderedItem.id, displayOrder);
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
          <DragDropContext onDragEnd={handleOnDragEnd}>
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
                                <TrashIcon role="button" onClick={() => confirmDeleteCategory(t.id)} className="icon icon-xs text-danger me-2" />
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