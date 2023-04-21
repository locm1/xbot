import React, { useState } from "react";
import Swal from "sweetalert2";
import { Col, Row, Form, Button, Breadcrumb, Card, Table, Nav, Pagination, Image, InputGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { getApiKeys, storeApiKey } from "./api/ApiKeyApiMethods";
import { useEffect } from "react";
import { BadgeCheckIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import ComponentForm from "./components/form";
import data from "./data";

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
					(例: https://example.com/api/line/webhook/urwhdwwrlx)<br />
					liff設定画面のScope全てにチェックを入れてください。<br />
					liff設定画面のシェアターゲットピッカーをONにしてください。<br />
				</Card.Body>
			</Card>
      {data.map((v, k) => 
        <ComponentForm 
          title={v.title}
          name={v.name}
          apiKey={apiKey} 
          apiKeyCheck={apiKeyCheck} 
          handleChange={handleChange}
          handleClick={handleClick}
          key={`form-${k}`}
        />
      )}
		</>
	)
}