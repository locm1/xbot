<?php

namespace App\Services\management\api_key;
use Illuminate\Support\Facades\Artisan; //エイリアスに登録して無い場合

class ApiKeyService
{
    private $env_path;
    private $save_api_key_action;

    public function __construct(SaveApiKeyAction $save_api_key_action)
    {
        $this->env_path = base_path('.env');
        $this->save_api_key_action = $save_api_key_action;
    }

    public function index()
    {
        $api_keys = config('api_key');
        $data = [];
        foreach ($api_keys as $k => $v) {
            $data += [strtolower($k) => $v ? true : false];
        }
        $data += $api_keys;
        return $data;
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
        Artisan::call('config:cache');
        return $api_key;
    }

}
