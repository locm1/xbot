import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button, Tooltip, Dropdown, InputGroup, ButtonGroup, OverlayTrigger, Breadcrumb } from 'react-bootstrap';
import { ArchiveIcon, CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, CloudUploadIcon, FireIcon, PlusIcon, ShieldCheckIcon, TrashIcon, ViewGridAddIcon, HomeIcon } from "@heroicons/react/solid";

import EventWidget from "@/pages/event/EventWidget";
import eventGuidances from "@/data/eventGuidances";
import Pagination from "@/components/Pagination";
import { GetEvents } from "@/pages/event/EventApiMethods"

export default () => {
  const [events, setEvents] = useState([
    {id: 1, title: '', location: '', start_date: '', end_date: '', users: []}
  ]);
  const [paginate, setPaginate] = useState({ 
    current_page: 1, per_page: 1, from: 1, to: 1,total: 1 
  })
  const [links, setLinks] = useState([]);
  const searchParams = {
    params: {}
  }

  useEffect(() => {
    const searchParams = {
      params: {page: 1}
    };
    GetEvents(searchParams, setEvents, setLinks, setPaginate)
  }, []);

  return (
    <>
      <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <h1 className="page-title">予約リスト</h1>
        </div>
      </div>
      <div className="task-wrapper border bg-white border-light shadow-sm py-1 rounded">
      <EventWidget events={events} />

      <Pagination 
        links={links}
        paginate={paginate}
        getListBypage={GetEvents} 
        setList={setEvents}
        setLinks={setLinks}
        setPaginate={setPaginate}
        searchParams={searchParams}
      />
      </div>
    </>
  );
};
