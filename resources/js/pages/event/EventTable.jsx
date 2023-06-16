
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
import { GetEvents, GetEventUsers, GetEventAllUsers } from "@/pages/event/EventApiMethods"
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
  const [isRendered, setIsRendered] = useState(false);
  const [ids, setIds] = useState('');

  useEffect(() => {
    const searchParams = {
      params: { page: 1 }
    };
    const dataFetch = async () => {
      try {
        await GetEventAllUsers(searchParams, setEvents, setLinks, setPaginate)
        setIsRendered(true)
      } catch (error) {
        console.error(error)
      }
    }
    dataFetch()
  }, []);

  const TableRow = (props) => {
    const { id, user, user_id, event } = props;
    const userlink = Paths.EditUser.path.replace(':id', user_id);

    return (
      <>
      <tr className="border-bottom">
      <td>
          {
            user ? (
              <Card.Link className="d-flex align-items-center" as={Link} to={userlink}>
                <div className="d-flex align-items-center">
                  {user.img_path ? (<Image src={user.img_path} className="avatar rounded-circle me-3"/>) : (<Image src="/images/default_user_icon.png" className="avatar rounded-circle me-3"/>)}
                  <div className="d-block">
                    {user.first_name && user.first_name_kana && user.last_name && user.last_name_kana ? 
                      <>
                        <div className="text-gray small">{user.last_name_kana} {user.first_name_kana}</div>
                        <span className="fw-bold text-decoration-underline">{user.last_name} {user.first_name}</span> 
                      </>
                    :
                      <span className="fw-bold text-decoration-underline">{user.nickname}</span> 
                    }
                  </div>
                </div>
              </Card.Link>
            ) : (
              <Card.Link className="d-flex align-items-center" as={Link} to={userlink}>
                <div className="d-flex align-items-center">
                  <Image src="/images/default_user_icon.png" className="avatar rounded-circle me-3"/>
                  <div className="d-block">
                    <span className="fw-normal text-danger">削除済みユーザー</span>
                  </div>
                </div>
              </Card.Link>
            )
          }
        </td>
        <td className="fw-bolder text-gray-500">
          {moment(event.start_date).format("YYYY-MM-DD")}
        </td>
        <td className="fw-bolder text-gray-500">
          {moment(event.start_date).format("HH:mm")} 〜 {moment(event.end_date).format("HH:mm")}
        </td>
        <td className="fw-bolder text-gray-500">
          {event.location}
        </td>
        <td className="fw-bolder text-gray-500">
          {event.is_unlimited == 0 ? event.remaining : '無制限'}
        </td>
      </tr>
      </>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-2 list-wrap">
        <h1 className="page-title">予約リスト</h1>
      </div>
      <Card border="0" className="table-wrapper table-responsive shadow mb-3">
        <Table hover className="user-table align-items-center">
          <thead className="bg-primary text-white">
            <tr>
              <th className="border-bottom">お名前</th>
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
                getListBypage={GetEventAllUsers}
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