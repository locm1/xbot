import React, { useState, useLayoutEffect } from "react";

import { SendHistoriesTable } from "@/pages/message/SendHistoriesTable";
import { getSendMessages } from "@/pages/message/api/SendMessageApiMethods";

export default () => {
  const [sendMessages, setSendMessages] = useState([]);
  const [paginate, setPaginate] = useState({ 
    current_page: 0, per_page: 0, from: 0, to: 0,total: 0 
  })
  const [links, setLinks] = useState([]);
  
  useLayoutEffect(() => {
    const searchParams = {
      params: {page: 1}
    };
    getSendMessages(searchParams, setSendMessages, setLinks, setPaginate);
  }, [])

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">配信履歴</h1>
        </div>
      </div>

      <SendHistoriesTable
        sendHistories={sendMessages}
        setSendMessages={setSendMessages}
        getSendMessages={getSendMessages}
        links={links}
        paginate={paginate}
        setLinks={setLinks}
        setPaginate={setPaginate}
      />
    </>
  );
};
