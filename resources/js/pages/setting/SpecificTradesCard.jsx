import React, { useState } from "react";
import { PlusIcon, MinusIcon, PencilAltIcon, SelectorIcon, TagIcon, TrashIcon, UserIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Col, Row, Form } from "react-bootstrap";

export default (props) => {
  const { id, index, SpecificTrades, setSpecificTrades } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleChange = (e, id) => {
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'content':
        setContent(e.target.value);
        break;
    }
    
    const changeSpecificTrades = {
      "id": id,
      "title": title,
      "content": content,
    };
    setSpecificTrades(
      SpecificTrades.map((SpecificTrade) => (SpecificTrade.id === id ? changeSpecificTrades : SpecificTrade))
    );
  };

  const deleteSpecificTradesCard = (id) => {
    setSpecificTrades(
      SpecificTrades.filter((SpecificTrade, index) => (SpecificTrade.id !== id))
    );
  };

  return (
    <>
      <Card border={1} className="p-4 privilege-card-item">
      <Card.Header className="d-flex align-items-center justify-content-start border-0 p-0 mb-3 border-bottom pb-3">
        <h5 className="mb-0">項目{index + 1}</h5>
        <div className="privilege-delete-button">
          <Button variant="close" onClick={() => deleteSpecificTradesCard(id)} />
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <Row className="mb-4 mb-lg-0 mt-4">
          <Col md={12} className="mb-3">
            <Form.Group id="firstName" className="mb-3">
              <Form.Label>タイトル</Form.Label>
              <Form.Control required type="text" name="title" value={title} onChange={(e) => handleChange(e, id)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>内容</Form.Label>
              <Form.Control as="textarea" rows="3" name="content" value={content} onChange={(e) => handleChange(e, id)} />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
    </>
  );
};