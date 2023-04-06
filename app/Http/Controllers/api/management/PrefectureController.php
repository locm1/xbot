<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Services\management\prefecture\PrefectureService;
use GuzzleHttp\Psr7\Request;

class PrefectureController extends Controller
{
    private $prefecture_serivce;

    public function __construct(PrefectureService $prefecture_serivce)
    {
        $this->prefecture_serivce = $prefecture_serivce;
    }


    public function __invoke()
    {
        $prefectures = $this->prefecture_serivce->index();
        return response()->json(['prefectures' => $prefectures], 200);
    }
}
