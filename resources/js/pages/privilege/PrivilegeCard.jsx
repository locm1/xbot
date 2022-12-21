import React from "react";
import { ClipboardCopyIcon, CreditCardIcon, PencilAltIcon, SelectorIcon, TagIcon, TrashIcon, UserIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Dropdown } from "react-bootstrap";

import { PrivilegeProductTable } from "@/pages/privilege/PrivilegeProductTable";

export default (props) => {
  const { visitTimes, image, products, showEditCardModal } = props; 

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

  return (
    <Card border={1} className="p-4 privilege-card-item">
      <Card.Header className="d-flex align-items-center justify-content-between border-0 p-0 mb-3">
        <h5 className="mb-0">来店回数 {visitTimes} 回</h5>
        <div className="privilege-edit-modal-button" onClick={onCardClick}>
          <PencilAltIcon className="icon icon-xs text-gray-500" />
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <PrivilegeProductTable products={products} />
      </Card.Body>
    </Card>
  );
};