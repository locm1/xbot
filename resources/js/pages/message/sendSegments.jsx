import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Col, Row, Button, Container, Breadcrumb } from "react-bootstrap";

import { KanbanCreateModal, KanbanEditModal, KanbanCopyModal, KanbanMoveModal, KanbanEditMembersModal, KanbanEditLabelsModal } from "@/components/Modals";
import KANBAN_LISTS, { createCard, createList } from "@/data/kanban";
import { ArchiveIcon, PlusIcon, HomeIcon } from "@heroicons/react/solid";

import { Paths } from "@/paths";
import segments from "@/data/segments";
import SegmentList from "@/pages/message/segment/Segments";
import SegmentCard from "@/pages/message/segment/SegmentCard";
import MessageDetail from "@/pages/message/MessageDetail";

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
  const [segmentLists, setSegments] = useState(segments);
  const [kanbanLists, setKanbanLists] = useState(KANBAN_LISTS);
  const createCardDefaultProps = { listId: kanbanLists[0].id, cardIndex: 0 };
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [createCardProps, setCreateCardProps] = useState(createCardDefaultProps);
  const [cardToEdit, setCardToEdit] = useState(null);
  const [cardToCopy, setCardToCopy] = useState(null);
  const [cardToMove, setCardToMove] = useState(null);
  const [cardToChangeMembers, setCardToChangeMembers] = useState(null);
  const [cardToChangeLabels, setCardToChangeLabels] = useState(null);
  const [listToCopy, setListToCopy] = useState(null);
  const [listToMoveIndex, setListToMoveIndex] = useState(null);

  const toggleCreateListModal = () => {
    setShowCreateListModal(!showCreateListModal);
  };

  const toggleCreateCardModal = (props = {}) => {
    setCreateCardProps({ ...createCardDefaultProps, ...props });
    setShowCreateCardModal(!showCreateCardModal);
  };

  const getCardStyle = (style, snapshot) => {
    const isJustDragging = snapshot.isDragging && !snapshot.isDropAnimating

    if (!isJustDragging) {
      return style;
    }

    return {
      ...style,
      transform: `${style.transform || ""} rotate(6deg)`
    };
  };

  const handleCreateCard = (props = {}) => {
    const listsUpdated = createCardInListAtIndex({ ...createCardProps, ...props });

    toggleCreateCardModal();
    setKanbanLists(listsUpdated);
  };

  const handleCopyCard = (card = {}) => {
    const { listId, title, description, } = card;
    const listsUpdated = createCardInListAtIndex({ listId, title, description });

    setCardToCopy(null);
    setKanbanLists(listsUpdated);
  };

  const handleMoveList = ({ source, destination }) => {
    const lists = [...segmentLists];
    const [listRemoved] = lists.splice(source.index, 1);
    lists.splice(destination.index, 0, listRemoved);

    setSegments(lists);
    setListToMoveIndex(null);
  };

  const handleCreateList = (props) => {
    const newList = createList(props);
    const listsUpdated = [...kanbanLists, newList];

    setShowCreateListModal(false);
    setKanbanLists(listsUpdated);
    setListToCopy(null);
  };

  const reorderCards = (cards = [], startIndex, endIndex) => {
    const [cardRemoved] = cards.splice(startIndex, 1);
    cards.splice(endIndex, 0, cardRemoved);

    return cards;
  };

  const moveCardFromList = (sList, dList, sIndex, dIndex) => {
    const sCards = [...sList.cards];
    const dCards = [...dList.cards];

    const [cardRemoved] = sCards.splice(sIndex, 1);
    dCards.splice(dIndex, 0, cardRemoved);

    return [
      { ...sList, cards: sCards },
      { ...dList, cards: dCards }
    ];
  };

  const handleDragEnd = (dragResult) => {
    const { source, destination } = dragResult;

    //  dropped outside the list
    if (!destination) {
      return;
    }

    const { droppableId: sListId, index: sCardIndex } = source;
    const { droppableId: dListId, index: dCardIndex } = destination;

    const sList = segmentLists.find(list => Number(list.id) === Number(sListId));
    const dList = segmentLists.find(list => Number(list.id) === Number(dListId));

    if (sListId === dListId) {
      // reorder cards in the list only if card's index changes
      if (sCardIndex !== dCardIndex) {
        const sCardsUpdated = reorderCards(sList.cards, sCardIndex, dCardIndex);
        const listsUpdated = segmentLists.map(l => l.id === sListId ? { ...l, cards: sCardsUpdated } : l);
        setSegments(listsUpdated);
      }
    } else {
      const [sListUpdated, dListUpdated] = moveCardFromList(sList, dList, sCardIndex, dCardIndex);
      const listsUpdated = segmentLists.map(l => Number(l.id) === Number(sListId) ? sListUpdated : Number(l.id) === Number(dListId) ? dListUpdated : l);
      setSegments(listsUpdated);
    }

    if (cardToMove) {
      setCardToMove(null);
    }
  };

  const removeCardsFromList = (cards) => {
    const cardsGroupedByListId = cards.reduce((acc, card) => {
      const { listId, cardId } = card;

      if (!acc[listId]) acc[listId] = [cardId];
      else acc[listId].push(cardId);

      return acc
    }, {});

    const listsUpdated = kanbanLists.map(l => {
      const cardsToDelete = cardsGroupedByListId[l.id];
      if (!cardsToDelete) return l;

      const cardsUpdated = l.cards.filter(c => !cardsToDelete.includes(c.id));
      return ({ ...l, cards: cardsUpdated });
    });

    return listsUpdated;
  };

  const handleListDelete = async (listId) => {
    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "Confirm deletion",
      text: "Are you sure do you want to delete this list?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      const listsUpdated = kanbanLists.filter(l => l.id !== listId);
      setKanbanLists(listsUpdated);

      await SwalWithBootstrapButtons.fire("Deleted", "The list has been deleted.", "success");
    }
  };

  const handleCardsDelete = async (cards = []) => {
    const cardsNr = cards.length;
    const textMessage = cardsNr === 1
      ? "Are you sure do you want to delete this card?"
      : `Are you sure do you want to delete these ${cardsNr} cards?`;

    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "Confirm deletion",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      const listsUpdated = removeCardsFromList(cards);
      setKanbanLists(listsUpdated);

      const confirmMessage = cardsNr === 1 ? "The card has been deleted." : "The cards have been deleted.";
      await SwalWithBootstrapButtons.fire("Deleted", confirmMessage, "success");
    }
  };

  const handleArchiveCards = async (cards = []) => {
    const cardsNr = cards.length;
    const textMessage = cardsNr === 1
      ? "Are you sure do you want to archive this card?"
      : `Are you sure do you want to archive these ${cardsNr} cards?`;

    const result = await SwalWithBootstrapButtons.fire({
      icon: "question",
      iconHtml: ArchiveIconHtml,
      title: "Confirm archivation",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      setCardToEdit(null);
      const listsUpdated = removeCardsFromList(cards);
      setKanbanLists(listsUpdated);

      const confirmMessage = cardsNr === 1 ? "The card has been archived." : "The cards have been archived.";
      await SwalWithBootstrapButtons.fire('Archived', confirmMessage, 'success');
    }
  };

  const handleListTitleChange = ({ id, title }) => {
    const listsUpdated = kanbanLists.map(l => l.id === id ? ({ ...l, title }) : l);
    setKanbanLists(listsUpdated);
  };

  const handleCardChange = (props) => {
    const { listId, cardId, ...otherProps } = props;

    const listsUpdated = kanbanLists.map(l => {
      if (l.id !== listId) return l;

      const cards = l.cards.map(c => c.id === cardId ? ({ ...c, ...otherProps }) : c);
      return { ...l, cards };
    });

    if (cardToEdit) {
      setCardToEdit({ ...cardToEdit, ...otherProps });
    }

    setKanbanLists(listsUpdated);
    setCardToChangeMembers(null);
  };

  const createCardInListAtIndex = (props) => {
    const { listId, cardIndex, ...otherProps } = props;

    const listsUpdated = kanbanLists.map(l => {
      if (listId !== l.id) return l;

      const newCard = createCard(otherProps);
      l.cards.splice(cardIndex, 0, newCard);

      return l;
    });

    return listsUpdated;
  };

  return (
    <>

{showCreateCardModal && (
        <KanbanCreateModal
          show={showCreateCardModal}
          onHide={toggleCreateCardModal}
          onSubmit={handleCreateCard}
        />
      )}

      {cardToEdit && (
        <KanbanEditModal
          show={true}
          {...cardToEdit}
          onHide={() => setCardToEdit(null)}
          onArchive={(card) => handleArchiveCards([card])}
          onMove={(card) => setCardToMove(card)}
          onEditMembers={(card) => setCardToChangeMembers(card)}
          onEditLabels={(card) => setCardToChangeLabels(card)}
          onChange={handleCardChange}
        />
      )}

      {cardToChangeMembers && (
        <KanbanEditMembersModal
          show={true}
          {...cardToChangeMembers}
          onHide={() => setCardToChangeMembers(null)}
          onSubmit={handleCardChange}
        />
      )}

      {cardToChangeLabels && (
        <KanbanEditLabelsModal
          show={true}
          {...cardToChangeLabels}
          onHide={() => setCardToChangeLabels(null)}
          onSubmit={handleCardChange}
        />
      )}

      {cardToCopy && (
        <KanbanCopyModal
          show={true}
          {...cardToCopy}
          lists={kanbanLists}
          onHide={() => setCardToCopy(null)}
          onSubmit={handleCopyCard}
        />
      )}

      {cardToMove && (
        <KanbanMoveModal
          show={true}
          {...cardToMove}
          lists={kanbanLists}
          onHide={() => setCardToMove(null)}
          onSubmit={handleDragEnd}
        />
      )}

      {showCreateListModal && (
        <KanbanCreateModal
          type="list"
          modalTitle="Add a new list"
          show={showCreateListModal}
          onHide={toggleCreateListModal}
          onSubmit={handleCreateList}
        />
      )}

      {listToCopy && (
        <KanbanCopyModal
          show={true}
          type="list"
          {...listToCopy}
          onHide={() => setListToCopy(null)}
          onSubmit={handleCreateList}
        />
      )}

      {listToMoveIndex !== null && (
        <KanbanMoveModal
          show={true}
          type="list"
          lists={kanbanLists}
          listIndex={listToMoveIndex}
          onHide={() => setListToMoveIndex(null)}
          onSubmit={handleMoveList}
        />
      )}

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><HomeIcon className="icon icon-xs" /></Breadcrumb.Item>
            <Breadcrumb.Item>メッセージ管理</Breadcrumb.Item>
            <Breadcrumb.Item active>セグメント配信</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-title">セグメント配信</h1>
        </div>
      </div>
      <Row>
        <Col xs={12} xl={12}>
        <div className="btn-group target-count-wrap" role="group" aria-label="Basic radio toggle button group">
          <div className="btn btn-primary d-flex pe-none align-items-center">キーワード選択</div>
            <div className="btn btn-outline-primary pe-none bg-white">該当人数
            <div className="fs-4 people-wrap d-inline"> <span className="people text-primary" id="people">28</span> </div>人 
          </div>
        </div>
        </Col>
      </Row>

      <Container fluid className=" py-4 px-0">
        <Row className="d-flex flex-nowrap">
          <DragDropContext onDragEnd={handleDragEnd}>
            {segmentLists.map((list, ind) => {
              const { id: listId, cards } = list;

              return (
                <Droppable index={ind} droppableId={`${listId}`} key={`segment-list-${listId}`}>
                  {provided => {
                    const { innerRef: listRef, placeholder, droppableProps } = provided;

                    return (
                      <SegmentList
                        {...list}
                        listRef={listRef}
                        extraProps={droppableProps}
                      >
                        {cards.map((card, index) => {
                          const { id: cardId } = card;

                          return (
                            <Draggable index={index} draggableId={`segment-card-${cardId}`} key={`segment-card-${cardId}`}>
                              {(provided, snapshot) => {
                                const { innerRef: cardRef, draggableProps, dragHandleProps } = provided;

                                return (
                                  <SegmentCard
                                    {...card}
                                    card={card}
                                    cardRef={cardRef}
                                    style={getCardStyle(draggableProps.style, snapshot)}
                                    extraProps={{ ...draggableProps, ...dragHandleProps }}
                                    onDelete={() => handleCardsDelete([{ listId, cardId }])}
                                    onClick={() => setCardToEdit({ listId, index, ...card })}
                                    onEdit={() => setCardToEdit({ listId, index, ...card })}
                                    onCopy={() => setCardToCopy({ listId, ...card })}
                                    onMove={() => setCardToMove({ listId, index })}
                                    onChangeMembers={() => setCardToChangeMembers({ listId, ...card })}
                                    onChangeLabels={() => setCardToChangeLabels({ listId, ...card })}
                                  />
                                );
                              }}
                            </Draggable>
                          )
                        })}

                        {placeholder}
                        <Button
                          variant="outline-gray-500"
                          onClick={() => toggleCreateCardModal({ listId, cardIndex: cards.length })}
                          className="d-inline-flex align-items-center justify-content-center dashed-outline new-card w-100"
                        >
                          <PlusIcon className="icon icon-xs me-2" /> 追加
                        </Button>
                      </SegmentList>
                    );
                  }}
                </Droppable>
              )
            })}
          </DragDropContext>
        </Row>
      </Container>
      
      <MessageDetail />

      <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
        <Button href={Paths.Users.path} variant="gray-800" className="mt-2 animate-up-2 w-50 segment-button-position">
          ユーザーID抽出
        </Button>
        <Button href={Paths.Users.path} variant="gray-800" className="mt-2 animate-up-2 w-50 segment-button-position">
          配信する
        </Button>
      </div>
    </>
  );
};
