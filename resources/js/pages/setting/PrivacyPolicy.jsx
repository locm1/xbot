import React, { useState } from "react";
import moment from "moment-timezone";
import { CalendarIcon, CheckIcon, HomeIcon, PlusIcon, SearchIcon, CogIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Button, Card, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from 'react-bootstrap';

export const PrivacyPolicy = (props) => {

  const [id, setId] = useState(props.id ?? "");
  const [content, setContent] = useState(props.content ?? "");
  useEffect(() => {
    axios
      .get("http://localhost:80/api/policy/")
      .then((response) => setPolicys(response.data))
      .catch((error) => console.log(error));
  }, []);

  const createNewPolicy = (content) => {
    axios
      .post("http://localhost:80/api/policy/", {
        content: content,
      })
      .then((response) => {
        setPolicys([...policy, response.data]);
      })
      .then(() => {
        setContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const modifyPolicy = (id) => {
    axios
      .patch(`http://localhost:80/api/policy/${id}`, {
        content: content,
      })
      .then((response) => {
        setPolicys(response.data);
      })
      .then(() => {
        setContent("");
      })
      .catch((error) => console.log(error));
  };
}