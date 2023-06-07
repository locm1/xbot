import { Button, Card, Col, ListGroup, Nav, Row } from "react-bootstrap"
import { MapPinIcon } from "@/components/icons/Icons";

export default () => {

  return (
    <main className="p-3">
      <Nav fill defaultActiveKey="now" variant="pills" className="gap-3">
        <Nav.Item>
          <Nav.Link eventKey="now" href="#" className="">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="past" href="#" className="">
            Profile
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Card border="0" className="">
        <Card.Header className="border-bottom">
          <div className="d-flex">
            <div className="calendar d-flex">
              <span className="calendar-month">5</span>
              <span className="calendar-day">1</span>
            </div>
            <h2 className="fs-5 fw-bold mb-0 ms-3 mt-3">
              6月6日（火）
            </h2>
          </div>
        </Card.Header>
        <Card.Body className="">
          <h6 className="mb-1 text-primary fw-bolder">タイトル</h6>
          <small className="mb-1">時間：19:00~102002</small>
          <div className="">
            <MapPinIcon className="icon icon-xs liff-event-icon" />
            <small className="liff-event-place">場所お</small>
          </div>
          <div className="mt-3">
            <Button variant="danger" className="w-100">
              予約キャンセル
            </Button>
          </div>
        </Card.Body>
      </Card>
    </main>
  )
}