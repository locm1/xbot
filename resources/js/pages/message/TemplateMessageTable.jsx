import React, { useState } from "react";
import Swal from 'sweetalert2';
import moment from "moment-timezone";
import withReactContent from 'sweetalert2-react-content';
import { PencilAltIcon, PaperAirplaneIcon, TrashIcon, DocumentDuplicateIcon } from "@heroicons/react/solid";
import { Col, Row, Nav, Card, Form, Image, Button, Table, Dropdown, ProgressBar, Tooltip, FormCheck, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Pagination from "@/components/Pagination";

import { Paths } from "@/paths";

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary me-3',
    cancelButton: 'btn btn-gray'
  },
  buttonsStyling: false
}));

export const TemplateMessageTable = (props) => {
  const { messages, deleteMessage, setMessages, links, setLinks, paginate, setPaginate, getMessages, title } = props;
  const searchValue = {title: title}

  const showConfirmDeleteModal = async (id) => {
    const textMessage = "本当にを削除しますか？";

    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "削除確認",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル"
    });

    if (result.isConfirmed) {
      deleteMessage(id, deleteComplete, setMessages, messages)
    }
  };

  const deleteComplete = async () => {
    const confirmMessage = "選択した項目は削除されました。";
    await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
  };

  const TableRow = (props) => {
    const history = useHistory();
    const { title, created_at, is_undisclosed, id } = props;
    const link = Paths.EditMessage.path.replace(':id', id);

    return (
      <tr className="border-bottom">
        <td>
          <Link to={link}>
            <span className="fw-bold text-decoration-underline">
              {title}
            </span>
          </Link>
        </td>
        <td>
          <span className="fw-normal">
            {moment(created_at).format("YYYY-MM-DD H:m:s")}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {is_undisclosed == 0 ? '公開' : '非公開'}
          </span>
        </td>
        <td>
          <Button as={Link} to={link} variant="info" size="sm" className="d-inline-flex align-items-center me-3">
            編集
          </Button>
          <Button onClick={() => showConfirmDeleteModal(id)} variant="danger" size="sm" className="d-inline-flex align-items-center">
            削除
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <Card border="0" className="table-wrapper table-responsive shadow">
      <Table hover className="align-items-center">
        <thead className="bg-primary text-white">
          <tr>
            <th className="border-gray-200">タイトル</th>
            <th className="border-gray-200">追加日時</th>
            <th className="border-gray-200">公開ステータス</th>
            <th className="border-gray-200">編集・削除</th>
          </tr>
        </thead>
        <tbody className="border-0">
          {messages && messages.map((t) => <TableRow key={`template-message-${t.id}`} {...t} />)}
        </tbody>
      </Table>
      <Pagination 
        links={links}
        paginate={paginate}
        getListBypage={getMessages} 
        setList={setMessages}
        setLinks={setLinks}
        setPaginate={setPaginate}
        searchValue={searchValue}
      />
    </Card>
  );
};