import { BadgeCheckIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import { Button, Card, Form, InputGroup } from "react-bootstrap";

export default (props) => {
  const { title, name, apiKey, apiKeyCheck, handleChange, handleClick } = props;

  return (
    <Card className="shadow mb-4">
      <Card.Header className={apiKeyCheck[name] ? "py-2 px-3 bg-success" : "py-2 px-3 bg-gray-800"}>
        <Form.Label className="mb-0 text-white">{title}</Form.Label>&nbsp;
        {apiKeyCheck[name] ? <BadgeCheckIcon className="icon-sm text-success" /> : <ExclamationCircleIcon className="icon-sm text-danger" />}
      </Card.Header>
      <Card.Body>
        <InputGroup>
          <Form.Control
            required
            type="text"
            value={apiKey[name]}
            onChange={(e) => handleChange(e, name)}
          />
          <Button onClick={() => handleClick(name, apiKey[name])} variant="success" className="me-2">
            保存する
          </Button>
        </InputGroup>
      </Card.Body>
    </Card>
  );
}