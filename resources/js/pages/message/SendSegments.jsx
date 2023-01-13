import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Col, Row, Button, Container, Breadcrumb } from "react-bootstrap";

import KANBAN_LISTS from "@/data/kanban";
import { ArchiveIcon, PlusIcon, HomeIcon } from "@heroicons/react/solid";

import { Paths } from "@/paths";
import segments from "@/data/segments";
import SegmentList from "@/pages/message/segment/Segments";
import SegmentCard from "@/pages/message/segment/SegmentCard";
import MessageDetail from "@/pages/message/MessageDetail";
import { SegmentCardCreateModal } from "@/pages/message/segment/SegmentCardCreateModal";

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
  const [cards, setCards] = useState(segments);
  const [segmentLists, setSegments] = useState(segments);
  const [kanbanLists, setKanbanLists] = useState(KANBAN_LISTS);
  const createCardDefaultProps = { listId: kanbanLists[0].id, cardIndex: 0 };
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [createCardProps, setCreateCardProps] = useState(createCardDefaultProps);
  const [cardToMove, setCardToMove] = useState(null);
  const [fieldList, setFieldList] = useState();

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

  const createCard = (props = {}) => ({
    "id": 111,
    "title": props.title,
    "type": props.type,
    "name": props.name,
    "titles": [props.titles],
    ...props
  });

  const createCardInListAtIndex = (props) => {
    const { listId, cardIndex, ...otherProps } = props;

    const listsUpdated = segmentLists.map(l => {
      if (listId !== l.id) return l;

      const newCard = createCard(otherProps);
      l.cards.splice(cardIndex, 0, newCard);

      return l;
    });

    return listsUpdated;
  };

  const handleCreateCard = (props = {}) => {
    const listsUpdated = createCardInListAtIndex({ ...createCardProps, ...props });

    toggleCreateCardModal();
    setSegments(listsUpdated);
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

  const handleCardsDelete = async (cards = []) => {
    const listsUpdated = removeCardsFromList(cards);
    setSegments(listsUpdated);
  };

  const removeCardsFromList = (cards) => {
    const cardsGroupedByListId = cards.reduce((acc, card) => {
      const { listId, cardId } = card;

      if (!acc[listId]) acc[listId] = [cardId];
      else acc[listId].push(cardId);

      return acc
    }, {});

    const listsUpdated = segmentLists.map(l => {
      const cardsToDelete = cardsGroupedByListId[l.id];
      if (!cardsToDelete) return l;

      const cardsUpdated = l.cards.filter(c => !cardsToDelete.includes(c.id));
      return ({ ...l, cards: cardsUpdated });
    });

    return listsUpdated;
  };

  // 現状のセグメント情報のリストを取得
  const segmentCardCountDecision = (cards) => {
    const cardLists = cards.map((segment) => segment.cards);
    const resultCards = cardLists.reduce((card, element) => {
      return card.concat(element);
    });
    return resultCards;
  }

  useEffect(() => {
    const resultCards = segmentCardCountDecision(segmentLists);
    const allCards = segmentCardCountDecision(cards);

    // 現在のセグメントとの比較
    const diffResultCards = allCards.filter((card) => resultCards.indexOf(card) == -1);
    setFieldList(diffResultCards);
  }, [segmentLists]);

  return (
    <>

      {showCreateCardModal && (
        <SegmentCardCreateModal
          show={showCreateCardModal}
          onHide={toggleCreateCardModal}
          onSubmit={handleCreateCard}
          fieldList={fieldList}
        />
      )}

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
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

      <Container fluid className="cotainer py-4 px-0">
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
