import React, { useState } from "react";
import { Col, Row, Form, Button, ListGroup, Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Paths } from "@/paths";

export default () => {
  const SettingsItem = (props) => {
    const { id, title, children, last = false } = props;
    const borderBottomClass = !last ? "border-bottom" : "";

    return (
      <ListGroup.Item className={`d-flex align-items-center justify-content-between px-0 ${borderBottomClass}`}>
        <div>
          <Card.Text className="h6 mb-1">{title}</Card.Text>
        </div>
        <div>
          {children}
        </div>
      </ListGroup.Item>
    );
  };

	return (
		<>
      <Card border="0" className="shadow mb-4">
        <Card.Body>
          <h5 className="mb-4 border-bottom pb-3">コンテンツ設定</h5>
          <ListGroup className="list-group-flush">
            <SettingsItem
              id={1}
              enabled={false}
              title="テンプレート"
            >
              <Button variant="gray-800" className="me-2">選択する</Button>
            </SettingsItem>
          </ListGroup>
        </Card.Body>
      </Card>
		</>
	)
}