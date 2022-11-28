import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Col, Row, Form, Button, Tooltip, Dropdown, InputGroup, ButtonGroup, OverlayTrigger, Breadcrumb } from 'react-bootstrap';

import { TaskCardWidget, EventsWidget } from "@/components/Widgets";
import TASKS_DATA from "@/data/tasks";
import { ArchiveIcon, CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, CloudUploadIcon, FireIcon, PlusIcon, ShieldCheckIcon, TrashIcon, ViewGridAddIcon, HomeIcon } from "@heroicons/react/solid";

const ArchiveIconHtml = ReactDOMServer.renderToString(
  <ArchiveIcon className="h-50 w-auto" />
);

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary me-3',
    cancelButton: 'btn btn-gray'
  },
  buttonsStyling: false
}));


export default () => {
  const [tasks, setTasks] = useState(TASKS_DATA.map(t => ({ ...t, show: true })));
  const [searchValue, setSearchValue] = useState("");
  const selectedTasksIds = tasks.filter(m => m.isSelected).map(m => m.id);
  const disableMenu = selectedTasksIds.length === 0;

  const toggleDoneStatus = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, statusKey: t.statusKey === "done" ? "inProgress" : "done" } : t));
  };

  const selectTask = (id) => {
    const newTasks = tasks.map(t => {
      const isSelected = t.id === id ? !t.isSelected : t.isSelected;
      return { ...t, isSelected };
    });

    setTasks(newTasks);
  };

  const markSelectedTasksAsDone = async () => {
    const newTasks = tasks.map(t => selectedTasksIds.includes(t.id) ? { ...t, "statusKey": "done" } : t);
    setTasks(newTasks);

    await SwalWithBootstrapButtons.fire("Successfully marked as done.", "", 'success');
  };

  const deleteTasks = async (ids) => {
    const tasksNr = ids.length;
    const textMessage = tasksNr === 1
      ? "Are you sure do you want to delete this task?"
      : `Are you sure do you want to delete these ${tasksNr} tasks?`;

    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "Confirm deletion",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      const newTasks = tasks.filter(t => !ids.includes(t.id));
      const confirmMessage = tasksNr === 1 ? "The task has been deleted." : "The tasks have been deleted.";

      setTasks(newTasks);
      await SwalWithBootstrapButtons.fire('Deleted', confirmMessage, 'success');
    }
  };

  const archiveSelectedTasks = async () => {
    const tasksNr = selectedTasksIds.length;
    const textMessage = tasksNr === 1
      ? "Are you sure do you want to archive this task?"
      : `Are you sure do you want to archive these ${tasksNr} tasks?`;

    const result = await SwalWithBootstrapButtons.fire({
      icon: "question",
      iconHtml: ArchiveIconHtml,
      title: "Confirm archivation",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      const newTasks = tasks.filter(f => !selectedTasksIds.includes(f.id));
      const confirmMessage = tasksNr === 1 ? "The task has been archived." : "The tasks have been archived.";

      setTasks(newTasks);
      await SwalWithBootstrapButtons.fire('Archived', confirmMessage, 'success');
    }
  };

  const changeSearchValue = (e) => {
    const newSearchValue = e.target.value;
    const newTasks = tasks.map(t => {
      const title = t.title.toLowerCase();
      const description = t.description.toLowerCase();

      const shouldShow = title.includes(newSearchValue)
        || description.includes(newSearchValue)
        || `${t.time}`.includes(newSearchValue);

      return ({ ...t, show: shouldShow, isSelected: shouldShow && t.isSelected ? false : t.isSelected });
    });

    setTasks(newTasks);
    setSearchValue(newSearchValue);
  }

  return (
    <>
      <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><HomeIcon className="icon icon-xs" /></Breadcrumb.Item>
            <Breadcrumb.Item>日程調整管理</Breadcrumb.Item>
            <Breadcrumb.Item active>日程調整リスト</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-title">日程調整リスト</h1>
          <div className="list-head d-flex flex-wrap mb-4 align-items-center">
            <h2 className="list-head__title h4 mr-5 font-weight-bold">メッセージ総数：3</h2>
          </div>
        </div>
      </div>
      <div className="task-wrapper border bg-white border-light shadow-sm py-1 rounded">
        <EventsWidget />

        <Row className="d-flex align-items-center p-4">
          <Col xs={7} className="mt-1">
            Showing 1 - {tasks.length} of 289
          </Col>
          <Col xs={5}>
            <ButtonGroup className="float-end">
              <Button variant="light">
                <ChevronLeftIcon className="icon icon-xs" />
              </Button>
              <Button variant="primary">
                <ChevronRightIcon className="icon icon-xs" />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    </>
  );
};
