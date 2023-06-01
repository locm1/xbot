import React, { useState, useEffect, useRef } from "react";
import moment from "moment-timezone";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FireIcon, CheckIcon, HomeIcon, PlusIcon, ChevronRightIcon, ChevronLeftIcon, ViewGridAddIcon, ArchiveIcon, CheckCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { Col, Row, Table, Button, ButtonGroup, Form, InputGroup, Dropdown, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import SpecificTradesCard from "@/pages/setting/specific_trades/SpecificTradesCard";
import { getSpecificTrades, storeSpecificTrades } from "@/pages/setting/api/SpecificTradesApiMethods";
import { Paths } from "@/paths";

const SpecificTradesService = (props) => {
  const [SpecificTrades, setSpecificTrades] = useState([]);
  const [deleteSpecificTradeIds, setDeleteSpecificTradeIds] = useState([]);
  const [height, setHeight] = useState(0);
  const textAreaRef = useRef();
  const invisibleTextAreaRef = useRef();

  const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-gray-400 me-3'
    },
    buttonsStyling: false
  }));

  const addSpecificTrades = () => {
    const currentSpeficTrade = SpecificTrades.slice(-1)[0];
    const newSpeficTrade = {
      display_id: typeof currentSpeficTrade !== 'undefined' ? currentSpeficTrade.display_id + 1 : 1,
      title: '',
      content: '',
    }
    setSpecificTrades([...SpecificTrades, newSpeficTrade])
  };

  const handleChange = (e, input, display_id) => {
    setSpecificTrades(
      SpecificTrades.map(specificTrade => specificTrade.display_id == display_id ? {...specificTrade, [input]: e.target.value} : specificTrade)
    )
  };

  const showConfirmDeleteModal = async (e, id) => {
    const textMessage = "本当にこの項目を削除しますか？";

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
      await axios.delete(`/api/v1/management/specific-trades/${id}`)
      .then((response) => {
        deleteSpecificTrades(id)
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  const deleteSpecificTrades = (display_id) => {
    setSpecificTrades(
      SpecificTrades.filter((specific) => (specific.display_id !== display_id))
    )

    const currentSpeficTrade = SpecificTrades.find(SpecificTrade => SpecificTrade.display_id == display_id);
    
    //検索結果のオブジェクトにIDがあるかどうか
    if (currentSpeficTrade.id) {
      setDeleteSpecificTradeIds([...deleteSpecificTradeIds, currentSpeficTrade.id])
    }
  };

  const onSaveSpecificTrades = () => {
    storeSpecificTrades(SpecificTrades, deleteSpecificTradeIds)
  };

  useEffect(() => {
    getSpecificTrades(setSpecificTrades)
  }, []);

  useEffect(() => {
    if (invisibleTextAreaRef.current) {
      setHeight(invisibleTextAreaRef.current.scrollHeight);
    }
  }, [SpecificTrades]);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">特定商取引法に基づく表記</h1>
        </div>
      </div>
      <Card border="0" className="table-wrapper table-responsive shadow mb-4">
        <Card.Header className="bg-primary text-white px-1 py-2">
          <div className="wrapper d-flex flex-wrap flex-md-nowrap align-items-center">
            <div className="ms-3 cell-left">
              <h6 className="mb-0 fw-bolder">タイトル</h6>
            </div>
            <div className="ms-4 cell-center">
              <h6 className="mb-0 fw-bolder">内容</h6>
            </div>
            <div className="ms-4 cell-right">
              <h6 className="mb-0 fw-bolder">削除</h6>
            </div>
          </div>
        </Card.Header> 
        <Card.Body>
          <div className="bg-white">
            {SpecificTrades.map((SpecificTrade, index) =>
              <SpecificTradesCard
                {...SpecificTrade}
                key={`SpecificTrade-${SpecificTrade.id}`}
                handleChange={handleChange}
                deleteSpecificTrades={deleteSpecificTrades}
                textAreaRef={textAreaRef}
                invisibleTextAreaRef={invisibleTextAreaRef}
                height={height}
                setHeight={setHeight}
              />
            )}
          </div>
          <div className="privilege-button d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center">
            <Button
              variant="outline-gray-500"
              className="d-inline-flex align-items-center justify-content-center dashed-outline new-card w-100"
              onClick={addSpecificTrades}
            >
              <PlusIcon className="icon icon-xs me-2" /> 項目を追加
            </Button>
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-end">
            <Button onClick={onSaveSpecificTrades} variant="success" className="btn-default-success">
              保存する
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </>
  )
};
export default SpecificTradesService;

