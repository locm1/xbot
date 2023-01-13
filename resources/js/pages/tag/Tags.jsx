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
  const [tagsLists, setTagsLists] = useState(tags);
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);

  const createCard = () => {
    const id = (tagsLists === undefined) ? 1 : tagsLists.length + 1;
    const newTags = {
      "id": id,
      "visitTimes": '',
      "products": []
    }
    setTagsLists([...tagsLists, newTags]);
  };

  const onHide = () => {
    setCardToEdit(null);
    setShowEditCardModal(!showEditCardModal);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">タグ管理</h1>
        </div>
      </div>

      <Container fluid className="cotainer py-4 px-0">
        <Row className="privilege-card-wrap">
          {
            tagsLists.map(tags => 
              <TagsCard 
                key={`tags-${tags.id}`}
                {...tags}
                setCardToEdit={setCardToEdit}
                tagsLists={tagsLists}
                setTagsLists={setTagsLists}
              />
            )
          }
        </Row>
      </Container>
    </>
  );
};
