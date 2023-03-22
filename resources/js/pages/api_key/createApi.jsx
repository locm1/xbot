import React, { useState } from "react";
import Swal from "sweetalert2";
import { Col, Row, Form, Button, Breadcrumb, Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { storeApiKey } from "@/pages/api_key/api/ApiKeyApiMethods";

export default () => {
	const [apiKey, setApiKey] = useState({
		line_message_channel_id: '', line_message_channel_secret: '',
		line_message_channel_token: '', mix_liff_id: '', liff_channel_id: '',
		mix_payjp_public_key: '', payjp_secret_key: '',
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

	const handleClick = (key, value) => {
		const formValue = {'key': key, 'value': value}
    storeApiKey(formValue, storeComplete)
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
					<div className="d-flex flex-row-reverse mt-3">
						<Button onClick={() => handleClick('line_message_channel_id', apiKey.line_message_channel_id)} variant="gray-800" className="me-2">
							保存する
						</Button>
					</div>
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
					<div className="d-flex flex-row-reverse mt-3">
						<Button onClick={() => handleClick('line_message_channel_secret', apiKey.line_message_channel_secret)} variant="gray-800" className="me-2">
							保存する
						</Button>
					</div>
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
					<div className="d-flex flex-row-reverse mt-3">
						<Button onClick={() => handleClick('line_message_channel_token', apiKey.line_message_channel_token)} variant="gray-800" className="me-2">
							保存する
						</Button>
					</div>
				</Card.Body>
			</Card>
			<Card className="shadow mb-4">
				<Card.Body>
					<Form.Group id="line-message-channel-token">
						<Form.Label>LIFF_CHANNEL_ID</Form.Label>
						<Form.Control 
							required 
							type="text" 
							value={apiKey.liff_channel_id} 
							onChange={(e) => handleChange(e, 'liff_channel_id')}
						/>
					</Form.Group>
					<div className="d-flex flex-row-reverse mt-3">
						<Button onClick={() => handleClick('liff_channel_id', apiKey.liff_channel_id)} variant="gray-800" className="me-2">
							保存する
						</Button>
					</div>
				</Card.Body>
			</Card>
			<Card className="shadow mb-4">
				<Card.Body>
					<Form.Group id="firstName">
						<Form.Label>LIFF ID</Form.Label>
						<Form.Control 
							required 
							type="text" 
							value={apiKey.mix_liff_id} 
							onChange={(e) => handleChange(e, 'mix_liff_id')}
						/>
					</Form.Group>
					<div className="d-flex flex-row-reverse mt-3">
						<Button onClick={() => handleClick('mix_liff_id', apiKey.mix_liff_id)} variant="gray-800" className="me-2">
							保存する
						</Button>
					</div>
				</Card.Body>
			</Card>
			<Card className="shadow mb-4">
				<Card.Body>
					<Form.Group id="firstName">
						<Form.Label>Pay.jp 秘密鍵</Form.Label>
						<Form.Control 
							required 
							type="text" 
							value={apiKey.payjp_secret_key} 
							onChange={(e) => handleChange(e, 'payjp_secret_key')}
						/>
					</Form.Group>
					<div className="d-flex flex-row-reverse mt-3">
						<Button onClick={() => handleClick('payjp_secret_key', apiKey.payjp_secret_key)} variant="gray-800" className="me-2">
							保存する
						</Button>
					</div>
				</Card.Body>
			</Card>
			<Card className="shadow mb-4">
				<Card.Body>
					<Form.Group id="firstName">
						<Form.Label>Pay.jp 公開鍵</Form.Label>
						<Form.Control 
							required 
							type="text" 
							value={apiKey.mix_payjp_public_key} 
							onChange={(e) => handleChange(e, 'mix_payjp_public_key')}
						/>
					</Form.Group>
					<div className="d-flex flex-row-reverse mt-3">
						<Button onClick={() => handleClick('mix_payjp_public_key', apiKey.mix_payjp_public_key)} variant="gray-800" className="me-2">
							保存する
						</Button>
					</div>
				</Card.Body>
			</Card>
		</>
	)
}