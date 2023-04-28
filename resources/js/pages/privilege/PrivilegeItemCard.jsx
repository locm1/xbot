import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";

export default (props) => {
  const { id, privilege_id, name, isEdit, setIsEdit, updatePrivilegeItem, privilegeItems, setPrivilegeItems, deletePrivilegeItem } = props; 
  const [isTimeEditable, setIsTimeEditable] = useState(false);
  const [updateName, setUpdateName] = useState(name);

  const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary me-3',
      cancelButton: 'btn btn-gray-100'
    },
    buttonsStyling: false
  }));

  const handleClick = () => {
    updatePrivilegeItem(privilege_id, id, updateName, privilegeItems, setPrivilegeItems, setIsEdit);
    setIsEdit(!isEdit.isEdit)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick();
  };

  const editName = (e) => {
    setUpdateName(e.target.value);
  };

  const handleIsEdit = (id) => {
    setIsEdit({
      id: id, isEdit: !isEdit
    })
  };

  const showConfirmDeleteModal = async (id) => {
    const textMessage = "本当にこの特典を削除しますか？";

    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "削除確認",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル",
      reverseButtons: true
    });

    if (result.isConfirmed) {
      deletePrivilegeItem(privilege_id, id, deleteItem)
    }
  };

  const deleteItem = async () => {
    const confirmMessage = "選択した項目は削除されました。";
    await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
    location.reload();
  };

  return (
      <div className="d-flex border py-1 ps-3 align-items-center">
        <Col className="px-0 mt-2">
          {
            isEdit.id == id ? (
              <div className="mb-2 d-flex flex-wrap flex-md-nowrap">
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Form.Control 
                    style={{width: '700px'}}
                    className="tag-edit-form" 
                    required type="text" 
                    name="name" 
                    value={updateName} 
                    onChange={(e) => editName(e)} 
                    placeholder="特典を入力してください" 
                  />
                </Form>
                <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center">
                  <div onClick={handleClick} className="tag-edit-button ms-2"><CheckIcon className="icon icon-xs" /></div>
                  <div onClick={() => setIsEdit(!isEdit.isEdit)} className="tag-edit-button ms-2"><Button variant="close" /></div>
                </div>
              </div>
            ) : (
                <h6 className="">
                  {name}
                  <PencilIcon className="icon icon-xs ps-2 pb-1 management-tag-name" onClick={() => handleIsEdit(id)} />
                </h6>
            )
          }
        </Col>
        <Col className="">
          <div className="d-block d-sm-flex">
            <div className="ms-sm-3">
              <TrashIcon onClick={() => showConfirmDeleteModal(id)} role="button" className="icon icon-xs text-danger me-2 "></TrashIcon>
            </div>
          </div>
        </Col>
      </div>
  );
};