
import React, { useState, useEffect, useLayoutEffect } from "react";
import Select from "react-select";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Col, Row, Card, Form, Image, Button, InputGroup } from 'react-bootstrap';

export const TagForm = (props) => {
  const {tags, selectedTags, setSelectedTags} = props;
  const selectOptions = tags.map(v => ({ value: v.id, label: v.name }));

  return (
    <>
      <Row>
        <Col md={12} className="mb-3">
          <Form.Group id="firstName">
            <Form.Label>タグ選択</Form.Label>
            <Select onChange={(e) => {
              setSelectedTags(e);
            }}
            value={selectedTags} name="tags" options={selectOptions} isMulti isSearchable menuPosition={'fixed'} />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};