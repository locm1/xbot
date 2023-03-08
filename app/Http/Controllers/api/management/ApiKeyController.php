<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Services\management\api_key\ApiKeyService;
use Illuminate\Http\Request;

class ApiKeyController extends Controller
{
    private $api_key_service;

    public function __construct(ApiKeyService $api_key_service)
    {
        $this->api_key_service = $api_key_service;
    }

    public function __invoke(Request $request)
    {
        $api_keys = $this->api_key_service->store($request);
        return response()->json(['api_keys' => $api_keys], 200);
    }
}
