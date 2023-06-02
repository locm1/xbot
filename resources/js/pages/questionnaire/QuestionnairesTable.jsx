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
import QuestionnairesContentLoader from "@/pages/questionnaire/QuestionnairesContentLoader";

export default (props) => {
  const { questionnaires, sortQuestionnaire, showConfirmDeleteModal, isRendered } = props;

  const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-gray-400 me-3'
    },
    buttonsStyling: false
  }));

  const getIsUndisclosed = (isUndisclosed) => {
    if (isUndisclosed == 1) {
      return <Badge bg="gray-600" className="me-2">非公開</Badge>
    } else {
      return <Badge bg="danger" className="me-2">公開</Badge>
    }
  }

  const getIsRequired = (is_required) => {
    if (is_required == 1) {
      return <Badge bg="danger" className="me-2">必須</Badge>
    } else {
      return <Badge bg="gray-600" className="me-2">任意</Badge>
    }
  };

  const getType = (type) => {
    switch (type) {
      case 1:
        return 'テキストボックス';
      case 2:
        return 'テキストエリア';
      case 3:
        return 'ラジオボタン';
      case 4:
        return 'チェックボックス';
      case 5:
        return 'プルダウン';
    }
  };

  const onDragEnd = (result) => {
    handleOnDragEnd(result, questionnaires, sortQuestionnaire)
  }

  return (
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Table className=" align-items-center">
        <thead className="bg-primary text-white">
          <tr>
            <th className="border-gray-200"></th>
            <th className="border-gray-200">質問項目</th>
            <th className="border-gray-200">回答形式</th>
            <th className="border-gray-200">必須・任意</th>
            <th className="border-gray-200">公開・非公開</th>
            <th className="border-gray-200 ">編集・削除</th>
          </tr>
        </thead>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questionnaires">
            {(provided) => (
              <tbody className="border-0" {...provided.droppableProps} ref={provided.innerRef}>
                {
                  isRendered ? (
                    questionnaires.map((t, index) => {
                      return (
                        <Draggable key={t.id} draggableId={"questionnaires-" + t.id} index={index}>                    
                          {(provided) => (
                            <tr className={`border-bottom ${t.is_undisclosed == 1 ? "bg-gray-200" : ""}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <td style={{width: "30px"}}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon-xs icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                              </svg>
                              </td>
                              <td style={{width: "500px"}}>
                                <span className="fw-bold">
                                  <Link to={Paths.EditQuestionnaire.path.replace(':id', t.id)} className="fw-bolder text-decoration-underline">
                                  {t.title}
                                  </Link>
                                </span>
                              </td>
                              <td style={{width: "400px"}}>
                                <span className="fw-normal">
                                  {getType(t.type)}
                                </span>
                              </td>
                              <td style={{width: "400px"}}>
                                {getIsRequired(t.is_required)}
                              </td>
                              <td style={{width: "400px"}}>
                                {getIsUndisclosed(t.is_undisclosed)}
                              </td>
                              <td style={{width: "200px"}} className="">
                                <Button as={Link} to={Paths.EditQuestionnaire.path.replace(':id', t.id)} variant="info" size="sm" className="d-inline-flex align-items-center border-white me-3">
                                  編集
                                </Button>
                                <Button onClick={() => showConfirmDeleteModal(t.id)} variant="danger" size="sm" className="d-inline-flex align-items-center">
                                  削除
                                </Button>
                              </td>
                              {provided.placeholder}
                            </tr>
                          )}
                        </Draggable>
                      );
                    })
                  ) : (
                    <QuestionnairesContentLoader />
                  )
                }
              {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </Table>
    </Card>
  )
}