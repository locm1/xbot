<?php

namespace App\Http\Controllers\api\liff\postage;

use App\Http\Controllers\Controller;
use App\Services\management\postage\PostageService;
use Illuminate\Http\Request;

class PostageController extends Controller
{
    private $postage_service;

    public function __construct(PostageService $postage_service)
    {
        $this->postage_service = $postage_service;
    }

    public function __invoke(Request $request)
    {
        $postages = $this->postage_service->index($request);
        return response()->json(['postages' => $postages], 200);
    }
}
