<?php

namespace App\Services\management\ec_configuration;

use App\Models\EcommerceConfiguration;
use App\Services\management\AbstractManagementService;
use App\Services\management\api_key\ApiKeyService;
use App\Services\management\api_key\SaveApiKeyAction;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EcommerceConfigurationService
{
    private $service;
    private $action;
    private $env_path;

    public function __construct(ApiKeyService $service, SaveApiKeyAction $action)
    {
        $this->service = $service;
        $this->action = $action;
        $this->env_path = base_path('.env');
    }

    public function index() 
    {
        return EcommerceConfiguration::find(1);
    }


    public function store($request) 
    {
        $data = ($request->is_enabled == 1)
            ? $request->only(['cash_on_delivery_fee', 'is_enabled', 'postage', 'target_amount', 'tel', 'email'])
            : $request->only(['is_enabled', 'postage', 'target_amount', 'tel', 'email']);
        
        return DB::transaction(function () use ($data, $request) {
            $ecommerce_configuration = EcommerceConfiguration::create($data);
            
            $api_keys = $this->service->index();

            # 保存されている秘密鍵と違った場合
            $this->saveKeys($request, $api_keys);

            return $ecommerce_configuration;
        });
    }


    public function update($request, $id) 
    {
        $ecommerce_configuration = EcommerceConfiguration::find($id);
        $data = ($request->is_enabled == 1)
            ? $request->only(['cash_on_delivery_fee', 'is_enabled', 'postage', 'target_amount', 'tel', 'email'])
            : $request->only(['is_enabled', 'postage', 'target_amount', 'tel', 'email']);

        return DB::transaction(function () use ($ecommerce_configuration, $data, $request) {
            $ecommerce_configuration->update($data);
            
            $api_keys = $this->service->index();

            # 保存されている秘密鍵と違った場合
            $this->saveKeys($request, $api_keys);

            return $ecommerce_configuration;
        });
    }

    private function saveKeys($request, $api_keys)
    {
        # 保存されている秘密鍵と違った場合
        if (file_exists($this->env_path) && ($request->payjp_secret_key !== $api_keys['PAYJP_SECRET_KEY'])) {
            $this->action->saveApiKey($this->env_path, strtoupper('payjp_secret_key'), $request->payjp_secret_key);
            Artisan::call('config:cache');
        }

        if (file_exists($this->env_path) && ($request->mix_payjp_public_key !== $api_keys['MIX_PAYJP_PUBLIC_KEY'])) {
            $this->action->saveApiKey($this->env_path, strtoupper('mix_payjp_public_key'), $request->mix_payjp_public_key);
            Artisan::call('config:cache');
        }
    }

}
