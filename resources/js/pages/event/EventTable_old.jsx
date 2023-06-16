
import React, { useState, useEffect } from "react";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon, ExternalLinkIcon, EyeIcon, InformationCircleIcon, PencilAltIcon, ShieldExclamationIcon, TrashIcon, UserRemoveIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import { pageVisits, pageTraffic, pageRanking } from "@/data/tables";
import commands from "@/data/commands";
import EventWidget from "@/pages/event/EventWidget";
import eventGuidances from "@/data/eventGuidances";
import Pagination from "@/components/Pagination";
import { GetEvents, GetEventUsers } from "@/pages/event/EventApiMethods"
import ParticipantsModal from "@/components/ParticipantsModal";
import moment from "moment-timezone";
import EventsContentLoader from "@/pages/event/EventsContentLoader";
import PaginationContentLoader from "@/components/loader/PaginationContentLoader";

export default () => {
  const [events, setEvents] = useState([
    { id: 1, title: '', location: '', start_date: '', end_date: '', users: [] }
  ]);
  const [searchValue, setSearchValue] = useState({
    name: '', tel: ''
  });
  const [paginate, setPaginate] = useState({
    current_page: 0, per_page: 0, from: 0, to: 0, total: 0
  })
  const [links, setLinks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const searchParams = {
    params: {}
  }
  const [ids, setIds] = useState('');
  const onHide = () => {
    setOpenModal(false);
  }

  useEffect(() => {
    const searchParams = {
      params: { page: 1 }
    };
    GetEvents(searchParams, setEvents, setLinks, setPaginate, setIsRendered)
  }, []);

  const onCardClick = (id) => {
    setIds(id)
    console.log(id);
    setOpenModal(true);
  }

  const TableRow = (props) => {
    const { id, title, start_date, end_date, location, remaining, is_unlimited, deadline } = props;

    return (
      <>
      <tr className="border-bottom">
        <td className="fw-bolder text-gray-500">
          {title}
        </td>
        <td className="fw-bolder text-gray-500">
          {moment(start_date).format("YYYY-MM-DD")}
        </td>
        <td className="fw-bolder text-gray-500">
          {moment(start_date).format("HH:mm")} 〜 {moment(end_date).format("HH:mm")}
        </td>
        <td className="fw-bolder text-gray-500">
          {location}
        </td>
        <td className="fw-bolder text-gray-500">
          {is_unlimited == 0 ? remaining : '無制限'}
        </td>
        <td className="fw-bolder text-gray-500">
          <Button variant="tertiary" onClick={() => onCardClick(id)}>参加者一覧</Button>
        </td>
      </tr>
      </>
    );
  };

  return (
    <>
      {openModal && (
        <ParticipantsModal
          show={true}
          onHide={onHide}
          title="参加者一覧"
          getUsers={GetEventUsers}
          id={ids}
        />
      )}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-2 list-wrap">
        <h1 className="page-title">予約リスト</h1>
      </div>
      <Card border="0" className="table-wrapper table-responsive shadow mb-3">
        <Table hover className="user-table align-items-center">
          <thead className="bg-primary text-white">
            <tr>
              <th className="border-bottom">イベント名</th>
              <th className="border-bottom">日程</th>
              <th className="border-bottom">時間</th>
              <th className="border-bottom">開催場所</th>
              <th className="border-bottom">残数</th>
              <th className="border-bottom text-center"></th>
            </tr>
          </thead>
          <tbody className="border-0">
            {
              isRendered ? (
                events.map(event => <TableRow key={`user-${event.id}`} {...event} />)
              ) : (
                <EventsContentLoader />
              )
            }
          </tbody>
        </Table>
          {
            isRendered ? (
              <Pagination
                links={links}
                paginate={paginate}
                getListBypage={GetEvents}
                setList={setEvents}
                setLinks={setLinks}
                setPaginate={setPaginate}
                searchValue={searchValue}
              />
            ) : (
              <PaginationContentLoader />
            )
          }
      </Card>
    </>
  );
};