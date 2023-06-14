import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { PencilIcon, CheckIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Col, Row, Form, Badge, InputGroup } from "react-bootstrap";

export default (props) => {
  const { id, privilege_id, name, isEdit, setIsEdit, updatePrivilegeItem, privilegeItems, setPrivilegeItems, deletePrivilegeItem, setRefresh } = props; 
  const [isTimeEditable, setIsTimeEditable] = useState(false);
  const [updateName, setUpdateName] = useState(name);

  const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-gray-400 me-3'
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
      reverseButtons: true,
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
    await Swal.fire('削除成功', confirmMessage, 'success');
    setRefresh(prev => !prev)
  };

  return (
    <Card border="bottom" className="hover-state rounded-0 rounded-top py-3" style={{height:'88px'}}>
      <Card.Body className="d-sm-flex align-items-center flex-wrap flex-lg-nowrap py-0">
        <Col xs={12} lg={9} className="px-0 mb-md-0">
          <div className="d-flex flex-wrap flex-md-nowrap align-items-center">
            {
              isEdit.id == id ? (
                <>
                  <Form>
                    <Form.Control
                      className="tag-edit-form"
                      required
                      type="text"
                      name="name"
                      value={updateName}
                      onChange={(e) => editName(e)}
                      placeholder="特典を入力してください"
                      autoFocus
                    />
                  </Form>
                  <Button
                    variant="success"
                    size="sm"
                    className="ms-4"
                    onClick={handleClick}
                  >
                    保存する
                  </Button>
                  <Button
                    variant="gray-800"
                    size="sm"
                    className="ms-2"
                    onClick={() => setIsEdit(!isEdit.isEdit)}
                  >
                    キャンセル
                  </Button>
                </>
              ) : (
                <div className="pt-2">
                  <h6>{name}</h6>
                </div>
              )
            }
          </div>
        </Col>
        <Col xs={10} sm={2} lg={2} xl={2} className="d-none d-lg-block d-xl-inline-flex align-items-center ms-lg-auto text-right justify-content-center px-md-0">
          <div className="d-block d-sm-flex">
            <div className="ms-sm-3">
              <Button onClick={() => handleIsEdit(id)} variant="info" size="sm" className="d-inline-flex align-items-center me-3">
                編集
              </Button>
              <Button onClick={() => showConfirmDeleteModal(id)} variant="danger" size="sm" className="d-inline-flex align-items-center">
                削除
              </Button>
            </div>
          </div>
        </Col>
      </Card.Body>
    </Card>
  );
};