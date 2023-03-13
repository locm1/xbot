<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Services\api\SearchZipcodeService;
use Illuminate\Http\Request;

class SearchZipcodeController extends Controller
{
    public function __invoke(SearchZipcodeService $search_zipcode_service, Request $request)
    {
        $address = $search_zipcode_service->getAddress($request->zipcode);
        return response()->json(['address' => $address], 200);
    }
}
