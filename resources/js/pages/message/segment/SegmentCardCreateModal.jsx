import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { ArchiveIcon, CalendarIcon, CameraIcon, CheckIcon, ClipboardCheckIcon, ClockIcon, EyeIcon, PaperClipIcon, PlusIcon, SelectorIcon, ShareIcon, TagIcon, UserGroupIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Modal, Button, InputGroup, Image, Badge, FloatingLabel } from 'react-bootstrap';

import KanbanAvatar from "@/components/KanbanAvatar";
import { Members as BoardMembers, Labels as BoardLabels } from "@/data/kanban";

import segments from "@/data/segments";

export const SegmentCardCreateModal = (props) => {
  const { modalTitle = "セグメント追加", show = false } = props;
  const items = ['性別', '年齢', '誕生日月', '来店回数', 'お住まいエリア', 'ご職業', '最終来店日', '選択回答式でのアンケート', '複数回答式でのアンケート', 'タグ'];
  const [itemName, setItemName] = useState('性別');

  const onHide = () => props.onHide && props.onHide();

  const createSegmentCard = () => {
    const cards = segments.map((segment) => segment.cards);
    const resultCards = cards.reduce((card, element) => {
      return card.concat(element);
    })
    console.log(itemName);
    const createCard = resultCards.find((card) => card.title == itemName);
    return props.onSubmit && props.onSubmit(createCard);
  };

  const selectItem = (e) => {
    setItemName(e.target.value);
  }

  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={onHide}>
      <Form className="modal-content p-3">
        <Modal.Header className="pb-0 border-0">
          <h5 as={Modal.Title} className="fw-normal">
            {modalTitle}
          </h5>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Form.Group id="title" className="mb-3">
            <Form.Label>アンケートを選択</Form.Label>
            <Form.Select defaultValue="性別" className="mb-0" onChange={selectItem}>
              {
                items.map((item, index) => <option key={index} value={item}>{item}</option>)
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
      </Form>
    </Modal>
  );
};