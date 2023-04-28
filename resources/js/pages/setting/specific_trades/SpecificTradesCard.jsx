import React, { useState } from "react";
import { ClockIcon, MinusIcon, PencilAltIcon, CheckCircleIcon, DotsHorizontalIcon, TrashIcon, UserIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Col, Row, Badge, Dropdown } from "react-bootstrap";

import { Link } from "react-router-dom";
import { Paths } from "@/paths";

export default (props) => {
  const { id, title, editOpenModal, showConfirmDeleteModal } = props;

  return (
    <>
      <Card border="bottom" className="hover-state rounded-0 rounded-top py-3">
      <Card.Body className="d-sm-flex align-items-center flex-wrap flex-lg-nowrap py-0">
        <Col xs={1} className="text-left text-sm-center mb-2 mb-sm-0">
          <div className="d-block d-sm-flex">
            <div className="ms-sm-3">
              <Badge bg="tertiary" className="super-badge">項目{id}</Badge>
            </div>
          </div>
        </Col>
        <Col xs={11} lg={9} className="px-0 mb-4 mb-md-0">
          <div className="mb-2">
            <h6 className="">{title}</h6>
          </div>
        </Col>
        <Col xs={10} sm={2} lg={2} xl={2} className="d-none d-lg-block d-xl-inline-flex align-items-center ms-lg-auto text-right justify-content-center px-md-0">
          <div className="d-block d-sm-flex">
            <Button onClick={() => editOpenModal(id)} variant="info" size="sm" className="d-inline-flex align-items-center me-3">
              編集
            </Button>
            <Button onClick={(e) => showConfirmDeleteModal(e, id)} variant="danger" size="sm" className="d-inline-flex align-items-center">
              削除
            </Button>
          </div>
        </Col>
      </Card.Body>
    </Card>
    </>
  );
};