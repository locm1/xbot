import React, { useState } from "react";
import { Col, Row, Form, Button, Breadcrumb, Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

export default () => {
  const [lineApi, setLineApi] = useState("");
  const [payjpApi, setPayjpApi] = useState("");

	return (
		<>
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">API設定</h1>
        </div>
      </div>
			<Card className="shadow mb-4">
				<Card.Body>
					<Form.Group id="firstName">
						<Form.Label>LINE API</Form.Label>
						<Form.Control required type="text" />
					</Form.Group>
				</Card.Body>
			</Card>
			<Card className="shadow mb-4">
				<Card.Body>
					<Form.Group id="firstName">
						<Form.Label>Pay.jp API</Form.Label>
						<Form.Control required type="text" />
					</Form.Group>
				</Card.Body>
			</Card>
			<div className="d-flex flex-row-reverse mt-3">
        <Button as={Link} to={_} variant="gray-800" className="me-2">
          保存する
        </Button>
      </div>
		</>
	)
}