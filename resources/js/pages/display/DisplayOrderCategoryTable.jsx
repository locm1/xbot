import React, { useState } from "react";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon, TrashIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import products from "@/data/products";
import { Paths } from "@/paths";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export default () => {
  const [categories, setCategory] = useState([
    {
        id: 1,
        name: "カテゴリー1",
        deleted: false
    },
    {
        id: 2,
        name: "カテゴリー2",
        deleted: false
    },
    {
        id: 3,
        name: "カテゴリー3",
        deleted: false
    },
  ]);

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
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="categories">
              {(provided) => (
                <tbody className="border-0" {...provided.droppableProps} ref={provided.innerRef}>
                  {categories.map((t, index) => {
                    if (t.deleted === false) {
                      return (
                        <Draggable key={t.id} draggableId={"q-" + t.id} index={index}>                    
                          {(provided) => (
                            <tr className="border-bottom" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <td style={{width: "30px"}}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon-xs icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                              </svg>
                              </td>
                              <td style={{width: "300px"}}>
                                <span className="fw-bold">
                                  <Link to={`/product/category/${t.id}`} className="fw-bolder">
                                  {t.name}
                                  </Link>
                                </span>
                              </td>
                              <td style={{width: "150px"}}>
                                <span className="fw-normal">
                                  10
                                </span>
                              </td>
                              <td style={{width: "150px"}} className="">
                                <TrashIcon role="button" onClick={() => deleteCategory(t.id)} className="icon icon-xs text-danger me-2" />
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