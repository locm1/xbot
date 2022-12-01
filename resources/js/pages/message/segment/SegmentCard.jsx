import React from "react";
import { ClipboardCopyIcon, CreditCardIcon, PencilAltIcon, SelectorIcon, TagIcon, TrashIcon, UserIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Dropdown, Col, Row, Form, InputGroup } from "react-bootstrap";

import KanbanAvatar from "@/components/KanbanAvatar";

//forms
import CheckboxButton from "@/components/CheckboxButton";


export default (props) => {
  const { cardRef, title, style = {}, extraProps = {}, card } = props;

  const onEdit = () => {
    props.onEdit && props.onEdit();
  };

  const onCopy = () => {
    props.onCopy && props.onCopy();
  };

  const onMove = () => {
    props.onMove && props.onMove();
  };

  const onChangeLabels = () => {
    props.onChangeLabels && props.onChangeLabels();
  };

  const onChangeMembers = () => {
    props.onChangeMembers && props.onChangeMembers();
  };

  const onDelete = () => {
    props.onDelete && props.onDelete();
  };

  const onCardClick = (e) => {
    if (e.defaultPrevented) return;

    props.onClick && props.onClick();
  };

  const onDropdownClick = (e) => {
    e.preventDefault();
  };


  const showComponents = (card) => {
    const items = card.titles;
    switch (card.type) {
      case 1:
        return (
          <InputGroup>
            <Form.Control required type="text" name="last_name" placeholder={items[0].title} />
              <InputGroup.Text><span>〜</span></InputGroup.Text>
            <Form.Control required type="text" name="last_name" placeholder={items[1].title} />
          </InputGroup>
        );
      case 2:
        return <p>a</p>
      case 3:
        return <p>a</p>
      case 4:
        return (
          items.map((item, index) => <CheckboxButton name={card.name} id={item.id} title={item.title} value={index + 1} />)
        );
      case 5:
        return (
          <Form.Select defaultValue="1" className="mb-0">
            {
              items.map((item, index) => <option key={index} value={index + 1}>{item.title}</option>)
            }
          </Form.Select>
        );
    }
  }

  return (
    <Card border={1} className="p-4" ref={cardRef}{...extraProps} style={style}>
      <Card.Header className="d-flex align-items-center justify-content-between border-0 p-0 mb-3">
        <h5 className="mb-0">{title}</h5>
        <div>
          <Button variant="close" onClick={onDelete} size="xs" className="fs-7 px-1 py-0" />
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        {showComponents(card)}
      </Card.Body>
    </Card>
  );
};