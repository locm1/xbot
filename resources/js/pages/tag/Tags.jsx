import React, { useState, useRef } from "react";
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
  const [tagsLists, setTagsLists] = useState(tags);
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [name, setName] = useState();

  const createCardOpen = () => {
    setIsCreate(!isCreate)
  };




  const storeTag = async (e) => {
    e.preventDefault();
    console.log('store');
    // await axios.post('/api/v1/management/tags', formValue)
    // .then((res) => {
    //     //戻り値をtodosにセット
    //     alert('追加しました。');
    //     console.log(res);
    //     setSpecificTrades([...SpecificTrades, res.data.specific])
    //     setIsOpen(false)
    // })
    // .catch(error => {
    //     console.error(error);
    // });
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">タグ管理</h1>
        </div>
      </div>

      <div className="task-wrapper border bg-white border-light shadow-sm py-1 rounded">
        {tagsLists.map((tag, index) =>
          <TagsCard
            {...tag}
            key={`tag-${tag.id}`}
            setName={setName}
          />
        )}
        {
          isCreate ? (
            <TagCreateCard setName={setName} name={name} storeTag={storeTag} setIsCreate={setIsCreate} />
          ) :
          (
            <div className="privilege-button d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center py-4 me-4">
              <Button
                onClick={createCardOpen}
                variant="primary"
                className="d-inline-flex align-items-center"
              >
                <PlusIcon className="icon icon-xs me-2" /> タグを追加
              </Button>
            </div>
          )
        }
      </div>
    </>
  );
};
