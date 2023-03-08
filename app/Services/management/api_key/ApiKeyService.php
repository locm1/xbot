<?php

namespace App\Services\management\api_key;

class ApiKeyService
{
    private $env_path;
    private $save_api_key_action;

    public function __construct(SaveApiKeyAction $save_api_key_action)
    {
        $this->env_path = base_path('.env');
        $this->save_api_key_action = $save_api_key_action;
    }

    public function store($request) 
    {
        $api_keys = [
            'LINE_MESSAGE_CHANNEL_ID' => $request->line_message_channel_id,
            'LINE_MESSAGE_CHANNEL_SECRET' => $request->line_message_channel_secret,
            'LINE_MESSAGE_CHANNEL_TOKEN' => $request->line_message_channel_token,
            'PAY_JP_API_KEY' => $request->pay_jp_api_key,
        ];

        if (file_exists($this->env_path)) {
            foreach ($api_keys as $key => $value) {
                $this->save_api_key_action->saveApiKey($this->env_path, $key, $value);
            }
        }
        return $api_keys;
    }

}
