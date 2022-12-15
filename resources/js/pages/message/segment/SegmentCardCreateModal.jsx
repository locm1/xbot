import React, { useState, useEffect } from "react";
import { ArchiveIcon, CalendarIcon, CameraIcon, CheckIcon, ClipboardCheckIcon, ClockIcon, EyeIcon, PaperClipIcon, PlusIcon, SelectorIcon, ShareIcon, TagIcon, UserGroupIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Modal, Button, InputGroup, Image, Badge, FloatingLabel } from 'react-bootstrap';

import segments from "@/data/segments";

export const SegmentCardCreateModal = (props) => {
  const { modalTitle = "セグメント追加", show = false, fieldList } = props;
  const firstItemName = (fieldList[0] == null) ? '性別' : fieldList[0].title;
  const [itemName, setItemName] = useState(firstItemName);

  const onHide = () => props.onHide && props.onHide();

  const createSegmentCard = () => {
    const resultCards = diffResultCard();
    const createCard = resultCards.find((card) => card.title == itemName);
    return props.onSubmit && props.onSubmit(createCard);
  };

  const diffResultCard = () => {
    const cards = segments.map((segment) => segment.cards);
    const resultCards = cards.reduce((card, element) => {
      return card.concat(element);
    });
    return resultCards;
  }

  const selectItem = (e) => {
    setItemName(e.target.value);
  }

  // 選択できるアンケートがありません。

  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={onHide}>
      <Form className="modal-content p-3">
        {(() => {
          if (fieldList[0] == null) {
            return (
              <>
                <Modal.Header className="pb-0 border-0">
                  <h5 as={Modal.Title} className="fw-normal">選択できるアンケートがありません</h5>
                  <Button variant="close" onClick={onHide} />
                </Modal.Header>
                <Modal.Body className="pb-0">
                  <p>選択できるアンケートがありません。</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-start border-0 pt-0">
                  <Button variant="outline-gray-500" onClick={onHide}>
                    閉じる
                  </Button>
                </Modal.Footer>
              </>
            );
          } else {
            return (
              <>
                <Modal.Header className="pb-0 border-0">
                  <h5 as={Modal.Title} className="fw-normal">
                    {modalTitle}
                  </h5>
                  <Button variant="close" onClick={onHide} />
                </Modal.Header>
                <Modal.Body className="pb-0">
                  <Form.Group id="title" className="mb-3">
                    <Form.Label>アンケートを選択</Form.Label>
                    <Form.Select className="mb-0" onChange={selectItem}>
                      {
                        fieldList.map((item, index) => <option key={index} value={item.title}>{item.title}</option>)
                      }
                    </Form.Select>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer className="justify-content-start border-0 pt-0">
                  <Button variant="outline-gray-500" onClick={onHide}>
                    閉じる
                  </Button>
                  <Button variant="secondary" className="d-inline-flex align-items-center" onClick={createSegmentCard}>
                    <PlusIcon className="icon icon-xs me-2" />
                    追加
                  </Button>
                </Modal.Footer>
              </>
            );
          }
        })()}
      </Form>
    </Modal>
  );
};