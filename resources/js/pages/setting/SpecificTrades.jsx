import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FireIcon, CheckIcon, HomeIcon, PlusIcon, ShieldCheckIcon, CloudUploadIcon, ViewGridAddIcon, ArchiveIcon, CheckCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { KanbanCreateModal, KanbanEditModal, KanbanCopyModal, KanbanMoveModal, KanbanEditMembersModal, KanbanEditLabelsModal } from "@/components/Modals";

import KANBAN_LISTS, { createCard, createList } from "@/data/kanban";

export default () => {
  const [searchValue, setSearchValue] = useState("");
  const [birthday, setBirthday] = useState("");
  const [statusValue, setStatusValue] = useState("all");

  const changeSearchValue = (e) => {
    const newSearchValue = e.target.value;
    const newTransactions = transactions.map(t => {
      const subscription = t.subscription.toLowerCase();
      const shouldShow = subscription.includes(newSearchValue)
        || `${t.price}`.includes(newSearchValue)
        || t.status.includes(newSearchValue)
        || `${t.invoiceNumber}`.includes(newSearchValue);

      return ({ ...t, show: shouldShow });
    });

    setSearchValue(newSearchValue);
    setTransactions(newTransactions);
  };

  const toggleCreateCardModal = (props = {}) => {
    setCreateCardProps({ ...createCardDefaultProps, ...props });
    setShowCreateCardModal(!showCreateCardModal);
  };

  const handleCreateCard = (props = {}) => {
    const listsUpdated = createCardInListAtIndex({ ...createCardProps, ...props });

    toggleCreateCardModal();
    setKanbanLists(listsUpdated);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><HomeIcon className="icon icon-xs" /></Breadcrumb.Item>
            <Breadcrumb.Item active>サイト設定</Breadcrumb.Item>
            <Breadcrumb.Item active>特定商取引法に基づく表記</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-title">特定商取引法に基づく表記</h1>
        </div>
      </div>
      <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center event-list-wrap">
        <Col xs="auto" className="d-flex justify-content-between ps-0 mb-4 mb-lg-0">
          <div className="me-lg-3">
            <Dropdown>
              <Dropdown.Toggle as={Button} variant="secondary" className="d-inline-flex align-items-center me-2">
                <PlusIcon className="icon icon-xs me-2" /> New Task
              </Dropdown.Toggle>
              <Dropdown.Menu className="dashboard-dropdown dropdown-menu-start mt-2 py-1">
                <Dropdown.Item className="d-flex align-items-center">
                  <PlusIcon className="icon icon-xs text-gray-400 me-2" /> Add Task
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center">
                  <ViewGridAddIcon className="icon icon-xs text-gray-400 me-2" /> Add Widget
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center">
                  <CloudUploadIcon className="icon icon-xs text-gray-400 me-2" /> Upload Files
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center">
                  <ShieldCheckIcon className="icon icon-xs text-gray-400 me-2" /> Preview Security
                </Dropdown.Item>

                <Dropdown.Divider as="div" className="my-1" />

                <Dropdown.Item className="d-flex align-items-center">
                  <FireIcon className="icon icon-xs text-danger me-2" /> Upgrade to Pro
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <ButtonGroup>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip className="m-0">Archive</Tooltip>}
            >
              <Button variant="gray-800">
                <ArchiveIcon className="icon icon-xs" />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip className="m-0">Mark as done</Tooltip>}
            >
              <Button variant="gray-800">
                <CheckCircleIcon className="icon icon-xs" />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip className="m-0">Delete</Tooltip>}
            >
              <Button variant="gray-800">
                <TrashIcon className="icon icon-xs" />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
        </Col>
      </div>
      <Card border="0" className="shadow mb-4">
        <Card.Body>
          <h5 className="mb-3">項目1</h5>
          <Form>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName" className="mb-3">
                  <Form.Label>タイトル</Form.Label>
                  <Form.Control required type="text" placeholder="Enter your first name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>内容</Form.Label>
                  <Form.Control as="textarea" rows="3" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Card border="0" className="shadow mb-4">
        <Card.Body>
          <h5 className="mb-3">項目2</h5>
          <Form>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName" className="mb-3">
                  <Form.Label>タイトル</Form.Label>
                  <Form.Control required type="text" placeholder="Enter your first name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>内容</Form.Label>
                  <Form.Control as="textarea" rows="3" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <div className="mt-3">
        <Button variant="gray-800" type="submit" className="mt-2 animate-up-2">
          保存する
        </Button>
      </div>
    </>
  );
};