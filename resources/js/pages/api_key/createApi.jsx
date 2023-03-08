import React, { useState } from "react";
import Swal from "sweetalert2";
import { Col, Row, Form, Button, Breadcrumb, Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { storeApiKey } from "@/pages/api_key/api/ApiKeyApiMethods";

export default () => {
	const [apiKey, setApiKey] = useState({
		line_message_channel_id: '', line_message_channel_secret: '',
		line_message_channel_token: '', pay_jp_api_key: ''
	});

	const handleChange = (e, input) => {
    setApiKey({...apiKey, [input]: e.target.value})
  };

	const storeComplete = () => {
    Swal.fire(
      '設定完了',
      'APIキーの設定に成功しました',
      'success'
    )
  } 

	const handleClick = () => {
    storeApiKey(apiKey, storeComplete)
  } 

	return (
		<>
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h1 className="page-title">APIキー設定</h1>
        </div>
      </div>
			<Card className="shadow mb-4">
				<Card.Body>
					<Form.Group id="line-message-channel-id">
						<Form.Label>LINE_MESSAGE_CHANNEL_ID</Form.Label>
						<Form.Control 
							required 
							type="text" 
							value={apiKey.line_message_channel_id} 
							onChange={(e) => handleChange(e, 'line_message_channel_id')}
						/>
					</Form.Group>
				</Card.Body>
			</Card>
			<Card className="shadow mb-4">
				<Card.Body>
					<Form.Group id="line-message-channel-secret">
						<Form.Label>LINE_MESSAGE_CHANNEL_SECRET</Form.Label>
						<Form.Control 
							required 
							type="text" 
							value={apiKey.line_message_channel_secret} 
							onChange={(e) => handleChange(e, 'line_message_channel_secret')}
						/>
					</Form.Group>
				</Card.Body>
			</Card>
			<Card className="shadow mb-4">
				<Card.Body>
					<Form.Group id="line-message-channel-token">
						<Form.Label>LINE_MESSAGE_CHANNEL_TOKEN</Form.Label>
						<Form.Control 
							required 
							type="text" 
							value={apiKey.line_message_channel_token} 
							onChange={(e) => handleChange(e, 'line_message_channel_token')}
						/>
					</Form.Group>
				</Card.Body>
			</Card>
			<Card className="shadow mb-4">
				<Card.Body>
					<Form.Group id="firstName">
						<Form.Label>Pay.jp APIキー</Form.Label>
						<Form.Control 
							required 
							type="text" 
							value={apiKey.pay_jp_api_key} 
							onChange={(e) => handleChange(e, 'pay_jp_api_key')}
						/>
					</Form.Group>
				</Card.Body>
			</Card>
			<div className="d-flex flex-row-reverse mt-3">
        <Button onClick={handleClick} variant="gray-800" className="me-2">
          保存する
        </Button>
      </div>
		</>
	)
}