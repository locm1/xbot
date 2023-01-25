import { CurrencyYenIcon } from "@heroicons/react/solid"
import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap"

export const PostageForm = (props) => {
  const {name, value, id} = props;
  return (
    <Col>
      <Form className="py-4 d-flex">
        <div className="text-center py-2 w-15 text-truncate">{name}</div>
        <InputGroup className="w-75 mx-4">
          <InputGroup.Text><CurrencyYenIcon className="icon icon-xs" /></InputGroup.Text>
          <Form.Control value={value} type="text" placeholder="金額" />
        </InputGroup>
      </Form>
    </Col>
  )
}