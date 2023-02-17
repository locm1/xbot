import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FireIcon, CheckIcon, HomeIcon, PlusIcon, ChevronRightIcon, ChevronLeftIcon, ViewGridAddIcon, ArchiveIcon, CheckCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { Col, Row, Container, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import SpecificTradesCard from "@/pages/setting/specific_trades/SpecificTradesCard";
import SpecificTradesModal from "@/pages/setting/specific_trades/SpecificTradesModal";
import { Paths } from "@/paths";

const SpecificTradesService = (props) => {
  const [SpecificTrades, setSpecificTrades] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [specificTradeId, setSpecificTradeId] = useState();
  const [formValue, setFormValue] = useState({
    title: '', content: ''
  })
  const [page, setPage] = useState('create');
  const history = useHistory();

  const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary me-3',
      cancelButton: 'btn btn-gray-100'
    },
    buttonsStyling: false
  }));

  const createSpecificTrades = async() => {
    await axios
    .post('/api/v1/management/specific-trades', formValue)
    .then((res) => {
        //戻り値をtodosにセット
        alert('追加しました。');
        console.log(res);
        setSpecificTrades([...SpecificTrades, res.data.specific])
        setIsOpen(false)
    })
    .catch(error => {
        console.error(error);
    });
  }

  const updateSpecificTrades = async () => {
    await axios.put(`/api/v1/management/specific-trades/${specificTradeId}`, formValue)
    .then((res) => {
        //戻り値をtodosにセット
        alert('更新しました。');
        console.log(res);
        location.reload();
    })
    .catch(error => {
        console.error(error);
    });
  }

  const handleChange = (e, input) => {
    setFormValue({...formValue, [input]: e.target.value})
  };

  const createOpenModal = () => {
    setIsOpen(!isOpen)
    setPage('create');
    setFormValue({
      title: '', content: ''
    })
  };

  const editOpenModal = (id) => {
    setIsOpen(!isOpen)
    setPage('edit');
    showSpecificTrades(id);
    setSpecificTradeId(id);
  };

  const showSpecificTrades = async (id) => {
    console.log(id);
    await axios.get(`/api/v1/management/specific-trades/${id}`)
    .then((response) => {
      const specificTrade = response.data.specific;
      setFormValue({
        title: specificTrade.title, content: specificTrade.content
      });
    })
    .catch(error => {
        console.error(error);
    });
  };

  const showConfirmDeleteModal = async (e, id) => {
    const textMessage = "本当にこの項目を削除しますか？";

    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "削除確認",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル"
    });

    if (result.isConfirmed) {
      await axios.delete(`/api/v1/management/specific-trades/${id}`)
      .then((response) => {
        deleteSpecificTrades()
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  const deleteSpecificTrades = async () => {
    const confirmMessage = "選択した項目は削除されました。";
    await SwalWithBootstrapButtons.fire('削除成功', confirmMessage, 'success');
    location.reload();
  };

  useEffect(() => {
    axios.get(`/api/v1/management/specific-trades`)
    .then((data) => {
      setSpecificTrades(data.data.specific_trades);
    })
    .catch(error => {
        console.error(error);
    });
  }, []);

  return (
    <>
      {
        isOpen && 
          <SpecificTradesModal
            show={isOpen}
            setIsOpen={setIsOpen}
            formValue={formValue}
            handleChange={handleChange}
            createSpecificTrades={createSpecificTrades}
            updateSpecificTrades={updateSpecificTrades}
            page={page}
          />
      }
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">特定商取引法に基づく表記</h1>
        </div>
      </div>
      <div className="task-wrapper border bg-white border-light shadow-sm py-1 rounded">
        {SpecificTrades.map((SpecificTrade, index) =>
          <SpecificTradesCard
            {...SpecificTrade}
            key={`SpecificTrade-${SpecificTrade.id}`}
            editOpenModal={editOpenModal}
            showConfirmDeleteModal={showConfirmDeleteModal}
          />
        )}

        <div className="privilege-button d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center py-4 me-4">
          <Button
            onClick={createOpenModal}
            variant="primary"
            className="d-inline-flex align-items-center"
          >
            <PlusIcon className="icon icon-xs me-2" /> 項目を追加
          </Button>
        </div>
      </div>
    </>
  )
};
export default SpecificTradesService;

