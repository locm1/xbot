<?php

namespace App\Services\management\ec_configuration;

use App\Models\EcommerceConfiguration;
use App\Services\management\AbstractManagementService;

class EcommerceConfigurationService
{

    public function index() 
    {
        return EcommerceConfiguration::find(1);
    }


    public function store($request) 
    {
        $data = ($request->is_enabled == 1)
            ? $request->only(['cash_on_delivery_fee', 'is_enabled', 'postage', 'target_amount', 'tel'])
            : $request->only(['is_enabled', 'postage', 'target_amount', 'tel']);
        
        return EcommerceConfiguration::create($data);
    }


    public function update($request, EcommerceConfiguration $ecommerce_configuration) 
    {
        $data = ($request->is_enabled == 1)
            ? $request->only(['cash_on_delivery_fee', 'is_enabled', 'postage', 'target_amount', 'tel'])
            : $request->only(['is_enabled', 'postage', 'target_amount', 'tel']);

        return $ecommerce_configuration->update($data);
    }


    public function destroy() 
    {
        //
    }

}
