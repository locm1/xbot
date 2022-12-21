import React, { useState } from "react";
import { ClipboardCopyIcon, CreditCardIcon, PencilAltIcon, SelectorIcon, TagIcon, TrashIcon, UserIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Dropdown } from "react-bootstrap";

import { PrivilegeProductTable } from "@/pages/privilege/PrivilegeProductTable";
import { PrivilegeEditModal } from "@/pages/privilege/PrivilegeEditModal";

export default (props) => {
  const [showEditCardModal, setShowEditCardModal] = useState(false);
  const { visitTimes, image, products, setCardToEdit } = props; 

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

  const onCardClick = () => {
    setCardToEdit({ ...props.privilege });
    setShowEditCardModal(!showEditCardModal);
  };

  const onDropdownClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
    {showEditCardModal && (
        <PrivilegeEditModal
          show={true}
          {...showEditCardModal}
          onHide={() => setCardToEdit(null)}
          visitTimes={visitTimes}
        />
      )}
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
    </>
  );
};