<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Services\management\api_key\ApiKeyService;
use Illuminate\Http\Request;

class ApiKeyController extends Controller
{
    private $service;

    public function __construct(ApiKeyService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return $this->service->index();
    }

    public function store(Request $request)
    {
        $api_key = $this->service->store($request);
        return response()->json(['api_key' => $api_key], 200);
    }
}
