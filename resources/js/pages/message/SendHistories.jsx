import React, { useState } from "react";
import { CheckIcon, CogIcon, HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';

import { SendHistoriesTable } from "@/pages/message/SendHistoriesTable";
import { getSendMessages } from "./api/SendMessageApiMethods";
import { useLayoutEffect } from "react";

export default () => {
  const [sendMessages, setSendMessages] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatusValue] = useState("all");
  useLayoutEffect(() => {
    getSendMessages(setSendMessages);
  }, [])

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">配信管理</h1>
        </div>
      </div>

      <SendHistoriesTable
        sendHistories={sendMessages}
      />
    </>
  );
};
