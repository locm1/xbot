<?php

namespace App\Http\Controllers\api\liff\ec_configuration;

use App\Http\Controllers\Controller;
use App\Services\management\ec_configuration\EcommerceConfigurationService;
use Illuminate\Http\Request;

class EcommerceConfigurationController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  EcommerceConfigurationService  $ecommerce_configuration_service
     * @return \Illuminate\Http\Response
     */
    public function __invoke(EcommerceConfigurationService $ecommerce_configuration_service)
    {
        $ecommerce_configuration = $ecommerce_configuration_service->index();
        return response()->json(['ecommerce_configuration' => $ecommerce_configuration], 200);
    }
}
