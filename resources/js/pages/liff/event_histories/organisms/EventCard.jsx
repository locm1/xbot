import { Button, Card } from "react-bootstrap"
import { MapPinIcon } from "@/components/icons/Icons";
import EventList from "../molecules/EventList";

export default (props) => {
  const { histories, date } = props
  const dateObj = new Date(date)
  const weeks = ['日', '月', '火', '水', '木', '金', '土']

  return (
    <Card border="0" className="mb-3">
      <Card.Header className="border-bottom">
        <div className="d-flex">
          <div className="calendar d-flex">
            <span className="calendar-month">{dateObj.getMonth() + 1}</span>
            <span className="calendar-day">{dateObj.getDate()}</span>
          </div>
          <h2 className="fs-5 fw-bold mb-0 ms-3 mt-3">
          {dateObj.getFullYear()}年{dateObj.getMonth() + 1}月{dateObj.getDate()}日（{weeks[dateObj.getDay()]}）
          </h2>
        </div>
      </Card.Header>
      {histories.map((v, k) =>
        <EventList
          key={`list-${k}`}
          dateObj={dateObj}
          {...v}
        />
      )}

    </Card>
  )
}