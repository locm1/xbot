import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap"
import Select from "react-select";

export default (props) => {
  const { tags, selectedTags, setSelectedTags, id, setTags, getUserTag } = props;
  const selectOptions = tags.map(v => ({ value: v.id, label: v.name }));
  const [name, setName] = useState('');
  const handleChange = (e) => {
    setName(e.target.value);
  }
  const storeTag = async () => {
    await axios.post('/api/v1/management/user_tags', {
      name: name
    })
      .then(async ({ data }) => {
        await getUserTag(id, setSelectedTags, setTags)
        setSelectedTags([...selectedTags, { value: data.tag.id, label: data.tag.name }])
      })
      .catch(error => {
        console.error(error);
      });
    setName('');
  };

  return (
    <Row className="align-items-end">
      <Col xs={8}>
        <Form.Group id="">
          <Form.Label>タグ設定</Form.Label>
          <Select
            onChange={(e) => { console.log(e) }}
            value={selectedTags}
            name="tags"
            options={selectOptions}
            isMulti
            isSearchable
            menuPosition={'fixed'}
          />
        </Form.Group>
      </Col>
      <Col xs={4}>
        <InputGroup>
          <Form.Control value={name} onChange={handleChange} />
          <Button variant="primary" onClick={storeTag}>
            追加
          </Button>
        </InputGroup>
      </Col>
    </Row>
  )
}