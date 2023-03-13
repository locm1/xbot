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
        $api_key = [
            'key' => strtoupper($request->key),
            'value' => $request->value
        ];

        if (file_exists($this->env_path)) {
            $this->save_api_key_action->saveApiKey($this->env_path, $api_key['key'], $api_key['value']);
        }
        return $api_key;
    }

}
