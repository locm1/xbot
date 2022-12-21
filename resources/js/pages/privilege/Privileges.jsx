import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Col, Row, Button, Container, Breadcrumb } from "react-bootstrap";

import KanbanHeader from "@/components/KanbanHeader";
import KanbanList from "@/components/KanbanList";
import KanbanCard from "@/components/KanbanCard";
import { KanbanCreateModal, KanbanEditModal, KanbanCopyModal, KanbanMoveModal, KanbanEditMembersModal, KanbanEditLabelsModal } from "@/components/Modals";
import KANBAN_LISTS, { createCard, createList } from "@/data/kanban";
import { ArchiveIcon, PlusIcon, HomeIcon } from "@heroicons/react/solid";

import PrivilegeCard from "@/pages/privilege/PrivilegeCard";
import privileges from "@/data/privileges";

const ArchiveIconHtml = ReactDOMServer.renderToString(
  <ArchiveIcon className="h-50 w-auto" />
);

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: "btn btn-primary me-3",
    cancelButton: "btn btn-gray"
  },
  buttonsStyling: false
}));

export default () => {
  const [privilegeLists, setPrivilegeLists] = useState(privileges);
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);
  const [cardToCopy, setCardToCopy] = useState(null);
  const [cardToMove, setCardToMove] = useState(null);
  const [cardToChangeMembers, setCardToChangeMembers] = useState(null);
  const [cardToChangeLabels, setCardToChangeLabels] = useState(null);
  const [listToCopy, setListToCopy] = useState(null);
  const [listToMoveIndex, setListToMoveIndex] = useState(null);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><HomeIcon className="icon icon-xs" /></Breadcrumb.Item>
            <Breadcrumb.Item active>特典設定</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-title">特典設定</h1>
        </div>
      </div>

      <Container className="cotainer py-4 px-0">
        <Row className="privilege-card-wrap">
          {
            privilegeLists.map(privilege => 
              <PrivilegeCard 
                key={`privilege-${privilege.id}`}
                {...privilege}
                setCardToEdit={setCardToEdit}
              />
            )
          }
        </Row>
        <div className="privilege-button">
          <Button
            variant="outline-gray-500"
            onClick={() => toggleCreateCardModal({ listId, cardIndex: cards.length })}
            className="d-inline-flex align-items-center justify-content-center dashed-outline new-card w-100"
          >
            <PlusIcon className="icon icon-xs me-2" /> 特典追加
          </Button>
        </div>
      </Container>
    </>
  );
};
