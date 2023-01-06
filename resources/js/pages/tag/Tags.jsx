import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Col, Row, Button, Container, Breadcrumb } from "react-bootstrap";
import { ArchiveIcon, PlusIcon, HomeIcon } from "@heroicons/react/solid";
import { Link, useHistory } from 'react-router-dom';

import TagsCard from "@/pages/tag/TagsCard";
import tags from "@/data/tags";
import { Paths } from "@/paths";

export default () => {
  const [tagsLists, setPrivilegeLists] = useState(tags);
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);

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
            <Breadcrumb.Item active>タグ管理</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-title">タグ管理</h1>
        </div>
      </div>

      <Container fluid className="cotainer py-4 px-0">
        <Row className="privilege-card-wrap">
          {
            tagsLists.map(privilege => 
              <TagsCard 
                key={`privilege-${privilege.id}`}
                {...privilege}
                setCardToEdit={setCardToEdit}
                tagsLists={tagsLists}
                setPrivilegeLists={setPrivilegeLists}
              />
            )
          }
        </Row>
      </Container>
    </>
  );
};
