import { Button, Card } from "react-bootstrap"
import { MapPinIcon } from "@/components/icons/Icons";

export default (props) => {
  const { title, from, to, place, status, dateObj } = props
  const currentDate = new Date();
  // currentDate.setDate( currentDate.getDate() + 3 );
  const timeDiff = dateObj.getTime() - currentDate.getTime();
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24); // ミリ秒を日数に変換
  const cancelable = daysDiff <= 4;

  return (
    <Card.Body className="border-bottom">
      <h6 className="mb-1 text-primary fw-bolder">{title}</h6>
      <small className="mb-1">時間：{from}〜{to}</small>
      <div className="">
        <MapPinIcon className="icon icon-xs liff-event-icon" />
        <small className="liff-event-place">{place}</small>
      </div>
      <div className="mt-3">
        <Button variant="danger" disabled={cancelable} className="w-100">
          予約キャンセル
        </Button>
      </div>
    </Card.Body>
  )
}