import React, { useState, useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Col, Row, Button, Container, Breadcrumb } from "react-bootstrap";
import { ArchiveIcon, PlusIcon, PencilAltIcon } from "@heroicons/react/solid";
import { Link, useHistory } from 'react-router-dom';

import TagsCard from "@/pages/tag/TagsCard";
import tags from "@/data/tags";
import TagCreateCard from "@/pages/tag/TagCreateCard";
import { Paths } from "@/paths";
import { set } from "lodash";

export default () => {
  const [tags, setTags] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [name, setName] = useState('');
  const [isEdit, setIsEdit] = useState({
    id: '', isEdit: false
  });

  const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-gray-400 me-3'
    },
    buttonsStyling: false
  }));

  const createCardOpen = () => {
    setIsCreate(!isCreate)
    setIsEdit(false)
    setName('')
  };

  const storeTag = async (e) => {
    e.preventDefault();
    await axios.post('/api/v1/management/user_tags', {
      name: name
    })
    .then((res) => {
        console.log(res);
        setTags([...tags, res.data.tag]);
        setIsCreate(false)
    })
    .catch(error => {
        console.error(error);
    });
    setName('');
  };

  const updateTag = async (e, id) => {
    e.preventDefault();
    await axios.put(`/api/v1/management/user_tags/${id}`, {
      name: name
    })
    .then((res) => {
      const updateTag = res.data.tag;
      const newTag = tags.find(tag => tag.id == id);
      newTag.name = updateTag.name
      setTags(
        tags.map((tag) => (tag.id === id ? newTag : tag))
      );
      setIsEdit({id: '', isEdit: false})
    })
    .catch(error => {
        console.error(error);
    });
  };

  const showConfirmDeleteModal = async (id) => {
    const textMessage = "本当にこのタグを削除しますか？";

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
      await axios.delete(`/api/v1/management/user_tags/${id}`)
      .then((response) => {
        deleteTag(id)
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  const deleteTag = async (id) => {
    setTags(tags.filter(tag => tag.id !== id))
    const confirmMessage = "選択した項目は削除されました。";
    await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
  };

  useEffect(() => {
    axios.get(`/api/v1/management/user_tags`)
    .then((data) => {
      setTags(data.data.tags);
    })
    .catch(error => {
        console.error(error);
    });
  }, []);

  const showTags = async (id) => {
    await axios.get(`/api/v1/management/user_tags/${id}`)
    .then((response) => {
      setName(response.data.tag.name);
    })
    .catch(error => {
        console.error(error);
    });
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">タグ管理</h1>
        </div>
      </div>

      <div className="task-wrapper border bg-white border-light shadow-sm rounded">
        {
          tags && (
            tags.map((tag, index) =>
              <TagsCard
                {...tag}
                key={`tag-${tag.id}`}
                updateName={name}
                setName={setName}
                isEdit={isEdit}
                setIsCreate={setIsCreate}
                setIsEdit={setIsEdit}
                updateTag={updateTag}
                showTags={showTags}
                showConfirmDeleteModal={showConfirmDeleteModal}
              />
            )
          )
        }
        {
          isCreate ? (
            <TagCreateCard
              setName={setName}
              name={name}
              storeTag={storeTag}
              setIsCreate={setIsCreate}
            />
          ) :
          (
            <div className="privilege-button d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center py-4 me-4">
              <Button
                variant="outline-gray-500"
                onClick={createCardOpen}
                className="d-inline-flex align-items-center justify-content-center dashed-outline new-card w-100"
              >
                <PlusIcon className="icon icon-xs me-2" /> タグ追加
              </Button>
            </div>
          )
        }
      </div>
    </>
  );
};
