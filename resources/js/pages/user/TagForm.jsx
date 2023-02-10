
import React, { useState, useEffect, useLayoutEffect } from "react";
import Select from "react-select";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';

export const TagForm = (props) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    axios.get(`/api/v1/management/users/${props.userId}/user_tag`)
    .then((res) => {
      if(res.status !== 200) {
        throw new Error("APIが正しく取得されませんでした");
      } else {
        const selectedOptions = res.data.user_tags.map(v => ({ value: v.id, label: v.name }));
        setSelectedTags(selectedOptions);
      }
    });
    axios.get(`/api/v1/management/user_tags`)
    .then((data) => {
      setTags(data.data.tags);
    })
    .catch(error => {
        console.error(error);
    });
  }, []);

  const selectOptions = tags.map(v => ({ value: v.id, label: v.name }));

  return (
    <Card border="0" className="shadow mb-4">
      <Card.Body>
        <h5 className="mb-4 border-bottom pb-3">タグ</h5>
        <Form>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="firstName">
                <Select onChange={(e) => {
                  setSelectedTags(e);
                }}
                value={selectedTags} name="tags" options={selectOptions} isMulti isSearchable menuPosition={'fixed'} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};