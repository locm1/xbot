import { Button, Card, Col, ListGroup, Nav, Row } from "react-bootstrap"
import { MapPinIcon } from "@/components/icons/Icons";
import EventCard from "./organisms/EventCard";
import { EventHistories } from "./ConstEventHistories"
import { useState } from "react";

export default () => {
  const [navSelected, setNavSelected] = useState('future')
  const histories = EventHistories
  const sortedDates = Object.keys(histories).sort();
  const currentDate = new Date();
  const pastDates = [];
  const futureDates = [];

  sortedDates.forEach(date => {
    if (new Date(date) < currentDate) {
      pastDates.push(date);
    } else {
      futureDates.push(date);
    }
  });

  const handleClick = (val) => {
    setNavSelected(val)
  }

  return (
    <main className="p-3">
      <Nav fill defaultActiveKey="future" variant="pills" className="gap-3">
        <Nav.Item className="w-25">
          <Nav.Link eventKey="future" href="#" onClick={() => handleClick('future')}>
            予約一覧
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="w-25">
          <Nav.Link eventKey="past" href="#" onClick={() => handleClick('past')}>
            過去の予約一覧
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {navSelected === 'future' ? futureDates.map((v, k) =>
        <EventCard
          key={`event-${k}`}
          histories={histories[v]}
          date={v}
        />
      ) : pastDates.map((v, k) =>
        <EventCard
          key={`event-${k}`}
          histories={histories[v]}
          date={v}
        />
      )}
    </main>
  )
}