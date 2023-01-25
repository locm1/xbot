import React, { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { PencilAltIcon, PaperAirplaneIcon, TrashIcon, DocumentDuplicateIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Pagination, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Paths } from "@/paths";
import { pageVisits, pageTraffic, pageRanking } from "@/data/tables";
import { message } from "laravel-mix/src/Log";


const capitalizeFirstLetter = (string) => (
  string[0].toUpperCase() + string.slice(1)
);

const getFirstLetterOfEachWord = (text) => (
  text.match(/\b\w/g).join('')
);

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary me-3',
    cancelButton: 'btn btn-gray'
  },
  buttonsStyling: false
}));

export const TemplateMessageTable = (props) => {
  const [{messages}, setMessages] = useState(props);
  const totalMessages = messages.length;

  const deleteTemplateMessages = (ids) => {
    props.deleteTemplateMessages && props.deleteTemplateMessages(ids)
  }

  const duplicateTemplate = async (id) => {
    const textMessage = "このテンプレートを複製しますか？";

    const result = await SwalWithBootstrapButtons.fire({
      icon: "question",
      title: "複製確認",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "OK!",
      cancelButtonText: "キャンセル"
    });

    if (result.isConfirmed) {
      const ids = messages.map(message => (message.id));
      const maxId = Math.max.apply(null, ids) + 1;
      const copyMessage = {...messages.find(message => message.id === id)};
      copyMessage.id = maxId;
      messages.push(copyMessage);
      setMessages({messages});
      const confirmMessage = "コピーに成功しました";

      await SwalWithBootstrapButtons.fire('コピー成功', confirmMessage, 'success');
    }
  }

  const TableRow = (props) => {
    const history = useHistory();
    const { title, addDate, id } = props;
    const link = Paths.EditMessage.path.replace(':id', id);

    return (
      <tr className="border-bottom">
        <td>
          <span className="fw-bold text-decoration-underline">
            <Link to={link}>
              {title}
            </Link>
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {addDate}
          </span>
        </td>
        <td>
          <Link to={link}>
            <OverlayTrigger key={"edit-" + id} overlay={<Tooltip id="top" className="m-0">編集</Tooltip>}>
              <PencilAltIcon className="icon icon-xs me-2"/>
            </OverlayTrigger>
          </Link>
          <Link to={Paths.SendSegments.path}>
            <OverlayTrigger key={"use-" + id} overlay={<Tooltip id="top" className="m-0">このテンプレートを使用</Tooltip>}>
              <PaperAirplaneIcon className="icon icon-xs me-2"/>
            </OverlayTrigger>
          </Link>
          <OverlayTrigger key={"copy-" + id} overlay={<Tooltip id="top" className="m-0">コピー</Tooltip>}>
            <DocumentDuplicateIcon role={"button"} onClick={() => duplicateTemplate(id)} className="icon icon-xs me-2" />
          </OverlayTrigger>
          <OverlayTrigger key={"delete-" + id} overlay={<Tooltip id="top" className="m-0">削除</Tooltip>}>
            <TrashIcon role="button" className="icon icon-xs text-danger me-2" />
          </OverlayTrigger>
        </td>
      </tr>
    );
  };

  return (
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Card.Body>
        <Table hover>
          <thead>
            <tr>
              <th className="border-gray-200">タイトル</th>
              <th className="border-gray-200">追加日時</th>
              <th className="border-gray-200">アクション</th>
            </tr>
          </thead>
          <tbody className="border-0">
            {messages.map((t) => <TableRow key={`message-${t.id}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-normal mt-4 mt-lg-0">
            Showing <b>{totalMessages}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};