import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Col, Row, Button, Container, Breadcrumb } from "react-bootstrap";
import { ArchiveIcon, PlusIcon, HomeIcon } from "@heroicons/react/solid";

import PrivilegeCard from "@/pages/privilege/PrivilegeCard";
import { PrivilegeCreateModal } from "@/pages/privilege/PrivilegeCreateModal";
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
  const [cardToEdit, setCardToEdit] = useState(null);

  const toggleCreateCardModal = () => {
    setShowCreateCardModal(!showCreateCardModal);
  };

  const createCard = () => {
    const id = (privilegeLists === undefined) ? 1 : privilegeLists.length + 1;
    const newPrivilege = {
      "id": id,
      "visitTimes": '',
      "products": []
    }
    setPrivilegeLists([...privilegeLists, newPrivilege]);
  };

  const onHide = () => {
    setCardToEdit(null);
    setShowEditCardModal(!showEditCardModal);
  };

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

      <Container fluid className="cotainer py-4 px-0">
        <Row className="privilege-card-wrap">
          {
            privilegeLists.map(privilege => 
              <PrivilegeCard 
                key={`privilege-${privilege.id}`}
                {...privilege}
                setCardToEdit={setCardToEdit}
                privilegeLists={privilegeLists}
                setPrivilegeLists={setPrivilegeLists}
              />
            )
          }
        </Row>
        <div className="privilege-button">
          <Button
            variant="outline-gray-500"
            onClick={createCard}
            className="d-inline-flex align-items-center justify-content-center dashed-outline new-card w-100"
          >
            <PlusIcon className="icon icon-xs me-2" /> 特典カード追加
          </Button>
        </div>
      </Container>
    </>
  );
};
