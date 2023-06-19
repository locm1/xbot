import { Button, Card } from "react-bootstrap"
import { MapPinIcon } from "@/components/icons/Icons";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary me-3',
    cancelButton: 'btn btn-gray'
  },
  buttonsStyling: false
}));

export default (props) => {
  const { id, title, from, to, location, deleteReservation, dateObj } = props
  const currentDate = new Date();
  // currentDate.setDate( currentDate.getDate() + 3 );
  const timeDiff = dateObj.getTime() - currentDate.getTime();
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24); // ミリ秒を日数に変換
  const cancelable = daysDiff <= 4;

  const handleClick = async (id) => {
    if (!cancelable) {
      const result = await SwalWithBootstrapButtons.fire({
        icon: "question",
        title: "キャンセル確認",
        text: '本当にキャンセルしますか？',
        showCancelButton: true,
        confirmButtonText: "キャンセルする",
        cancelButtonText: "戻る"
      });
      if (result.isConfirmed) {
        deleteReservation(id)
      }
    }
  }

  return (
    <Card.Body className="border-bottom">
      <h6 className="mb-1 text-primary fw-bolder">{title}</h6>
      <small className="mb-1">時間：{from}〜{to}</small>
      {location &&
        <div className="">
          <MapPinIcon className="icon icon-xs liff-event-icon" />
          <small className="liff-event-place">{location}</small>
        </div>
      }
      <div className="mt-3">
        <Button variant="danger" onClick={() => handleClick(id)} disabled={cancelable} className="w-100">
          予約キャンセル
        </Button>
      </div>
    </Card.Body>
  )
}