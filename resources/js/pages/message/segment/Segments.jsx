import React, { useState } from "react";
import { ClipboardCopyIcon, DotsHorizontalIcon, EyeIcon, SelectorIcon, TrashIcon, ViewGridAddIcon } from "@heroicons/react/solid";
import { Col, Form, Button, Dropdown, ListGroup } from "react-bootstrap";

export default (props) => {
  const { id, listRef, extraProps = {} } = props;
  const [title, setTitle] = useState(props.title ?? "");
  const [isTitleEditable, setIsTitleEditable] = useState(false);

  const onTitleChange = () => {
    props.onTitleChange && props.onTitleChange({ id, title });
    toggleIsTitleEditable();
  };

  const toggleIsTitleEditable = () => {
    setIsTitleEditable(!isTitleEditable);
  };

  const onCardAdd = () => {
    props.onCardAdd && props.onCardAdd(id)
  };

  const onListCopy = () => {
    props.onListCopy && props.onListCopy(id)
  };

  const onListMove = () => {
    props.onListMove && props.onListMove()
  };

  const onListDelete = () => {
    props.onListDelete && props.onListDelete(id)
  };

  return (
    <Col xs={12} lg={6} xl={4} xxl={6} ref={listRef} {...extraProps}>
      <ListGroup className="kanban-list">
        {props.children}
      </ListGroup>
    </Col>
  );
};