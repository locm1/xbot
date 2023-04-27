import { CurrencyYenIcon } from "@heroicons/react/solid"
import { Button, Card, Col, Badge, Form, InputGroup, Row } from "react-bootstrap"

export const PostageForm = (props) => {
  const { name, postage, id, handleChange, error, index } = props;

  return (
    <Col>
      <Form className="py-4 d-flex">
        <div className="text-center py-2 w-15 text-truncate">{name}</div>
        <InputGroup className="w-75 mx-4">
          <InputGroup.Text><CurrencyYenIcon className="icon icon-xs" /></InputGroup.Text>
          <Form.Control
            value={postage}
            onChange={(e) => handleChange(e, id, `postages.${index}.postage`)}
            type="number"
            placeholder="金額"
            isInvalid={!!error[`postages.${index}.postage`]}
          />
          {
            error[`postages.${index}.postage`] && 
            <Form.Control.Feedback type="invalid">{error[`postages.${index}.postage`][0]}</Form.Control.Feedback>
          }
        </InputGroup>
      </Form>
    </Col>
  )
}