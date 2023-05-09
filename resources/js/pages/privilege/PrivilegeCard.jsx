import React, { useState, useEffect } from "react";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import PrivilegeItemCard from "@/pages/privilege/PrivilegeItemCard";
import PrivilegeItemCreateCard from "@/pages/privilege/PrivilegeItemCreateCard";
import { deletePrivileges } from "@/pages/privilege/api/PrivilegeApiMethods";
import { getPrivilegeItems, storePrivilegeItem, updatePrivilegeItem, deletePrivilegeItem } from "@/pages/privilege/api/PrivilegeItemApiMethods";
import { Paths } from "@/paths";
import { Link, useHistory } from 'react-router-dom';

export default (props) => {
  const { 
    id, visits_times, setPrivileges, updatePrivileges, getPrivileges, privileges, refresh, setRefresh
  } = props; 

  const [isTimeEditable, setIsTimeEditable] = useState(false);
  const [time, setTime] = useState(visits_times);
  const [isCreate, setIsCreate] = useState(false);
  const [privilegeItems, setPrivilegeItems] = useState([]);
  const [isEdit, setIsEdit] = useState({
    id: '', isEdit: false
  });
  const [isUpdate, setIsUpdate] = useState(false);

  const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-gray-400 me-3'
    },
    buttonsStyling: false
  }));

  const showConfirmDeleteModal = async (id) => {
    const textMessage = "本当にこの来店を削除しますか？";

    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "削除確認",
      text: textMessage,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル"
    });

    if (result.isConfirmed) {
      deletePrivileges(id, deletePrivilege);
    }
  };

  const deletePrivilege = async () => {
    const confirmMessage = "選択した項目は削除されました。";
    await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
    setRefresh(!refresh);
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    updatePrivileges(id, time, setIsUpdate, setIsTimeEditable);
  };

  const handleTimeChange = () => {
    setIsTimeEditable(!isTimeEditable);
  };

  const onTimeEditChange = () => {
    setIsTimeEditable(!isTimeEditable);
  };

  useEffect(() => {
    getPrivilegeItems(id, setPrivilegeItems)
  }, [refresh]);

  return (
    <>
      <Card border={1} className="mb-3">
        <div className="privilege-delete-button">
          <Button variant="close" onClick={() => showConfirmDeleteModal(id)} />
        </div>
        <Card.Header className="border-0">
          {isTimeEditable ? (
          <div id="title" className="d-flex">
              <h5 className="mb-0" style={{width: 83}}>来店回数</h5>
              <Form.Control
                autoFocus
                type="number"
                value={time}
                style={{width: 40}}
                className="p-0"
                onChange={(e) => setTime(e.target.value)}
                onFocus={(e) => e.target.select()}
                onBlur={handleTimeChange}
                onKeyDown={(e) => handleKeyDown(e)} 
              />
              <h5 className="mb-0">回</h5>
          </div>
        ) : (
          <>
          <h5 className="mb-0">
            来店回数 {time} 回
            <PencilIcon className="icon icon-xs ps-2 pb-1 management-tag-name" onClick={onTimeEditChange} />
          </h5>
          </>
        )}
        </Card.Header>
        <Card.Body>
        {
          privilegeItems && privilegeItems.map((privilegeItem, index) => 
            <PrivilegeItemCard
              key={index}
              {...privilegeItem}
              setIsCreate={setIsCreate}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
              privilegeItems={privilegeItems}
              setPrivilegeItems={setPrivilegeItems}
              updatePrivilegeItem={updatePrivilegeItem}
              deletePrivilegeItem={deletePrivilegeItem}
              setRefresh={setRefresh}
            />
          )
        }
        {
          !isCreate ? (
            <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center py-4 me-4">
              <Button
                variant="primary"
                className="d-inline-flex align-items-center"
                onClick={() => setIsCreate(!isCreate)}
              >
                <PlusIcon className="icon icon-xs me-2" /> 特典を追加
              </Button>
            </div>
          ) : (
            <PrivilegeItemCreateCard 
              id={id}
              privilegeItems={privilegeItems}
              setPrivilegeItems={setPrivilegeItems}
              storePrivilegeItem={storePrivilegeItem}
              setIsCreate={setIsCreate}
              isCreate={isCreate}
            />
          )
        }
        </Card.Body>
      </Card>
    </>
  );
};