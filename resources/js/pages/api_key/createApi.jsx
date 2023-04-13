import React, { useState } from "react";
import Swal from "sweetalert2";
import { Col, Row, Form, Button, Breadcrumb, Card, Table, Nav, Pagination, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { getApiKeys, storeApiKey } from "./api/ApiKeyApiMethods";
import { useEffect } from "react";
import { BadgeCheckIcon, ExclamationCircleIcon } from "@heroicons/react/solid";

export default () => {
	const [apiKey, setApiKey] = useState({
		line_message_channel_id: '', line_message_channel_secret: '',
		line_message_channel_token: '', mix_liff_id: '', liff_channel_id: '',
		mix_payjp_public_key: '', payjp_secret_key: '', common_password: '',
	});

	const [apiKeyCheck, setApiKeyCheck] = useState({
		line_message_channel_id: false, line_message_channel_secret: false,
		line_message_channel_token: false, mix_liff_id: false, liff_channel_id: false,
		mix_payjp_public_key: false, payjp_secret_key: false, common_password: false,
	});

  useEffect(() => {
    getApiKeys().then((response) => {
      setApiKeyCheck(response.data);
      console.log(response);
    })
  }, [])
 
	const handleChange = (e, input) => {
		setApiKey({...apiKey, [input]: e.target.value})
	};

	const storeComplete = () => {
    Swal.fire(
      '設定完了',
      'APIキーの設定に成功しました',
      'success'
    ).then((result) => {
      getApiKeys().then((response) => {
        setApiKeyCheck(response.data);
      })
    })
  } 

	const handleClick = (key, value) => {
    if (value === "") {
      Swal.fire(
        'エラー',
        'フォームが空白です',
        'error'
      )
      return ;
    }
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
					messaging APIのWebhook URLには末尾 /api/line/webhook/urwhdwwrlx を付与してください。<br />
					(例: https://example.com/api/line/webhook/urwhdwwrlx)
				</Card.Body>
			</Card>
			<Card className="shadow mb-4">
				<Card.Body>
					<Form.Group id="line-message-channel-id">
						<Form.Label>LINE_MESSAGE_CHANNEL_ID</Form.Label>
            &nbsp; {apiKeyCheck.line_message_channel_id ? <BadgeCheckIcon className="icon-sm text-success" /> : <ExclamationCircleIcon className="icon-sm text-danger" />}
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
            &nbsp; {apiKeyCheck.line_message_channel_secret ? <BadgeCheckIcon className="icon-sm text-success" /> : <ExclamationCircleIcon className="icon-sm text-danger" />}
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
            &nbsp; {apiKeyCheck.line_message_channel_token ? <BadgeCheckIcon className="icon-sm text-success" /> : <ExclamationCircleIcon className="icon-sm text-danger" />}
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
            &nbsp; {apiKeyCheck.liff_channel_id ? <BadgeCheckIcon className="icon-sm text-success" /> : <ExclamationCircleIcon className="icon-sm text-danger" />}
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
            &nbsp; {apiKeyCheck.mix_liff_id ? <BadgeCheckIcon className="icon-sm text-success" /> : <ExclamationCircleIcon className="icon-sm text-danger" />}
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
            &nbsp; {apiKeyCheck.payjp_secret_key ? <BadgeCheckIcon className="icon-sm text-success" /> : <ExclamationCircleIcon className="icon-sm text-danger" />}
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
            &nbsp; {apiKeyCheck.mix_payjp_public_key ? <BadgeCheckIcon className="icon-sm text-success" /> : <ExclamationCircleIcon className="icon-sm text-danger" />}
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
			<Card className="shadow mb-4">
				<Card.Body>
					<Form.Group id="visitPassword">
						<Form.Label>来店承認用パスワード</Form.Label>
            &nbsp; {apiKeyCheck.common_password ? <BadgeCheckIcon className="icon-sm text-success" /> : <ExclamationCircleIcon className="icon-sm text-danger" />}
						<Form.Control 
							required 
							type="text" 
							value={apiKey.common_password} 
							onChange={(e) => handleChange(e, 'common_password')}
						/>
					</Form.Group>
					<div className="d-flex flex-row-reverse mt-3">
						<Button onClick={() => handleClick('common_password', apiKey.common_password)} variant="gray-800" className="me-2">
							保存する
						</Button>
					</div>
				</Card.Body>
			</Card>
		</>
	)
}